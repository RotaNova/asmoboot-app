<template>
    <view class="view_con">
        <u-navbar title="设置" @leftClick="$leftClick" class="mt44"></u-navbar>
        <view class="view_main">
            <view class="list_main">
                <view class="list_content" @tap="$jumpPlatform('./accountsSecurity')">
                    <text>账户与安全</text>
                    <u-icon name="arrow-right" class="ico_right"></u-icon>
                </view>
                <view class="list_content" @tap="$jumpPlatform('./singaporeAirlines')">
                    <text>关于新航物联网平台</text>
                    <u-icon name="arrow-right" class="ico_right"></u-icon>
                </view>
            </view>
            <button class="button_btn out_login mt24" @click="OutLogin">退出登录</button>
        </view>
    </view>
</template>

<script>
import { logout } from '../../api/homePage.js'
export default {
    data() {
        return {
            key: '',
            phone: '',
            email: ''
        }
    },
    onLoad: function (option) {
        this.phone = option.phone
        this.email = option.email
    },
    methods: {
        // 退出登录
        OutLogin() {
            this.$Axios.post(logout).then((res) => {
                this.$store.commit('SET_logout')
                uni.reLaunch({
                    url: '../index/index'
                })
            })
        },
        // 手机找回
        mobilePhoneBack() {
            if (!this.phone) return this.$showToast('error', '手机号未绑定')
            this.$jumpPlatform('./phoneRetrieval?id=1&name=' + this.phone)
        },
        // 邮箱找回
        emailBack() {
            if (!this.email || this.email != 'null') return this.$showToast('error', '邮箱未绑定')
            this.$jumpPlatform('./phoneRetrieval?id=2&name=' + this.email)
        }
    }
}
</script>

<style lang="scss" scoped>
.out_login {
    background-color: $uni-bg-color;
    color: $uni-color-skred;
}
::v-deep {
    uni-button:after {
        border: 0;
    }
}
</style>
