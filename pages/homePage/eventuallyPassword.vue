<template>
	<view>
		<u-navbar title="修改密码" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="mt35">
			<h2 v-if="id == 1">设置新密码</h2>
			
			<p class="font12 mt10">
				<text class="welcome" v-if="passwordStrength == 1">密码由不少于<text class="Verify_word">6位数字</text>、大小写字母组成</text>
				<text class="welcome" v-else-if="passwordStrength == 2">密码由不少于<text class="Verify_word">7位数字</text>、大小写字母和符号组成</text>
				<text class="welcome" v-else>密码由不少于<text class="Verify_word">8位数字</text>、大小写字母和特殊符号组成</text>
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
import { updateEmailPasswordByCode,updatePhonePasswordByCode } from '../../api/homePage.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			id: '',
			newPas: '',
			endPas: '',
		};
	},
	onLoad: function(option) {
		this.id = option.id;
	},
	
	methods: {
		
		// 确定改密码
		confirmPassword() {
			if (!this.newPas || !this.endPas) return this.$showToast('error', '密码不能为空');
			if (this.newPas != this.endPas) return this.$showToast('error', '新密码输入不一致');
			if (!this.$canonical(this.newPas, this.passwordStrength)) return this.$showToast('error', '密码不符合规范');
			let param = {
				newPassword: this.$keyCode(this.newPas),
			};
			let url=""
			if(this.id==2){
				url=updatePhonePasswordByCode
			}else{
				url=updateEmailPasswordByCode
			}
			
			this.$Axios.put(url, param).then(res => {
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
