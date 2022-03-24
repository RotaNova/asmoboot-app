<template>
	<view class="view_con">
		<u-navbar title="账户与安全" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="view_main">
			<view class="list_main">
				<view class="list_content" @tap="openValidation()">
					<text class="contend_left">登录二次验证</text>
					<view class="per_disflex">
						<text class="contend_right">{{ form.phoneSafeType || form.emailSafeType ? '已开启' : '未开启' }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="openChangPas">
					<text class="contend_left">账户密码</text>
					<view class="per_disflex">
						<text class="contend_right">去修改</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="phoneRelated(1)">
					<text class="contend_left">绑定手机 </text>
					<view class="per_disflex">
						<text class="contend_right" v-if="form.userSafePhone">{{ dataEncryption(form.userSafePhone) }}</text>
						<text class="contend_right" v-else>{{ !form.userPhone&&!form.userSafePhone ? '未绑定' : '未认证' }}&nbsp{{ form.userPhone ? dataEncryption(form.userPhone) : '' }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="phoneRelated(2)">
					<text class="contend_left">绑定邮箱 </text> 
					<view class="per_disflex">
						<text class="contend_right" v-if="form.userSafeEmail">{{ dataEncryption(form.userSafeEmail) }}</text>
						<text class="contend_right" v-else>{{ !form.userEmail&&!form.userSafeEmail ? '未绑定' : '未认证' }}&nbsp{{ form.userEmail ? dataEncryption(form.userEmail) : '' }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="show" title="" :showConfirmButton="false" :closeOnClickOverlay='true' @close="show=false">
			<view class="modal_account" v-if="id==1">
				<view class="font20">绑定手机 </view>
				<view class="fontc14 colrqi mt16" v-if="form.userSafePhone">解绑手机号</view>
				<view class="fontc14 colrqi mt16" v-if="!form.userSafePhone && form.userPhone">管理员已为您预填手机号</view>
				<view class="fontc14 colrqi mt16" v-else-if="!form.userSafePhone && !form.userPhone">请绑定手机号</view>
				<view class="fontc14" style="margin-top: 20upx;">{{ form.userSafePhone ? dataEncryption(form.userSafePhone) :dataEncryption(form.userPhone) }}</view>
				<view class="modal_flex mt24">
					<view class="but_mod fontc14" v-if="form.userSafePhone" @tap="modifyThePhone(1)">解绑</view>
					<view class="but_mod fontc14 mod_approve" v-if="!form.userSafePhone && !form.userPhone" @tap="modifyThePhone(2)">绑定</view>
					<view class="but_mod fontc14" v-if="!form.userSafePhone && form.userPhone" @tap="modifyThePhone(3)">修改</view>
					<view class="ml16 but_mod fontc14 mod_approve" v-if="!form.userSafePhone && form.userPhone"  @tap="modifyThePhone(4)">去认证</view>
				</view>
			</view>
			<view class="modal_account" v-else>
				<view class="font20">绑定邮箱</view>
				<view class="fontc14 colrqi mt16" v-if="form.userSafeEmail">解绑邮箱</view>
				<view class="fontc14 colrqi mt16" v-if="!form.userSafeEmail && form.userEmail">管理员已为您预填邮箱</view>
				<view class="fontc14 colrqi mt16" v-else-if="!form.userSafeEmail && !form.userEmail">请绑定邮箱</view>
				<view class="fontc14" style="margin-top: 20upx;">{{ form.userSafeEmail ? dataEncryption(form.userSafeEmail) :dataEncryption(form.userEmail) }}</view>
				<view class="modal_flex mt24">
					<view class="but_mod fontc14" v-if="form.userSafeEmail" @tap="modifyThePhone(1)">解绑</view>
					<view class="but_mod fontc14 mod_approve" v-if="!form.userSafeEmail && !form.userEmail" @tap="modifyThePhone(2)">绑定</view>
					<view class="but_mod fontc14" v-if="!form.userSafeEmail && form.userEmail" @tap="modifyThePhone(3)">修改</view>
					<view class="ml16 but_mod fontc14 mod_approve" v-if="!form.userSafeEmail && form.userEmail"  @tap="modifyThePhone(4)">去认证</view>
				</view>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { getSecuritySettings } from '../../api/homePage.js';
export default {
	data() {
		return {
			form: {},
			show: false,
			id:""
		};
	},
	onLoad: function(option) {
		
	},
	onShow(){
		this.getSecurity();
	},
	methods: {
		// 打开手机号相关
		phoneRelated(id){
			this.id=id
			this.show=true
		},
		// 绑定解绑手机号
		modifyThePhone(id){
			if(this.id==1){
				this.$jumpPlatform('./modifyPhone?form=' + encodeURIComponent(JSON.stringify(this.form))+'&id='+id);
			}else{
				this.$jumpPlatform('./modifyEmail?form=' + encodeURIComponent(JSON.stringify(this.form))+'&id='+id);
			}
			
			this.show=false
		},
		// 打开二次验证
		openValidation() {
			this.$jumpPlatform('./loginValidation?form=' + encodeURIComponent(JSON.stringify(this.form)));
		},
		// 获取账户设置情况
		getSecurity() {
			this.$Axios
				.get(getSecuritySettings)
				.then(res => {
					this.$store.commit('SET_PASSWORD', res.data.passwordStrength);
					this.$store.commit('SET_USEREMAIL', res.data.userSafeEmail);
					this.$store.commit('SET_USERPHONE', res.data.userSafePhone);
					this.form = res.data;
				})
				.catch(() => {});
		},
		openChangPas() {
			this.$jumpPlatform('./changePassword');
		}
	}
};
</script>

<style lang="scss" scoped>
.per_disflex {
	display: flex;
	margin-left: 20upx;
}
::v-deep {
	.u-popup {
		flex: none;
	}
}
.modal_account {
	width: 100%;

	.font20 {
		font-size: 38upx;
		color: #000;
	}
	.modal_flex {
		display: flex;
		.but_mod {
			flex: 1;
			height: 80upx;
			background: $uni-bg-color-main;
			border-radius: 12px;
			line-height: 80upx;
		}
		.mod_approve {
			background-color: $uni-color-btn;
			color: $uni-bg-color;
		}
	}
	.fontc14 {
		font-size: 28upx;
		color: $uni-color-form;
		text-align: center;
	}
	.colrqi {
		color: $uni-color-sh;
	}
}
</style>
