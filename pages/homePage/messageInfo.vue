<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2021-12-20 10:42:25
 * @LastEditors: LSC
 * @LastEditTime: 2021-12-28 09:10:40
-->
<template>
  <view class="view_con">
    <u-navbar
      title="通知消息"
      @leftClick="leftClickhhh"
      class="nav mt44"
    ></u-navbar>
    <view class="view_main">
      <view class="time">{{ $getdate(myInfo.annSendTime, 1) }}</view>
      <view class="people"> 发布人: {{ myInfo.annSender }} </view>
      <view class="text">{{ myInfo.annTitle }}</view>
      <view class="rich-wrapper">{{ myInfo.annMsgAbstract }}</view>
      <view class="wrapper"
        ><u-parse :content="myInfo.annContent"></u-parse
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad: function (option) {
    const item = JSON.parse(decodeURIComponent(option.info))
    this.myInfo = item
    // console.log(this.myInfo)
  },
  data() {
    return {
      myInfo: {}
    }
  },
  methods: {
    leftClickhhh() {
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.view_con {
  .nav {
    box-shadow: 0px 4px 8px rgba(18, 24, 53, 0.04);
  }
  .view_main {
    display: flex;
    flex-direction: column;
    background: $uni-bg-color;
    box-shadow: 0px 4px 8px rgba(18, 24, 53, 0.04);
    .time {
      color: $uni-text-color-bo;
      font-size: $uni-font-size-base;
      margin-bottom: 8upx;
    }
    .people {
      color: $uni-text-color-bo;
      font-size: $uni-font-size-base;
      margin-bottom: 32upx;
    }
    .text {
      font-size: 18px;
      margin-bottom: 8upx;
      color: $uni-color-form;
      font-weight: 400;
      line-height: 25px;
    }
    .rich-wrapper {
      padding: 16upx;
      box-sizing: border-box;
      background: #eaedf6;
      border-radius: 6px;
      color: $uni-text-color-bo;
      font-size: $uni-font-size-base;
      margin-bottom: 32upx;
    }
    .wrapper {
      color: $uni-color-form;
      font-size: $uni-font-size-base;
    }
  }
}
</style>
