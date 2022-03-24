<template>
	<view>
		<u-navbar title="" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="mt35">
			<!-- <p>首次登录,设置新密码</p> -->
			<h2 style="font-size: 68upx;margin-top:0;">首次登录设置密码</h2>
			<p class="font12 mt10">
				<text class="welcome" v-if="passwordStrength == 1">
					密码由不少于6位数字
					<!-- <text class="Verify_word">6位数字</text> -->
					、大小写字母组成
				</text>
				<text class="welcome" v-else-if="passwordStrength == 2">
					密码由不少于7位数字
					<!-- <text class="Verify_word">7位数字</text> -->
					、大小写字母和符号组成
				</text>
				<text class="welcome" v-else>
					密码由不少于8位数字
					<!-- <text class="Verify_word">8位数字</text> -->
					、大小写字母和特殊符号组成
				</text>
			</p>
			<view class="password_area">
				<!-- 旧密码修改 -->
				<input type="text" placeholder="请输入新密码" class="input_class mt16" password v-model="newPas" />
				<input type="text" placeholder="确认新密码" class="input_class mt16" password v-model="endPas" />

				<button class="button_btn mt24" @tap="confirmPassword">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
import { updateFirstPassword, passWordLogin } from '@/api/login.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			id: '',
			newPas: '',
			endPas: '',
			userAccountName: '',
			newUserPassword: ''
		};
	},
	onLoad: function(option) {
		this.userAccountName = option.userAccountName;
		this.newUserPassword = option.newUserPassword;
	},

	methods: {
		// 确定改密码
		confirmPassword() {
			if (!this.newPas || !this.endPas) return this.$showToast('error', '密码不能为空');
			if (this.newPas != this.endPas) return this.$showToast('error', '新密码输入不一致');
			if (!this.$canonical(this.newPas, this.passwordStrength)) return this.$showToast('error', '密码不符合规范');
			uni.showLoading({
				title: '加载中'
			});
			let param = {
				userAccountName: this.userAccountName,
				oldUserPassword: this.newUserPassword,
				newUserPassword: this.newPas
			};
			this.$Axios
				.put(updateFirstPassword, param)
				.then(res => {
					this.passwordLogin();
				})
				.catch(() => {})
				.finally(() => {
					uni.hideLoading();
				});
		},
		// 账户密码登录
		passwordLogin() {
			uni.showLoading({
				title: '加载中'
			});
			let param = {
				userAccountName: this.userAccountName,
				userPassword: this.newPas
			};
			setTimeout(() => {
				uni.hideLoading();
			}, 2000);
			this.$Axios
				.post(passWordLogin, param)
				.then(res => {
					this.$redirectTo('../homePage/index');
					this.$store.commit('SET_LOGIN', res);
					this.$store.commit('SET_ACCOUNT', param);
				})
				.catch(() => {})
				.finally(() => {
					uni.hideLoading();
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
