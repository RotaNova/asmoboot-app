<template>
    <view class="content">
        <h2>您好，</h2>
        <p class="font12 mt10">
            <text>今天是{{ this.today || '星期一' }}</text>
            <text class="welcome">，欢迎来到新航物联网平台。</text>
        </p>
        <view class="password_area" v-if="!tabLogin">
            <input type="number" placeholder="请输入手机号" class="input_class" v-model="phone" />
            <view class="mt10 posireave">
                <input
                    type="number"
                    placeholder="请输入验证码"
                    class="input_class verification_code"
                    v-model="code"
                />
                <text class="auth_code" @click="getCode" v-if="gCode == 60">获取验证码</text>
                <text class="auth_code" v-else>{{ gCode }}秒后重新获取</text>
            </view>
        </view>
        <view class="password_area" v-else>
            <input type="text" placeholder="请输入账户" class="input_class" v-model="userName" />
            <input
                type="text"
                placeholder="请输入密码"
                class="input_class mt16"
                password
                v-model="password"
            />
            <view class="platform_set">
                <text @click="$jumpPlatform('../login/platformSet')">平台设置</text>
                <text @click="$jumpPlatform('../login/retrievePas')">忘记密码</text>
            </view>
        </view>
        <view class="but"><button class="button_btn" @click="toLogin">登录</button></view>
        <view class="read_agreement mt16" v-if="tabLogin">
            <u-checkbox-group @change="checkChange"
                ><u-checkbox v-model="remember" shape="circle" name="true"></u-checkbox
            ></u-checkbox-group>
            <text class="welcome">记住密码</text>
        </view>
        <view class="read_agreement mt10">
            <u-checkbox-group @change="checkChange"
                ><u-checkbox v-model="checked" shape="circle" name="true"></u-checkbox
            ></u-checkbox-group>
            <text class="welcome">我已阅读并同意</text>
            <text class="serve" @tap="$jumpPlatform('../login/serveAgreen')">《服务协议》</text>
        </view>
        <view class="Switch_login">
            <image
                :src="tabLogin ? '../../static/handset.png' : '../../static/password.png'"
                mode=""
            ></image>
            <text @click="tabLogin = !tabLogin">{{
                tabLogin ? '手机短信登录' : '账号密码登录'
            }}</text>
        </view>
    </view>
</template>

<script>
import {
    passWordLogin,
    phoneLogin,
    sendLoginPhoneVerificationCode,
    getBindInfo
} from '../../api/login.js'
export default {
    data() {
        return {
            today: '',
            phone: '',
            tips: '',
            value: '',
            checkbox: false,
            checked: [],
            tabLogin: true,
            gCode: 60,
            timer: null,
            userName: '', // 用户名
            password: '', // 密码
            code: '',
            remember: true,
            tolo: false,
            serveAdress: undefined
        }
    },
    onLoad() {
        this.userName = uni.getStorageSync('userName')
        this.password = uni.getStorageSync('password')
        let that = this
        // #ifndef H5
        // const serveAdress = plus.storage.getItem('serveAdress')
        // console.log(serveAdress, '是是')
        // #endif
        uni.getStorage({
            key: 'serveAdress',
            success: function (res) {
                let data = JSON.parse(res.data)
                console.log(data, 'data')
                if (data) {
                    that.getsavedPassword()
                } else {
                    that.$jumpPlatform('../login/platformSet')
                }
                uni.setStorageSync('baseurl', data)
                that.serveAdress = data
            },
            fail: (e) => {
                console.log(e, 'data')
            }
        })
        this.today = this.getCurrentDate()
    },
    watch: {
        gCode(val) {
            if (val == 0) {
                clearInterval(this.timer)
                this.gCode = 60
            }
        }
    },
    methods: {
        getCurrentDate() {
            let myDate = new Date()
            // let year = myDate.getFullYear() //年
            // let month = myDate.getMonth() + 1 //月
            // let day = myDate.getDate() //日
            let days = myDate.getDay()
            switch (days) {
                case 1:
                    days = '星期一'
                    break
                case 2:
                    days = '星期二'
                    break
                case 3:
                    days = '星期三'
                    break
                case 4:
                    days = '星期四'
                    break
                case 5:
                    days = '星期五'
                    break
                case 6:
                    days = '星期六'
                    break
                case 0:
                    days = '星期日'
                    break
            }
            let str = days
            return str
        },
        // 获取
        getStorageAsync() {
            let that = this
            plus.storage.getItemAsync(
                'serveAdress',
                function (e) {
                    let data = JSON.parse(res.data)
                    console.log(data, 'data')
                    if (data) {
                        that.getsavedPassword()
                    } else {
                        that.$jumpPlatform('../login/platformSet')
                    }
                    uni.setStorageSync('baseurl', data)
                    that.serveAdress = data
                },
                function (e) {
                    console.log(e, 'data')
                }
            )
        },
        // 初始获取账户密码
        getsavedPassword() {
            let that = this
            uni.getStorage({
                key: 'uerInfo',
                success: function (res) {
                    let data = JSON.parse(res.data)
                    if (data.userAccountName && data.userPassword) {
                        that.userName = data.userAccountName
                        that.password = data.userPassword
                        let parm = {
                            userAccountName: data.userAccountName,
                            userPassword: data.userPassword
                        }
                        that.passwordLogin(parm)
                    }
                }
            })
        },
        // 记住密码
        rememberPwasworld() {
            uni.setStorageSync('userName', this.userName)
            uni.setStorageSync('password', this.password)
        },

        // 切换的方法
        checkChange(e) {
            this.checked = e
        },
        // 登录的方法
        toLogin() {
            if (this.tolo) return
            if (this.checked.length == 0) return this.$showToast('error', '请勾选服务协议')
            if (this.tabLogin) {
                if (!this.userName) return this.$showToast('error', '用户名不能为空')
                if (!this.password) return this.$showToast('error', '密码不能为空')
                if (!this.serveAdress)
                    return this.$showToast('error', '请先在平台设置页面填写服务器地址')
                this.tolo = true
                this.rememberPwasworld()
                let parm = {
                    userAccountName: this.userName,
                    userPassword: this.password
                }
                this.passwordLogin(parm)
            } else {
                if (!this.phone) return this.$showToast('error', '手机号不能为空')
                if (!this.code) return this.$showToast('error', '验证码不能为空')
                if (!this.serveAdress)
                    return this.$showToast('error', '请先在平台设置页面填写服务器地址')
                this.tolo = true
                let parm = {
                    phone: this.phone,
                    verificationCode: this.code
                }
                this.rememberPwasworld()
                this.phoneLoginTo(parm)
            }
        },
        // 手机号登录
        phoneLoginTo(parm) {
            uni.showLoading({
                title: '加载中'
            })
            setTimeout(() => {
                if (this.tolo) {
                    uni.hideLoading()
                    this.tolo = false
                }
            }, 2000)
            this.$Axios
                .post(phoneLogin, parm)
                .then((res) => {
                    this.$redirectTo('../homePage/index')
                    this.$store.commit('SET_LOGIN', res)
                    this.$store.commit('SET_ACCOUNT', parm)
                })
                .catch((err) => {
                    uni.hideLoading()
                    this.tolo = false
                })
                .finally(() => {
                    this.tolo = false
                })
        },
        // 账户密码登录
        passwordLogin(parm) {
            // debugger
            uni.showLoading({
                title: '加载中'
            })
            console.log(2111222)
            setTimeout(() => {
                if (this.tolo) {
                    uni.hideLoading()
                    this.tolo = false
                }
            }, 2000)
            let flag = false // 标志位判断是否进过promise
            this.$Axios
                .post(passWordLogin, parm)
                .then((res) => {
                    flag = true // 成功
                    if (res.secondaryVerification) {
                        this.$store.commit('SET_USERNAME', this.userName)
                        this.$jumpPlatform('../login/secondaryValidation')
                    } else {
                        if (res.userStatus == 0) {
                            this.$store.commit('SET_PASSWORD', res.passwordStrength)
                            this.$jumpPlatform(
                                '../login/modifyName?userAccountName=' +
                                    parm.userAccountName +
                                    '&newUserPassword=' +
                                    parm.userPassword
                            )
                        } else {
                            this.$redirectTo('../homePage/index')
                            this.$store.commit('SET_LOGIN', res)
                            this.$store.commit('SET_ACCOUNT', parm)
                        }
                    }
                })
                .catch(() => {
                    uni.showLoading({
                        title: '平台地址不存在请查看输入的平台地址'
                    })
                    uni.hideLoading()
                    this.tolo = false
                })
                .finally(() => {
                    uni.hideLoading()
                    this.tolo = false
                })
            if (!flag) {
                uni.hideLoading()
                this.tolo = false
            }
        },
        codeChange(text) {
            this.tips = text
        },
        // 验证码
        getCode() {
            if (!this.$phoneTest(this.phone)) return this.$showToast('error', '手机号码错误')
            let that = this
            // 模拟向后端请求验证码
            uni.showLoading({
                title: '正在发送验证码'
            })
            let param = {
                phone: this.phone
            }
            this.$Axios
                .post(sendLoginPhoneVerificationCode, param)
                .then((res) => {
                    that.gCode--
                    uni.hideLoading()
                    that.timer = setInterval(() => {
                        that.gCode--
                    }, 1000)
                })
                .catch(() => {})
        },
        change(e) {
            console.log('change', e)
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    padding: 96upx;
    box-sizing: border-box;
    h2 {
        font-size: 72upx;
        margin-top: 10vh;
    }
    .font12 {
        font-size: $uni-font-size-sm;
    }
    .welcome {
        color: $uni-text-color-bo;
    }

    .but {
        margin-top: 48upx;
    }
    .read_agreement {
        display: flex;
        align-items: center;
    }
    .serve {
        color: $uni-color-Af;
    }
    .Switch_login {
        position: absolute;
        bottom: 10vh;
        width: 75%;
        display: flex;
        justify-content: center;
        color: $uni-color-sh;
        image {
            width: 48upx;
            height: 48upx;
        }
    }
    .platform_set {
        display: flex;
        justify-content: space-between;
        color: $uni-color-sh;
        margin-top: 20upx;
    }
}
</style>
