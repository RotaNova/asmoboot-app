<!--
 * @Descripttion: 我的消息
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2021-12-17 09:10:44
 * @LastEditors: LSC
 * @LastEditTime: 2022-03-08 15:10:03
-->
<template>
    <view>
        <view class="home_index">
            <u-navbar title="我的消息" :leftIcon="null" class="message-navbar mt44">
                <view class="u-nav-box" slot="right">
                    <image
                        class="clean-message"
                        src="@/static/clean.png"
                        mode="scaleToFill"
                        @click="handleCleanAll"
                    />
                </view>
            </u-navbar>
            <view class="my-search">
                <!-- <view>{{ searchValue }}</view> -->
                <nx-search
                    ref="mySearch"
                    :selectList="selectList"
                    button="inside"
                    @search="doSearch"
                    @confirm="doSearch"
                    @selectItem="selectItem"
                    v-model="searchValue"
                />
                <!-- 筛选按钮 -->
                <view
                    class="choose"
                    :class="{ 'choose-active': isShowBlue === false }"
                    @click="handleOpenChoose"
                >
                    <view>筛选</view>
                    <view class="choose-icon">
                        <image
                            v-if="isShowBlue"
                            class="icon"
                            src="@/static/screen.png"
                            mode="scaleToFill"
                        />
                        <!-- @click="doSearch" -->
                        <image
                            v-else
                            class="icon"
                            src="@/static/screen-blue.png"
                            mode="scaleToFill"
                        />
                    </view>
                </view>
            </view>
            <view class="container">
                <scroll-view
                    @scrolltolower="lower"
                    @scroll="scroll"
                    class="message_box"
                    scroll-y="true"
                >
                    <block v-for="(item, index) in annunciateList" :key="index">
                        <view @click="getUserAnnouncementInfo(item)">
                            <message-item :itemData="item"></message-item>
                        </view>
                    </block>
                    <u-loading-icon :show="isShowLoadMore"></u-loading-icon>
                    <view v-if="!isShowLoadMore" class="noMore">没有更多消息啦~</view>
                </scroll-view>
            </view>
            <u-loading-page
                :loading="isLoading"
                bg-color="#e8e8e8"
                style="opacity: 0.4"
                class="mt44"
                font-size="16"
            ></u-loading-page>
        </view>
        <message-popup
            v-if="isShowChoose"
            @close="handleCloseChoose"
            @newParmas="getNewParams"
            :selectValue="selectValue"
            @refresh="readAllAnnouncement"
        ></message-popup>
        <!-- 弹出清除 -->
        <message-modal
            v-if="isShowModal"
            @close="handleCloseClean"
            @confirm="confirm"
        ></message-modal>
    </view>
</template>

<script>
import nxSearch from '@/components/xt-seach/xt-seach'
import messageModal from '@/components/message-modal/message-modal'
import { _throttle, _debounce } from '@/units/index.js'
import { mapGetters } from 'vuex'
import {
    getUserAnnouncementItemPage,
    readAnnouncement,
    getUserAnnouncementInfo,
    readAllAnnouncement,
    getAnnouncementNoticItemPage
} from '@/api/information'

const currentDate = new Date()
const oldWeekDate = currentDate.setDate(currentDate.getDate() - 7) //  最终获得的 old7Date 是时间戳

export default {
    data() {
        return {
            isWatchNewMessages: false,
            isOpenTime: false,
            isEndTime: false,
            isLoading: false,
            activeRead: -1,
            activeIndex: -1,
            selectValue: {}, // 传递的数据
            page: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            // openTime: '',
            // endTime: '',
            titleOrMaster: '',
            isShowLoadMore: false,
            annunciateList: [], // 消息列表
            annunList: [], // 详情
            isShowModal: false, //弹出
            isShowChoose: false, // 打开筛选
            tabbarValue: 1,
            keyword: '21',
            // scrollTop: 0,
            swiperCurrent: 0,
            searchQuery: {
                keyword: '',
                selectIndex: 0
            },
            searchValue: '', // 搜索内容
            selectList: [
                {
                    id: 1,
                    name: '标题'
                },
                {
                    id: 2,
                    name: '发布人'
                }
            ],
            old: {
                scrollTop: 0
            }
        }
    },
    created() {
        this.getUserAnnouncementItemPage() // 消息
        this.getAnnouncementCount() // 消息小原点
    },
    watch: {
        newMessages: {
            handler(newVal, oldVal) {
                // console.log(newVal, '是')
                // console.log(oldVal, '是')
                if (this.isWatchNewMessages && (newVal == 0 || newVal != oldVal)) {
                    this.page.pageNum = 1 // 分页变成1
                    setTimeout(() => {
                        this.annunciateList = []
                        this.annunciateList.length = 0
                        this.getUserAnnouncementItemPage() // 消息
                    }, 200)
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法，如果设置了false，那么效果和上边例子一样
            immediate: true
        }
    },
    computed: {
        ...mapGetters(['newMessages']), // 新消息
        // 是否显示筛选按钮,选择按钮不显示,时间和当前规定时间相同不显示
        isShowBlue() {
            if (
                this.activeRead !== -1 ||
                this.activeIndex !== -1 ||
                this.isOpenTime ||
                this.isEndTime
            ) {
                // debugger
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        // 获取消息通知
        getAnnouncementCount() {
            // console.log(11)
            let parame = {
                pageSize: 0,
                pageNum: 0
            }
            this.$Axios
                .post(getAnnouncementNoticItemPage, parame)
                .then((res) => {
                    if (res.total >= 99) {
                        this.$emit('getMyMessage', '99+')
                    } else {
                        this.$emit('getMyMessage', `${res.total}`)
                    }
                })
                .catch((err) => {})
        },
        // 存在且开始时间不为七天前
        checkOpenTime(openTime) {
            const open = `${this.$getdate(oldWeekDate)} 00:00:00`
            if (openTime && this.openTime !== open) {
                this.isOpenTime = true
            } else {
                this.isOpenTime = false
            }
        },
        // 存在且开始时间不为七天内
        checkEndTime(endTime) {
            const end = `${this.$getdate(Number(new Date()))} 23:59:59`
            if (endTime && this.endTime !== end) {
                this.isEndTime = true
            } else {
                this.isEndTime = false
            }
        },
        getNewListData(data) {
            this.annunciateList = data
        },
        selectItem(index) {
            // console.log(index, '221')
            this.titleOrMaster = index // 0 标语 1 发包人
        },
        // 单个已读
        readAnnouncement(id) {
            let arr = []
            arr.push(id)
            this.$Axios
                .post(readAnnouncement, arr)
                .then((res) => {
                    this.page.pageNum = 1 // 分页变成1
                    // this.annunciateList = []
                    // this.annunciateList.length = 0
                    // this.getUserAnnouncementItemPage()
                    // this.getAnnouncementCount() // 消息小原点
                })
                .catch((err) => {})
        },
        // 确定
        confirm() {
            this.readAllAnnouncement()
        },
        // 全部
        readAllAnnouncement() {
            this.isLoading = true
            this.$Axios
                .post(readAllAnnouncement)
                .then((res) => {
                    this.page.pageNum = 1 // 分页变成1
                    this.isShowModal = false
                    // this.annunciateList = []
                    // this.getUserAnnouncementItemPage()
                    // this.getAnnouncementCount() // 消息小原点
                })
                .catch((err) => {})
                .finally(() => {
                    this.isLoading = false
                })
        },
        // 获取通告详情
        getUserAnnouncementInfo: _debounce(function (row) {
            this.isLoading = true
            // console.log(row, '我是')
            if (row.annReadFlag == 0) {
                this.readAnnouncement(row.sysUserAnnouncementId)
            }
            this.annunList = []
            let parame = {
                sysUserAnnouncementId: row.sysUserAnnouncementId
            }
            this.$Axios
                .get(getUserAnnouncementInfo, parame)
                .then((res) => {
                    this.annunList = res
                    this.jumpPlatformTo(this.annunList)
                })
                .catch((err) => {})
                .finally(() => {
                    this.isLoading = false
                })
        }, 200),
        jumpPlatformTo(obj) {
            // 绑定解绑手机号
            this.$jumpPlatform('./messageInfo?info=' + encodeURIComponent(JSON.stringify(obj)))
        },
        // 获取基本信息
        getUserAnnouncementItemPage(searchQuery) {
            // console.log(this.openTime, '开始')
            // console.log(this.endTime, '介绍')
            this.isWatchNewMessages = true
            // debugger
            let params = {
                pageNum: this.page.pageNum,
                pageSize: this.page.pageSize,
                queryRuleList: [
                    {
                        rule: 'ge',
                        filed: 'beginTime',
                        value: this.openTime || `${this.$getdate(oldWeekDate)} 00:00:00`
                    },
                    {
                        rule: 'le',
                        filed: 'endTime',
                        value: this.endTime || `${this.$getdate(Number(new Date()))} 23:59:59`
                    }
                ],
                searchCode: 'my_message_search'
            }
            console.log(params, '是')
            // console.log(this.searchValue)
            // console.log(typeof this.searchValue)
            // console.log(typeof this.searchValue === 'string')
            if (this.searchValue && typeof this.searchValue === 'string') {
                if (this.titleOrMaster == 0) {
                    params.queryRuleList.push({
                        rule: 'like',
                        filed: 'ann_title',
                        value: `${this.searchValue}`
                    })
                } else if (this.titleOrMaster == 1) {
                    params.queryRuleList.push({
                        rule: 'like',
                        filed: 'user_name',
                        value: `${this.searchValue}`
                    })
                }
            }
            if (this.activeIndex > -1) {
                params.queryRuleList.push({
                    rule: 'eq',
                    filed: 'ann_category',
                    value: `${this.activeIndex}`
                })
            }
            if (this.activeRead > -1) {
                params.queryRuleList.push({
                    rule: 'eq',
                    filed: 'ann_read_flag',
                    value: `${this.activeRead}`
                })
            }
            this.$Axios
                .post(getUserAnnouncementItemPage, params)
                .then((res) => {
                    this.annunciateList = [...this.annunciateList, ...res.records]
                    this.$forceUpdate() // 强制刷新页面
                    if (this.page.pageNum == 1) {
                        this.page.total = Math.floor(res.total / this.page.pageSize)
                        // console.log(this.page.total, 'jik1')
                    }
                    // console.log(this.annunciateList, '当前')
                    this.page.pageNum += 1
                })
                .catch((err) => {})
        },
        getNewParams(params) {
            // console.log(params, '接受数据')
            this.activeRead = -1 // 重新选择按钮
            this.activeIndex = -1 // 重新选择按钮
            params.queryRuleList.forEach((item) => {
                // console.log(item)
                if (item.filed == 'beginTime') {
                    this.openTime = item.value
                }
                if (item.filed == 'endTime') {
                    this.endTime = item.value
                }
                if (item.filed == 'ann_read_flag') {
                    this.activeRead = item.value //通告类型
                }
                if (item.filed == 'ann_category') {
                    this.activeIndex = item.value
                }
            })
            // 检查开始时间和结束时间是否为规定范围内时间
            this.checkOpenTime(this.openTime)
            this.checkEndTime(this.endTime)
            if (this.searchValue) {
                if (this.titleOrMaster == 0) {
                    params.queryRuleList.push({
                        rule: 'like',
                        filed: 'ann_title',
                        value: `${this.searchValue}`
                    })
                } else if (this.titleOrMaster == 1) {
                    params.queryRuleList.push({
                        rule: 'like',
                        filed: 'user_name',
                        value: `${this.searchValue}`
                    })
                }
            }
            // console.log(params, '发后端')
            this.page.pageNum = 1 // 分页变成1
            let newParmas = {
                ...params,
                pageNum: this.page.pageNum,
                pageSize: this.page.pageSize
            }
            // console.log(newParmas, '数据')
            this.annunciateList = []
            this.annunciateList.length = 0
            this.$Axios
                .post(getUserAnnouncementItemPage, newParmas)
                .then((res) => {
                    this.annunciateList = [...this.annunciateList, ...res.records]
                    if (this.page.pageNum == 1) {
                        this.page.total = Math.ceil(res.total / this.page.pageSize)
                    }
                    this.page.pageNum += 1
                })
                .catch((err) => {})
        },
        // 是否进行分页
        pagination() {},
        clickItem() {
            // console.log('点')
        },
        // 打开
        handleCleanAll() {
            this.isShowModal = true
        },
        // 关闭
        handleCloseClean() {
            setTimeout(() => {
                this.isShowModal = false
            }, 500)
        },
        /**
         * @description: 打开筛选
         * @param {*}
         * @return {*}
         */
        handleOpenChoose() {
            // this.searchValue = ''
            setTimeout(() => {
                if (this.searchValue) {
                    this.selectValue.searchValue = this.searchValue
                }
                if (this.activeIndex) {
                    this.selectValue.activeIndex = this.activeIndex
                }
                if (this.activeRead) {
                    this.selectValue.activeRead = this.activeRead
                }
                if (this.openTime) {
                    this.selectValue.openTime = this.openTime
                }
                if (this.endTime) {
                    this.selectValue.endTime = this.endTime
                }
                if (this.titleOrMaster) {
                    this.selectValue.titleOrMaster = this.titleOrMaster
                }
                if (this.searchQuery && typeof this.searchValue === 'string') {
                    this.selectValue.searchQuery = this.searchQuery
                }
                this.isShowChoose = true
            }, 100)
        },
        /**
         * @description: 关闭筛选
         * @param {*}
         * @return {*}
         */
        handleCloseChoose() {
            setTimeout(() => {
                this.isShowChoose = false
            }, 500)
        },
        transition() {},
        animationfinish() {},
        click1(e) {
            // this.tabbarValue=e
            // console.log('click1', e)
        },
        change1(e) {
            // console.log('change1', e)
        },
        // 执行搜索
        doSearch(searchQuery) {
            // this.openTime = '' // 清除时间
            // this.endTime = ''
            if (searchQuery && typeof searchQuery == 'string') {
                this.searchValue = searchQuery
            }
            this.page.pageNum = 1 // 分页变成1
            this.annunciateList = []
            this.annunciateList.length = 0
            // console.log('searchQuery', searchQuery)
            // console.log('searchQuery111', this.searchValue)
            this.getUserAnnouncementItemPage(searchQuery)
        },
        upper: function (e) {
            // console.log(e)
        },
        lower: function (e) {
            // console.log(this.page.pageNum, '当前页')
            // console.log(this.page.total, '总')
            if (this.page.pageNum > this.page.total) {
                this.isShowLoadMore = false
            } else {
                this.isShowLoadMore = true
                this.getUserAnnouncementItemPage()
            }
        },
        scroll: function (e) {
            // console.log(e)
            this.old.scrollTop = e.detail.scrollTop
        },
        goTop: function (e) {
            this.scrollTop = this.old.scrollTop
            this.$nextTick(() => {
                this.scrollTop = 0
            })
            uni.showToast({
                icon: 'none',
                title: '纵向滚动 scrollTop 值已被修改为 0'
            })
        },
        scrollTop() {}
    },
    components: {
        nxSearch,
        messageModal
    }
}
</script>

<style lang="scss" scoped>
.home_index {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: $uni-bg-color !important;
    .message-navbar {
        width: 100%;
        z-index: 10;
        .u-nav-box {
            width: 45upx;
            height: 45upx;
            margin-right: 240upx;
            .clean-message {
                width: 100%;
                height: 100%;
            }
        }
    }
    .my-search {
        display: flex;
        align-items: center;
        height: 88upx;
        background-color: $uni-bg-color;
        padding: 12upx 32upx;
        z-index: 10;
        .choose {
            display: flex;
            align-items: center;
            margin-left: 32upx;
            font-size: $uni-font-size-base;
            color: $uni-text-color-grey;
            &-icon {
                width: 48upx;
                height: 48upx;
                .icon {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .choose-active {
            display: flex;
            align-items: center;
            margin-left: 32upx;
            font-size: $uni-font-size-base;
            color: $uni-color-btn;
            &-icon {
                width: 48upx;
                height: 48upx;
                .icon {
                    width: 100%;
                    height: 100%;
                    color: $uni-color-btn;
                }
            }
        }
    }
    .container {
        .message_box {
            height: 81vh;
            background-color: $uni-bg-color-main;
            border-radius: 10rpx;
            flex: 1;
            padding: 16px 16px 70px 16px;
            box-sizing: border-box;
            overflow-y: auto;
            .noMore {
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: $uni-color-sh;
            }
        }
    }
}
.u-tabbar {
    height: 150upx;
}
.home_content {
    height: 100%;
    // background-color: yellow;
}
::v-deep {
    .u-tabbar__content {
        height: 130upx;
    }
    .my-search .uni-input-input {
        font-size: 28upx;
    }
}
</style>
