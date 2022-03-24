<!--
 * @Descripttion: 消息弹出
 * @version: 1.0.0
 * @Author: LSC
 * @Date: 2021-12-18 16:20:33
 * @LastEditors: LSC
 * @LastEditTime: 2021-12-27 17:56:17
-->
<template>
  <u-popup :show="show" mode="top" @close="close" @open="open">
    <view class="popup-container mt44">
      <view class="message-center">
        <text class="title">消息中心</text>
        <view class="img-box">
          <image
            class="img"
            src="@/static/clean.png"
            mode="scaleToFill"
            @click="handleCleanAll"
          />
        </view>
      </view>
      <!-- <view> -->
      <!-- <xt-seach
          :selectList="selectList"
          button="inside"
          @search="doSearch"
          @confirm="doSearch"
          @selectItem="selectItem"
        /> -->

      <!-- 筛选按钮 v-model="searchQuery.keyword"
        <view class="choose" @click="close">
          <view>筛选</view>
          <view class="choose-icon">
            <image
              class="icon"
              src="@/static/screen-blue.png"
              mode="scaleToFill"
              @click="doSearch"
            />
          </view>
        </view> -->
      <message-popup v-if="true"></message-popup>
      <!-- </view> -->
      <!-- 通告类型 -->
      <!-- <view>{{ searchQuery }}</view> -->
      <view class="message-type">
        <view class="type-txt"> 通告类型 </view>
        <view class="button-box">
          <!-- :hairline="true":plain="true" -->
          <button
            v-for="(item, index) in messageType"
            :key="item.key"
            color="#F5F6F8"
            :style="messageBtnStyle"
            class="button type"
            :class="activeIndex === index ? 'activeColor' : ''"
            @click="handleMessageType(item.key)"
            v-model="activeIndex"
          >
            <text :class="activeIndex === index ? 'textColor' : ''">{{
              item.title
            }}</text>
          </button>
          <!-- activeColor: activeIndex === item.key, -->
        </view>
      </view>
      <!-- 阅读状态 -->
      <view class="message-read">
        <view class="read-txt"> 阅读状态 </view>
        <view class="button-box">
          <button
            v-for="(items, key) in messageRead"
            class="button type"
            :key="items.key"
            color="#F5F6F8"
            :class="activeRead === key ? 'activeColor' : ''"
            :style="messageBtnStyle"
            @click="handleMessageRead(items.key)"
            v-model="activeRead"
          >
            <text :class="activeRead === key ? 'textColor' : ''">{{
              items.title
            }}</text>
          </button>
        </view>
      </view>
      <!-- 发布时间 -->
      <view class="message-time">
        <view class="time-txt"> 发布时间 </view>
        <view class="botton-box">
          <button
            class="button type"
            :style="{
              width: '148px',
              height: '40px',
              margin: '0px 18px 0px 0px',
              background: '#F5F6F8',
              color: '#B0B3BD'
            }"
            @click="handleShowPicker('open')"
          >
            <text>{{ Number(openText) ? $getdate(openText) : openText }}</text>
          </button>
          <text class="font">至</text>
          <button
            class="button type"
            :style="{
              width: '148px',
              height: '40px',
              margin: '0px 18px 0px 18px',
              background: '#F5F6F8',
              color: '#B0B3BD'
            }"
            @click="handleShowPicker()"
          >
            <text>{{ Number(endText) ? $getdate(endText) : endText }}</text>
          </button>
        </view>
      </view>
      <view class="btn-box">
        <u-button
          class="btn"
          :style="{ width: '162px', height: '48px', margin: '0' }"
          text="清空"
          @click="clearAll"
        ></u-button>
        <u-button
          class="btn"
          color="#2A5FF8"
          :style="{ width: '162px', height: '48px' }"
          type="primary"
          text="确定"
          @click="getUserAnnouncementItemPage"
        ></u-button>
      </view>
    </view>
    <!-- 弹出清除 -->
    <message-modal
      v-if="isShowModal"
      @close="handleCloseClean"
      @confirm="confirm"
    ></message-modal>
    <!--开始 时间 -->
    <u-datetime-picker
      :show="isShowOpenPicker"
      v-model="valueTime"
      mode="date"
      @cancel="isShowOpenPicker = false"
      @close="isShowOpenPicker = false"
      @confirm="handleComfirmOpen"
      :closeOnClickOverlay="true"
    ></u-datetime-picker>
    <!--结束 时间 -->
    <u-datetime-picker
      :show="isShowEndPicker"
      v-model="valueTime"
      mode="date"
      @cancel="isShowEndPicker = false"
      @close="isShowEndPicker = false"
      @confirm="handleComfirmEnd"
      :closeOnClickOverlay="true"
    ></u-datetime-picker>
  </u-popup>
</template>
<script>
import { readAllAnnouncement } from '@/api/information'
const currentDate = new Date()
const oldWeekDate = currentDate.setDate(currentDate.getDate() - 7) //  最终获得的 old7Date 是时间戳

export default {
  props: {
    selectValue: {
      type: Object
    }
  },
  computed: {
    messageBtnStyle() {
      return {
        width: '96px',
        height: '40px',
        margin: '0px 16px 0px 0px',
        color: '#B0B3BD'
      }
    },
    messageBtnStylehhh() {
      return {
        width: '96px',
        height: '40px',
        margin: '0px 16px 0px 0px',
        color: '#B0B3BD'
      }
    }
  },
  watch: {
    openText(val) {
      if (!val) {
        this.openText = '开始时间'
      }
    },
    endText(val) {
      if (!val) {
        this.endText = '结束时间'
      }
    },
    selectValue: {
      handler(val) {
        // console.log(val)
        setTimeout(() => {
          if (val.activeIndex >= 0) {
            this.activeIndex = +val.activeIndex
          }
          if (val.activeRead >= 0) {
            this.activeRead = +val.activeRead
          }
          if (val.openTime) {
            this.openText = this.$timestamp(val.openTime)
          }
          if (val.endTime) {
            this.endText = this.$timestamp(val.endTime)
          }
          // if (val.selectValue) {
          //   this.searchQuery.keyword = val.selectValue
          // }
        }, 100)
      },
      immediate: true // 立即
    }
  },
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      titleOrMaster: '', // 标题发布人
      activeIndex: -1, // 不点击,
      activeRead: -1, // 不点击,
      valueTime: Number(new Date()),
      time: null,
      openText: oldWeekDate,
      endText: Number(new Date()),
      isShowModal: false,
      show: true,
      isShowOpenPicker: false,
      isShowEndPicker: false,
      tabbarValue: 1,
      keyword: '21',
      swiperCurrent: 0,
      searchQuery: {
        keyword: '',
        selectIndex: 0
      },
      searchValue: '',
      selectList: [
        {
          id: 1,
          name: '标题'
        },
        {
          id: 2,
          name: '发布人'
        }
      ],
      messageType: [
        {
          key: 0,
          title: '通知'
        },
        {
          key: 1,
          title: '系统'
        },
        {
          key: 2,
          title: '告警'
        }
      ],
      messageRead: [
        {
          key: 0,
          title: '未读'
        },
        {
          key: 1,
          title: '已读'
        }
      ]
    }
  },
  methods: {
    selectItem(index) {
      // console.log(index)
      this.titleOrMaster = index
      this.searchQuery.selectIndex = 1
    },
    clearAll() {
      this.searchQuery.keyword = ''
      this.activeIndex = -1
      this.activeRead = -1
      this.openText = oldWeekDate
      this.endText = Number(new Date())
      this.getUserAnnouncementItemPage(1) // 清空不关闭
    },
    // 执行搜索
    doSearch(searchQuery) {
      // console.log('searchQuery', searchQuery)
      // console.log('searchQuery11', searchQuery.keyword)
      this.searchValue = searchQuery
    },
    // 获取基本信息
    getUserAnnouncementItemPage(closed) {
      let params = {
        queryRuleList: [
          {
            rule: 'ge',
            filed: 'beginTime',
            value: `${this.$getdate(this.openText)} 00:00:00`
          },
          {
            rule: 'le',
            filed: 'endTime',
            value: `${this.$getdate(this.endText)} 23:59:59`
          }
        ],
        searchCode: 'my_message_search'
      }
      if (this.searchValue) {
        if (this.titleOrMaster == 0) {
          params.queryRuleList.push({
            rule: 'like',
            filed: 'ann_title',
            value: `${this.searchValue}`
          })
        } else if (this.titleOrMaster == 1) {
          params.queryRuleList.push({
            rule: 'like',
            filed: 'user_name',
            value: `${this.searchValue}`
          })
        }
      }
      if (this.activeIndex > -1) {
        params.queryRuleList.push({
          rule: 'eq',
          filed: 'ann_category',
          value: `${this.activeIndex}`
        })
      }
      if (this.activeRead > -1) {
        params.queryRuleList.push({
          rule: 'eq',
          filed: 'ann_read_flag',
          value: `${this.activeRead}`
        })
      }
      console.log(params, '子组件数据')
      this.$emit('newParmas', params)
      if (!closed) {
        setTimeout(() => {
          this.close()
        }, 400)
      }
    },
    // 确定
    confirm() {
      // console.log('呜呜是')
      this.$emit('refresh')
      this.handleCloseClean()
    },
    handleMessageType(key) {
      if (key === this.activeIndex) {
        this.activeIndex = -1
      } else {
        this.activeIndex = key
      }
      // console.log('点击上面aaa', this.activeIndex)
    },
    handleMessageRead(key) {
      // 点击
      if (key === this.activeRead) {
        this.activeRead = -1
      } else {
        this.activeRead = key
      }
      // console.log('点击下面bbb', this.activeRead)
    },
    handleShowPicker(value) {
      if (value === 'open') {
        this.isShowOpenPicker = true
      } else {
        this.isShowEndPicker = true
      }
    },
    handleComfirmOpen(e) {
      // this.openText = this.$getdate(e.value)
      this.openText = e.value
      this.isShowOpenPicker = false
      // this.$emit('getOpenTime', `${this.$getdate(e.value)} 00:00:00`)
    },
    handleComfirmEnd(e) {
      // this.endText = this.$getdate(e.value)
      this.endText = e.value
      this.isShowEndPicker = false
      // this.$emit('getEndTime', `${this.$getdate(e.value)} 23:59:00`)
    },
    // 打开
    handleCleanAll() {
      this.isShowModal = true
    },
    // 关闭
    handleCloseClean() {
      setTimeout(() => {
        this.isShowModal = false
      }, 500)
    },
    open() {
      // console.log('open');
    },
    close() {
      this.show = false
      this.$emit('close')
      // console.log('close');
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  uni-button:after {
    border: 0px solid rgba(0, 0, 0, 0.2);
  }
}

.popup-container {
  height: 385px;
  padding: 32upx;
  box-sizing: border-box;
  border-radius: 0px 0px 12px 12px;
  .message-center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48upx;
    line-height: 48upx;
    text-align: center;
    .img-box {
      width: 48upx;
      height: 48upx;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .my-search {
    /* position: absolute; */
    display: flex;
    align-items: center;
    width: 100%;
    height: 88upx;
    background-color: $uni-bg-color;
    .search {
      width: 273px;
      height: 32px;
    }
    .choose {
      display: flex;
      align-items: center;
      margin-left: 32upx;
      font-size: $uni-font-size-base;
      color: $uni-color-btn;
      &-icon {
        width: 48upx;
        height: 48upx;
        .icon {
          width: 100%;
          height: 100%;
          color: $uni-color-btn;
        }
      }
    }
  }
  .message-type {
    margin-top: 32upx;
    .type-txt {
      margin-bottom: 16upx;
      font-size: $uni-font-size-lg;
      font-weight: bold;
      line-height: 22px;
      color: $uni-color-form;
    }
    .button-box {
      display: flex;
    }
  }
  .message-read {
    margin-top: 32upx;
    .read-txt {
      margin-bottom: 16upx;
      font-size: $uni-font-size-lg;
      font-weight: bold;
      line-height: 22px;
      color: $uni-color-form;
    }
    .button-box {
      display: flex;
    }
  }
  .message-time {
    margin: 32upx 0;
    .time-txt {
      margin-bottom: 16upx;
      font-size: $uni-font-size-lg;
      font-weight: bold;
      line-height: 22px;
      color: $uni-color-form;
    }
    .botton-box {
      display: flex;
      align-items: center;
      .font {
        font-size: $uni-font-size-base;
      }
    }
  }

  .btn-box {
    display: flex !important;
    justify-content: space-between;
    .btn {
      width: 162px;
      height: 48px;
      border-radius: 12px;
    }
  }
}
.activeColor {
  color: #2a5ff8;
  border: 1px solid #2a5ff8;
}
.textColor {
  color: #2a5ff8;
}

.type {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 40px;
  margin: 0px 16px 0px 0px;
  color: $uni-text-color-bo;
  font-size: $uni-font-size-base;
}
</style>
