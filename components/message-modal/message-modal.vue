<!--
 * @Descripttion: 我的消息弹出层
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2021-12-20 09:45:15
 * @LastEditors: LSC
 * @LastEditTime: 2021-12-21 11:48:36
-->

<template>
  <view class="message-modal-container">
    <u-modal
      :show="show"
      :title="title"
      :content="content"
      :showConfirmButton="false"
    >
      <view class="modal-box">
        <view class="message-text">{{ content }}</view>
        <view class="btn-box">
          <u-button
            class="btn"
            :style="{ width: '140px', height: '48px', margin: '0 15px 0 0' }"
            text="取消"
            @click="close"
          ></u-button>
          <u-button
            class="btn"
            color="#2A5FF8"
            :style="{ width: '140px', height: '48px' }"
            type="primary"
            text="确定"
            @click="confirm"
          ></u-button>
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
export default {
  props: {
    // show: {
    //   type: Boolean,
    //   required: true,
    // },
    title: {
      type: String,
      default: '标记已读',
    },
    content: {
      type: String,
      default: '是否全部标记为已读',
    },
  },

  data() {
    return {
      show: true,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    },
  },
}
</script>
<style lang="scss" scoped>
.message-modal-container {
  display: flex;
  flex-direction: column;
  .modal-box {
    .message-text {
      padding: 32px;
      color: $uni-text-color-bo;
      font-size: $uni-font-size-base;
      text-align: center;
    }
    .btn-box {
      display: flex;
    }
  }
}
</style>
