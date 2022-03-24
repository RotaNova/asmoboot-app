<template>
	<view>
		<u-navbar title=""  @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="mt35">
			<h2>找回密码</h2>
			<p class="font12 mt10">
				<text class="welcome">请输入要找回密码的</text>
				<text>账户</text>
			</p>
			<view class="password_area">
				<input type="text" placeholder="请输入账户" class="input_class" v-model="account" />
				<button class="button_btn mt24" @tap="getBindInfo">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
import { getBindInfo } from '../../api/login.js';
export default {
	data() {
		return {
			account: ''
		};
	},
	methods: {
		
		// 下一步
		getBindInfo() {
			if (!this.account) return this.$showToast('error', '账户不能为空');
			let param={
				userAccountName:this.$keyCode(this.account )
			}
			this.$Axios.post(getBindInfo,param).then(res=>{
				this.$store.commit('SET_USERNAME',this.account)
				let phone=res.phone?res.phone:""
				let email=res.email?res.email:""
				this.$jumpPlatform('./wayBack?phone='+phone+'&email='+email)
			}).catch(()=>{})
			
		}
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
