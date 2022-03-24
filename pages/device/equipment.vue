<template>
    <view class="view_con">
        <u-navbar
            title="设备分类"
            @rightClick="rightClick"
            @leftClick="leftClick"
            class="mt44"
        ></u-navbar>
        <view class="view_main">
            <view class="list_main">
                <view v-if="childrenList.length == 0">
                    <view
                        class="list_content"
                        v-for="item in devicClassify"
                        :key="item.id"
                        @click="getChildrenData(item)"
                    >
                        <text class="contend_left">{{ item.label }}</text>
                        <view class="per_disflex">
                            <text class="contend_right"></text>
                            <u-icon name="arrow-right" class="ico_right"></u-icon>
                        </view>
                    </view>
                </view>
                <view v-else>
                    <view
                        class="list_content"
                        v-for="item in childrenList"
                        :key="item.id"
                        @click="getChildrenData(item)"
                    >
                        <text class="contend_left">{{ item.label }}</text>
                        <view class="per_disflex">
                            <text class="contend_right"></text>
                            <u-icon name="arrow-right" class="ico_right"></u-icon>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { getDeviceProductData } from '@/api/device.js'
export default {
    data() {
        return {
            devicClassify: [],
            childrenList: [],
            deviceId: ''
        }
    },
    mounted() {
        this.getDevic()
    },
    methods: {
        rightClick() {
            console.log('rightClick')
        },
        leftClick() {
            if (this.childrenList.length > 0) {
                this.childrenList = []
            } else {
                this.$leftClick()
            }
        },
        // 操作数据
        getChildrenData(row) {
            this.deviceId = row.id
            if (row.children && row.children.length > 0) {
                this.childrenList = row.children
            } else {
                this.$jumpPlatform(
                    './deviceManagement?productKey=' + row.value + '&name=' + row.label
                )
            }
        },
        // 获取设备数据
        getDevic() {
            this.$Axios
                .get(getDeviceProductData)
                .then((res) => {
                    this.devicClassify = res
                })
                .catch(() => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.view_con {
    flex: 1;
}
.per_disflex {
    display: flex;
    margin-left: 20upx;
}
</style>
