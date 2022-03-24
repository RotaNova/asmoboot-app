<template>
	<view>
		<view class="view_main contend" style="background-color: #fff;">
			<view>
				<view>
					<text class="significance">*</text>
					<text class="zhiname">设备名称</text>
					<view><input type="text" v-model="form.nickName" class="input_class mt8" placeholder="输入设备名称" /></view>
				</view>
				<view class="mt16">
					<text class="significance">*</text>
					<text class="zhiname">设备编码</text>
					<view class="input_class mt8 line_disabled">{{ form.deviceName }}</view>
				</view>
				<view class="mt16">
					<text class="significance">*</text>
					<text class="zhiname">设备序号</text>
					<view class="input_class mt8 line_disabled">{{ form.deviceCode }}</view>
				</view>
				<view class="mt16">
					<text class="zhiname">验证码/加密码</text>
					<view><input type="text" v-model="form.devicePassd" class="input_class mt8" placeholder="输入验证码/加密码" /></view>
				</view>
				<view class="mt16"  @click="$jumpPlatform('./latitudeLongitude')">
					<text class="zhiname">设备经纬度</text>
					<view class="input_class mt8 longitude">
						<text :class="longLat ? 'color_from' : ''">{{ longLat ? longLat : '请选择' }}</text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<view class="mt16">
						<text class="zhiname">设备省市区/县</text>
						<view class="input_class mt8 longitude">
							<text :class="address ? 'color_from' : ''">{{ address ? address : '请选择' }}</text>
							<u-icon name="arrow-right" class="ico_right"></u-icon>
						</view>
					</view>
				</pick-regions>
				<view class="mt16">
					<text class="zhiname">设备详细地址</text>
					<view><input type="text" v-model="form.addressDetail" class="input_class mt8" placeholder="输入设备详细地址" /></view>
				</view>
				<view class="mt16">
					<text class="zhiname">负责人</text>
					<view><input type="text" v-model="form.manager" class="input_class mt8" placeholder="输入负责人" /></view>
				</view>
				<view class="mt16">
					<text class="zhiname">联系方式</text>
					<view><input type="text" v-model="form.contactInfo" class="input_class mt8" placeholder="输入联系方式" /></view>
				</view>
				<view class="mt16">
					<text class="zhiname">备注</text>
					<view><textarea type="text" v-model="form.remark" class="input_class mt8 textarea_input" placeholder="输入备注" /></view>
				</view>
				<view class="mt16 dis_flex_bew"><view class=" but_cen" @click="confirm">保存</view></view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { getDeviceInfo, updateDevice } from '@/api/device.js';
import pickRegions from '@/components/pick-regions/pick-regions.vue';
import { mapGetters } from 'vuex';
import city from '@/utils/area.js';
export default {
	props: {
		productKey: String
	},
	data() {
		return {
			form: {},
			region: [],
			defaultRegionCode: ['440113'],
			address: undefined,
			longLat: undefined,
			objtion: [],
			mapDetail: {},
			city
		};
	},
	mounted() {
		this.getdetail();
		this.rest();
		this.getDeviceInfo();
	},
	watch: {
		longitude() {
			this.form.latitude = this.latitude;
			this.form.longitude = this.longitude;
			this.longLat = this.longitude + ',' + this.latitude;
		},
		latitude() {
			this.longLat = this.longitude + ',' + this.latitude;
		}
	},
	methods: {
		// 获取省市县数据
		getdetail() {
			this.dataTile(this.city);
			this.objtion.forEach(item => {
				this.mapDetail[item.value] = item;
			});
		},
		// 树形数据平铺
		dataTile(data) {
			data.forEach(item => {
				this.objtion.push(item);
				if (item.children && item.children.length > 0) {
					this.dataTile(item.children);
				}
			});
		},
		// 获取数据
		getDeviceInfo() {
			uni.showLoading({
				title: '加载中'
			});
			let param = {
				deviceId: this.device_id
			};
			this.$Axios
				.get(getDeviceInfo, param)
				.then(res => {
					this.productkey = res.productkey;
					for (let key in this.form) {
						this.form[key] = res[key];
					}
					this.defaultRegionCode = [res.addressProvince, res.addressCity, res.addressDistrict];
					this.longLat = res.longitude + ',' + res.latitude;
					this.address = this.mapDetail[res.addressProvince].label + ' ' + this.mapDetail[res.addressCity].label + ' ' + this.mapDetail[res.addressDistrict].label;
				})
				.catch(() => {})
				.finally(() => {
					uni.hideLoading();
					this.tolo = false;
				});
		},
		// 消息提醒
		uToastError(txt) {
			return this.$refs.uToast.show({
				message: txt,
				type: 'error'
			});
		},
		// 添加设备
		confirm() {
			if (!this.form.nickName) return this.uToastError('设备名称不能为空');
			if (!this.form.deviceName) return this.uToastError('设备编码不能为空');
			if (!this.form.deviceCode) return this.uToastError('设备序号不能为空');
			if (this.region.length > 0) {
				this.form.addressProvince = this.region[0].code;
				this.form.addressCity = this.region[1].code;
				this.form.addressDistrict = this.region[2].code;
			}
			this.form.productkey = this.productkey;
			this.form.deviceId = this.device_id;
			this.$Axios
				.post(updateDevice, this.form)
				.then(res => {
					this.getDeviceInfo();
					this.$refs.uToast.show({
						message: '修改成功',
						type: 'success'
					});
				})
				.catch(() => {});
		},
		// 获取地址
		handleGetRegion(region) {
			this.region = region;
			this.address = region.map(item => item.name).join(' ');
		},
		// 重置属性
		rest() {
			this.defaultRegionCode = [];
			this.address = undefined;
			this.longLat = undefined;
			this.form = {
				nickName: undefined, // 设备名称
				deviceName: undefined, // 设备编码
				deviceCode: undefined, // 设备序号
				latitude: undefined, // 纬度
				longitude: undefined, // 经度
				devicePassd: undefined, // 验证码/加密码
				addressDetail: undefined, // 详细地址
				manager: undefined, // 负责人
				contactInfo: undefined, // 联系方式
				remark: undefined,
				productkey: this.productkey
			};
		}
	},
	components: { pickRegions },
	computed: {
		...mapGetters(['device_id','longitude', 'latitude'])
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
.overesail {
	max-width: 400upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.significance {
	color: $uni-color-skred;
	font-weight: 700;
}
.zhiname {
	font-size: 32upx;
	font-weight: 700;
	color: $uni-color-form;
}
.mt8 {
	margin-top: 16upx;
}
.textarea_input {
	height: 240upx;
	padding: 28upx 32upx;
	box-sizing: border-box;
}
::v-deep {
	uni-textarea {
		width: 100%;
		font-size: 28upx;
	}
}
.contend {
	overflow: auto;
	font-size: 28upx;
}
.dis_flex_bew {
	display: flex;
	justify-content: space-between;
	.but_cen {
		height: 48px;
		border-radius: 12px;
		text-align: center;
		line-height: 96upx;
		background-color: $uni-color-btn;
		color: $uni-bg-color;
		flex: 1;
	}
}
.longitude {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: $uni-text-color-bo;
	font-size: 14px;
}
.color_from {
	color: $uni-color-form;
}
.line_disabled {
	line-height: 96upx;
	background-color: #dddddd;
}
</style>
