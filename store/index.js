import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: '',
        userName: '', // 用户名
        userPhotoUrl: '', // 头像
        userAccountName: '', // 用户名
        passwordStrength: '', // 密码强度
        userSafePhone: '', // 用户绑定的手机号
        userSafeEmail: '', // 用户绑定的邮箱
        deviceIdentify: {}, // 操作设备返回的数据
        common: 0, // 控制返回时的提醒
        device_id: undefined, // 保存设备id,
        newMessages: '', // 消息
        baseUrl: '', //API地址
        longitude: '', // 设备经度
        latitude: '' // 设备纬度
    },
    mutations: {
        SET_LONGITUDELINE: (state, data) => {
            console.log(data, '2222')
            state.longitude = data.longitude
            state.latitude = data.latitude
        },
        SET_BASEURL: (state, data) => {
            state.baseUrl = data
        },
        SET_DEVICE_ID: (state, data) => {
            state.device_id = data
        },
        SET_COMMON: (state) => {
            state.common++
        },
        SET_DEVICEIDENTIFY: (state, data) => {
            state.deviceIdentify = data
            console.log(data, 'data')
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERNAME: (state, data) => {
            state.userAccountName = data
        },
        SET_PASSWORD: (state, data) => {
            state.passwordStrength = data
        },
        SET_USERPHONE: (state, data) => {
            state.userSafePhone = data
        },
        SET_USEREMAIL: (state, data) => {
            state.userSafeEmail = data
        },
        SET_LOGIN(state, provider) {
            state.userName = provider.userName
            state.token = provider.token
            state.userPhotoUrl = provider.userPhotoUrl
            uni.setStorageSync('token', provider.token)
            uni.setStorageSync('nickName', provider.userName)
            uni.setStorageSync('userPhotoUrl', provider.userPhotoUrl)
        },
        SET_ACCOUNT: (state, data) => {
            uni.setStorage({
                key: 'uerInfo',
                data: JSON.stringify(data),
                success() {
                    console.log('成功了')
                },
                fail() {
                    console.log('缓存失败了')
                }
            })
        },
        SET_logout(state) {
            //退出登录
            uni.removeStorage({
                key: 'uerInfo'
            })
            uni.removeStorageSync('userName')
            uni.removeStorageSync('password')
            uni.removeStorageSync('token')
        },
        // 新消息
        SET_NEWMESSAGE: (state, data) => {
            state.newMessages = data
        }
    },
    getters: {
        token: (state) => state.token,
        userName: (state) => state.userName,
        userPhotoUrl: (state) => state.userPhotoUrl,
        userAccountName: (state) => state.userAccountName,
        passwordStrength: (state) => state.passwordStrength,
        userSafePhone: (state) => state.userSafePhone,
        userSafeEmail: (state) => state.userSafeEmail,
        deviceIdentify: (state) => state.deviceIdentify,
        common: (state) => state.common,
        device_id: (state) => state.device_id,
        newMessages: (state) => state.newMessages,
        baseUrl: (state) => state.baseUrl,
        longitude: (state) => state.longitude,
        latitude: (state) => state.latitude
    }
})
