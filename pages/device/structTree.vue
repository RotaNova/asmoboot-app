<template>
	<view>
		<view v-for="(item, index) in menuInfo.dataSpecsList" :key="index" @click="toModify(item)">
			<text class="contend_left width44">{{ item.name }}</text>
			<view class="per_disflex width50" v-if="item.dataType == 'BOOL'">
				<text class="contend_right dataSpec">{{ item.value ? item.dataSpecsList[1].name : item.dataSpecsList[0].name }}</text>
				<u-switch
					:inactiveValue="0"
					:activeValue="1"
					v-model="item.value"
					:size="18"
					activeColor="#20C789"
					inactiveColor="#FF4848"
					v-if="item.rwFlag == 'READ_WRITE'"
				></u-switch>
				<text v-else class="readOnly" :class="item.value ? 'open' : 'close'"></text>
				<u-icon name="arrow-right" class="ico_right" v-if="item.rwFlag == 'READ_WRITE'"></u-icon>
				<view class="poaboe"></view>
			</view>
			<!-- {{ item.dataSpecs.unit ? item.dataSpecs.unit : '' }} -->
			<view class="per_disflex width50" v-else-if="item.dataType == 'ENUM'">
				<text class="contend_right dataSpection">
					<text v-if="item.value">{{ item.dataSpecsList.find(key => item.value == key.value).name }}</text>
					<text v-if="item.dataSpecs">{{ item.dataSpecs.unit ? item.dataSpecs.unit : '' }}</text>
				</text>
				<u-icon name="arrow-right" class="ico_right" v-if="item.rwFlag == 'READ_WRITE'"></u-icon>
				<u-icon name="more-dot-fill" class="ico_right" v-else></u-icon>
			</view>
			<view class="per_disflex width50" v-else>
				<text class="contend_right dataSpection">
					{{ item.value }}
					<text v-if="item.dataSpecs">{{ item.dataSpecs.unit ? item.dataSpecs.unit : '' }}</text>
				</text>
				<u-icon name="arrow-right" class="ico_right" v-if="item.rwFlag == 'READ_WRITE'"></u-icon>
				<u-icon name="more-dot-fill" class="ico_right" v-else></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			menuInfo: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				key: ''
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.flex {
	position: relative;
	flex: 1;
	overflow: auto;
}

.font12 {
	font-size: 24upx;
	color: $uni-text-color-bo;
}
.mt8 {
	margin-top: 16upx;
}
.mt4 {
	margin-top: 8upx;
}

.per_disflex {
	display: flex;
	margin-left: 20upx;
	justify-content: flex-end;
	align-items: center;
}
.width44 {
	width: 44%;
	margin-right: 6%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.width50 {
	position: relative;
	width: 50%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.dataSpec {
	display: inline-block;
	max-width: 170upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-right: 6upx;
}
.dataSpection {
	display: inline-block;
	max-width: 250upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-right: 6upx;
}
.readOnly {
	display: inline-block;
	width: 12px;
	height: 12px;
	border-radius: 50%;
}
.close {
	background-color: $uni-color-skred;
}
.open {
	background-color: $uni-color-veropen;
}
::v-deep {
	.u-popup {
		flex: none;
	}
}
.modal_font12 {
	font-size: 40upx;
	color: $uni-color-form;
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
		margin-left: 32upx;
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
.modal_content {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.poaboe {
	position: absolute;
	right: 52upx;
	top: 0;
	width: 76upx;
	height: 40upx;
	// background-color: pink;
}
.content_icon {
	position: absolute;
	right: 20upx;
	top: 30upx;
}
.structs{
	padding-left: 40upx;
	box-sizing: border-box;
}
</style>

