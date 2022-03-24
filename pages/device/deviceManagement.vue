<template>
    <view style="height: 100vh; display: flex; flex-direction: column">
        <view class="mt44 home_serch">
            <u-navbar
                title="设备管理"
                @rightClick="rightClick"
                @leftClick="$leftClick"
                style=""
            ></u-navbar>
            <view class="add-decive" @click="addDecive">添加设备</view>
        </view>
        <view class="padlr">
            <u-search
                placeholder="输入设备名称"
                v-model="keyword"
                clearabled
                @search="searchKeyworld"
                :showAction="false"
            ></u-search>
            <view class="group_name mt16 over_space" @tap="$leftClick">
                {{ name }}
                <u-icon name="arrow-down-fill" class="arrow-doem"></u-icon>
            </view>
        </view>
        <view class="flex device_main padlr padlr_bottom">
            <scroll-view
                @scrolltolower="scrolltolower"
                scroll-y="true"
                class="flex"
                @click="id = ''"
            >
                <view
                    v-for="(item, index) in dataList"
                    :key="item.groupId"
                    class="content_list_eq content_list"
                    @longpress.stop="logoTime(item)"
                >
                    <view @click="equipmentDetails(item)">
                        <view class="list_image">
                            <image
                                :src="huaban16"
                                mode=""
                                v-if="productKey === 'a1wzKjMyfjO'"
                            ></image>
                            <image
                                :src="huaban13"
                                mode=""
                                v-else-if="productKey === 'a1orodqZTuM'"
                            ></image>
                            <image
                                :src="huaban19"
                                mode=""
                                v-else-if="productKey === 'a1nsnVdJo33'"
                            ></image>
                            <image
                                :src="huaban12"
                                mode=""
                                v-else-if="productKey === 'a1WQwsvG33G'"
                            ></image>
                            <image
                                :src="huaban18"
                                mode=""
                                v-else-if="productKey === 'a1cTe7qTot4'"
                            ></image>
                            <image
                                :src="huaban15"
                                mode=""
                                v-else-if="productKey === 'a19zFeVyN0Q'"
                            ></image>
                            <image
                                :src="huaban11"
                                mode=""
                                v-else-if="productKey === 'a1mHuar2roe'"
                            ></image>
                            <image
                                :src="huaban17"
                                mode=""
                                v-else-if="productKey === 'a17tqi318di'"
                            ></image>
                            <image
                                :src="huaban14"
                                mode=""
                                v-else-if="item.productKey === 'a1SpiWRQkWR'"
                            ></image>
                            <image
                                :src="huaban24"
                                mode=""
                                v-else-if="item.productKey === 'a1xTtskZvaq'"
                            ></image>
                            <image
                                :src="huaban22"
                                mode=""
                                v-else-if="item.productKey === 'a1VTdGRCDYZ'"
                            ></image>
                            <view v-else class="images">暂无匹配</view>
                            <view class="posion_reative" v-if="item.action.length > 0">
                                <u-switch
                                    :size="18"
                                    activeColor="#20C789"
                                    inactiveColor="#FF4848"
                                    v-model="item.switch"
                                ></u-switch>
                                <view class="reative" @click.stop="changeSwitch(item)"></view>
                            </view>
                            <text class="off-line">{{ item.deviceStatus == 1 ? '' : '离线' }}</text>
                        </view>
                        <view
                            class="scroll_one over_space mt16"
                            :class="item.deviceStatus == 1 ? '' : 'corlbo'"
                            >{{ item.nickName ? item.nickName : '' }}</view
                        >
                        <view class="font12 mt4">{{ item.bol.name ? item.bol.name : '' }}</view>
                        <view class="over_space font12 mt8"
                            >{{ item.bol.value ? item.bol.value : ''
                            }}{{ item.action[0] ? item.action[0].propertyUnit : '' }}</view
                        >
                    </view>

                    <view
                        class="content_list_abs"
                        v-if="id == item.deviceId"
                        @click.stop="openRemove(item)"
                    >
                        <view class="delete_abs"><image :src="delete_25" mode=""></image></view>
                    </view>
                </view>
            </scroll-view>
            <u-loadmore :status="status" :icon="true" v-if="loading" />
        </view>
        <u-modal :show="show" :showConfirmButton="false" @close="show = false" closeOnClickOverlay>
            <view style="width: 100%">
                <view class="delete-device">删除设备</view>
                <view class="delete-content">删除后将无法恢复，是否删除该设备</view>
                <view class="delete-but">
                    <text class="but" @click="removeEquipment()">删除</text>
                    <text class="but ml16" @tap="show = false">取消</text>
                </view>
            </view>
        </u-modal>
    </view>
</template>

<script>
import nxSearch from '@/components/xt-seach/xt-seach'
import { getDeviceList, deleteDevice, setDevicesProperty } from '@/api/device.js'
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
import delete_25 from '@/static/delete_25.png'
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
            delete_25,
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
            dataList: [],
            condition: 0,
            isShowLoadMore: false,
            status: 'loadmore',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            queryRuleList: [],
            loading: false,
            deviceGroupId: '',
            keyword: '',
            productKey: undefined,
            name: '',
            id: '',
            show: false,
            deviceId: ''
        }
    },

    onLoad: function (option) {
        this.productKey = option.productKey
        this.name = option.name
        this.getPacketDevice()
    },
    watch: {
        common() {
            this.pageNum = 1
            this.getPacketDevice()
        },
        deviceIdentify(val) {
            if (val.deviceId == this.deviceId) {
                this.dataList.forEach((item) => {
                    if (val.deviceId == item.deviceId) {
                        item.switch = val.value ? true : false
                        item.action[0].value = val.value
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
        // 打开添加设备
        addDecive() {
            this.$jumpPlatform('./addDevice?productKey=' + this.productKey)
        },
        // 打开删除设备
        openRemove(item) {
            this.deviceId = item.deviceId
            this.show = true
        },
        // 删除设备
        removeEquipment() {
            let arr = [this.deviceId]
            this.$Axios
                .post(deleteDevice, arr)
                .then((res) => {
                    this.restData()
                    this.getPacketDevice()
                })
                .catch(() => {})
                .finally(() => {
                    this.show = false
                })
        },
        // 长按事件
        logoTime(row) {
            this.id = row.deviceId
        },
        // 设备详情
        equipmentDetails(row) {
            this.deviceId = row.deviceId
            let form = JSON.stringify(row).replace(/%/g, '%25')
            this.$store.commit('SET_DEVICE_ID', row.deviceId)
            this.$jumpPlatform(
                './map?form=' + encodeURIComponent(form) + '&productKey=' + this.productKey
            )
        },
        // 切换开关
        changeSwitch(val) {
            this.deviceId = val.deviceId
            uni.showLoading({
                title: '指令发送中'
            })
            let param = {
                deviceId: val.deviceId,
                propertyList: [
                    {
                        attr: val.action[0].attr,
                        value: val.action[0].value == 1 ? 0 : 1
                    }
                ]
            }
            this.$Axios
                .post(setDevicesProperty, param)
                .then((res) => {})
                .catch(() => {})
                .finally(() => {
                    this.show = false
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
        dataMerge(arr, obj) {
            arr.forEach((item, index) => {
                item.value = obj[item.identifier]
            })
        },
        // 获取分组设备
        getPacketDevice() {
            uni.showLoading({
                title: '正在加载'
            })
            let param = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                productKey: this.productKey,
                searchCode: 'basic_device_manager_search',
                queryRuleList: this.queryRuleList
            }
            this.$Axios
                .post(getDeviceList, param)
                .then((res) => {
                    res.records.forEach((item) => {
                        item.bol = {}
                        if (item.paramConfig && item.paramConfig.properties.length > 0) {
                            this.dataMerge(item.paramConfig.properties, item.paramConfig.valueList)
                            if (item.action.length > 0) {
                                let bol = item.paramConfig.properties.find(
                                    (data) => data.identifier != item.action[0].attr
                                )
                                if (bol.dataType == 'BOOL') {
                                    if (bol.value || bol.value == 0) {
                                        bol.value = bol.dataSpecsList.find(
                                            (data) => data.value == bol.value
                                        ).name
                                    }
                                }
                                item.bol = bol
                            } else {
                                let bol = item.paramConfig.properties[0]
                                item.bol = bol
                            }
                        }
                        if (item.action.length > 0 && item.action[0].value == 1) {
                            item.switch = true
                        } else {
                            item.switch = false
                        }
                    })
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
            let queryRuleList = []
            if (!val) {
                this.queryRuleList = []
            } else {
                queryRuleList = [{ rule: 'like', filed: 'nick_name', value: this.keyword }]
            }
            this.pageNum = 1
            this.queryRuleList = queryRuleList
            this.getGroupList()
        },
        // 选择搜索条件
        selectItem(index) {
            this.condition = index
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
        position: relative;
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
.posion_reative {
    position: relative;
    .reative {
        position: absolute;
        right: 0;
        top: 0;
        width: 104upx;
        height: 54upx;
    }
}
.content_list_abs {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0px 4px 8px rgba(18, 24, 53, 0.04);
    display: flex;
    justify-content: center;
    align-items: center;
}
.delete_abs {
    width: 96upx;
    height: 96upx;
    background-color: $uni-bg-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
        width: 48upx;
        height: 48upx;
    }
}
.delete-content {
    text-align: center;
    margin-top: 48upx;
    color: $uni-color-skred;
}
.delete-device {
    font-size: 40upx;
    color: #000;
}
.delete-but {
    margin-top: 80upx;
    display: flex;
    justify-content: space-between;
    .but {
        flex: 1;
        height: 96upx;
        line-height: 96upx;
        text-align: center;
        background-color: $uni-color-skred;
        border-radius: 12px;
        color: $uni-text-color-inverse;
        font-size: 28upx;
    }
    .but:nth-child(2) {
        background-color: #f5f6f8;
        color: $uni-color-form;
    }
}
::v-deep {
    .u-popup {
        flex: none;
    }
}
.home_serch {
    position: relative;
}
.add-decive {
    font-size: 28upx;
    color: $uni-color-btn;
    position: absolute;
    right: 32upx;
    top: 28upx;
    font-weight: 400;
}
.off-line {
    position: absolute;
    left: 90upx;
    top: 0px;
    color: $uni-text-color-bo;
    font-size: 24upx;
}
.corlbo {
    color: $uni-text-color-bo !important;
}
</style>
