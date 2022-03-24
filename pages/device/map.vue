<template>
    <view>
        <view class="view_con">
            <u-navbar
                title=""
                @rightClick="rightClick"
                @leftClick="getBack"
                class="mt44"
            ></u-navbar>
            <u-tabs
                class="tabs_list"
                :list="tabList"
                lineWidth="30"
                lineColor="#2A5FF8"
                :activeStyle="{
                    color: '#121835',
                    fontWeight: 'bold',

                    fontSize: '18px'
                }"
                :inactiveStyle="{
                    color: '#B0B3BD',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }"
                @change="changeTabs"
            ></u-tabs>
            <view v-if="tabValue == 2">
                <view class="over_space" @tap="show = true">
                    {{ stateType.find((item) => item.id == infoType).name }}
                    <u-icon name="arrow-down-fill" class="arrow-doem"></u-icon>
                </view>
            </view>
            <view class="view_con_content">
                <updateDevice v-if="tabValue == 1" />
                <parameter v-else-if="tabValue == 0" :form="form" :deviceId="deviceId" />
                <dynamicState v-else :infoType="infoType" ref="dynamic" />
                <view class="input_issue" v-if="infoType == 5 && tabValue == 2">
                    <input
                        type="text"
                        placeholder="输入评论内容"
                        class="input_class"
                        v-model="content"
                        style="height: 64upx; flex: 1"
                    />
                    <view class="new_issue" @click="saveIssue">发布</view>
                </view>
            </view>
        </view>
        <u-action-sheet
            :actions="stateType"
            @select="selectClick"
            :closeOnClickOverlay="true"
            :closeOnClickAction="true"
            :show="show"
            cancelText="取消"
            @close="show = false"
            style="color: #007aff"
        ></u-action-sheet>
    </view>
</template>

<script>
import { commentDevice } from '@/api/device.js'
import updateDevice from './updateDevice'
import parameter from './parameter'
import dynamicState from './dynamicState'
export default {
    data() {
        return {
            tabList: [
                {
                    name: '参数'
                },
                {
                    name: '编辑'
                },
                {
                    name: '动态'
                }
            ],
            stateType: [
                {
                    name: '上下线日志',
                    id: 1
                },
                {
                    name: '设备状态变更',
                    id: 2
                },
                {
                    name: '设备操作日志',
                    id: 3
                },
                {
                    name: '故障报警',
                    id: 4
                },
                {
                    name: '评论',
                    id: 5
                }
            ],
            tabValue: undefined,
            show: false,
            infoType: 1,
            form: {},
            productKey: undefined,
            deviceId: undefined,
            content: ''
        }
    },
    onLoad: function (option) {
        this.form = JSON.parse(decodeURIComponent(option.form))
        this.deviceId = this.form.deviceId
        this.productKey = option.productKey
        this.tabValue = 0
    },
    methods: {
        rightClick() {
            console.log('rightClick')
        },
        // 提交发布
        saveIssue() {
            if (!this.content)
                return this.$refs.uToast.show({
                    message: '发布内容不能为空',
                    type: 'error'
                })
            uni.showLoading({
                title: '加载中'
            })
            let param = {
                deviceId: this.deviceId,
                content: this.content
            }
            this.$Axios
                .post(commentDevice, param)
                .then((res) => {
                    this.content = ''
                    this.$refs.dynamic.pageNum = 1
                    this.$refs.dynamic.getDynamicInfoPage()
                    this.$refs.uToast.show({
                        message: '发布成功',
                        type: 'success'
                    })
                })
                .catch(() => {})
                .finally(() => {
                    uni.hideLoading()
                })
        },
        // 返回
        getBack() {
            this.$store.commit('SET_COMMON')
            this.$leftClick()
        },
        // tab栏切换
        changeTabs(item) {
            this.tabValue = item.index
        },
        // 选择下拉
        selectClick(e) {
            this.name = e.name
            if (this.infoType != e.id) {
                this.infoType = e.id
                this.$refs.dynamic.id = e.id
            }
        }
    },
    components: {
        updateDevice,
        parameter,
        dynamicState
    }
}
</script>

<style lang="scss" scoped>
::v-deep {
    .u-tabs__wrapper__nav__item {
        flex: none;
    }
}
.tabs_list {
    position: absolute;
    top: 43px;
    left: 50%;
    transform: translateX(-90px);
}
.over_space {
    display: flex;
    align-items: center;
    padding: 32upx;
    box-sizing: border-box;
    font-size: 28upx;
    color: $uni-color-form;
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 4px 8px rgba(18, 24, 53, 0.04);
}
.view_con_content {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.input_issue {
    display: flex;
    justify-content: space-between;
    padding: 32upx;
    box-sizing: border-box;
}
.new_issue {
    width: 64px;
    height: 32px;
    background: rgb(42, 95, 248);
    border-radius: 8px;
    text-align: center;
    line-height: 64upx;
    margin-left: 16upx;
    color: #ffffff;
    font-size: 28upx;
}
</style>
