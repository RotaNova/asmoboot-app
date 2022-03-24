<template>
	<view style="height: 100vh;display: flex;flex-direction: column;">
		<view class="mt44 home_serch"><u-navbar title="设备监控" @rightClick="rightClick" @leftClick="$leftClick" style="font-weight: 400;" fixed></u-navbar></view>
		<view v-if="hide">
		<!-- 	<web-view  :src="`https://open.ys7.com/ezopen/h5/iframe?url=${urls}&autoplay=1&accessToken=${accessToken}`" style="height: 450upx;top: 176upx;"></web-view> -->
		
		
			<web-view  :src="`https://open.ys7.com/jssdk/theme/h5/live.html?deviceSerial=${deviceName}&channelNo=${channelId}&accessToken=${accessToken}&validCode=`" style="height: 450upx;top: 176upx;"></web-view>
			<!-- <web-view  src="https://open.ys7.com/jssdk/theme/h5/live.html?deviceSerial=D40138727&channelNo=7&accessToken=at.2rvs4r8a279ks4p17thzdm31cm6oe3qp-7zpd2zsxdf-1q5q2y9-hjfjbbakj&validCode=" style="height: 450upx;top: 176upx;"></web-view> -->
		</view>
		<view class="flex device_main padlr padlr_bottom" v-else>
			<yy-video-player :auto-play="true" :url="src" poster="mp4/flv/m3u8" :danmu-list="[]" :show-back-btn="true"></yy-video-player>
		</view>

		<!-- <view style="margin-top: 450px;" @click="videoTop">上</view>
		<view>右</view>
		<view>下</view>
		<view>左</view> -->
	</view>
</template>

<script>
import { getDeviceVideoUrL } from '@/api/monitor.js';
import yyVideoPlayer from '@/components/yy-video-player/yy-video-player.nvue';
export default {
	data() {
		return {
			deviceName: undefined,
			channelId: undefined,
			src: '',
			hide: true,
			videoContext: null,
			danmuList: [],
			// 萤石
			urls: '',
			accessToken: '',
		};
	},
	onLoad: function(option) {
		this.deviceName = option.deviceName;
		this.channelId = option.channelId;
		this.getPacketDevice();
		if (this.videoContext) {
			this.videoContext.play();
		}
	},
	onReady: function() {
		// this.videoContext = uni.createVideoContext('video', this);
	},
	onHide: function() {
		// if (this.videoContext) {
		// 	this.videoContext.stop();
		// }
	},
	methods: {
		videoTop() {
			//发起post方式的请求
			let that = this;
			uni.request({
				url: 'https://open.ys7.com/api/lapp/device/ptz/start', //仅为示例，并非真实接口地址。
				data: {
					accessToken: that.accessToken,
					channelNo: that.channelId,
					direction: 0,
					speed: 2
				},
				method: 'POST',
				header: {
					token: uni.getStorageSync('token') //自定义请求头信息
				},
				success: res => {
					console.log(res.data);
				},
				fail: res => {
					console.log(res, '失败');
				}
			});
		},
		getPacketDevice() {
			uni.showLoading({
				title: '加载中'
			});
			let param = {
				deviceName: this.deviceName,
				channelId: this.channelId
			};
			this.$Axios
				.get(getDeviceVideoUrL, param)
				.then(res => {
					console.log(res)
					if (res.ysAccessToken) {
						this.hide = true;
						setTimeout(()=>{
							this.urls = res.ezopenUrl;
							this.accessToken = res.ysAccessToken;
						},500)
					} else {
						this.hide = false;
						this.src = res.flv;
					}
				})
				.catch(err => {
					console.log(err, 'err');
				})
				.finally(() => {
					uni.hideLoading();
				});
		}
	},
	components: {
		yyVideoPlayer
	}
};
</script>

<style lang="scss" scoped>
::v-deep {
	uni-video {
		width: 100%;
	}
}
#video-container{
	height: 300px;
}
</style>
