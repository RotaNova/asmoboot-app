<template>
    <view class="home">
        <view class="home_top">
            <view class="home_top_title">{{ title }}</view>
            <view><u-icon name="scan" color="#2979ff" size="28" class="scaner"></u-icon></view>
        </view>
        <view class="home_top"></view>
        <view class="home_main">
            <view class="ml16 commonly">常用功能</view>
            <view class="home_content">
                <view class="content" @tap="$jumpPlatform('../device/index')">
                    <image src="../../static/home_equipment.png" mode=""></image>
                    <view style="text-align: center; margin-top: 8upx">设备管理</view>
                </view>
                <view class="content" @tap="$jumpPlatform('../monitorPreview/index')">
                    <image src="../../static/home_monitoring.png" mode=""></image>
                    <view style="text-align: center; margin-top: 8upx">监控预览</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getIndexTitle } from '../../api/login.js'
export default {
    data() {
        return {
            tabbarValue: 0,
            title: '新航物联网'
        }
    },
    mounted() {
        this.getIndexTitle()
    },
    methods: {
        // 获取标题
        getIndexTitle() {
            this.$Axios.get(getIndexTitle).then((res) => {
                this.title = res ? res : '新航物联网'
            })
        },
        click1(e) {
            this.tabbarValue = e
            console.log('click1', e)
        },
        change1(e) {
            console.log('change1', e)
        }
    }
}
</script>

<style lang="scss" scoped>
.home_top {
    height: 88upx;
    padding-top: 88upx;
    background-color: $uni-color-Af;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home_top_title {
        font-size: 36upx;
        font-weight: 700;
        color: $uni-bg-color;
        margin-left: 32upx;
    }
}
.home_content {
    padding: 32upx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .content {
        width: 206upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $uni-bg-color;
        font-size: 28upx;
        color: $uni-color-form;
        box-shadow: 0px 4px 8px rgba(18, 24, 53, 0.04);
        border-radius: 12px;
        padding: 40upx;
        box-sizing: border-box;
        margin-right: 32upx;
        .content_main {
        }
        image {
            width: 80upx;
            height: 80upx;
        }
    }
    .content:nth-child(3n) {
        margin-right: 0;
    }
}
.scaner {
    margin-right: 32upx;
}
::v-deep {
    .u-icon__icon {
        color: $uni-bg-color !important;
    }
}
.home_main {
    transform: translateY(-88px);
    background-color: $uni-bg-color-main;
    border-top-left-radius: 40px;
}
.commonly {
    padding-top: 16px;
    color: $uni-color-form;
    font-size: 32upx;
    font-weight: 700;
}
</style>
