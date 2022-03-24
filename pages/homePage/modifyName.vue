<template>
	<view class="updata_name">
		<u-navbar :title="id==1?'修改昵称':'修改家庭住址'"  @leftClick="$redirectTo('./personalData')" class="mt44"></u-navbar>
		<view class="updata_main">
			<input v-if="id==1" type="text" placeholder="请输入昵称" class="input_class" v-model="form.userName" style="background-color: #fff;" :maxlength="16"/>
			<textarea v-else  style="height: 240upx;background-color: #fff;padding: 20upx;"  class="input_class" v-model="form.userAddress"/>
			<view class="impose">
				{{id==1?'昵称长度为1-16个字符，不能输入%<"\*|&>等符号':'家庭地址长度为0-255个字符'}}
			</view>
			<button class="button_btn mt24" @click="saveUpdata" :disabled="disabled">保存</button>
		</view>
	</view>
</template>

<script>
import { updateUserBasicInfo } from '../../api/homePage.js';
export default {
	data() {
		return {
			userName: '',
			form:{},
			disabled:false,
			id:""
		};
	},
	onLoad: function(option) {
		this.id=option.id
		this.form=JSON.parse(decodeURIComponent(option.form))
		
	},
	methods: {
		// 保存
		saveUpdata() {
			if(!this.form.userName) return  this.$showToast('error', '昵称不能为空');
			this.disabled=true
			
			this.$formData(updateUserBasicInfo,this.form).then(res=>{
				this.disabled=false
				this.$redirectTo('./personalData?id=1')
			}).catch(err=>{
				this.disabled=false
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.updata_name{
	height: 100vh;
	display: flex;
	flex-direction: column;
	.updata_main{
		flex: 1;
		background-color: $uni-bg-color-main;
		padding: 32upx;
		box-sizing: border-box;
	}
	.impose{
		font-size: 24upx;
		color: $uni-text-color-bo;
		margin-top:8px;
	}
}
::v-deep{
	uni-textarea{
		width: unset;
	}
	
}
</style>
