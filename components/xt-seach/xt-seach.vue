<template>
  <view class="page-container">
    <!-- 下拉选择框 -->
    <view class="seach-select">
      <!-- 选中值 -->
      <view class="select-value" @click="selectClick()">
        {{ selectList[selectIndex].name }}
        <u-icon name="arrow-down-fill" style="font-size: 1px;margin-left: 5px;"></u-icon>
        <text
          class="iconfont icon-xiala1"
          style="float: right; margin-right: 10rpx; font-size: 18rpx"
        ></text>
      </view>
      <!-- 选择列表 -->
      <view
        class="select-item-list"
        :style="{ display: showSelectList ? 'block' : 'none' }"
      >
        <text
          class="iconfont icon-shang"
          style="
            position: absolute;
            top: -18px;
            left: 60rpx;
            font-size: 30rpx;
            color: #ffffff;
          "
        ></text>
        <view
          :class="['select-item', index > 0 ? 'item-border' : '']"
          v-for="(data, index) in selectList"
          :key="index"
          @click="selectItem(index)"
          >{{ data.name }}</view
        >
      </view>
    </view>
	<input
	  class="seach-input"
	  v-model="options.value"
	  confirm-type="search"
	  placeholder="请输入"
	  maxlength="20"
	  @input="onInput"
	  @search="onSearch"
	  @confirm="confirm"
	/>
	<view class="search-icon">
	  <image
	    v-if="true"
	    class="icon"
	    src="@/static/search.png"
	    mode="scaleToFill"
	    @click="onSearch"
	  />
	</view>
    <view v-show="showSelectList" @click="clickMask" class="page-mask"></view>
  </view>
</template>

<script>
import uIcon from '../../uni_modules/uview-ui/components/u-icon/u-icon.vue'
export default {
  components: { uIcon },
  name: 'xt-seach',
  props: {
    selectList: {
      type: Array,
      default: [],
    },
    // 值
    value: {
      type: String,
    },
  },
  data() {
    return {
      showSelectList: false,
      selectIndex: 0,
      isShowIcon: true,
      options: {
        id: '',
        value: '',
      },
      searchValue: '',
    }
  },
  created() {
    this.options.id = this.selectList[this.selectIndex].id
  },
  methods: {
    onSearch(e) {
      // console.log(this.searchValue, '21')
      this.$emit('search', this.searchValue)
    },
    onInput(e) {
      this.$emit('input', e.detail.value)
      this.searchValue = e.detail.value
      this.$emit('searchValue', this.searchValue)
      if (e.detail.value) {
        this.isShowIcon = false
      } else {
        this.isShowIcon = true
      }
    },
    selectItem(index) {
      this.$emit('selectItem', index)
      this.selectIndex = index
      this.options.id = this.selectList[index].id
      this.clickMask()
    },
    selectClick() {
      this.showSelectList = !this.showSelectList
      // this.clickMask()
    },
    seachSubmit() {
      if (this.options.value) {
        this.$emit('seachClick', this.options)
      }
    },
    confirm(e) {
      console.log(e)
    },
    clickMask() {
      this.showSelectList = false
    },
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  background-color: $uni-search-color;
  height: 64upx;
  font-size: 25rpx;
  border-radius: 12upx;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  input {
    display: inline-block;
    height: 60rpx;
    line-height: 60rpx;
    margin-left: 10rpx;
    width: 64%;
  }
  .search-icon {
    // position: absolute;
    width: 40upx;
    height: 40upx;
    // top: 12upx;
    // right: 16upx;
    color: $uni-text-color-grey;
    .icon {
      width: 100%;
      height: 100%;
    }
  }

  .seach-select,
  .seach-submit {
    display: inline-block;
    height: 60rpx;
    line-height: 60rpx;
  }
  .seach-select {
    // position: relative;
    // float: left;
    // text-align: center;
    // width: 132upx;
	z-index: 999;
    .select-value {
      display: flex;
      margin-left: 26upx;
      ::v-deep span {
        font-size: 1px;
      }
    }
    .select-item-list {
      background-color: #ffffff;
      // position: absolute;
      // top: 75rpx;
      // width: 150rpx;
      // left: -20rpx;
      border-radius: 20rpx;
      z-index: 10;
      box-shadow: 0px 0px 5px #c9c9c9;

      .select-item {
        text-align: center;
        // margin-top: 10rpx;
      }
      .item-border {
        border-top: 1rpx solid #eeeeee;
      }
    }
  }
  .seach-submit {
    // float: right;
    width: 80rpx;
    text-align: center;
    background-color: #eeeeef;
    border-top-right-radius: 70rpx;
    border-bottom-right-radius: 70rpx;
    .seach-submit-text {
    }
  }
  .page-mask {
    // position: fixed;
    // top: 0;
    // bottom: 0;
    // right: 0;
    // left: 0;
    // z-index: 5;
  }
}
</style>
