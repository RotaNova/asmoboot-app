<template>
    <view class="flex" style="display: flex; flex-direction: column">
        <u-navbar
            :title="hide ? '分组设备' : '分组概览'"
            @rightClick="rightClick"
            @leftClick="leftClick"
            class="mt44"
            style=""
        ></u-navbar>
        <view class="padlr">
            <text v-if="hide" class="group_name">分组名称: {{ deviceTitle }}</text>
            <nxSearch
                v-else
                :selectList="selectList"
                @selectItem="selectItem"
                v-model="value"
                @search="searchKeyworld"
            />
        </view>
        <view class="flex device_main padlr padlr_bottom">
            <scroll-view @scrolltolower="scrolltolower" scroll-y="true" class="flex">
                <view v-if="hide">
                    <view
                        v-for="(item, index) in dataList"
                        :key="item.groupId"
                        class="content_list_eq content_list"
                        @click="equipmentDetails(item)"
                    >
                        <view class="list_image">
                            <image
                                :src="huaban16"
                                mode=""
                                v-if="item.productKey === 'a1wzKjMyfjO'"
                            ></image>
                            <image
                                :src="huaban13"
                                mode=""
                                v-else-if="item.productKey === 'a1orodqZTuM'"
                            ></image>
                            <image
                                :src="huaban14"
                                mode=""
                                v-else-if="item.productKey === 'a1nsnVdJo33'"
                            ></image>
                            <image
                                :src="huaban12"
                                mode=""
                                v-else-if="item.productKey === 'a1WQwsvG33G'"
                            ></image>
                            <image
                                :src="huaban18"
                                mode=""
                                v-else-if="item.productKey === 'a1cTe7qTot4'"
                            ></image>
                            <image
                                :src="huaban15"
                                mode=""
                                v-else-if="item.productKey === 'a19zFeVyN0Q'"
                            ></image>
                            <image
                                :src="huaban11"
                                mode=""
                                v-else-if="item.productKey === 'a1mHuar2roe'"
                            ></image>
                            <image
                                :src="huaban17"
                                mode=""
                                v-else-if="item.productKey === 'a17tqi318di'"
                            ></image>
                            <image
                                :src="huaban14"
                                mode=""
                                v-else-if="item.productKey === 'a1SpiWRQkWR'"
                            ></image>
                            <image
                                :src="huaban25"
                                mode=""
                                v-else-if="item.productKey === 'a1xTtskZvaq'"
                            ></image>
                            <image
                                :src="huaban22"
                                mode=""
                                v-else-if="item.productKey === 'a1VTdGRCDYZ'"
                            ></image>
                            <image
                                :src="huaban19"
                                mode=""
                                v-else-if="item.productKey === 'a1tmyhHTDYT'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a14CVIYYkFM'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a1UKAR1UoJO'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a1vhNoRtqcz'"
                            ></image>
                            <image
                                :src="huaban12"
                                mode=""
                                v-else-if="item.productKey === 'a1YDOlHvcc6'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a1MJZXI3JHm'"
                            ></image>
                            <image
                                :src="huaban22"
                                mode=""
                                v-else-if="item.productKey === 'a1cxf1qyP8X'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a1xOUBqTumA'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a15oOjJn94H'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a12fnQAb44l'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a1dsBwxM0MY'"
                            ></image>
                            <image
                                :src="huaban22"
                                mode=""
                                v-else-if="item.productKey === 'a1Wx5VB2Yu1'"
                            ></image>
                            <view v-else class="images">暂无匹配</view>
                            <view class="posion_reative" v-if="item.obj">
                                <u-switch
                                    :size="18"
                                    activeColor="#20C789"
                                    inactiveColor="#FF4848"
                                    v-model="item.switch"
                                ></u-switch>
                                <view class="reative" @click.stop="changeSwitch(item)"></view>
                            </view>

                            <text class="off-line">{{ item.status == 1 ? '' : '离线' }}</text>
                        </view>
                        <view
                            class="scroll_one over_space mt16"
                            :class="item.status == 1 ? '' : 'corlbo'"
                            >{{ item.nickName ? item.nickName : '' }}</view
                        >
                        <view v-if="item.context">
                            <view class="font12 mt4">{{
                                item.context.propertyName ? item.context.propertyName : ''
                            }}</view>
                            <view class="over_space font12 mt8">
                                <text v-if="item.context.propertyDatatype == 5">{{
                                    item.context.propertyValue ? '开启' : '关闭'
                                }}</text>
                                <text v-else
                                    >{{
                                        item.context.propertyValue
                                            ? item.context.propertyValue
                                            : ''
                                    }}{{
                                        item.context.propertyUnit ? item.context.propertyUnit : ''
                                    }}</text
                                >
                            </view>
                        </view>
                        <view v-else>
                            <view class="font12 mt4">{{
                                item.context ? item.context.propertyName : ''
                            }}</view>
                            <view
                                class="over_space font12 mt8"
                                v-if="item.environmentalParams.length > 0"
                            >
                                <text v-if="item.context.propertyDatatype != 5">
                                    {{ item.context.propertyValue ? item.context.propertyValue : ''
                                    }}{{
                                        item.context.propertyUnit ? item.context.propertyUnit : ''
                                    }}
                                </text>
                                <text v-else>{{
                                    item.context.propertyValue ? '开启' : '关闭'
                                }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-else>
                    <view
                        v-for="(item, index) in dataList"
                        :key="item.groupId"
                        class="content_list"
                        @tap="JumpEquipment(item)"
                    >
                        <view class="scroll_one over_space">{{
                            item.groupName ? item.groupName : ''
                        }}</view>
                        <view class="over_space font12 mt8">{{
                            item.groupDescription ? item.groupDescription : ''
                        }}</view>
                        <view class="font12 mt4">设备数 &nbsp{{ item.count }}</view>
                    </view>
                </view>
            </scroll-view>
            <u-loadmore :status="status" :icon="true" v-if="loading" />
        </view>
    </view>
</template>

<script>
import nxSearch from '@/components/xt-seach/xt-seach'
import { listGroupOverview, listAllEnvironmentalParams, setDevicesProperty } from '@/api/device.js'
import { mapGetters } from 'vuex'
import huaban10 from '@/static/a-huaban10.png'
import huaban11 from '@/static/a-huaban11.png'
import huaban12 from '@/static/a-huaban12.png'
import huaban13 from '@/static/a-huaban13.png'
import huaban14 from '@/static/a-huaban14.png'
import huaban15 from '@/static/a-huaban15.png'
import huaban16 from '@/static/a-huaban16.png'
import huaban17 from '@/static/a-huaban17.png'
import huaban18 from '@/static/a-huaban18.png'
import huaban19 from '@/static/a-huaban19.png'
import huaban22 from '@/static/a-huaban22.png'
import huaban24 from '@/static/a-huaban24.png'
import huaban25 from '@/static/a-huaban25.png'
export default {
    data() {
        return {
            huaban10,
            huaban11,
            huaban12,
            huaban13,
            huaban14,
            huaban15,
            huaban16,
            huaban17,
            huaban18,
            huaban19,
            huaban22,
            huaban24,
            huaban25,
            selectList: [
                {
                    id: 1,
                    name: '分组名称'
                },
                {
                    id: 2,
                    name: '上级分组'
                }
            ],
            value: '',
            dataList: [],
            condition: 0,
            isShowLoadMore: false,
            status: 'loadmore',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            queryRuleList: [],
            loading: false,
            hide: false,
            deviceGroupId: '',
            valSwitch: false,
            deviceTitle: '',
            deviceId: undefined
        }
    },
    mounted() {
        this.getGroupList()
    },
    watch: {
        common() {
            if (this.hide) {
                this.restData()
                this.getPacketDevice()
            }
        },
        deviceIdentify(val) {
            if (val.deviceId == this.deviceId) {
                this.dataList.forEach((item) => {
                    if (val.deviceId == item.deviceId) {
                        item.switch = val.value ? true : false
                        item.environmentalParams[0].propertyValue = val.value
                        this.$forceUpdate()
                    }
                })
            }
        }
    },
    methods: {
        rightClick() {
            console.log('rightClick')
        },
        // 跳转
        leftClick() {
            if (this.hide) {
                this.hide = false
                this.restData()
                this.getGroupList()
            } else {
                this.$leftClick()
            }
        },
        // 设备详情
        equipmentDetails(row) {
            let form = JSON.stringify(row).replace(/%/g, '%25')
            this.$jumpPlatform('./packetEquipment?form=' + encodeURIComponent(form))
        },
        // 切换开关
        changeSwitch(val) {
            uni.showLoading({
                title: '指令发送中'
            })
            this.deviceId = val.deviceId
            let param = {
                deviceId: val.deviceId,
                propertyList: [
                    {
                        attr: val.environmentalParams[0].propertyIdentifier,
                        value: val.environmentalParams[0].propertyValue ? 0 : 1
                    }
                ]
            }
            this.$Axios
                .post(setDevicesProperty, param)
                .then((res) => {})
                .catch(() => {})
                .finally(() => {
                    uni.hideLoading()
                })
        },
        // 重置数据
        restData() {
            this.pageNum = 1
            this.pageSize = 10
            this.total = 0
            this.dataList = []
        },
        // 跳转分组设备页
        JumpEquipment(row) {
            this.deviceTitle = row.groupName
            this.hide = true
            this.deviceGroupId = row.groupId
            this.restData()
            this.getPacketDevice()
        },
        // 获取分组设备
        getPacketDevice() {
            uni.showLoading({
                title: '正在加载'
            })
            let param = {
                deviceGroupId: this.deviceGroupId,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            this.$Axios
                .post(listAllEnvironmentalParams, param)
                .then((res) => {
                    // console.log(res, '数据')
                    res.records.forEach((item) => {
                        if (item.environmentalParams.length > 0) {
                            let obj = item.environmentalParams.find(
                                (data) => data.propertyDatatype == 5 && data.propertyRwflag == 1
                            )
                            let context = item.environmentalParams.find((data) => data != obj)
                            if (obj) {
                                item.obj = obj
                                item.switch = obj.propertyValue ? true : false
                            } else {
                                item.obj = false
                                item.switch = false
                            }
                            item.context = context
                        } else {
                        }
                    })
                    if (this.pageNum == 1) {
                        this.dataList = res.records
                        this.total = Math.ceil(res.total / this.pageSize)
                    } else {
                        this.dataList = [...this.dataList, ...res.records]
                    }
                    this.pageNum++
                    console.log(this.dataList, 'this.dataList')
                })
                .catch((res) => {})
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
                if (this.hide) {
                    this.getPacketDevice()
                } else {
                    this.getGroupList()
                }
            }
        },
        // 确认搜索
        searchKeyworld(val) {
            let queryRuleList = []
            if (!val) {
                this.queryRuleList = []
            } else {
                if (this.condition) {
                    queryRuleList = [{ rule: 'like', filed: 'groupDescription', value: this.value }]
                } else {
                    queryRuleList = [{ rule: 'like', filed: 'groupName', value: this.value }]
                }
            }
            this.pageNum = 1
            this.queryRuleList = queryRuleList
            this.getGroupList()
        },
        // 选择搜索条件
        selectItem(index) {
            this.condition = index
        },
        // 获取分组数据
        getGroupList(arr) {
            // #ifdef APP-PLUS
            const app = uni.getSystemInfo()
            const address = uni.getSystemInfo({
                key: 'serveAdress'
            })
            // const address = uni.removeStorage({
            //     key: 'serveAdress'
            // })
            console.log(app, 'mos1')
            uni.request({
                url: address, //仅为示例，并非真实接口地址。
                data: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    queryRuleList: this.queryRuleList,
                    searchCode: 'device_group_overview_search'
                },
                method: 'POST',
                header: {
                    token: uni.getStorageSync('token') //自定义请求头信息
                },
                success: (res) => {
                    console.log(res.data)
                },
                fail: (res) => {
                    console.log(res, '失败')
                }
            })
            // #endif
            uni.showLoading({
                title: '正在加载'
            })
            this.status = 'loading'
            this.loading = true
            let param = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                queryRuleList: this.queryRuleList,
                searchCode: 'device_group_overview_search'
            }
            this.$Axios
                .post(listGroupOverview, param)
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
        }
    },
    components: {
        nxSearch
    },
    computed: {
        ...mapGetters(['common', 'deviceIdentify'])
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
    padding-bottom: 140upx;
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
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.content_list_eq {
    // height: unset;
    height: 302upx;
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
.corlbo {
    color: $uni-text-color-bo !important;
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
}
.group_name {
    font-size: 28upx;
    color: $uni-color-form;
}
.posion_reative {
    position: relative;
    .reative {
        position: absolute;
        right: 0;
        top: 0;
        width: 76upx;
        height: 40upx;
    }
}
.off-line {
    position: absolute;
    left: 90upx;
    top: 0px;
    color: $uni-text-color-bo;
    font-size: 24upx;
}
</style>
