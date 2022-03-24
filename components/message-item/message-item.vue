<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2021-12-18 13:38:51
 * @LastEditors: LSC
 * @LastEditTime: 2021-12-22 10:15:51
-->
<template>
  <view
    class="message-container"
    :class="{ opacity: itemData.annReadFlag === 1 }"
  >
    <view class="message-left">
      <view class="img-box">
        <image class="img" :src="getMessageBg" mode="scaleToFill" />
      </view>
    </view>
    <view class="message-right">
      <view class="title-box">
        <view class="title">{{ itemData.annTitle }}</view>
        <view class="point" v-if="itemData.annReadFlag == 0"></view>
      </view>
      <view class="desc line-clamp-2"> {{ itemData.annMsgAbstract }}</view>
      <view class="info">
        <view class="time">{{ $getdate(itemData.annSendTime, 1) }}</view>
        <view class="owner">{{ itemData.annSender }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  name: 'message-item',
  computed: {
    getMessageBg() {
      if (this.itemData.annCategory === 0) {
        return require(`@/static/mail.png`) // 邮件
      } else if (this.itemData.annCategory === 2) {
        return require(`@/static/waring.png`) // 警告
      } else if (this.itemData.annCategory === 1) {
        return require(`@/static/notice.png`) // 注意
      }
    },
  },
  data() {
    return {
      ranking: 2,
    }
  },
}
</script>

<style lang="scss">
.opacity {
  opacity: 0.4;
}
.message-container {
  display: flex;
  position: relative;
  height: 256upx;
  background: $uni-bg-color;
  box-shadow: 0px 4px 8px rgba(18, 24, 53, 0.04);
  border-radius: 24upx;
  margin-bottom: 16upx;
  padding: 32upx;
  box-sizing: border-box;
  .message-left {
    margin-right: 32upx;
    .img-box {
      width: 80upx;
      height: 80upx;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .message-right {
    flex: 1;
    .title-box {
      display: flex;
      justify-content: space-between;
      .title {
        margin-bottom: 16upx;
        font-size: 16px;
        color: $uni-color-form;
      }
      .point {
        display: inline-block;
        width: 20upx;
        height: 20upx;
        background: #f32b2b;
        border-radius: 50%;
      }
    }
    .desc {
      height: 72upx;
      margin-bottom: 16upx;
      font-size: 14px;
      color: $uni-color-sh;
    }
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: $uni-text-color-bo;
    }
  }
}

.line-clamp-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
