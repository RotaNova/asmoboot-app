<template>
	<view class="view_con" style="background-color: #F5F6F8;">
		<view>
			<u-navbar title="选择设备分组" @leftClick="$leftClick" fixed></u-navbar>
			<view class="mt88">
				<view class="navigation_con" v-if="navList.length>0">
					<text v-for="(item, index) in navList" :key="item.id" class="nav_con " :class="id==item.id?'pitchOn':''" @click="returnsNavigation(item)">
						{{ item.name }}
						<u-icon name="arrow-right" v-if="index > 0 && index < navList.length - 1"></u-icon>
					</text>
				</view>
			</view>
		</view>
		<!-- / -->
		<view class="view_main main_content">
			<view class="list_main main_content_list">
				<view class="list_content" v-for="item in devicClassify" :key="item.id" @click="getChildrenData(item)">
					<view class="disflex_list">
						<u-checkbox-group v-model="checkbox" @click.stop="checkboxChange(item)"><u-checkbox shape="circle" :name="item.id"></u-checkbox></u-checkbox-group>
						<text class="contend_left ml10 max250">{{ item.name }}</text>
						<text class="item_end ml10">{{ item.groupCode }}</text>
						<text class="item_count ml10">({{ item.count ? item.count : 0 }})</text>
					</view>
					<view class="per_disflex" v-if="item.children">
						<text class="contend_right"></text>
						<u-icon name="arrow-right" class="ico_right"></u-icon>
					</view>
				</view>
			</view>
			<view class="bottom"><view class="bottom_but" @click="confirm">确定</view></view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { getGroupList, getDeviceItemByGroup } from '@/api/monitor.js';
export default {
	data() {
		return {
			devicClassify: [],
			childrenList: [],
			deviceId: '',
			checkbox: [],
			initialList: [],
			navList: [],
			id:undefined,
			name:undefined
		};
	},
	mounted() {
		this.getDevic();
	},
	methods: {
		// 递归查找对应数据
		dataManipulationTree(data,id){
			data.forEach(item=>{
				if(id==item.id){
					this.name=item.name
				}else{
					if(item.children){
						this.dataManipulationTree(item.children,id)
					}
				}
			})
		},
		// 确定
		confirm(){
			if(this.checkbox.length==0) return this.$refs.uToast.show({
				message: '请选择设备分组',    
				type: 'error'
			});
			this.dataManipulationTree(this.initialList,this.checkbox[0])
			this.$jumpPlatform('./monitorPreview?deviceGroupId=' + this.checkbox[0]+"&name="+this.name);
		},
		// 返回导航
		returnsNavigation(row){
			if(row.parentId==0){
				this.id=undefined
				this.navList=[]
				this.devicClassify=this.initialList 
			}else{
				this.id=row.id
				this.navList.forEach((item,index)=>{
					if(row.id==item.id){
						this.navList.splice(index,this.navList.length)
					}
				})
				this.dataManipulation(this.initialList,row.parentId )
			}
		},
		// 递归查找对应数据
		dataManipulation(data,id){
			data.forEach(item=>{
				if(id==item.id){
					this.devicClassify=item.children
				}else{
					if(item.children){
						this.dataManipulation(item.children,id)
					}
				}
			})
		},
		
		// 选择多选
		checkboxChange(row) {
			console.log('change',row);
		},
		// 操作数据
		getChildrenData(row) {
			if (row.children) {
				this.id=row.id
				this.devicClassify = row.children;
				this.navList.push(row);
			}
		},
		// 获取设备数据
		getDevic() {
			this.$Axios
				.get(getGroupList)
				.then(res => {
					this.initialList = JSON.parse(JSON.stringify(res));
					this.devicClassify = res;
				})
				.catch(() => {});
		},
		// 获取分组下的设备
		getDeviceItemBy(id) {
			let parame = {
				deviceGroupId: 1,
				pageNum: 1,
				pageSize: 10
			};
			this.$Axios
				.post(getDeviceItemByGroup, parame)
				.then(res => {})
				.catch();
		}
	}
};
</script>

<style lang="scss" scoped>
.view_con {
	flex: 1;
}
.per_disflex {
	display: flex;
	margin-left: 20upx;
}
.disflex_list {
	display: flex;
	align-items: center;
}
.max250 {
	display: inline-block;
	max-width: 350upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.item_end {
	color: $uni-text-color-bo;
}
.ml10 {
	margin-left: 10upx;
}
.item_count {
}
.main_content {
	padding: 32upx 0 0 0;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	overflow: hidden;
	.main_content_list {
		border-radius: 0;
		max-flex: 1;
		overflow: auto;
	}
	.bottom {
		padding: 32upx;
		box-sizing: border-box;
		background-color: #fff;
		.bottom_but {
			margin: 0 auto;
			height: 48px;
			line-height: 96upx;
			background: $uni-color-btn;
			border-radius: 12px;
			text-align: center;
			color: $uni-text-color-inverse;
		}
	}
}
.nav_con {
	font-size: 28upx;
	color: $uni-text-color-bo;
}
.navigation_con {
	padding: 24upx 32upx;
}
.pitchOn{
	color: $uni-color-btn;
}
</style>
