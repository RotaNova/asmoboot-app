<template>
	<view>
		<u-navbar title="登录二次验证" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="mt35">
			<h2 v-if="id == 1">{{ type == 1 ? '手机号完整度验证' : '手机验证码验证' }}</h2>
			<h2 v-else>{{ type == 1 ? '邮箱完整度验证' : '邮箱验证码验证' }}</h2>
			<p class="font12 mt10" v-if="type == 1">
				<text class="welcome">请将</text>
				<text>{{ id == 1 ? '手机号' : '邮箱' }} {{ this.name }}</text>
				<text class="welcome">补充完整</text>
			</p>
			<p class="font12 mt10" v-else>
				<text class="welcome">验证码将发送到</text>
				<text>{{ id == 1 ? '手机号' : '邮箱' }} {{ this.name }}</text>
			</p>
			<view class="password_area">
				<!-- // 手机完整度验证 -->
				<view class="dis_lines" v-if="id == 1 && type == 1">
					<text class="font28">{{ front }}</text>
					<input type="number" placeholder="" class="input_class font28" v-model="account" style="text-align: center;" />
					<text class="font28">{{ back }}</text>
				</view>
				<!-- // 邮箱完整度验证 -->
				<view class="dis_lines" v-if="id == 2 && type == 1">
					<input type="text" placeholder="" class="input_class" v-model="account" />
					<text class="font28">{{ emails }}</text>
				</view>
				<!-- // 手机号验证码验证 -->
				<view class="dis_lines" v-if="id == 1 && type == 2">
					<view class="mt10 posireave">
						<input type="number" placeholder="输入验证码" class="input_class verification_code" v-model="phoneCode" />
						<text class="auth_code" @click="getCodePhone" v-if="gCode == 60">获取验证码</text>
						<text class="auth_code" v-else>{{ gCode }}秒后重新获取</text>
					</view>
				</view>
				<!-- // 邮箱验证码验证 -->
				<view class="dis_lines" v-if="id == 2 && type == 2">
					<view class="mt10 posireave">
						<input type="number" placeholder="输入验证码" class="input_class verification_code" v-model="emailCode" />
						<text class="auth_code" @click="getCodeEmail" v-if="gCode == 60">获取验证码</text>
						<text class="auth_code" v-else>{{ gCode }}秒后重新获取</text>
					</view>
				</view>

				<button class="button_btn mt24" @tap="confirmInfo">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
import { getBindInfo, mobilePhoneIntegrityVerification, sendSecondaryEmailVerificationCode, secondEmailLogin, sendSecondPhoneVerificationCode,secondPhoneLogin,mobileEmailIntegrityVerification } from '../../api/login.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			account: '',
			id: undefined,
			type: undefined,
			name: undefined,
			front: '',
			back: '',
			emails: undefined,
			phoneCode: undefined,
			gCode: 60,
			emailCode: undefined
		};
	},
	onLoad: function(option) {
		this.id = option.id;
		this.type = option.type;
		this.name = option.name;
		if (this.id == 1 && this.type == 1) {
			this.front = this.name.substring(0, 3);
			this.back = this.name.substring(this.name.length - 4, this.name.length);
		}
		if (this.id == 2 && this.type == 1) {
			var index = this.name.indexOf('@');
			this.emails = this.name.substring(index);
		}
	},
	watch: {
		gCode(val) {
			if (val == 0) {
				clearInterval(this.timer);
				this.gCode = 60;
			}
		}
	},
	methods: {
		// 下一步
		confirmInfo() {
			if (this.id == 1 && this.type == 1) {
				if (!this.account) return;
				this.phoneCodeLogin();
			} else if (this.id == 2 && this.type == 2) {
				this.emailCodeLogin();
			} else if (this.id == 2 && this.type == 1) {
				this.emailIntegrityLogin();
			} else {
				this.phoneVerification();
			}
		},
		// 手机验证码登录
		phoneVerification() {
			if (!this.phoneCode) return;
			uni.showLoading({
				title: '正在登录'
			});
			let param = {
				userAccountName: this.$keyCode(this.userAccountName),
				verificationCode: this.phoneCode,
				loginLocation: ''
			};
			this.$Axios
				.post(secondPhoneLogin, param)
				.then(res => {
					uni.hideLoading();
					uni.reLaunch({
						url: '../homePage/index'
					});
					this.$store.commit('SET_LOGIN', res);
				})
				.catch(() => {});
		},
		// 获取手机验证码
		getCodePhone() {
			let that = this;
			uni.showLoading({
				title: '正在发送验证码'
			});
			let param = {
				userAccountName: this.$keyCode(this.userAccountName),
			};
			this.$Axios
				.post(sendSecondPhoneVerificationCode, param)
				.then(res => {
					uni.hideLoading();
					that.gCode--;
					that.timer = setInterval(() => {
						that.gCode--;
					}, 1000);
				})
				.catch(() => {});
		},
		// 手机号码完整度登录
		phoneCodeLogin() {
			uni.showLoading({
				title: '正在登录'
			});
			let param = {
				phone: this.front + this.account + this.back,
				userAccountName: this.$keyCode(this.userAccountName),
				loginLocation: ''
			};
			this.$Axios
				.post(mobilePhoneIntegrityVerification, param)
				.then(res => {
					uni.hideLoading();
					uni.reLaunch({
						url: '../homePage/index'
					});
					this.$store.commit('SET_LOGIN', res);
				})
				.catch(() => {});
		},
		// 邮箱完整度登录
		emailIntegrityLogin() {
			if(!this.account) return
			uni.showLoading({
				title: '正在登录'
			});
			let param = {
				mailbox: this.account + this.emails,
				userAccountName: this.$keyCode(this.userAccountName),
				loginLocation: ''
			};
			this.$Axios
				.post(mobileEmailIntegrityVerification, param)
				.then(res => {
					uni.hideLoading();
					uni.reLaunch({
						url: '../homePage/index'
					});
					this.$store.commit('SET_LOGIN', res);
				})
				.catch(() => {});
		},
		// 邮箱验证码登录
		emailCodeLogin() {
			uni.showLoading({
				title: '正在登录'
			});
			let param = {
				userAccountName: this.$keyCode(this.userAccountName),
				verificationCode: this.emailCode,
				loginLocation: ''
			};
			this.$Axios
				.post(secondEmailLogin, param)
				.then(res => {
					uni.hideLoading();
					uni.reLaunch({
						url: '../homePage/index'
					});
					this.$store.commit('SET_LOGIN', res);
				})
				.catch(() => {});
		},
		// 获取邮箱验证码
		getCodeEmail() {
			let that = this;
			uni.showLoading({
				title: '正在发送验证码'
			});
			let param = {
				userAccountName: this.$keyCode(this.userAccountName)
			};
			this.$Axios.post(sendSecondaryEmailVerificationCode, param).then(res => {
				uni.hideLoading();
				that.gCode--;
				that.timer = setInterval(() => {
					that.gCode--;
				}, 1000);
			});
		}
	},
	computed: {
		...mapGetters(['userAccountName'])
	}
};
</script>

<style lang="scss" scoped>
.mt35 {
	margin-top: 70upx;
	padding: 0 96upx;
	box-sizing: border-box;
}
h2 {
	font-size: 70upx;
	margin-top: 8vh;
}
.font12 {
	font-size: $uni-font-size-sm;
}
.welcome {
	color: $uni-text-color-bo;
}
.dis_lines {
	display: flex;
	align-items: center;
}
.font28 {
	font-size: 56upx;
	color: $uni-color-form;
}
</style>
