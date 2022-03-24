<template>
	<view>
		<u-navbar title="修改密码" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="mt35">
			<h2 v-if="id == 1">设置新密码</h2>
			<h2 v-else-if="id == 2">输入短信验证码</h2>
			<h2 v-else>输入邮箱验证码</h2>
			<p class="font12 mt10" v-if="id == 1">
				<text class="welcome" v-if="passwordStrength == 1">密码由不少于<text class="Verify_word">6位数字</text>、大小写字母组成</text>
				<text class="welcome" v-else-if="passwordStrength == 2">密码由不少于<text class="Verify_word">7位数字</text>、大小写字母和符号组成</text>
				<text class="welcome" v-else>密码由不少于<text class="Verify_word">8位数字</text>、大小写字母和特殊符号组成</text>
			</p>
			<p class="font12 mt10" v-else-if="id == 2">
				<text class="welcome">验证码将发送到</text>
				<text>手机号{{ dataEncryption(userSafePhone) }}</text>
			</p>
			<p class="font12 mt10" v-else>
				<text class="welcome">验证码将发送到</text>
				<text>邮箱{{ dataEncryption(userSafeEmail) }}</text>
			</p>
			<view class="password_area">
				<!-- 旧密码修改 -->
				<view v-if="id == 1">
					<input type="text" placeholder="请输入旧密码" class="input_class" password v-model="oldPas" />
					<input type="text" placeholder="请输入新密码" class="input_class mt16" password v-model="newPas" />
					<input type="text" placeholder="确认新密码" class="input_class mt16" password v-model="endPas" />
				</view>
				<!-- // 邮箱验证码验证 -->
				<view class="dis_lines" v-else>
					<view class="mt10 posireave">
						<input type="number" placeholder="输入验证码" class="input_class verification_code" v-model="veailCode" />
						<text class="auth_code" @click="getCodeEmail" v-if="gCode == 60">获取验证码</text>
						<text class="auth_code" v-else>{{ gCode }}秒后重新获取</text>
					</view>
				</view>

				<button class="button_btn mt24" v-if="id == 1" @tap="confirmPassword">确定</button>
				<button class="button_btn mt24" v-else @click="nextStep">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
import { updatePasswordByOldPassword ,sendUpdateEmailVerificationCode,checkUpdateEmailVerificationCode,sendUpdatePhoneVerificationCode,checkUpdatePhoneVerificationCode} from '../../api/homePage.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			id: '',
			oldPas: '',
			newPas: '',
			endPas: '',
			gCode: 60,
			timer: null,
			veailCode:""
		};
	},
	onLoad: function(option) {
		this.id = option.id;
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
		nextStep(){
			if(!this.veailCode) return this.$showToast('error', '验证码不能为空');
			let param={
				verificationCode:this.veailCode
			}
			let url=""
			if(this.id==2){
				url=checkUpdatePhoneVerificationCode
			}else{
				url=checkUpdateEmailVerificationCode
			}
			this.$Axios.post(url,param).then(res=>{
				this.$jumpPlatform('./eventuallyPassword?id='+this.id)
			})
			
		},
		// 获取邮箱验证码 
		getCodeEmail(){
			uni.showLoading({
				title: '正在发送验证码'
			});
			let url=""
			if(this.id==2){
				url=sendUpdatePhoneVerificationCode
			}else{
				url=sendUpdateEmailVerificationCode
			}
			this.$Axios.post(url).then(res=>{
				this.gCode--;
				uni.hideLoading();
				this.timer = setInterval(() => {
					this.gCode--;
				}, 1000);
			})
		},
		// 确定改密码
		confirmPassword() {
			console.log(this.passwordStrength, 'passwordStrength');
			if (!this.oldPas) return this.$showToast('error', '旧密码不能为空');
			if (!this.newPas || !this.endPas) return this.$showToast('error', '密码不能为空');
			if (this.newPas != this.endPas) return this.$showToast('error', '新密码输入不一致');
			if (!this.$canonical(this.newPas, this.passwordStrength)) return this.$showToast('error', '密码不符合规范');
			let param = {
				newPassword: this.$keyCode(this.newPas),
				oldPassword: this.$keyCode(this.oldPas)
			};
			this.$Axios.put(updatePasswordByOldPassword, param).then(res => {
				this.$showToast('success', '修改成功,请重新登录');
				setTimeout(() => {
					this.$store.commit('SET_logout');
					uni.reLaunch({
						url: '../index/index'
					});
				}, 2000);
			});
		}
	},
	computed: {
		...mapGetters(['passwordStrength', 'userSafePhone', 'userSafeEmail'])
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

</style>
