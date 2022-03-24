<template>
	<view class="view_con">
		<u-navbar title="登录二次验证" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="view_main">
			<view class="list_main">
				<view class="list_content" @tap="mobilePhoneBack(1)" v-if="form.userPhone">
					<text class="contend_left" v-if="form.phoneSafeType==1">手机号完整度验证</text>
					<text class="contend_left" v-if="form.phoneSafeType==2">手机验证码验证</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
				<view class="list_content" @tap="mobilePhoneBack(2)" v-if="form.userEmail">
					<text class="contend_left" v-if="form.emailSafeType==1">邮箱验完整度验证</text>
					<text class="contend_left" v-if="form.emailSafeType==2">邮箱验证码验证</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
			</view>
			<view class="mt16 twice">
				您已经设置了二次验证，请选择一种方式完成验证
			</view>
		</view>
	</view>
</template>

<script>
import { getSecondVerification } from '../../api/login.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			form:{}
		};
	},
	onLoad: function(option) {
		this.getSecondVerifica()
	},
	methods: {
		// 获取二次验证的条件
		getSecondVerifica(){
			let param={
				userAccountName:this.$keyCode(this.userAccountName)
			}
			this.$Axios.post(getSecondVerification,param).then(res=>{
				this.form=res.data
			}).catch(()=>{})
		},
		// 跳转二次验证的页面
		mobilePhoneBack(id){
			if(id==1){
				this.$jumpPlatform('./mobileEmail?id=1&name='+this.form.userPhone+"&type="+this.form.phoneSafeType)
			}else{
				this.$jumpPlatform('./mobileEmail?id=2&name='+this.form.userEmail+"&type="+this.form.emailSafeType)
			}
			
		}
	},
	computed: {
		...mapGetters(['userAccountName'])
	}
};
</script>

<style lang="scss" scoped>
	.twice{
		font-size: 24upx;
		color: $uni-text-color-bo;
	}
</style>
