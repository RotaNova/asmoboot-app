<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2022-02-25 15:10:13
 * @LastEditors: LSC
 * @LastEditTime: 2022-03-09 17:08:39
-->
<template>
    <view>
        <u-navbar title="平台设置" @leftClick="leftClick" class="mt44"></u-navbar>
        <view class="mt35">
            <h2>平台设置</h2>
            <p class="font12 mt10">
                <text class="welcome">请输入</text>
                <text>要连接的平台地址</text>
            </p>
            <view class="password_area">
                <input
                    type="text"
                    placeholder="请输入服务器地址"
                    class="input_class"
                    v-model="keywold"
                />
                <button class="button_btn mt24" @click="saveAddress">保存</button>
            </view>
        </view>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>

<script>
export default {
    data() {
        return {
            keywold: ''
        }
    },
    onLoad() {
        let that = this
        uni.getStorage({
            key: 'serveAdress',
            success: function (res) {
                let data = JSON.parse(res.data)
                that.keywold = data
            }
        })
    },
    methods: {
        leftClick() {
            if (!this.keywold)
                return this.$refs.uToast.show({
                    message: '服务器地址不能为空',
                    type: 'error'
                })

            this.$leftClick()
        },
        // 异步存储键值 plus
        setStorageAsync() {
            let that = this
            plus.storage.setItemAsync(
                'serveAdress',
                JSON.stringify(that.keywold),
                function () {
                    console.log('serveAdress success')
                },
                function (e) {
                    console.log('serveAdress failed: ' + JSON.stringify(e))
                }
            )
        },
        // 保存地址
        saveAddress() {
            let that = this
            if (!this.keywold)
                return this.$refs.uToast.show({
                    message: '服务器地址不能为空',
                    type: 'error'
                })
            // plus.storage.removeItem('baseurl')
            // plus.storage.removeItem('serveAdress')
            // this.setStorageAsync() // 存
            uni.removeStorageSync('baseurl')
            uni.removeStorage({
                key: 'serveAdress'
            })
            uni.setStorage({
                key: 'serveAdress',
                data: JSON.stringify(that.keywold),
                success(res) {
                    uni.setStorageSync('baseurl', that.keywold)
                    // 条件编译
                    // #ifdef H5
                    uni.reLaunch({
                        url: '../index/index'
                    })
                    // #endif
                    // #ifndef H5
                    plus.runtime.restart()
                    // #endif
                },
                fail() {
                    console.log('缓存失败了')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mt35 {
    margin-top: 70upx;
    padding: 0 96upx;
    box-sizing: border-box;
}
h2 {
    font-size: 72upx;
    margin-top: 8vh;
}
.font12 {
    font-size: $uni-font-size-sm;
}
.welcome {
    color: $uni-text-color-bo;
}
</style>
