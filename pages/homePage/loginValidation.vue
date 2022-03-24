<template>
	<view class="view_con">
		<u-navbar title="登录二次认证" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="view_main">
			<view class="list_main">
				<view class="list_content" @tap="openVerify(1)">
					<text class="contend_left">密保手机保护</text>
					<view class="per_disflex">
						<text class="contend_right" :class="form.phoneSafeType ? 'kaiqi' : ''">{{ form.phoneSafeType ? '已开启' : '未开启' }}</text>
						<text v-if="form.phoneSafeType" class="kaiqi">{{ form.phoneSafeType == 1 ? '完整度验证' : '验证码验证' }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="openVerify(2)">
					<text class="contend_left">密保邮箱保护</text>
					<view class="per_disflex">
						<text class="contend_right" :class="form.emailSafeType ? 'kaiqi' : ''">{{ form.emailSafeType ? '已开启' : '未开启' }}</text>
						<text v-if="form.emailSafeType" class="kaiqi">{{ form.emailSafeType == 1 ? '完整度验证' : '验证码验证' }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-action-sheet
			:actions="list"
			@select="selectClick"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
			title="设置验证方式"
			:show="show"
			cancelText="取消"
			@close="show = false"
			style="color: #007AFF;"
		></u-action-sheet>
	</view>
</template>

<script>
import { loginSecondaryAuthentication } from '../../api/homePage.js';
export default {
	data() {
		return {
			form: {},
			list: [
				{
					name: '关闭'
				},
				{
					name: '完整度验证'
				},
				{
					name: '验证码验证'
				}
			],
			show: false,
			id: ''
		};
	},
	onLoad: function(option) {
		this.form = JSON.parse(decodeURIComponent(option.form));
	},
	methods: {
		// 打开
		openVerify(id) {
			if (id == 1 && !this.form.userSafePhone) return this.$showToast('error', '未绑定手机号');
			if (id == 2 && !this.form.userSafeEmail) return this.$showToast('error', '未绑定邮箱');
			this.id = id;
			this.show = true;
		},
		// 选择验证方式
		selectClick(index) {
			uni.showLoading({
				title: '修改中'
			});
			let obj = {
				关闭: 0,
				完整度验证: 1,
				验证码验证: 2
			};
			let param = {};
			if (this.id == 1) {
				param.phoneSafeType = obj[index.name];
				param.emailSafeType = this.form.emailSafeType;
			} else {
				param.emailSafeType = obj[index.name];
				param.phoneSafeType = this.form.phoneSafeType;
			}
			this.$Axios.put(loginSecondaryAuthentication, param).then(res => {
				this.form.emailSafeType = param.emailSafeType;
				this.form.phoneSafeType = param.phoneSafeType;
				uni.hideLoading();
			});
		}
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
