<template>
	<view class="home_index">
		<deviceGroup v-if="code == 0" />
		<equipment v-else-if="code == 1" />
		<view style="height: 0upx">
			<u-tabbar :value="tabbarValue" :fixed="true" :placeholder="true" :safeAreaInsetBottom="false">
				<u-tabbar-item text="分组" @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="@/static/grouping_icon.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/grouping_on.png"></image>
				</u-tabbar-item>
				<u-tabbar-item text="设备"  @click="click1">
					<image class="u-page__item__slot-icon" slot="active-icon" src="@/static/device_on.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/device_off.png"></image>
				</u-tabbar-item>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
import deviceGroup from './deviceGroup';
import equipment from './equipment';
export default {
	data() {
		return {
			tabbarValue: 0,
			code: 0
		};
	},
	methods: {
		click1(e) {
			this.code = e;
			this.tabbarValue = e;
			console.log(this.code);
		}
	},
	components: {
		deviceGroup,
		equipment
	}
};
</script>

<style lang="scss" scoped>
.home_index {
	height: 100vh;
	background-color: $uni-bg-color;
	display: flex;
}
.u-tabbar {
	height: 150upx;
}
.home_content {
	flex: 1;
}
::v-deep {
	.u-tabbar__content {
		height: 130upx;
	}
}
image{
	width: 40upx;
	height: 40upx;
}
</style>
