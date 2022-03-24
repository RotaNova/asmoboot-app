<template>
	<view class="view_con">
		<u-navbar title="找回密码" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="main_bgc_white">
			<h2 v-if="id == 1">手机号码验证码</h2>
			<h2 v-else>邮箱验证码验证</h2>
			<p class="font12 mt10">
				<text class="welcome">验证码将发送到</text>
				<text v-if="id == 1">手机号{{ name }}</text>
				<text v-else>邮箱{{ name }}</text>
			</p>
			<view class="password_area">
				<view class="mt10 posireave">
					<input type="number" placeholder="输入验证码" class="input_class verification_code" v-model="verCode" />
					<text class="auth_code" @click="getCode" v-if="gCode == 60">获取验证码</text>
					<text class="auth_code" v-else>{{ gCode }}秒后重新获取</text>
				</view>
				<input type="text" placeholder="输入新密码" class="input_class mt16" v-model="newPassword" password/>
				<input type="text" placeholder="确认新密码" class="input_class mt16" v-model="determine" password/>
			</view>
			<button class="button_btn mt24" @tap="determinePassword" :disabled="disadled">确定</button>
		</view>
		<u-modal :show="show" @confirm="confirm" ref="uModal" :asyncClose="true" showCancelButton @cancel="show = false">
			<view style="width:100%">
				<view class="img_code">图片验证码</view>
				<view class="dis_flex mt24">
					<input type="text" placeholder="输入验证码" class="input_class" v-model="code" style="flex: 1;" />
					<image :src="src" alt="" style="flex: 1;height:96upx" id="img" @tap="getCodeImage"></image>
				</view>
				<view class="invisibility" @tap="getCodeImage">看不清?换一张</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
import { getVerify, sendRetrievePwPhoneCaptcha, updatePhonePasswordByCode } from '../../api/login.js';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			gCode: 60,
			id: '',
			name: '',
			show: false,
			code: '',
			src: '',
			timer: null,
			newPassword: undefined,
			determine: undefined,
			verCode: undefined,
			disadled:false
		};
	},
	onLoad: function(option) {
		this.id=option.id
		this.name=option.name
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
		// 确定密码
		determinePassword() {
			if (!this.verCode) return this.$showToast('error', '请输入验证码');
			if (!this.newPassword || !this.determine) return this.$showToast('error', '请输入新密码');
			if (this.newPassword != this.determine) return this.$showToast('error', '密码不一致');
			this.disadled=true
			let param = {
				captcha: this.verCode,
				newPassword: this.$keyCode(this.newPassword),
				userAccountName: this.$keyCode(this.userAccountName)
			};
			this.$Axios
				.post(updatePhonePasswordByCode, param)
				.then(res => {
					uni.showToast({
						title: '修改成功,自动跳转登录页',
						icon: 'none',
						duration: 2000
					});
					setTimeout(() => {
						this.disadled=false
						uni.reLaunch({
							url: '../index/index'
						});
					}, 2000);
				})
				.catch(() => {});
		},
		// 确定验证码
		confirm() {
			let that = this;
			if (!this.code) return this.$showToast('error', '验证码不能为空');
			let param = {
				captcha: this.code,
				userAccountName: this.$keyCode(this.userAccountName)
			};
			this.$Axios.post(sendRetrievePwPhoneCaptcha, param).then(res => {
				that.show = false;
				that.gCode--;
				uni.hideLoading();
				uni.$u.toast('验证码已发送');
				that.timer = setInterval(() => {
					that.gCode--;
				}, 1000);
				console.log(res);
			});
		},
		rightClick() {
			console.log('rightClick');
		},
		// 获取图片验证码
		getCodeImage() {
			this.src = '';
			let param = {
				userAccountName: this.$keyCode(this.userAccountName)
			};
			this.$Axios.post(getVerify, param).then(res => {
				this.src = 'data:image/jepg;base64,' + res;
			});
		},
		// 验证码
		getCode() {
			this.show = true;
			this.getCodeImage()
		}
	},
	computed: {
		...mapGetters(['userAccountName'])
	}
};
</script>

<style lang="scss" scoped>
h2 {
	font-size: 72upx;
}
.main_bgc_white {
	box-sizing: border-box;
	flex: 1;
	padding: 96upx;
}
.welcome {
	color: $uni-text-color-bo;
}
.font12 {
	font-size: 12px;
}
.dis_flex {
	display: flex;
}
.img_code {
	font-size: 40upx;
	font-weight: bold;
}
.invisibility {
	text-align: right;
	font-size: 12px;
	color: $uni-color-sh;
}
</style>
