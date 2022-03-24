<template>
	<view class="view_con">
		<u-navbar title="选择找回方式" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="view_main">
			<view class="list_main">
				<view class="list_content" @tap="mobilePhoneBack()">
					<text>手机号验证码找回</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
				<view class="list_content" @tap=" emailBack()">
					<text>邮箱验证码找回</text>
					<u-icon name="arrow-right" class="ico_right"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			key: '',
			phone:"",
			email:""
		};
	},
	onLoad: function(option) {
		this.phone=option.phone
		this.email=option.email
		console.log(this.email,this.phone)
	},
	methods: {
		rightClick() {
			console.log('rightClick');
		},
		// 手机找回
		mobilePhoneBack(){
			if(!this.phone) return this.$showToast('error', '手机号未绑定');
			this.$jumpPlatform('./phoneRetrieval?id=1&name='+this.phone)
		},
		// 邮箱找回
		emailBack(){
			if(!this.email || this.email!='null') return this.$showToast('error', '邮箱未绑定');
			this.$jumpPlatform('./phoneRetrieval?id=2&name='+this.email)
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
