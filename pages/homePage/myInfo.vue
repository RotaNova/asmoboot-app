<template>
	<view class="myinfo">
		<view class="myinfo_top">
			<view class="myinfo_top_img">
				<image :src="userPhotoUrl" mode="" class="ml16"></image>
				<text class="font20 ml16">{{userName}}</text>
			</view>
		</view>
		<view class="view_main">
			<view class="list_main">
				<view class="list_main_line">
					<view>
						<image src="../../static/personal.png" mode="" class="list_image"></image>
					</view>
					<view class="list_content list_border" style="flex:1" @click="$jumpPlatform('./personalData')">
						<text>个人资料</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_main_line">
					<view>
						<image src="../../static/set.png" mode="" class="list_image"></image>
					</view>
					<view class="list_content list_border" style="flex:1" @click="$jumpPlatform('./setInformation')">
						<text>设置</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_main_line">
					<view>
						<image src="../../static/help.png" mode="" class="list_image"></image>
					</view>
					<view class="list_content list_border" style="flex:1;border: 0;" @click="$jumpPlatform('../componentPage/webView')">
						<text>帮助</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default{
		data() {
			return {
				userName:uni.getStorageSync('nickName'),
				userPhotoUrl:uni.getStorageSync('userPhotoUrl')
			}
		},
		mounted(){

			console.log(uni.getStorageSync('nickName'))
		},
		methods:{
			
		},
		computed: {
		}
		
	}
</script>

<style lang="scss" scoped>
	.myinfo_top{
		background-color: $uni-color-btn;
		height: 296upx;
		display: flex;
		align-items: center;
		.myinfo_top_img{
			padding-top: 88upx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
		}
		.font20{
			font-size: 40upx;
			color: $uni-bg-color;
		}
		image{
			width: 128upx;
			height: 128upx;
			border-radius: 50%;
			background-color: $uni-color-borders;
			overflow: hidden;
		}
	}
	.list_image{
		width: 48upx;
		height: 48upx;
		transform: translateY(3px);
	}
	.list_main_line{
		display: flex;
		align-items: center;
	}
	.list_border{
		border-bottom: 1px solid $uni-color-borders;
		margin-left: 10px;
	}
</style>
