<template>
	<view class="view_con">
		<u-navbar title="个人资料" @rightClick="rightClick" @leftClick="$leftClick" class="mt44"></u-navbar>
		<view class="view_main">
			<view class="list_main">
				<view class="list_content" @tap="pictureUpload()" style="align-items: center;">
					<text class="contend_left">头像</text>
					<view class="per_disflex">
						<image :src="form.userPhotoUrl" mode=""></image>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="toModify(1)">
					<text class="contend_left">昵称</text>
					<view class="per_disflex">
						<text class="contend_right">{{ form.userName }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="showSex = true">
					<text class="contend_left">性别</text>
					<view class="per_disflex">
						<text class="contend_right" v-if="form.userSex == 0">女</text>
						<text class="contend_right" v-else-if="form.userSex == 1">男</text>
						<text class="contend_right" v-else>不透露</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="emailBack()">
					<text class="contend_left">手机号</text>
					<view class="per_disflex">
						<text class="contend_right">{{ form.userSafePhone ? form.userSafePhone : '未绑定' }}</text>
					</view>
				</view>
				<view class="list_content" @tap="emailBack()">
					<text class="contend_left">邮箱</text>
					<view class="per_disflex">
						<text class="contend_right">{{ form.userSafeEmail ? form.userSafeEmail : '未绑定' }}</text>
					</view>
				</view>
				<view class="list_content" @tap="showData = true">
					<text class="contend_left">生日</text>
					<view class="per_disflex">
						<text class="contend_right">{{ form.userBirthday ? $getdate(form.userBirthday) : '' }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="toModify(2)">
					<text class="contend_left">家庭地址</text>
					<view class="per_disflex">
						<text class="contend_right overesail">{{ form.userAddress }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<view class="list_content" @tap="emailBack()">
					<text class="contend_left">账号有效截止日期</text>
					<view class="per_disflex">
						<text class="contend_right">{{ form.userValidTime ? $getdate(form.userValidTime) : '' }}</text>
					</view>
				</view>
			</view>
		</view>
		<u-action-sheet
			:actions="list"
			@select="selectClick"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
			:title="title"
			:show="show"
			cancelText="取消"
			@close="close"
		></u-action-sheet>
		<u-action-sheet
			:actions="listSex"
			@select="selectClickSex"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
			title="性别"
			:show="showSex"
			cancelText="取消"
			@close="closeSex"
		></u-action-sheet>
		<u-datetime-picker :show="showData" v-model="value1" mode="date" @change="change" @cancel="showData = false" @confirm="confirm"></u-datetime-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
function dataURLtoFile(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}
import { getUserBasicInfo, updateUserBasicInfo } from '../../api/homePage.js';
export default {
	data() {
		return {
			form: {
				userName: undefined,
				userPhotoUrl: undefined,
				userSafePhone: undefined,
				userValidTime: undefined,
				userAddress: undefined,
				userSex: undefined,
				userBirthday: undefined,
				userSafeEmail: undefined
			},
			title: '更换头像',
			list: [
				{
					name: '拍照'
				},
				{
					name: '从相册选择'
				}
			],
			listSex: [
				{
					name: '男'
				},
				{
					name: '女'
				},
				{
					name: '不透露'
				}
			],
			showSex: false,
			show: false,
			daya: '',
			file: '',
			showData: false,
			value1: Number(new Date())
		};
	},
	onLoad: function(option) {
		if (option.id) {
			this.$showToast('error', '修改成功');
		}
		this.getUserBasicInfo();
	},
	methods: {
		confirm(val) {
			uni.showLoading({
				title: '正在修改'
			});
			this.form.userBirthday = val.value;
			this.$formData(updateUserBasicInfo, this.form)
				.then(res => {
					uni.hideLoading();
					this.getUserBasicInfo();
					this.showData = false;
					this.$showToast('error', '修改成功');
				})
				.catch(() => {
					this.showData = false;
				});
		},
		// 选择性别
		selectClickSex(index) {
			if (index.name == '男') {
				this.form.userSex = 1;
			} else if (index.name == '女') {
				this.form.userSex = 0;
			} else {
				this.form.userSex = 2;
			}
			this.$formData(updateUserBasicInfo, this.form)
				.then(res => {
					this.getUserBasicInfo();
					this.$showToast('error', '修改成功');
				})
				.catch(() => {});
		},
		// 关闭
		closeSex() {
			this.showSex = false;
		},
		// 打开编辑姓名
		toModify(id) {
			this.$redirectTo('./modifyName?form=' + encodeURIComponent(JSON.stringify(this.form)) + '&id=' + id);
		},
		// 上传图片
		selectClick(index) {
			if (index.name == '拍照') {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: function(res) {
						if (res.tempFiles[0].size / 1024 > 1024 * 3) {
							_this.$refs.uToast.show({
								title: '不能上传图片大小大于3M',
								type: 'error'
							});
						}
						uni.uploadFile({
							url: 'http://boot.local.release.api.rotanova.top' + updateUserBasicInfo,
							name: 'MultipartFile',
							filePath: res.tempFilePaths[0],
							formData: _this.form,
							header: {
								token: uni.getStorageSync('token')
							},
							success: res => {
								_this.getUserBasicInfo();
							},
							fail: e => {
								console.log(e, 'e12222222');
							}
						});
					}
				});
			} else {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						if (res.tempFiles[0].size / 1024 > 1024 * 3) {
							_this.$refs.uToast.show({
								title: '不能上传图片大小大于3M',
								type: 'error'
							});
						}
						uni.uploadFile({
							url: 'http://boot.local.release.api.rotanova.top' + updateUserBasicInfo,
							name: 'MultipartFile',
							filePath: res.tempFilePaths[0],
							formData: _this.form,
							header: {
								token: uni.getStorageSync('token')
							},
							success: res => {
								_this.getUserBasicInfo();
							},
							fail: e => {
								console.log(e);
							}
						});
					}
				});
			}
		},
		// 关闭
		close() {
			this.show = false;
		},
		// 头像上传
		pictureUpload() {
			this.show = true;
		},
		// 获取基本信息
		getUserBasicInfo() {
			uni.showLoading({
				title: '加载中'
			});
			this.$Axios
				.get(getUserBasicInfo)
				.then(res => {
					if (res.data) {
						for (let key in this.form) {
							this.form[key] = res.data[key];
						}
					}
				})
				.catch(() => {})
				.finally(() => {
					uni.hideLoading();
				});
		}
	}
};
</script>

<style lang="scss" scoped>
image {
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	background-color: #ccc;
}
.per_disflex {
	display: flex;
	margin-left: 20upx;
}
::v-deep {
	.u-popup {
		flex: none;
	}
}
.overesail {
	max-width: 400upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
