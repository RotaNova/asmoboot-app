<template>
    <view>
        <view class="view_con">
            <u-navbar
                title="添加设备"
                @rightClick="rightClick"
                @leftClick="$leftClick"
                class="mt44"
            ></u-navbar>
            <view class="view_main contend" style="background-color: #fff">
                <view>
                    <view>
                        <text class="significance">*</text>
                        <text class="zhiname">设备名称</text>
                        <view
                            ><input
                                type="text"
                                v-model="form.nickName"
                                class="input_class mt8"
                                placeholder="输入设备名称"
                        /></view>
                    </view>
                    <view class="mt16">
                        <text class="significance">*</text>
                        <text class="zhiname">设备编码</text>
                        <view
                            ><input
                                type="text"
                                v-model="form.deviceName"
                                class="input_class mt8"
                                placeholder="输入设备编码"
                        /></view>
                    </view>
                    <view class="mt16">
                        <text class="significance">*</text>
                        <text class="zhiname">设备序号</text>
                        <view
                            ><input
                                type="text"
                                v-model="form.deviceCode"
                                class="input_class mt8"
                                placeholder="输入设备序号"
                        /></view>
                    </view>
                    <view class="mt16">
                        <text class="zhiname">验证码/加密码</text>
                        <view
                            ><input
                                type="text"
                                v-model="form.devicePassd"
                                class="input_class mt8"
                                placeholder="输入验证码/加密码"
                        /></view>
                    </view>
                    <view class="mt16" @click="$jumpPlatform('./latitudeLongitude')">
                        <text class="zhiname">设备经纬度</text>
                        <view class="input_class mt8 longitude" :class="arae ? '' : 'colorion'">
                            <text>{{ arae ? arae : '请选择' }}</text>
                            <u-icon name="arrow-right" class="ico_right"></u-icon>
                        </view>
                    </view>
                    <pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
                        <view class="mt16">
                            <text class="zhiname">设备省市区/县</text>
                            <view class="input_class mt8 longitude colorion">
                                <text :class="address ? 'color_from' : ''">{{
                                    address ? address : '请选择'
                                }}</text>
                                <u-icon name="arrow-right" class="ico_right"></u-icon>
                            </view>
                        </view>
                    </pick-regions>
                    <view class="mt16">
                        <text class="zhiname">设备详细地址</text>
                        <view
                            ><input
                                type="text"
                                v-model="form.addressDetail"
                                class="input_class mt8"
                                placeholder="输入设备详细地址"
                        /></view>
                    </view>
                    <view class="mt16">
                        <text class="zhiname">负责人</text>
                        <view
                            ><input
                                type="text"
                                v-model="form.manager"
                                class="input_class mt8"
                                placeholder="输入负责人"
                        /></view>
                    </view>
                    <view class="mt16">
                        <text class="zhiname">联系方式</text>
                        <view
                            ><input
                                type="text"
                                v-model="form.contactInfo"
                                class="input_class mt8"
                                placeholder="输入联系方式"
                        /></view>
                    </view>
                    <view class="mt16">
                        <text class="zhiname">备注</text>
                        <view>
                            <textarea
                                type="text"
                                v-model="form.remark"
                                class="input_class mt8 textarea_input"
                                placeholder="输入备注"
                            />
                        </view>
                    </view>
                    <view class="mt16 dis_flex_bew">
                        <view class="but_cen" @click="rest()">取消</view>
                        <view class="ml16 but_cen" @click="confirm">确定</view>
                    </view>
                </view>
            </view>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { addDevice } from '@/api/device.js'
import pickRegions from '@/components/pick-regions/pick-regions.vue'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            form: {},
            region: [],
            defaultRegionCode: ['440113'],
            productkey: undefined,
            address: undefined,
            arae: undefined
        }
    },
    onLoad: function (option) {
        this.productkey = option.productKey
        this.rest()
    },
    watch: {
        longitude() {
            this.form.latitude = this.latitude
            this.form.longitude = this.longitude
            this.arae = this.longitude + ',' + this.latitude
        },
        latitude() {
            this.arae = this.longitude + ',' + this.latitude
        }
    },
    methods: {
        rightClick() {
            console.log('rightClick')
        },
        uToastError(txt) {
            return this.$refs.uToast.show({
                message: txt,
                type: 'error'
            })
        },
        // 添加设备
        confirm() {
            if (!this.form.nickName) return this.uToastError('设备名称不能为空')
            if (!this.form.deviceName) return this.uToastError('设备编码不能为空')
            if (!this.form.deviceCode) return this.uToastError('设备序号不能为空')
            uni.showLoading({
                title: '加载中'
            })
            if (this.region.length > 0) {
                this.form.addressProvince = this.region[0].code
                this.form.addressCity = this.region[1].code
                this.form.addressDistrict = this.region[2].code
            }
            this.form.productkey = this.productkey
            this.$Axios
                .post(addDevice, this.form)
                .then((res) => {
                    this.$store.commit('SET_COMMON')
                    this.$leftClick()
                })
                .catch(() => {})
                .finally(() => {
                    uni.hideLoading()
                })
        },
        // 获取地址
        handleGetRegion(region) {
            this.region = region
            this.address = region.map((item) => item.name).join(' ')
        },
        // 重置属性
        rest() {
            this.form = {
                nickName: undefined, // 设备名称
                deviceName: undefined, // 设备编码
                deviceCode: undefined, // 设备序号
                latitude: undefined, // 纬度
                longitude: undefined, // 经度
                devicePassd: undefined, // 验证码/加密码
                addressDetail: undefined, // 详细地址
                manager: undefined, // 负责人
                contactInfo: undefined, // 联系方式
                remark: undefined,
                productkey: this.productkey
            }
        }
    },

    components: { pickRegions },
    computed: {
        ...mapGetters(['longitude', 'latitude'])
    }
}
</script>

<style lang="scss" scoped>
.per_disflex {
    display: flex;
    margin-left: 20upx;
}
::v-deep {
    .u-popup {
        flex: none;
    }
}
.overesail {
    max-width: 400upx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.significance {
    color: $uni-color-skred;
    font-weight: 700;
}
.zhiname {
    font-size: 32upx;
    font-weight: 700;
    color: $uni-color-form;
}
.mt8 {
    margin-top: 16upx;
}
.textarea_input {
    height: 240upx;
    padding: 28upx 32upx;
    box-sizing: border-box;
}
::v-deep {
    uni-textarea {
        width: 100%;
        font-size: 28upx;
    }
}
.contend {
    overflow: auto;
}
.dis_flex_bew {
    display: flex;
    justify-content: space-between;
    .but_cen {
        height: 48px;
        background: rgba(245, 246, 248, 0.39);
        border-radius: 12px;
        text-align: center;
        line-height: 96upx;
        color: $uni-color-form;
        flex: 1;
    }
    .but_cen:nth-child(2) {
        background-color: $uni-color-btn;
        color: $uni-bg-color;
    }
}
.longitude {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
}
.colorion {
    color: $uni-text-color-bo;
}
.color_from {
    color: $uni-color-form;
}
</style>
