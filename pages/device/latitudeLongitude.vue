<template>
	<view>
		<view class="view_con">
			<u-navbar title="选择经纬度" @leftClick="$leftClick" class="mt44"></u-navbar>
			<view class="view_main contend" style="background-color: #fff;padding: 0;">
				<!-- <mi-map ref="miMap" tipText="mi-Map" @updateAddress="updateAddress"></mi-map> -->
			<!-- 	<map style="width: 100%; height:800upx" :latitude="latitude" :longitude="longitude" :markers="marker" :scale="scale" @tap="getInformation"></map> -->
			<mapPlugin :info="info" />
			</view>

			<!-- <view style="padding-bottom: 120upx;">
				<text>{{ latitude }}</text>
				<text>{{ longitude }}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
import miMap from '@/components/mi-map/mi-map.vue';
import mapPlugin from '@/uni_modules/map-plugin/components/map-plugin/map-plugin';
export default {
	data() {
		return {
			title: 'map', //地图标题
			latitude: 39.909, //经度39.909
			longitude: 116.39742, //纬度116.39742
			scale: 18, // 最大数18，缩放范围最小，可见程度最小 5
			// marker:[]
			marker: [
				{
					// id:0,
					latitude: 39.909, //经度
					longitude: 116.39742, //纬度
					rotate: 0, // 旋转度数
					width: 20, //宽
					height: 20, //高
					title: '你在哪了', //标注点名
					alpha: 0.5 //透明
				}
			],
			info:{},
			hide:false
		};
	},
	onLoad: function(option) {
		// this.getLocation();
	},

	methods: {
		// 获取经纬度
		getLocation() {
			let that = this;
			uni.getLocation({
				// type: 'wgs84',
				success: function(res) {
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					let obj={
						latitude:res.latitude,
						longitude:res.longitude
					}
					that.info=obj
					that.hide=true
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				},
				fail: function(err) {
					console.log('错误：' + err);
				},
			});
		},
		// 获取地图信息
		getInformation(res) {
			var that = this;
			that.latitude = res.detail.latitude;
			that.longitude = res.detail.longitude;
			console.log(res, '地图信息');
		},
		updateAddress(addressObj) {
			console.log(addressObj, 'addressObj111');
			// this.positionObj = addressObj;
		}
	},

	components: {
		mapPlugin,
		miMap
	}
};
</script>

<style lang="scss" scoped>
.per_disflex {
	display: flex;
	margin-left: 20upx;
}
::v-deep {
	.u-popup {
		flex: none;
	}
}
.overesail {
	max-width: 400upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.significance {
	color: $uni-color-skred;
	font-weight: 700;
}
.zhiname {
	font-size: 32upx;
	font-weight: 700;
	color: $uni-color-form;
}
.mt8 {
	margin-top: 16upx;
}
.textarea_input {
	height: 240upx;
	padding: 28upx 32upx;
	box-sizing: border-box;
}
::v-deep {
	uni-textarea {
		width: 100%;
		font-size: 28upx;
	}
}
.contend {
	overflow: auto;
}
.dis_flex_bew {
	display: flex;
	justify-content: space-between;
	.but_cen {
		height: 48px;
		background: rgba(245, 246, 248, 0.39);
		border-radius: 12px;
		text-align: center;
		line-height: 96upx;
		color: $uni-color-form;
		flex: 1;
	}
	.but_cen:nth-child(2) {
		background-color: $uni-color-btn;
		color: $uni-bg-color;
	}
}
.longitude {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: $uni-text-color-bo;
	font-size: 14px;
}
.color_from {
	color: $uni-color-form;
}
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.address {
	margin-top: 1rem;
}
</style>
