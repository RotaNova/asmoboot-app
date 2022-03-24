<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2021-12-23 17:24:08
 * @LastEditors: LSC
 * @LastEditTime: 2022-02-25 15:11:46
-->
<template>
    <view class="home_index">
        <view class="home_content">
            <home v-if="code == 0" />
            <information @getMyMessage="getMyMessage" v-else-if="code == 1" />
            <myInfo v-else />
        </view>
        <view style="height: 0upx">
            <u-tabbar
                v-if="isShowTab"
                :value="tabbarValue"
                :fixed="true"
                :placeholder="true"
                :safeAreaInsetBottom="false"
            >
                <u-tabbar-item text="首页" @click="click1">
                    <image
                        class="u-page__item__slot-icon"
                        slot="active-icon"
                        src="@/static/home_off.png"
                    ></image>
                    <image
                        class="u-page__item__slot-icon"
                        slot="inactive-icon"
                        src="@/static/home_on.png"
                    ></image>
                </u-tabbar-item>
                <u-tabbar-item text="消息" @click="click1" :badge="messageBadge || myMessage">
                    <image
                        class="u-page__item__slot-icon"
                        slot="active-icon"
                        src="@/static/new_off.png"
                    ></image>
                    <image
                        class="u-page__item__slot-icon"
                        slot="inactive-icon"
                        src="@/static/new_on.png"
                    ></image>
                </u-tabbar-item>
                <u-tabbar-item text="我的" @click="click1">
                    <image
                        class="u-page__item__slot-icon"
                        slot="active-icon"
                        src="@/static/my_on.png"
                    ></image>
                    <image
                        class="u-page__item__slot-icon"
                        slot="inactive-icon"
                        src="@/static/my_off.png"
                    ></image>
                </u-tabbar-item>
            </u-tabbar>
        </view>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import myInfo from './myInfo'
import home from './home'
import information from './information'
import { getAnnouncementNoticItemPage } from '@/api/information'
export default {
    data() {
        return {
            tabbarValue: 0,
            code: 0,
            isShowTab: true,
            myMessage: 0
        }
    },
    created() {
        this.getAnnouncementCount()
    },
    computed: {
        ...mapGetters(['newMessages']), // 新消息
        messageBadge() {
            if (this.newMessages || this.newMessages == 0) {
                return this.newMessages
            }
        }
    },
    methods: {
        getMyMessage(value) {
            if (value) {
                this.myMessage = value
            }
        },
        click1(e) {
            this.code = e
            this.tabbarValue = e
            console.log(this.code)
        },
        // 获取消息通知
        getAnnouncementCount() {
            // console.log(11)
            let parame = {
                pageSize: 0,
                pageNum: 0
            }
            this.$Axios
                .post(getAnnouncementNoticItemPage, parame)
                .then((res) => {
                    if (res.total >= 99) {
                        this.myMessage = `99+`
                    } else {
                        this.myMessage = `${res.total}`
                    }
                })
                .catch((err) => {})
        }
    },
    components: {
        myInfo,
        home,
        information
    }
}
</script>

<style lang="scss" scoped>
.home_index {
    height: 100vh;
    background-color: $uni-bg-color-main;
    display: flex;
}
.u-tabbar {
    height: 150upx;
}
.home_content {
    flex: 1;
}
::v-deep {
    .u-tabbar__content {
        height: 130upx;
    }
}
image {
    width: 40upx;
    height: 40upx;
}
</style>
