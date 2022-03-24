import uni_request from './request.js'

if (process.env.NODE_ENV === 'development') {
    console.log('开发环境')
} else {
    console.log('生产环境')
}
// let baseurl = 'http://boot.local.release.api.rotanova.top' //云端
// let baseurl = uni.getStorageSync('baseurl')
let baseurl = uni.getStorageSync('baseurl')
// let baseurl = uni.getStorageInfoSync('baseurl')
const request = uni_request({
    // 有效配置项只有三个
    baseURL: baseurl, //baseURL
    timeout: 10000 // 超时时间
})

request.interceptors.request.use(async (config) => {
    // 请求拦截器
    await new Promise((resolve) => setTimeout(() => resolve(), 50))
    config.header.token = uni.getStorageSync('token')
    return config
})
request.interceptors.response.use((response) => {
    // 响应拦截器
    // console.log(response,"response")
    if (response.data.code === 200) {
        if (response.data.data) {
            return response.data.data
        } else {
            return 'null'
        }
    } else if (response.data.code === 100500) {
        uni.showModal({
            title: '提示',
            content: response.data.msg,
            showCancel: false,
            success: (confirmRes) => {
                if (confirmRes.confirm) {
                    uni.setStorageSync('token', '')
                    uni.removeStorage({
                        key: 'uerInfo'
                    })
                    uni.reLaunch({
                        url: '/pages/index/index',
                        success: (e) => {
                            console.log(e)
                        },
                        fail: (e) => {
                            console.log(e)
                        }
                    })
                    // throw response.data.msg;
                }
            }
        })
    } else if (response.data.code === 100503) {
        uni.setStorageSync('token', '')
        uni.reLaunch({
            url: '/pages/views/index/index'
        })
    } else {
        // 服务器响应不为 200 的统一处理方法
        if (response.data.status == 503) {
            uni.showToast({
                title: '哎呀！网络走丢了。',
                icon: 'none',
                duration: 2000
            })
        } else {
            if (response.data.msg) {
                uni.showToast({
                    title: response.data.msg,
                    icon: 'none',
                    duration: 2000
                })
                // request.onerror()
            }
        }
    }
})

request.interceptors.response.use(async (response, ...args) => {
    // 响应拦截器
    await new Promise((resolve) => setTimeout(() => resolve(), 100))
    return response
})

request.onerror = async (...args) => {
    // 请求失败统一处理方法
    uni.showToast({
        title: '哎呀！网络走丢了。',
        icon: 'none',
        duration: 2000
    })
    return 1111
    console.log('onerror', args)
}

export default request
