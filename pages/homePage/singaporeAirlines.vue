<template>
	<view class="view_con">
		<u-navbar title="关于新航物联网平台" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="view_main">
			<view class="versions">
				
			</view>
			<view class="versions_son">
				版本号 v1.1.0
			</view>
			<view class="list_main">
				<view class="list_content" @tap="$jumpPlatform('../login/serveAgreen')">
					<text class="contend_left">关于新航</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
				
				<view class="list_content" @tap="$jumpPlatform('../login/serveAgreen')">
					<text class="contend_left">用户协议</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
				<view class="list_content" @tap="$jumpPlatform('../login/serveAgreen')">
					<text class="contend_left">服务协议</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
				<view class="list_content" @tap="$jumpPlatform('../login/serveAgreen')">
					<text class="contend_left">隐私条款</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { getSecuritySettings } from '../../api/homePage.js';
export default {
	data() {
		return {
			form: {},
			id: ''
		};
	},
	onLoad: function(option) {},
	onShow() {
		this.getSecurity();
	},
	methods: {
		// 打开手机号相关
		phoneRelated(id) {
			this.id = id;
			this.show = true;
		},
		// 绑定解绑手机号
		modifyThePhone(id) {
			if (this.id == 1) {
				this.$jumpPlatform('./modifyPhone?form=' + encodeURIComponent(JSON.stringify(this.form)) + '&id=' + id);
			} else {
				this.$jumpPlatform('./modifyEmail?form=' + encodeURIComponent(JSON.stringify(this.form)) + '&id=' + id);
			}

			this.show = false;
		},
		// 打开二次验证
		openValidation() {
			this.$jumpPlatform('./loginValidation?form=' + encodeURIComponent(JSON.stringify(this.form)));
		},
		// 获取账户设置情况
		getSecurity() {
			this.$Axios
				.get(getSecuritySettings)
				.then(res => {
					this.$store.commit('SET_PASSWORD', res.data.passwordStrength);
					this.$store.commit('SET_USEREMAIL', res.data.userSafeEmail);
					this.$store.commit('SET_USERPHONE', res.data.userSafePhone);
					this.form = res.data;
				})
				.catch(() => {});
		},
		openChangPas() {
			this.$jumpPlatform('./changePassword');
		}
	}
};
</script>

<style lang="scss" scoped>
.per_disflex {
	display: flex;
	margin-left: 20upx;
}
.versions{
	width: 64px;
	height: 64px;
	background: $uni-color-ver;
	border-radius: 16px;
	margin: 0 auto;
	margin-top: 108upx;
}
.versions_son{
	color: $uni-text-color-bo;
	margin-top: 32upx;
	text-align: center;
	font-size: 28upx;
	margin-bottom: 80upx;
}
</style>
