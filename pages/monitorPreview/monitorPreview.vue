<template>
    <view style="height: 100vh; display: flex; flex-direction: column">
        <view class="home_serch">
            <u-navbar
                title="监控预览"
                @rightClick="rightClick"
                @leftClick="leftClick"
                fixed
            ></u-navbar>
        </view>
        <view class="padlr mt88">
            <u-search
                placeholder="输入设备名称"
                v-model="keyword"
                clearabled
                @search="searchKeyworld"
                class="mt44"
            ></u-search>
            <view class="group_name mt16 over_space" @tap="$leftClick" v-if="name">
                {{ name }}
                <u-icon name="arrow-down-fill" class="arrow-doem"></u-icon>
            </view>
        </view>
        <view class="flex device_main padlr padlr_bottom">
            <scroll-view @scrolltolower="scrolltolower" scroll-y="true" class="flex">
                <view v-if="childrenList.length > 0">
                    <view
                        v-for="(item, index) in childrenList"
                        :key="item.groupId"
                        class="content_list_eq content_list"
                    >
                        <view @click="equipmentDetails(item)">
                            <view class="list_image">
                                <image :src="huaban24" mode="" v-if="item.hasChannel"></image>
                                <image :src="huaban22" mode="" v-else></image>
                                <view class="posion_reative" v-if="item.hasChannel">
                                    <u-icon name="arrow-right-double"></u-icon>
                                </view>
                            </view>
                            <view class="scroll_one over_space mt16">{{
                                item.nickName ? item.nickName : ''
                            }}</view>
                            <view class="two_space">{{
                                item.deviceCode ? item.deviceCode : ''
                            }}</view>
                        </view>
                    </view>
                </view>
                <view v-else>
                    <view
                        v-for="(item, index) in dataList"
                        :key="item.groupId"
                        class="content_list_eq content_list"
                    >
                        <view @click="equipmentDetails(item)">
                            <view class="list_image">
                                <image :src="huaban24" mode="" v-if="item.hasChannel"></image>
                                <image :src="huaban22" mode="" v-else></image>
                                <view class="posion_reative" v-if="item.hasChannel">
                                    <u-icon name="arrow-right-double"></u-icon>
                                </view>
                            </view>
                            <view class="scroll_one over_space mt16">{{
                                item.nickName ? item.nickName : ''
                            }}</view>
                            <view class="two_space">{{
                                item.deviceCode ? item.deviceCode : ''
                            }}</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <u-loadmore :status="status" :icon="true" v-if="loading" />
        </view>
    </view>
</template>

<script>
import nxSearch from '@/components/xt-seach/xt-seach'
import { getDeviceItemByGroup, getSubChannelDeviceInfoList } from '@/api/monitor.js'
import { mapGetters } from 'vuex'
import huaban22 from '@/static/heair_22.png'
import huaban24 from '@/static/a-huaban24.png'
export default {
    data() {
        return {
            huaban24,
            huaban22,
            dataList: [],
            status: 'loadmore',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            queryRuleList: [],
            loading: false,
            deviceGroupId: '',
            keyword: undefined,
            id: undefined,
            name: '',
            deviceId: '',
            childrenList: []
        }
    },

    onLoad: function (option) {
        this.deviceGroupId = option.deviceGroupId
        this.name = option.name
        this.getPacketDevice()
        let nums = [5, 10, 20]
        console.log(nums.sort())
    },
    watch: {
        common() {
            this.getPacketDevice()
        }
    },
    methods: {
        rightClick() {
            console.log('rightClick')
        },
        // 返回
        leftClick() {
            if (this.childrenList.length > 0) {
                this.childrenList = []
            } else {
                this.$leftClick()
            }
        },
        // 设备详情
        equipmentDetails(row) {
            if (row.hasChannel) {
                this.deviceId = row.deviceId
                this.name = row.nickName
                this.getSubDeviceInfoList()
            } else {
                this.deviceId = undefined
                this.$jumpPlatform(
                    './video?deviceName=' + row.deviceName + '&channelId=' + row.channelId
                )
            }
        },
        // 获取通道下的设备
        getSubDeviceInfoList() {
            let param = {
                deviceId: this.deviceId
            }
            this.$Axios
                .get(getSubChannelDeviceInfoList, param)
                .then((res) => {
                    this.childrenList = res
                    console.log(res)
                })
                .catch(() => {})
        },
        // 切换开关
        changeSwitch(val) {
            console.log(val)
        },
        // 重置数据
        restData() {
            this.pageNum = 1
            this.pageSize = 10
            this.total = 0
            this.dataList = []
        },
        // 获取分组设备
        getPacketDevice() {
            uni.showLoading({
                title: '正在加载'
            })
            let param = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                deviceGroupId: this.deviceGroupId,
                searchNickName: this.keyword
            }
            this.$Axios
                .post(getDeviceItemByGroup, param)
                .then((res) => {
                    if (this.pageNum == 1) {
                        this.dataList = res.records
                        this.total = Math.ceil(res.total / this.pageSize)
                    } else {
                        this.dataList = [...this.dataList, ...res.records]
                    }
                    this.pageNum += 1
                })
                .catch(() => {})
                .finally(() => {
                    uni.hideLoading()
                    this.loading = false
                })
        },
        // 上拉加载
        scrolltolower(e) {
            if (this.pageNum > this.total) {
                this.status = 'nomore'
            } else {
                this.status = 'loading'
                this.getPacketDevice()
            }
        },
        // 确认搜索
        searchKeyworld(val) {
            this.pageNum = 1
            this.getGroupList()
        }
    },
    components: {
        nxSearch
    },
    computed: {
        ...mapGetters(['common'])
    }
}
</script>

<style lang="scss" scoped>
.flex {
    position: relative;
    flex: 1;
    overflow: auto;
}
.device_main {
    background-color: $uni-bg-color-main;
    display: flex;
    flex-direction: column;
}
.padlr {
    padding: 32upx;
    padding-top: 0;
    box-sizing: border-box;
}
.padlr_bottom {
    // padding-bottom: 140upx;
}
.content_list {
    width: 326upx;
    height: 98px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(18, 24, 53, 0.04);
    border-radius: 12px;
    margin-right: 32upx;
    margin-top: 32upx;
    float: left;
    padding: 32upx;
    box-sizing: border-box;
    .list_image {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.content_list_eq {
    position: relative;
    height: unset;
    overflow: hidden;
    image,
    .images {
        width: 80upx;
        height: 80upx;
    }
    .images {
        background-color: #ddd;
        text-align: center;
        font-size: 28upx;
        color: $uni-color-form;
    }
}
.content_list:nth-child(2n) {
    margin-right: 0;
}
.scroll_one {
    font-size: 28upx;
    color: $uni-color-form;
}
.font12 {
    font-size: 24upx;
    color: $uni-text-color-bo;
}
.mt8 {
    margin-top: 16upx;
}
.mt4 {
    margin-top: 8upx;
}
.loadmore {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-43px);
}
::v-deep {
    .u-loadmore {
        flex: none;
        margin-bottom: 0 !important;
    }
    .padlr_bottom .u-icon__icon {
        font-size: 64upx !important;
        font-weight: 700 !important;
        color: $uni-text-color-bo !important;
    }
}
.group_name {
    font-size: 28upx;
    color: $uni-color-form;
    max-width: 600upx;
    display: flex;
}
.arrow-doem {
    color: $uni-color-form;
}

.home_serch {
    position: relative;
}
.two_space {
    font-size: 24upx;
    margin-top: 8upx;
    color: $uni-text-color-bo;
}
</style>
