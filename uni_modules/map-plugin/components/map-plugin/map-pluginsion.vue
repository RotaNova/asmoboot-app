<template>
	<view class="content">
		<map-search :backEvent="backEvent" @changeSearchText="changeSearchText" @addressInfoChange="addressInfoChange" :searchResult="searchResult"></map-search>
		<view class="bMap-container">
			<view @click="bmap.onClick" :prop="mapData" :change:prop="bmap.updateMap" id="bmap"></view>
			<view id="panel"></view>
		</view>
		
		<view class="left_pad">
			<view class="linon_er">
				<input placeholder="经度" class="input_class " ref="longCaths" style="line-height: 48px;" id="longCath" disabled v-model="addressObj.longitude" ></input>
				<input placeholder="纬度" class="input_class " ref="latCaths" style="line-height: 48px;" id="latCath" disabled  v-model="addressObj.latitude"></input>
			</view>
			<view class="linon_er" style="padding-top: 0;">
				<input placeholder="详细地址" class="input_class" style="line-height: 48px;" disabled id="addressCath" v-model="addressObj.address"></input>
			</view>
			<view class="but_map linon_er">
				<view class="but_map_box " @click="$leftClick">返回</view>
				<view class="but_map_box" @click="determineLatitude">确认</view>
			</view>
		</view>
	</view>
</template>
<script>
/**
 * map-plugin 地图
 * @description map-plugin
 * @property {Array} routeNodeList 轨迹点位
 * @example [
		{
			longitude: 120.610749,
			latitude: 31.328650,
			nodeName: '苏州火车站'
		},{
			longitude: 120.678630,
			latitude: 31.316992,
			nodeName: '东方之门'
		},{
			longitude: 120.640200,
			latitude: 31.305598,
			nodeName: '苏州大学'
		},
	]
 * @property {Boolean} backEvent 返回事件
 */
export default {
	props: {
		routeNodeList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		backEvent: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			mapData: {
				input: '',
				routeNodesChange: false,
				getPosition: '',
				routeNodes: [],
				allRouteNodes: ''
			},
			searchResult: [],
			addressObj:{
				longitude:"",
				latitude:"",
				address:""
			},
			setmapinfo:{},

				map: null,
				markerList: [{
					lat: 0,
					lng: 0,
					icon: ''
				}],
				ownerInstanceObj: null ,//service层对象
				startIcon:null,
				viaIcon:null,
				endIcon:null,
				driving: null,
				routeList: [],
				isInitIcon:true,
				posi,
				addressObj:{
					longitude:"",
					latitude:"",
					address:""
				},
				falgs:true
			
		};
	},
	created(){
		if (typeof window.BMap === 'function') {
			this.initMap()
		} else {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			const AK = '325102bbf418b62458b23c7c27dfd3df' //使用自己的高德地图key值（ 是webApi的key!!! ）
			script.src = 'https://webapi.amap.com/maps?v=2.0&key=' + AK +
				'&plugin=AMap.Driving&plugin=AMap.Autocomplete&plugin=AMap.CitySearch' //需要什么功能就加什么plugin
			script.onload = this.initMap.bind(this)
			document.head.appendChild(script)
		}
	},
	mounted() {},
	watch: {
		routeNodeList: {
			handler: function(newVal, oldVal) {
				this.mapData.routeNodes = newVal;
				this.mapData.routeNodesChange = !this.mapData.routeNodesChange;
			},
			deep: true
		},
		ownerInstanceObj(){
			console.log(this.ownerInstanceObj,"ownerInstanceObj")
		}
	},
	methods: {
		// 确定经纬度
		determineLatitude(){
			console.log(document.getElementById('longCath'),"------")
			console.log(this.$refs.latCaths.value,"------")
			let longitude=this.$refs.longCaths.value
			let latitude=this.$refs.latCaths.value
			this.addressObj={
				longitude:longitude,
				latitude:latitude,
				// address:""
			},
			this.$store.commit('SET_LONGITUDELINE',this.addressObj)
			this.$leftClick()
		},
		// 搜索关键词改变执行搜索
		changeSearchText(val) {
			this.mapData.input = val;
		},

		// 获取搜索列表
		getSearchResult(val) {
			if (val && val.length) {
				this.searchResult = val.filter(item => item.id);
			}
		},

		// 起止地址变换获取路线
		addressInfoChange(val) {
			this.$store.commit('SET_LONGITUDELINE',val)
			this.map.clearMap();
			let arr=[val.longitude,val.latitude]
			this.$refs.longCaths.value=arr[0]
			this.$refs.latCaths.value=arr[1]
			// document.getElementById('longCath').innerText=arr[0]
			// document.getElementById('latCath').innerText=arr[1]
			document.getElementById('addressCath').innerText=val.nodeName
			this.addMarker(arr)
		},
		transData(method, value) { //传输数据 H5有限制，使用ownerInstanceObj.callMethod 代替操作
			UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
				cid: this._$id,
				method: method,
				args: value
			})
		},
		initMap() {
			let that = this;
				this.map = new AMap.Map('bmap', {
					resizeEnable: true,
					// center: [this.info.longitude, this.info.latitude],
					zooms: [4, 18], //设置地图级别范围
					zoom: 16
				})
				this.initIcon()
				AMap.plugin(
										[
											'AMap.Geolocation',
											'AMap.Autocomplete',
											'AMap.PlaceSearch',
											'AMap.CitySearch',
											'AMap.Geocoder'
										],
										function() {
											let geocoder = new AMap.Geocoder({
												city: '', //默认：“全国”
												radius: 1000 //范围，默认：500
											})
											let marker = new AMap.Marker()
											function regeoCode(lnglat) {
												geocoder.getAddress(lnglat, function(status, result) {
													if (status === 'complete' && result.regeocode) {
														let arr =
															result.regeocode.addressComponent.province +
															'/' +
															result.regeocode.addressComponent.city +
															'/' +
															result.regeocode.addressComponent.district
														let address = result.regeocode.formattedAddress
														document.getElementById('addressCath').innerText=address
													} else {
														log.error('根据经纬度查询地址失败')
													}
												})
											}
											that.map.on('click', function(e) {
												that.map.clearMap();
												let arr=[e.lnglat.lng,e.lnglat.lat]
												that.$refs.longCaths.value=arr[0]
												that.$refs.latCaths.value=arr[1]
												// that.$store.commit('SET_LONGITUDELINE',{})
												// document.getElementById('longCath').innerText=arr[0]
												// document.getElementById('latCath').innerText=arr[1]
												// that.$store.commit('SET_LONGITUDELINE',that.addressObj)
												regeoCode(arr)
												that.addMarker(arr)
											})
										}
									)
		},
		
		geoLocation() {
			let that = this;
			AMap.plugin('AMap.Geolocation', function() {
				var geolocation = new AMap.Geolocation({
					// 是否使用高精度定位，默认：true
					enableHighAccuracy: true,
					// 设置定位超时时间，默认：无穷大
					timeout: 10000,
					// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
					buttonOffset: new AMap.Pixel(10, 20),
					//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					zoomToAccuracy: true,
					//  定位按钮的排放位置,  RB表示右下
					buttonPosition: 'RB',
					showMarker: false,
					showCircle: false,
				})
		
				that.map.addControl(geolocation);
				geolocation.getCurrentPosition(function(status, result) {
					that.initIcon()
					if (status == 'complete') {
						that.GetLocation()
					} else {
						onError(result)
					}
				});
		
				function onComplete(data) {
					that.markerList[0].lat = data.position.lat
					that.markerList[0].lng = data.position.lng
					// that.ownerInstanceObj.callMethod('getCurrentCity',{
					// 	latitude: data.position.lat,
					// 	longitude: data.position.lng
					// })
		
					that.initMarkers()
					// that.getCity()
					// data是具体的定位信息
				}
		
				function onError(data) {
					console.log('error')
					// 定位出错
				}
			})
		},
		getCity() {
			let that = this;
			that.map.plugin('AMap.CitySearch', function() {
				// 实例化CitySearch
				var CitySearch = new AMap.CitySearch();
				CitySearch.getLocalCity(function(status, result) {
					// 搜索成功时，result即是对应的匹配数据
					if (status === 'complete' && result.info === 'OK') {
						if (result && result.city && result.bounds) {
							// that.transData('locationCity', result.city)
							that.ownerInstanceObj.callMethod('locationCity', result.city)
						}
					}
				})
			})
		},
		//初始化标记点
		initMarkers() {
			let that = this;
			this.map.clearMap();
			this.markerList.forEach((item, index) => {
				if (!!item.icon && !index) {
					let icon = new AMap.Icon({
						// 图标尺寸
						size: new AMap.Size(38, 50),
						// 图标的取图地址
						image: '',
						// 图标所用图片大小
						imageSize: new AMap.Size(19, 25),
					});
					//添加点标记
					let marker = new AMap.Marker({
						position: new AMap.LngLat(item.lng, item.lat),
						offset: new AMap.Pixel(-13, -30),
						icon: icon
					})
					this.map.add(marker)
				}
			})
			this.map.on('click', (e) => {
				that.ownerInstanceObj.callMethod('onViewClick', 'down')
			})
			this.map.setZoomAndCenter(16, [this.markerList[0].lng, this.markerList[0].lat]); //定位到您所在的位置
		},
		initIcon(){
			let that=this
			// 创建一个 Icon
			this.startIcon = new AMap.Icon({
				// 图标尺寸
				size: new AMap.Size(25, 34),
				// 图标的取图地址
				image: '',
				// 图标所用图片大小
				imageSize: new AMap.Size(25, 34),
				// 图标取图偏移量
				// imageOffset: new AMap.Pixel(-9, -3)
			})
		},
		markerClick(e) {
			let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
			infoWindow.setContent(e.target.content);
			infoWindow.open(this.map, e.target.getPosition());
		},
		addMarker(arr){
			let marker = new AMap.Marker({
				position: new AMap.LngLat(arr[0], arr[1]),
				offset: new AMap.Pixel(-13, -30),
				icon: this.startIcon
			})
			// marker.content = "<div style='font-size:12px'>" + item[2] + "</div>";
			// marker.on('click', this.markerClick);
			this.map.add(marker)
			this.map.setCenter(arr);
		},
		drive(routeNodes,isAll = false) {
			let routerList = [];
			routeNodes.forEach((item, index) => {
				if (index != routeNodes.length - 1) {
					routerList.push([item.longitude, item.latitude,item.nodeName])
				}else {
					routerList.splice(1,0,[item.longitude, item.latitude,item.nodeName])
				}
			})
			if (this.map && this.endIcon ) {
				if(this.driving && !isAll){
					this.map.clearMap();
					this.driving.clear();
				}else{
					// Driving 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_AMap.Driving
					this.driving = new AMap.Driving({
						map: this.map,
						panel: "panel",
						policy: AMap.DrivingPolicy.REAL_TRAFFIC,
						hideMarkers:true
					});
				}
				this.routeList = routerList
				this.addMarker(routerList)
		
				let waypoints = [];
				if(routerList.length > 2){
					let router = routerList.slice(2)
					router.forEach(item=>{
						waypoints.push(new AMap.LngLat(item[0], item[1]))
					})
				}
				this.driving.search(new AMap.LngLat(routerList[0][0], routerList[0][1]), new AMap.LngLat(routerList[1][0], routerList[1][1]),{
				waypoints:waypoints},
					function(status, result) {
						// result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
						if (status === 'complete') {
							// console.log(result)
						} else {
							console.log('失败：' + result)
						}
					});
			}else{
				setTimeout(()=>{
					this.drive(routeNodes,isAll)
				},500)
			}
		
		},
		searchData(keywords) {
			let that = this;
			this.map.plugin('AMap.AutoComplete', function() {
				// 实例化Autocomplete
				let autoOptions = {
					city: '苏州'
				};
				let autoComplete = new AMap.Autocomplete(autoOptions);
				autoComplete.search(keywords, function(status, result) {
					// 搜索成功时，result即是对应的匹配数据
					let addressList = [];
					if (status === 'complete') {
						addressList = result.tips
					}
					that.ownerInstanceObj.callMethod('getSearchResult', addressList)
				})
			})
		},
		
		updateMap(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			this.ownerInstanceObj = ownerInstance
			if (newValue.routeNodes && newValue.routeNodes.length){
				// #ifndef H5
				if(newValue.routeNodesChange !== oldValue.routeNodesChange){
					this.drive(newValue.routeNodes)
				}
				// #endif
				// #ifdef H5
				this.drive(newValue.routeNodes)
				// #endif
			}
			if (newValue.allRouteNodes && newValue.allRouteNodes.length){
				let allRouteNodes = newValue.allRouteNodes
				allRouteNodes.forEach(item=>{
					this.drive(item,true)
				})
			}
		
			if (newValue.input) {
				this.searchData(newValue.input)
			}
		},
		onClick(event, ownerInstance) {
			console.log(event,"event")
			console.log(ownerInstance,"ownerInstance")
		}
	}
};
</script>

<!-- 组件中的renderjs引用图片好像找不着本地的，所以换成了网络图片，可自行修改 -->
<script module="bmap" lang="renderjs">

export default {
	data() {
		
	},
	created() {
		
	},
	watch:{
		ownerInstanceObj(){
			console.log(this.ownerInstanceObj,"ownerInstanceObj")
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.content {
	#bmap {
		width: 100vw;
		height: 800upx;
	}
	#panel {
		display: none;
	}
	.position {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		z-index: 9999;
		top: 50vh;
		left: 50vw;
	}
}
::v-deep {
	.amap-container {
		height: 800upx !important;
	}
}
.linon_er{
		width: 100vw;
		    padding: 16px;
			box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		input{
			flex: 1;
		}
		input:nth-child(2){
			margin-left: 32upx;
		}
	}
	.left_pad{
		padding: 0 32upx;
		box-sizing: border-box;
	}
	.but_map_box{
		flex: 1;
		text-align: center;
		height: 96upx;
		line-height: 96upx;
		background-color: #F5F6F8;
		color: $uni-color-btn;
		border-radius: 24upx;
	}
	.but_map_box:nth-child(2){
		background-color: $uni-color-btn;
		color: #fff;
		margin-left: 32upx;
	}
	.server-place{
		
		background: #ffffff;
		z-index: 999;
		.map-tools{
			position: fixed;
			width: 100%;
			bottom: 30rpx;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.my-location{
				width: 90%;
				margin: 0 auto;
				height: 120rpx;
				box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				overflow: hidden;
				.left{
					background: #3384ff;
					// flex: 20%;
					width: 120rpx;
					height: 100%;
				}
				.right{
					margin-left: 20rpx;
					color: #111;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					flex-direction: column;
					.title{
						font-size: 28rpx;
						font-weight: bold;
					}
					.text{
						font-size: 26rpx;
						width: 500rpx;
						overflow: hidden;
						white-space:nowrap;
						text-overflow: ellipsis;
						color: #3384FF;
						margin-top: 10rpx;
					}
				}
			}
			
			.start-place{
				width: 85%;
				margin: 0 auto;
				margin: 0 auto;
				margin-top: 20rpx;
				box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 20rpx;
				padding: 20rpx;
				.place{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.title{
						font-size: 28rpx;
						font-weight: bold;
						color: #111;
					}
					.text{
						font-size: 28rpx;
						color: #3384FF;
						font-weight: bold;
						width: 450rpx;
						display: inline-block;
						overflow: hidden;
						white-space:nowrap;
						text-overflow: ellipsis;
					}
				}
				.tip{
					font-size: 22rpx;
					color: #666;
					margin-top: 15rpx;
				}
				.sure{
					margin-top: 15rpx;
					color: #FFFFFF;
					background: #212121;
					font-weight: blod;
					font-size: 32rpx;
				}
				
			}
		}
	}
</style>
