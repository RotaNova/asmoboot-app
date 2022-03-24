<template>
	<view class="view_con">
		<u-navbar title="修改密码" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="view_main">
			<view class="list_main">
				<view class="list_content" @tap="openVerify(1)">
					<text class="contend_left">通过旧密码</text>
					<view class="per_disflex">
						<text class="contend_right">去修改</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="openVerify(2)">
					<text class="contend_left">通过手机验证码</text>
					<view class="per_disflex">
						<text class="contend_right">{{userSafePhone?'去修改':' 未绑定'}}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="openVerify(3)">
					<text class="contend_left">通过邮箱验证码</text>
					<view class="per_disflex">
						<text class="contend_right">{{userSafeEmail?'去修改':' 未绑定'}}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {};
	},
	onLoad: function(option) {},
	methods: {
		// 打开
		openVerify(id) {
			switch (id) {
				case 1:
					return this.$jumpPlatform('./confirmPassword?id=' + id);
				case 2:
					if (this.userSafePhone) {
						return this.$jumpPlatform('./confirmPassword?id=' + id);
					} else {
						this.$showToast('error', '未绑定手机');
					}
					break;
				case 3:
					if (this.userSafeEmail) {
						return this.$jumpPlatform('./confirmPassword?id=' + id);
					} else {
						this.$showToast('error', '未绑定邮箱');
					}
					break;
				default:
					break;
			}
		}
	},
	computed: {
		...mapGetters(['userSafePhone', 'userSafeEmail'])
	}
};
</script>

<style lang="scss" scoped>
.kaiqi {
	color: $uni-color-success;
}
.per_disflex {
	display: flex;
	margin-left: 20upx;
}
::v-deep {
	.u-popup {
		flex: none;
	}
}
</style>
