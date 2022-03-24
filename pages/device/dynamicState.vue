<template>
	<view class="dynanic_flex">
		<scroll-view @scrolltolower="scrolltolower" scroll-y="true" class="flex dynanic">
			<view class="dynanic_list" v-for="item in dataList">
				<view class="dynanic_list_name">{{ item.name }}</view>
				<view class="dynanic_list_type" v-if="id==5">{{ item.content }}</view>
				<view class="dynanic_list_type" v-else>{{ item.subtitle }}</view>
				<view class="dynanic_list_type mt8">{{ $getdate(item.timestamp, 1) }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getDynamicInfoPageList } from '@/api/device.js';
import { mapGetters } from 'vuex';
export default {
	props: {
		infoType: Number
	},
	data() {
		return {
			pageNum: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			id: null
		};
	},
	watch: {
		id(val) {
			this.infoType = val;
			this.dataList=[]
			this.pageNum = 1;
			this.getDynamicInfoPage();
		}
	},
	mounted() {
		this.getDynamicInfoPage();
	},
	methods: {
		// 上拉加载
		scrolltolower(e) {
			if (this.pageNum > this.total) return;
			this.getDynamicInfoPage();
		},
		// 获取信息
		getDynamicInfoPage() {
			uni.showLoading({
				title: '加载中'
			});
			if (this.pageNum == 1) {
				this.dataList = [];
			}
			let param = {
				deviceId: this.device_id,
				infoType: this.infoType,
				pageNum: this.pageNum,
				pageSize: this.pageSize
			};
			this.$Axios
				.post(getDynamicInfoPageList, param)
				.then(res => {
					this.dataList = [...this.dataList, ...res.records];
					this.total = res.pages;
					this.pageNum++;
				})
				.catch(() => {})
				.finally(() => {
					uni.hideLoading();
				});
		}
	},
	computed: {
		...mapGetters(['device_id'])
	}
};
</script>

<style lang="scss" scoped>
.dynanic_flex {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.dynanic {
	padding: 0 32upx;
	flex: 1;
	box-sizing: border-box;
	overflow: auto;
	.dynanic_list {
		padding: 32upx 16upx;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(224, 232, 243, 0.39);
		font-size: 28upx;
		.dynanic_list_name {
			color: $uni-color-form;
		}
		.dynanic_list_type {
			margin-top: 8upx;
			color: $uni-text-color-bo;
		}
		.mt8 {
			margin-top: 16upx;
		}
	}
}
</style>
