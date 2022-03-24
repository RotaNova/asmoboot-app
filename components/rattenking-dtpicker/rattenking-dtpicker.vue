<template>
	<picker class='rui-picker rui-class' mode="multiSelector" :range="times" :value="timesIndex" :disabled="curDisabled" @change='changeDate' @cancel="cancelDate" @columnchange="columnchangeDate">
	  {{curValue}}
	</picker>
</template>

<script>
	import GetDate from './GetDate.js';
	export default {
		name: 'rattenking-dtpicker',
		props: {
			/**
			 * picker允许选中的最小值
			 */
			start: {
			  type: String,
			  default: '2000-01-01'
			},
			/**
			 * picker允许选中的最大值
			 */
			end: {
			  type: String,
			  default: '2100-12-31'
			},
			/**
			 * picker默认展示的值
			 */
			value: {
			  type: String,
			  default: ''
			},
			/**
			 * picker的时间粒度
			 */
			fields: {
			  type: String,
			  default: 'day'
			},
			/**
			 * picker是否禁止
			 */
			disabled: {
			  type: Boolean,
			  default: false
			},
			/**
			 * 是否显示中文
			 */
			isShowChinese: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				times:[],
				timesIndex: [],
				timesString: null,
				curValue: null,
				startValue: null,
				endValue: null,
				curDisabled: null,
				cancel: null,
				lens: {
					year: 1,
					month: 2,
					day: 3,
					hour: 4,
					minute: 5,
					second: 6
				}
			}
		},
		watch: {
			curDisabled(val){
				this.curDisabled = val;
			},
			curValue(val) {
				this.curValue = val;
				this.$emit('change', val);
			},
			times(val){
				this.times = val;
			},
			timesIndex(val){
				this.timesIndex = val;
			},
			cancel(val) {
				this.$emit('cancel', val);
			}
		},
		created() {
			this.initData();
			this.judgeTimeFields();
			this.judgeStartEndTime();
			this.updateTimesAndIndex();
		},
		methods: {
			initData(){
				// 初始化默认时间和是否禁止
				this.curValue = this.value;
				this.curDisabled = this.disabled;
			},
			judgeStartEndTime(){
				// 判断开始和结束时间大小
				let starttimestamp = GetDate.getTimes(this.start);
				let endtimestamp = GetDate.getTimes(this.end);
				if(endtimestamp <= starttimestamp){
					this.curTimes = GetDate.getCurrentTimes(starttimestamp);
					this.endTimes = GetDate.getCurrentTimes(starttimestamp);
					this.startTimes = GetDate.getCurrentTimes(starttimestamp);
					this.startValue = this.start;
					this.endValue = this.start;
				} else {
					this.endTimes = GetDate.getCurrentTimes(endtimestamp);
					this.startTimes = GetDate.getCurrentTimes(starttimestamp);
					this.startValue = this.start;
					this.endValue = this.end;
				}
			},
			judgeTimeFields(){
				// 处理默认显示时间
				let fields = this.fields;
				let curTimes = GetDate.getCurrentTimes();
				let curtimestamp = +new Date(this.curValue);
				if(curtimestamp === 0 || curtimestamp){
					curTimes = GetDate.getCurrentTimes(curtimestamp);
				}
				this.curTimes = curTimes;
			},
			updateTimesAndIndex(){
				// 更新times和index
				let opts = {
					startTimes: this.startTimes.detail,
					endTimes: this.endTimes.detail,
					curTimes: this.curTimes.detail,
					fields: this.fields
				}
				let times = GetDate.getDateTimes(opts);
				this.times = times;
				let curtimes = Object.values(this.curTimes.detail);
				this.timesIndex = times.map((cur,index) => {
					var idn = cur.findIndex((cu,idx) => curtimes[index] == cu);
					return idn > -1 ? idn : 0;
				})
			},
			getRealCurValue(){
				// 获取当前选中的时间字符串
				var arr = this.timesIndex.map((cur, index) => {
					return this.times[index][cur]
				})
				return GetDate.format(arr);
			},
			changeDate(e){
				// 确认选中时间
				let values = e.detail.value;
				this.timesIndex = values;
				this.curValue = this.getRealCurValue();
			},
			columnchangeDate(e){
				// 滑动更新times和index
				let column = e.detail.column;
				let value = e.detail.value;
				this.timesIndex[column] = value;
				for(let i = 0; i < this.lens[this.fields]; i++){
					let realvalue = this.getRealCurValue();
					this.curTimes = GetDate.getCurrentTimes(GetDate.getTimes(realvalue));
					this.updateTimesAndIndex();
				}
			},
			cancelDate(e){
				this.cancel = e
			}
		}
	}
</script>

<style>
	.rui-picker{
	  height: 10vw;
	  font-size: 4vw;
	  color: #000;
	  display: -webkit-flex;
	  display: flex;
	  align-items: center;
	  padding: 0 10px;
	  box-sizing: border-box;
	  border: 1px solid #aaa;
	  border-radius: 3px;
	}
</style>
