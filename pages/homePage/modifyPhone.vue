<template>
	<view>
		<u-navbar :title="title" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="mt35">
			<h2>{{ title }}</h2>
			<p class="font12 mt10">
				<text class="welcome">
					验证码将发送到
					<text class="Verify_word">手机号{{ form.userSafePhone?dataEncryption(form.userSafePhone): dataEncryption(form.userPhone)}}上</text>
				</text>
			</p>

			<view class="password_area">
				<!-- 旧密码修改 -->
				<input type="text" placeholder="输入手机号" class="input_class mt16" v-model="phones" v-if="id == 2 || id == 3" />
				<view class="dis_lines mt10">
					<view class=" posireave">
						<input type="number" placeholder="输入验证码" class="input_class verification_code" v-model="veailCode" />
						<text class="auth_code" @click="getCodeEmail" v-if="gCode == 60">获取验证码</text>
						<text class="auth_code" v-else>{{ gCode }}秒后重新获取</text>
					</view>
				</view>
				<button class="button_btn mt24" @tap="confirmPassword">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
import { sendUnbindPhoneVerificationCode, unbindPhone, sendBindPhoneVerificationCode, bindPhone } from '../../api/homePage.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			gCode: 60,
			timer: null,
			form: {},
			veailCode: '',
			id: '',
			phones: '',
			title: ''
		};
	},
	onLoad: function(option) {
		console.log(option, 'option');
		this.form = JSON.parse(decodeURIComponent(option.form));
		this.id = parseInt(option.id);
		switch (this.id) {
			case 1:
				return (this.title = '解绑手机号');
			case 2:
				return (this.title = '绑定手机号');
			case 3:
				return (this.title = '修改手机号');
			case 4:        
				return (this.title = '认证手机号');
			default:
				break;
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
		// 解绑或绑定手机号
		confirmPassword() {
			if (this.id == 2 && !this.phones) return this.$showToast('error', '手机号不能为空');
			if (!this.veailCode) return this.$showToast('error', '验证码不能为空');
			let param = {
				verificationCode: this.veailCode
			};
			let url = '';
			if (this.id == 1) {
				url = unbindPhone; // 解绑
			} else if(this.id == 4) {
				param.phone=this.form.userPhone
			}else{
				url = bindPhone; // 绑定
				param.phone = this.phones;
			}
			
			this.$Axios.put(url, param).then(res => {
				if (this.id == 1) {
					this.$showToast('error', '解绑成功');
				} else if(this.id == 2) {
					this.$showToast('error', '绑定成功');
				}else if(this.id == 3) {
					this.$showToast('error', '修改成功');
				}else{
					this.$showToast('error', '认证成功');
				}

				setTimeout(() => {
					this.$leftClick();
				}, 1000);
			});
		},
		// 获取解绑和绑定手机号验证码
		getCodeEmail() {
			if (this.id == 2 && !this.phones) return this.$showToast('error', '手机号不能为空');
			uni.showLoading({
				title: '正在发送验证码'
			});
			let param = {
				phone: ''
			};
			let url = '';
			if (this.id == 1) {
				url = sendUnbindPhoneVerificationCode; // 获取解绑
			} else {
				param.phone = this.phones;
				url = sendBindPhoneVerificationCode; // 获取绑定
			}
			this.$Axios.post(url, param).then(res => {
				this.gCode--;
				uni.hideLoading();
				this.timer = setInterval(() => {
					this.gCode--;
				}, 1000);
			});
		}
	},
	computed: {
		...mapGetters(['passwordStrength'])
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
	font-size: 72upx;
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
</style>
