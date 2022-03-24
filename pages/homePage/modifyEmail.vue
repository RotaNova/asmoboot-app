<template>
	<view>
		<u-navbar :title="title" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="mt35">
			<h2>{{ title }}</h2>
			<p class="font12 mt10">
				<text class="welcome" v-if="id==3">
					请输入
					<text class="Verify_word">要绑定的邮箱地址</text>
				</text>
				<text class="welcome" v-else>
					验证码将发送到
					<text class="Verify_word">邮箱{{ form.userSafeEmail?dataEncryption(form.userSafeEmail):dataEncryption(form.userEmail) }}上</text>
				</text>
			</p>

			<view class="password_area">
				<input type="text" placeholder="输入邮箱" class="input_class mt16" v-model="phones" v-if="id == 2 || id == 3" />
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
import { sendUnbindEmailVerificationCode, unbindMailbox, sendBindEmailVerificationCode, bindMailbox } from '../../api/homePage.js';
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
				return (this.title = '解绑邮箱');
			case 2:
				return (this.title = '绑定邮箱');
			case 3:
				return (this.title = '修改绑定邮箱');
			case 4:        
				return (this.title = '认证邮箱');
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
		// 解绑或绑定邮箱
		confirmPassword() {
			if (this.id == 2 && !this.phones) return this.$showToast('error', '邮箱不能为空');
			if (!this.veailCode) return this.$showToast('error', '验证码不能为空');
			let param = {
				verificationCode: this.veailCode
			};
			let url = '';
			if (this.id == 1) {
				url = unbindMailbox; // 解绑
			} else {
				url = bindMailbox; // 绑定
				param.mailbox = this.phones;
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
		// 获取解绑和绑定邮箱验证码
		getCodeEmail() {
			if (this.id == 2 && !this.phones) return this.$showToast('error', '邮箱不能为空');
			uni.showLoading({
				title: '正在发送验证码'
			});
			let param = {
				phone: ''
			};
			let url = '';
			if (this.id == 1) {
				url = sendUnbindEmailVerificationCode; // 获取解绑
			} else {
				param.mailbox = this.phones;
				url = sendBindEmailVerificationCode; // 获取绑定
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
