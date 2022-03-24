<template>
	<view class="map-search">
		<!-- <view class="up-down-img">
			<image src="/uni_modules/map-plugin/static/image/home-up.png" mode="" v-if="boxHeight === 400"></image>
			<image src="/uni_modules/map-plugin/static/image/home-down.png" mode="" v-else></image>
		</view> -->
		<view class="trans" style="padding-bottom: 32upx;" @click="showSearch()">
			<!-- <text class="trans-text">{{startInfo? startInfo.nodeName : '从哪出发'}}</text> -->
			<u--input
				    placeholder="请输入地址"
				    suffixIcon="search"
					v-model="startInfo.nodeName"
					disabled
				></u--input>
		</view>
		<!-- <scroll-view 
		:style="{ height: `${boxHeight}rpx` }" 
		:scroll-y="scrollY" 
		class="scroll-Y" 
		@touchmove="handleTouchmove" 
		@touchstart="handleTouchstart" 
		@touchend="handleTouchend">
			<view class="top-content">
				<view class="trans" @click="showSearch('start')">
					<text class="trans-text">{{startInfo? startInfo.nodeName : '从哪出发'}}</text>
				</view>
				<view class="trans" @click="showSearch('end')">
					<text class="trans-text">{{endInfo? endInfo.nodeName : '您要去哪儿'}}</text>
				</view>
			</view>
		</scroll-view> -->
		<view class="search-content" :style="{ height: `${searchHeight}vh` }">
			<view class="input-box">
				<image src="/uni_modules/map-plugin/static/image/right-arow.png" mode="" class="right-arow" @click="searchHeight = 0"></image>
				<input type="text" v-model="searchText" placeholder="请输入" class="input"/>
			</view>
			<scroll-view scroll-y="true" :style="{ height: `calc(${searchHeight}vh - 120rpx)` }" class="search-scroll">
				<view class="address-list">
					<view class="address-item" v-for="(item,index) in addressList" :key="index" @click="getAddressInfo(item)">
						<image src="/uni_modules/map-plugin/static/image/address.png" class="address-img"></image>
						<view class="address-info">
							<view class="title">{{item.name}}</view>
							<view class="info">{{item.district + item.address}}</view>
						</view>
					</view>
				</view>
				<view class="no-data" v-if="!addressList.length">
					<image src="/uni_modules/map-plugin/static/image/no-data.png" mode="widthFix" class="no-data-img"></image>
					<text class="no-data-text">请输入搜索关键字</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
/**
 * @description map-search
 * @property {Array} searchResult 搜索地址列表
 * @property {Boolean} backEvent 返回事件
 */
	export default {
		props: {
			searchResult: {
				type: Array,
				default:() => {
					return []
				}
			},
			backEvent: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scrollY: false,
				boxHeight: 400,
				flag: 0,
				lastX: 0,
				lastY: 0,
				searchText: '',
				addressList: [],
				searchHeight: 0,
				searchType: '',
				startInfo: {
					nodeName:"",
					longitude: "",
					latitude: ""
				},
				endInfo: null,
				addressInfoChange: false,
			};
		},
		watch:{
			boxHeight(newVal,oldVal){
				this.scrollY = newVal !== 400
			},
			searchHeight(newVal,oldVal){
				if(!newVal) {
					this.searchText = ''
				}
			},
			searchText(newVal,oldVal){
				this.$emit('changeSearchText', newVal)
			},
			// addressInfoChange(newVal,oldVal){
			// 	this.$emit('addressInfoChange', this.startInfo)
			// },
			searchResult: {
				handler:function(newVal,oldVal){
					this.addressList = [...newVal]
				},
				deep: true,
				immediate: true
			},
			backEvent(newVal,oldVal){
				this.searchHeight = 0
			}
		},
		methods: {
			// 点击搜索类型，弹起搜索框
			showSearch(type) {
				this.searchType = type
				this.searchHeight = 90
				if(type === 'start' && this.startInfo){
					this.searchText = this.startInfo.nodeName
				}else if(type === 'end' && this.endInfo){
					this.searchText = this.endInfo.nodeName
				}
			},
			
			// 点击地址设置起始信息
			getAddressInfo(data) {
				this.startInfo = {
					nodeName: data.name,
					longitude: data.location[0],
					latitude: data.location[1]
				}
				this.searchHeight=0
				this.addressInfoChange=true
				this.$emit('addressInfoChange', this.startInfo)
				// this.$emit('changeSearchText', this.startInfo)
			},
			
			
		},
	}
</script>

<style lang="scss">
	@mixin flex {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	
	.map-search {
		width: 100%;
		margin: 0 auto;
		border-radius: 50rpx 50rpx 0 0;
		.up-down-img{
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			@include flex;
			justify-content: center;
			padding-top: 16rpx;
			image{
				width: 52rpx;
				height: 20rpx;
			}
		}
		.scroll-Y{
			width: 100%;
			height: 100%;
			padding: 30rpx 30rpx 0;
			box-sizing: border-box;
			transition: all ease 0.5s;
			.top-content {
				border-radius: 20rpx;
				position: relative;
				box-shadow: 1px 4px 10px 0px rgba(8, 172, 162, 0.2);
				padding: 30rpx 60rpx;
				margin-bottom: 60rpx;
				background: -webkit-linear-gradient(to right, #a8edea 0%, #fed6e3 100%); /* Safari 5.1 - 6.0 */
				background: -o-linear-gradient(to right, #a8edea 0%, #fed6e3 100%); /* Opera 11.1 - 12.0 */
				background: -moz-linear-gradient(to right, #a8edea 0%, #fed6e3 100%); /* Firefox 3.6 - 15 */
				background: linear-gradient(to right, #a8edea 0%, #fed6e3 100%); /* 标准的语法（必须放在最后） */
			
				.trans {
					border-bottom-style: dashed;
					border-bottom-color: #AAAAAA;
					border-bottom-width: 1rpx;
					position: relative;
					padding: 30rpx 0;
					&:last-child{
						border-bottom: none;
					}
					.trans-text {
						color: #FFFFFF;
					}
				}
			}
		}
		.search-content{
			width: 100%;
			box-sizing: border-box;
			transition: all ease 0.5s;
			position: fixed;
			bottom: 0;
			z-index: 9999;
			background: #FFFFFF;
			border-radius: 50rpx 50rpx 0 0;
		}
		.input-box{
			height: 120rpx;
			border-bottom: solid 1px #CCCCCC;
			padding: 0 20rpx;
			@include flex;
			.right-arow{
				width: 50rpx;
				height: 50rpx;
			}
			.input{
				flex: 1;
				margin-left: 20rpx;
				height: 100%;
			}
		}
		.search-scroll{
			width: 100%;
			height: 100%;
			
			.address-list{
				.address-item{
					width: calc(100% - 100rpx);
					margin: auto;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-bottom: solid 1rpx #EEEEEE;
					padding: 30rpx 0;
					
					.address-img{
						width:27rpx;
						height:34rpx;
						margin-left: 4rpx;
						margin-right: 18rpx;
					}
					.address-info{
						flex: 1;
						font-weight:500;
						.title{
							font-size:30rpx;
							color:rgba(51,51,51,1);
							text-align: left;
						}
						.info{
							font-size:24rpx;
							color:rgba(170,170,170,1);
							margin-top: 15rpx;
						}
					}
				}
			}
			
			.no-data{
				padding-top: 15vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				.no-data-img{
					width: 400rpx;
				}
				.no-data-text{
					font-size: 34rpx;
					margin-top: 50rpx;
					color: #999999;
				}
			}
		}
	}
</style>
