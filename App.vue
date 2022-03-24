<script>
import { WebSocketURL } from './utils/helper'
function newspmentStatus() {
    let parame = {
        topic: 'announcementWindowsUnReadNum',
        token: uni.getStorageSync('token')
    }

    uni.sendSocketMessage({
        data: parame
    })
}
export default {
    data() {
        return {
            socketTask: null,
            // 确保websocket是打开状态
            is_open_socket: false,
            timer: null
        }
    },
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        this.connectSocketInit()
        // this.timer = setInterval(this.heartbeat, 5000);
    },
    onHide: function () {
        console.log('App Hide')
    },
    onLoad() {},
    beforeDestroy() {
        window.clearInterval(this.timer)
        this.closeSocket()
    },
    methods: {
        // 消息的websocket
        announcement() {
            let param = {
                topic: 'announcementWindowsUnReadNum',
                token: uni.getStorageSync('token')
            }
            this.socketTask.send({
                data: JSON.stringify(param),
                async success() {
                    console.log('消息发送成功')
                }
            })
        },
        // 心跳的websocket
        heartbeat() {
            let param = {
                topic: 'connect',
                token: uni.getStorageSync('token'),
                data: {
                    token: window.localStorage.getItem('token')
                }
            }
            this.socketTask.send({
                data: JSON.stringify(param),
                async success() {
                    console.log('消息发送成功')
                }
            })
        },
        // 获取消息的websocket
        connectSocketInit() {
            let that = this
            let param = {
                topic: 'connect',
                token: uni.getStorageSync('token'),
                data: {
                    // token: window.localStorage.getItem('token')
                    token: uni.getStorageSync('token')
                }
            }
            // 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
            this.socketTask = uni.connectSocket({
                // 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
                url: `${WebSocketURL}`, // 线上
                // url: 'ws://192.168.0.42:30502/ws', //周金滕
                success(data) {
                    console.log('websocket连接成功')
                }
            })
            this.socketTask.onError((res) => {
                console.log('异常抛出')
            })
            // 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
            this.socketTask.onOpen((res) => {
                console.log('WebSocket连接正常打开中...！')
                this.is_open_socket = true
                // 注：只有连接正常打开中 ，才能正常成功发送消息
                this.socketTask.send({
                    data: JSON.stringify(param),
                    async success() {
                        console.log('消息发送成功')
                    }
                })
                this.announcement() // ws 消息
                // 注：只有连接正常打开中 ，才能正常收到消息
                this.socketTask.onMessage((res) => {
                    let data = JSON.parse(res.data)
                    if (data.topic == 'device_identify') {
                        console.log(data, '11')
                        that.$store.commit('SET_DEVICEIDENTIFY', data.data)
                    } else if (data.topic == 'announcementWindowsUnReadNum') {
                        that.$store.commit('SET_NEWMESSAGE', data.data)
                        console.log(data.data, '消息')
                    }
                })
            })
            // 这里仅是事件监听【如果socket关闭了会执行】
            this.socketTask.onClose(() => {
                console.log('已经被关闭了')
                that.connectSocketInit()
            })
        },
        // 关闭websocket【离开这个页面的时候执行关闭】
        closeSocket() {
            this.socketTask.close({
                success(res) {
                    this.is_open_socket = false
                    console.log('关闭成功', res)
                },
                fail(err) {
                    console.log('关闭失败', err)
                }
            })
        },
        clickRequest() {
            if (this.is_open_socket) {
                // websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
                this.socketTask.send({
                    data: '请求一次发送一次message',
                    async success() {
                        console.log('消息发送成功')
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss">
uni-body {
    color: $uni-color-form;
}
@import '@/uni_modules/uview-ui/index.scss';
@font-face {
    font-family: 'iconfont'; /* Project id 1903545 */
    src: url('//at.alicdn.com/t/font_1903545_bov3uaiph8o.woff2?t=1639533677959') format('woff2'),
        url('//at.alicdn.com/t/font_1903545_bov3uaiph8o.woff?t=1639533677959') format('woff'),
        url('//at.alicdn.com/t/font_1903545_bov3uaiph8o.ttf?t=1639533677959') format('truetype');
}
.mt10 {
    margin-top: 20upx;
}
.mt16 {
    margin-top: 32upx;
}
.input_class {
    height: 48px;
    background: #f5f6f8;
    border-radius: 12px;
    padding: 0 20upx;
    font-size: 28upx;
}
.posireave {
    position: relative;
    width: 100%;
}
/*验证码 start*/
.verification_code {
    padding-right: 50%;
    box-sizing: border-box;
}
.auth_code {
    position: absolute;
    top: 15px;
    right: 10px;
    font-size: 14px;
}
/*验证码 end*/
.mt44 {
    margin-top: 44px;
    font-weight: 700;
}
.password_area {
    margin-top: 16vh;
}
.button_btn {
    height: 48px;
    line-height: 48px;
    background: $uni-color-btn;
    border-radius: 16px;
    color: $uni-bg-color;
    font-size: 14px;
    font-weight: bold;
}
.mt24 {
    margin-top: 48upx;
}
.view_con {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.view_main {
    flex: 1;
    background-color: $uni-bg-color-main;
    padding: 32upx;
    box-sizing: border-box;
}
/*页面列表样式 start */
.list_main {
    padding: 0 32upx;
    box-sizing: border-box;
    border-radius: 24upx;
    overflow: hidden;
    background-color: $uni-bg-color;
}
.list_content {
    display: flex;
    justify-content: space-between;
    padding: 36upx 0;
    box-sizing: border-box;
    border-bottom: 1px solid $uni-color-borders;
    font-size: 26upx;
}
.list_content:last-child {
    border-bottom: 0;
}
.ml16 {
    margin-left: 16px;
}
.ico_right {
    color: $uni-color-tbr;
    margin-left: 20upx;
}
.contend_left {
    color: $uni-color-form;
    font-size: 26upx;
}
.contend_right {
    color: $uni-text-color-bo;
    font-size: 26upx;
}
::v-deep {
    .uni-input-placeholder {
        font-size: 26upx;
        color: $uni-text-color-bo;
    }
    .ico_right .u-icon__icon {
        font-weight: 700 !important;
        color: $uni-color-ico !important;
    }
    .u-navbar--fixed {
        padding-top: 44px;
        background-color: #fff;
    }
}
.Verify_word {
    color: $uni-color-form;
}
.dis_lines {
    display: flex;
    align-items: center;
}

::v-deep {
    .seach-input .uni-input-input {
        font-size: 28upx;
    }
}
.over_space {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.mt88 {
    margin-top: 176upx;
}
/*页面列表样式 end */
</style>
