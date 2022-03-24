<template>
    <view>
        <view class="view_con">
            <u-navbar title="参数" @leftClick="getBack" class="mt44"></u-navbar>
            <view class="view_main">
                <view class="list_main">
                    <view v-for="item in properties" @click="toModify(item)">
                        <view v-if="item.dataType != 'STRUCT'" class="list_content bordernoe">
                            <text class="contend_left width44">{{ item.name }}</text>
                            <view class="per_disflex width50" v-if="item.dataType == 'BOOL'">
                                <text class="contend_right dataSpec">{{
                                    item.value
                                        ? item.dataSpecsList[1].name
                                        : item.dataSpecsList[0].name
                                }}</text>
                                <u-switch
                                    :inactiveValue="0"
                                    :activeValue="1"
                                    v-model="item.value"
                                    :size="18"
                                    activeColor="#20C789"
                                    inactiveColor="#FF4848"
                                    v-if="item.rwFlag == 'READ_WRITE'"
                                ></u-switch>
                                <text
                                    v-else
                                    class="readOnly"
                                    :class="item.value ? 'open' : 'close'"
                                ></text>
                                <u-icon
                                    name="arrow-right"
                                    class="ico_right"
                                    v-if="item.rwFlag == 'READ_WRITE'"
                                ></u-icon>
                                <view class="poaboe" @click.stop="boorOperate(item)"></view>
                            </view>
                            <!-- {{ item.dataSpecs.unit ? item.dataSpecs.unit : '' }} -->
                            <view class="per_disflex width50" v-else-if="item.dataType == 'ENUM'">
                                <text class="contend_right dataSpection">
                                    <text>{{
                                        item.value || item.value == 0
                                            ? item.dataSpecsList.find(
                                                  (key) => item.value == key.value
                                              ).name
                                            : ''
                                    }}</text>
                                    <text v-if="item.dataSpecs">{{
                                        item.dataSpecs.unit ? item.dataSpecs.unit : ''
                                    }}</text>
                                </text>
                                <u-icon
                                    name="arrow-right"
                                    class="ico_right"
                                    v-if="item.rwFlag == 'READ_WRITE'"
                                ></u-icon>
                                <u-icon name="more-dot-fill" class="ico_right" v-else></u-icon>
                            </view>
                            <view class="per_disflex width50" v-else-if="item.dataType == 'DATE'">
                                <text class="contend_right dataSpection">
                                    <text>{{ item.value ? item.value : '' }}</text>
                                    <!-- <text v-if="item.dataSpecs">{{ item.dataSpecs.unit ? item.dataSpecs.unit : '' }}</text> -->
                                </text>
                                <u-icon
                                    name="arrow-right"
                                    class="ico_right"
                                    v-if="item.rwFlag == 'READ_WRITE'"
                                ></u-icon>
                                <u-icon name="more-dot-fill" class="ico_right" v-else></u-icon>
                            </view>
                            <view class="per_disflex width50" v-else>
                                <text class="contend_right dataSpection">
                                    {{ item.value }}
                                    <text v-if="item.dataSpecs">{{
                                        item.dataSpecs.unit ? item.dataSpecs.unit : ''
                                    }}</text>
                                </text>
                                <u-icon
                                    name="arrow-right"
                                    class="ico_right"
                                    v-if="item.rwFlag == 'READ_WRITE'"
                                ></u-icon>
                                <u-icon name="more-dot-fill" class="ico_right" v-else></u-icon>
                            </view>
                        </view>
                        <view v-else>
                            <view class="contend_left width100 list_content bordernoe">{{
                                item.name
                            }}</view>
                            <view style="padding-left: 40upx; box-sizing: border-box">
                                <view
                                    v-for="items in item.dataSpecsList"
                                    @click.stop="toModify(items, item)"
                                    class="list_content bordernoe"
                                >
                                    <text class="contend_left width44">{{ items.name }}</text>
                                    <view
                                        class="per_disflex width50"
                                        v-if="items.childDataType == 'BOOL'"
                                    >
                                        <text class="contend_right dataSpec">{{
                                            items.value
                                                ? items.dataSpecsList[1].name
                                                : items.dataSpecsList[0].name
                                        }}</text>
                                        <u-switch
                                            :inactiveValue="0"
                                            :activeValue="1"
                                            v-model="items.value"
                                            :size="18"
                                            activeColor="#20C789"
                                            inactiveColor="#FF4848"
                                            v-if="item.rwFlag == 'READ_WRITE'"
                                        ></u-switch>
                                        <text
                                            v-else
                                            class="readOnly"
                                            :class="items.value ? 'open' : 'close'"
                                        ></text>
                                        <u-icon
                                            name="arrow-right"
                                            class="ico_right"
                                            v-if="items.rwFlag == 'READ_WRITE'"
                                        ></u-icon>
                                        <view class="poaboe"></view>
                                    </view>
                                    <!-- {{ item.dataSpecs.unit ? item.dataSpecs.unit : '' }} -->
                                    <view
                                        class="per_disflex width50"
                                        v-else-if="items.childDataType == 'ENUM'"
                                    >
                                        <text class="contend_right dataSpection">
                                            <text v-if="items.value || items.value == 0">{{
                                                items.dataSpecsList.find(
                                                    (key) => items.value == key.value
                                                ).name
                                            }}</text>
                                            <text v-if="items.dataSpecs">{{
                                                items.dataSpecs.unit ? items.dataSpecs.unit : ''
                                            }}</text>
                                        </text>
                                        <u-icon
                                            name="arrow-right"
                                            class="ico_right"
                                            v-if="item.rwFlag == 'READ_WRITE'"
                                        ></u-icon>
                                        <u-icon
                                            name="more-dot-fill"
                                            class="ico_right"
                                            v-else
                                        ></u-icon>
                                    </view>
                                    <view
                                        class="per_disflex width50"
                                        v-else-if="item.dataType == 'DATE'"
                                    >
                                        <text class="contend_right dataSpection">
                                            <text>{{ item.value ? item.value : '' }}</text>
                                            <!-- <text v-if="item.dataSpecs">{{ item.dataSpecs.unit ? item.dataSpecs.unit : '' }}</text> -->
                                        </text>
                                        <u-icon
                                            name="arrow-right"
                                            class="ico_right"
                                            v-if="item.rwFlag == 'READ_WRITE'"
                                        ></u-icon>
                                        <u-icon
                                            name="more-dot-fill"
                                            class="ico_right"
                                            v-else
                                        ></u-icon>
                                    </view>
                                    <view class="per_disflex width50" v-else>
                                        <text class="contend_right dataSpection">
                                            {{ items.value }}
                                            <text v-if="items.dataSpecs">{{
                                                items.dataSpecs.unit ? items.dataSpecs.unit : ''
                                            }}</text>
                                        </text>
                                        <u-icon
                                            name="arrow-right"
                                            class="ico_right"
                                            v-if="item.rwFlag == 'READ_WRITE'"
                                        ></u-icon>
                                        <u-icon
                                            name="more-dot-fill"
                                            class="ico_right"
                                            v-else
                                        ></u-icon>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <u-modal
                :show="show"
                :showConfirmButton="false"
                @close="show = false"
                closeOnClickOverlay
            >
                <!-- <view>测试</view> -->
                <view style="width: 100%" v-if="dataDetails.dataType == 'STRUCT'">
                    <view class="modal_font12">{{ dataDetails.name }}</view>
                    <view class="modal_content mt24" v-if="dataDetails.childDataType == 'BOOL'">
                        <text class="contend_right max80">{{ dataDetails.name }}</text>
                        <u-switch
                            :inactiveValue="0"
                            :activeValue="1"
                            v-model="dataDetails.value"
                            v-if="rwFlag == 'READ_WRITE'"
                            :size="18"
                            activeColor="#20C789"
                            inactiveColor="#FF4848"
                        ></u-switch>
                        <text
                            v-else
                            class="readOnly"
                            :class="dataDetails.value ? 'open' : 'close'"
                            v-else
                        ></text>
                    </view>
                    <view
                        class="modal_content mt24"
                        v-else-if="dataDetails.childDataType == 'DOUBLE'"
                    >
                        <input
                            type="text"
                            style="flex: 1"
                            placeholder=""
                            class="input_class mt16"
                            v-model="dataDetails.value"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        />
                        <view v-else style="flex: 1">
                            <!-- <text >
								{{ dataDetails.value }}
							</text>
							<text style="flex: 1;line-height: 96upx;" class="content_icon">{{ dataDetails.dataSpecs.unit ? dataDetails.dataSpecs.unit : '' }}</text> -->
                            <view
                                class="input_class"
                                style="
                                    flex: 1;
                                    padding-right: 70upx;
                                    line-height: 96upx;
                                    background-color: #ddd;
                                "
                                >{{ dataDetails.value }}</view
                            >
                            <text class="content_icon">{{ dataDetails.dataSpecs.unit }}</text>
                        </view>
                    </view>
                    <view
                        class="modal_content mt24"
                        v-else-if="dataDetails.childDataType == 'TEXT'"
                    >
                        <textarea
                            @input="inputValue"
                            style="flex: 1; padding: 20upx; max-height: 400px; min-height: 150px"
                            :maxlength="-1"
                            placeholder=""
                            class="input_class mt16"
                            v-model="dataDetails.value"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        />
                        <text
                            style="flex: 1; height: 400px; overflow: auto; background-color: #fff"
                            v-else
                        >
                            {{ dataDetails.value
                            }}{{ dataDetails.dataSpecs.unit ? dataDetails.dataSpecs.unit : '' }}
                        </text>
                    </view>
                    <view
                        class="modal_content mt24"
                        v-else-if="dataDetails.childDataType == 'DATE'"
                        @click="openDataSelect(dataDetails)"
                    >
                        <view
                            class="input_class"
                            style="flex: 1; padding-right: 50upx; line-height: 96upx"
                            :class="dataDetails.rwFlag == 'READ_WRITE' ? '' : 'dbgc'"
                        >
                            {{ dataDetails.value ? dataDetails.value : '' }}
                        </view>
                        <image
                            src="@/static/calendar.png"
                            mode=""
                            class="content_icon"
                            style="margin-top: -3upx"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        ></image>
                    </view>
                    <!-- TODO -->
                    <view
                        class="modal_content mt24"
                        v-else-if="dataDetails.childDataType == 'ENUM'"
                        @tap="OpenDropDown"
                    >
                        <view
                            class="input_class"
                            style="
                                flex: 1;
                                padding-right: 50upx;
                                line-height: 96upx;
                                overflow: hidden;
                            "
                            :class="dataDetails.rwFlag == 'READ_WRITE' ? '' : 'dbgc'"
                            >{{ dataDetails.bulitValue }}11</view
                        >
                        <!-- <u-icon name="arrow-right" class="ico_right content_icon"></u-icon> -->
                        <u-icon
                            name="arrow-right"
                            class="ico_right content_icon"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        ></u-icon>
                        <!-- <u-icon name="more-dot-fill" class="ico_right" v-else></u-icon> -->
                    </view>
                    <view
                        class="modal_content mt24"
                        v-else-if="
                            dataDetails.childDataType == 'FLOAT' ||
                            dataDetails.childDataType == 'INT'
                        "
                    >
                        <input
                            type="number"
                            style="flex: 1"
                            :max="dataDetails.dataSpecs.max"
                            :step="dataDetails.dataSpecs.step"
                            :min="dataDetails.dataSpecs.min"
                            placeholder=""
                            class="input_class"
                            v-model="dataDetails.value"
                            v-if="rwFlag == 'READ_WRITE'"
                        />
                        <view
                            class="input_class"
                            style="
                                flex: 1;
                                padding-right: 70upx;
                                line-height: 96upx;
                                background-color: #ddd;
                            "
                            v-else
                            >{{ dataDetails.value }}</view
                        >
                        <text class="content_icon">{{ dataDetails.dataSpecs.unit }}</text>
                        <!-- <u-icon name="arrow-right" ></u-icon> -->
                    </view>
                    <view class="modal_flex mt24">
                        <view class="but_mod fontc14" @tap="show = false">关闭</view>
                        <view
                            class="but_mod fontc14 mod_approve"
                            @tap="modifyThePhone()"
                            v-if="rwFlag == 'READ_WRITE'"
                            >设置</view
                        >
                    </view>
                </view>
                <view style="width: 100%" v-else>
                    <view class="modal_font12">{{ dataDetails.name }}</view>
                    <view class="modal_content mt24" v-if="dataDetails.dataType == 'BOOL'">
                        <text class="contend_right">{{ dataDetails.bulitValue }}</text>
                        <u-switch
                            :inactiveValue="0"
                            :activeValue="1"
                            v-model="dataDetails.value"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                            :size="18"
                            activeColor="#20C789"
                            inactiveColor="#FF4848"
                        ></u-switch>

                        <text
                            v-else
                            class="readOnly"
                            :class="dataDetails.value ? 'open' : 'close'"
                        ></text>
                        <view
                            class="shade"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                            @tap="modifyThePhone()"
                        ></view>
                    </view>
                    <view class="modal_content mt24" v-else-if="dataDetails.dataType == 'DOUBLE'">
                        <input
                            type="text"
                            style="flex: 1"
                            placeholder=""
                            class="input_class mt16"
                            v-model="dataDetails.value"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        />
                        <!-- <text style="flex: 1; line-height: 96upx;" class="content_icon" v-else>{{ dataDetails.value }}{{ dataDetails.dataSpecs.unit ? dataDetails.dataSpecs.unit : '' }}</text> -->
                        <view v-else style="flex: 1">
                            <!-- <text >
								{{ dataDetails.value }}
							</text>
							<text style="flex: 1;line-height: 96upx;" class="content_icon">{{ dataDetails.dataSpecs.unit ? dataDetails.dataSpecs.unit : '' }}</text> -->
                            <view
                                class="input_class"
                                style="
                                    flex: 1;
                                    padding-right: 70upx;
                                    line-height: 96upx;
                                    background-color: #ddd;
                                "
                                >{{ dataDetails.value }}</view
                            >
                            <text class="content_icon">{{ dataDetails.dataSpecs.unit }}</text>
                        </view>
                    </view>
                    <view class="modal_content mt24" v-else-if="dataDetails.dataType == 'TEXT'">
                        <textarea
                            style="flex: 1; padding: 20upx; max-height: 400px; min-height: 150px"
                            :maxlength="-1"
                            placeholder=""
                            class="input_class mt16"
                            v-model="dataDetails.value"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        />
                        <text
                            style="flex: 1; height: 400px; overflow: auto; background-color: #fff"
                            v-else
                        >
                            {{ dataDetails.value
                            }}{{ dataDetails.dataSpecs.unit ? dataDetails.dataSpecs.unit : '' }}
                        </text>
                    </view>
                    <view
                        class="modal_content mt24"
                        v-else-if="dataDetails.dataType == 'DATE'"
                        @click="openDataSelect(dataDetails)"
                    >
                        <!-- @click="showData = true" -->
                        <view
                            class="input_class"
                            style="flex: 1; padding-right: 50upx; line-height: 96upx"
                            :class="dataDetails.rwFlag == 'READ_WRITE' ? '' : 'dbgc'"
                            >{{ dataDetails.value ? dataDetails.value : '' }}</view
                        >
                        <!-- calendar data_time-->
                        <image
                            src="@/static/calendar.png"
                            mode=""
                            class="content_icon"
                            style="margin-top: -3upx"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        ></image>
                    </view>

                    <view
                        class="modal_content mt24"
                        v-else-if="dataDetails.dataType == 'ENUM'"
                        @tap="OpenDropDown"
                    >
                        <view
                            class="input_class"
                            style="
                                flex: 1;
                                padding-right: 50upx;
                                line-height: 96upx;
                                overflow: hidden;
                            "
                            :class="dataDetails.rwFlag == 'READ_WRITE' ? '' : 'dbgc'"
                            >{{ dataDetails.bulitValue }}</view
                        >
                        <!-- <u-icon name="arrow-right" class="ico_right content_icon"></u-icon> -->
                        <u-icon
                            name="arrow-right"
                            class="ico_right ico_right content_icon"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        ></u-icon>
                    </view>
                    <view
                        class="modal_content mt24"
                        v-else-if="dataDetails.dataType == 'FLOAT' || dataDetails.dataType == 'INT'"
                    >
                        <input
                            type="number"
                            style="flex: 1"
                            :max="dataDetails.dataSpecs.max"
                            :step="dataDetails.dataSpecs.step"
                            :min="dataDetails.dataSpecs.min"
                            placeholder=""
                            class="input_class"
                            v-model="dataDetails.value"
                            v-if="dataDetails.rwFlag == 'READ_WRITE'"
                        />
                        <view
                            class="input_class"
                            style="
                                flex: 1;
                                padding-right: 70upx;
                                line-height: 96upx;
                                background-color: #ddd;
                            "
                            v-else
                            >{{ dataDetails.value }}</view
                        >
                        <text class="content_icon">{{ dataDetails.dataSpecs.unit }}</text>
                        <!-- <u-icon name="arrow-right" ></u-icon> -->
                    </view>
                    <view class="modal_flex mt24">
                        <view class="but_mod fontc14" @tap="show = false">关闭</view>
                        <view
                            class="but_mod fontc14 mod_approve"
                            @tap="modifyThePhone()"
                            v-if="
                                dataDetails.rwFlag == 'READ_WRITE' && dataDetails.dataType != 'BOOL'
                            "
                            >设置</view
                        >
                    </view>
                </view>
            </u-modal>
            <u-action-sheet
                :actions="listSex"
                @select="selectClickSex"
                :closeOnClickOverlay="true"
                :closeOnClickAction="true"
                title=""
                :show="showSex"
                cancelText="取消"
                @close="showSex = false"
            ></u-action-sheet>
            <u-toast ref="uToast" />
            <!-- <u-datetime-picker
                :show="showData"
                v-model="value1"
                mode="datetime"
                @cancel="showData = false"
                @confirm="confirm"
            ></u-datetime-picker> -->
            <!-- :value="valueData" 控制台报错修改 2022-3-1 -->
            <seconds-datetime-picker
                :show="showData"
                mode="datetime"
                v-model="value1"
                @cancel="showData = false"
                @confirm="confirm"
            >
            </seconds-datetime-picker>
        </view>
    </view>
</template>

<script>
import { getParamConfig, setDevicesProperty } from '@/api/device.js'
// import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
import secondsDatetimePicker from '@/components/seconds-datetime-picker/seconds-datetime-picker.vue'
import { mapGetters } from 'vuex'
import structTree from './structTree'
export default {
    data() {
        return {
            properties: [],
            show: false,
            title: '',
            form: {},
            dataDetails: {},
            listSex: [
                {
                    name: '男'
                },
                {
                    name: '女'
                }
            ],
            showSex: false,
            showData: false,
            value1: '',
            rwFlag: '',
            structData: {}
        }
    },
    onLoad: function (option) {
        this.form = JSON.parse(decodeURIComponent(option.form))
        this.getParamConfig()
    },
    watch: {
        deviceIdentify(val) {
            if (val.deviceId == this.form.deviceId) {
                for (let i = 0; i < this.properties.length; i++) {
                    if (this.properties[i].dataType == 'STRUCT') {
                        this.properties[i].dataSpecsList.forEach((item) => {
                            if (val.value.hasOwnProperty(item.identifier)) {
                                item.value = val.value[item.identifier]
                                this.$forceUpdate()
                            }
                            if (this.identifier == val.identify) {
                                this.spinning = false
                            }
                        })
                    } else {
                        if (this.properties[i].identifier == val.identify) {
                            this.properties[i].value = val.value
                            this.$forceUpdate()
                        }
                        if (this.identifier == val.identify) {
                            this.spinning = false
                        }
                    }
                }
                this.$forceUpdate()
            }
        },
        show(val) {
            if (!val) {
                this.showSex = false
                this.showData = false
            }
        }
    },
    methods: {
        // 只读属性
        openDataSelect({ rwFlag }) {
            if (rwFlag != 'READ_WRITE') return
            this.showData = true
        },
        // 选择时间
        bindChange(value) {
            console.log(value, 'value')
        },
        // 返回
        getBack() {
            this.$store.commit('SET_COMMON')
            this.$leftClick()
        },
        // 选择时间
        confirm(e) {
            if (!e.value) return
            this.dataDetails.value = this.$getdate(e.value, 1)
        },
        // eumn 切换
        selectClickSex(index) {
            this.dataDetails.bulitValue = index.name
            this.dataDetails.value = index.value
        },
        // 打开下拉
        OpenDropDown() {
            if (this.dataDetails.rwFlag != 'READ_WRITE') return
            this.listSex = this.dataDetails.dataSpecsList
            this.dataDetails.bulitValue = this.dataDetails.dataSpecsList.find(
                (key) => key.value == this.dataDetails.value
            ).name
            this.showSex = true
        },
        // 设置
        modifyThePhone() {
            let value = undefined
            if (this.structData.dataType) {
                value = {}
                this.structData.dataSpecsList.forEach((item) => {
                    value[item.identifier] = item.value
                })
            } else {
                if (this.dataDetails.dataType == 'BOOL') {
                    // 布尔情况判断
                    value = this.dataDetails.value ? 0 : 1
                } else if (
                    this.dataDetails.dataType == 'FLOAT' ||
                    this.dataDetails.dataType == 'INT' ||
                    this.dataDetails.dataType == 'DOUBLE'
                ) {
                    // 数字情况判断
                    value = this.dataDetails.value
                    if (
                        parseFloat(value) > parseFloat(this.dataDetails.dataSpecs.max) ||
                        parseFloat(value) < parseFloat(this.dataDetails.dataSpecs.min)
                    ) {
                        this.show = false
                        return this.$refs.uToast.show({
                            message:
                                '最大不能超过' +
                                this.dataDetails.dataSpecs.max +
                                ',最小不能低于' +
                                this.dataDetails.dataSpecs.min,
                            type: 'error'
                        })
                    }
                } else {
                    value = this.dataDetails.value
                }
            }
            this.setparameters(value) // 请求
        },
        // 操作封装
        setparameters(value) {
            uni.showLoading({
                title: '指令发送中'
            })
            let param = {
                deviceId: this.form.deviceId,
                propertyList: [
                    {
                        attr: this.dataDetails.identifier,
                        value: value
                    }
                ]
            }
            this.$Axios
                .post(setDevicesProperty, param)
                .then((res) => {})
                .catch(() => {})
                .finally(() => {
                    this.show = false
                    uni.hideLoading()
                })
        },
        // 布尔限制
        boorOperate(row) {
            if (row.rwFlag == 'READ_WRITE') {
                this.dataDetails = {}
                this.dataDetails = JSON.parse(JSON.stringify(row))
                let value = row.value == 1 ? 0 : 1
                this.setparameters(value)
            }
        },
        // 打开操作弹框
        toModify(row, inof) {
            this.dataDetails = {}
            if (inof) {
                row.rwFlag = inof.rwFlag
                this.rwFlag = inof.rwFlag
                this.structData = inof
            } else {
                this.rwFlag = ''
                this.structData = {}
            }
            if (row.dataType == 'BOOL') {
                row.bulitValue = row.value ? row.dataSpecsList[1].name : row.dataSpecsList[0].name
            } else if (row.dataType == 'ENUM') {
                row.bulitValue = row.dataSpecsList.find((key) => key.value === row.value).name
            } else if (row.childDataType == 'ENUM') {
                row.bulitValue = row.childEnumSpecsDTO.find((key) => key.value === row.value).name
                this.show = true
            }
            this.dataDetails = JSON.parse(JSON.stringify(row))
            this.show = true
        },
        // 获取参数
        getParamConfig() {
            uni.showLoading({
                title: '正在加载'
            })
            let param = {
                deviceId: this.form.deviceId
            }
            this.$Axios
                .get(getParamConfig, param)
                .then((res) => {
                    res.properties.forEach((item) => {
                        for (let key in res.valueList) {
                            if (item.identifier == key) {
                                if (item.dataType == 'BOOL') {
                                    item.value =
                                        res.valueList[key] && res.valueList[key] != 0 ? 1 : 0
                                } else if (item.dataType == 'STRUCT') {
                                    for (let value of item.dataSpecsList) {
                                        for (let son in res.valueList[key]) {
                                            if (value.identifier == son) {
                                                if (value.childDataType == 'BOOL') {
                                                    value.value =
                                                        res.valueList[key][son] &&
                                                        res.valueList[key][son] != 0
                                                            ? 1
                                                            : 0
                                                } else if (value.childDataType == 'DATE') {
                                                    value.value = res.valueList[key][son]
                                                        ? this.$getdate(res.valueList[key][son], 1)
                                                        : ''
                                                } else {
                                                    value.value = res.valueList[key][son]
                                                }
                                            }
                                        }
                                    }
                                } else if (item.dataType == 'DATE') {
                                    item.value = res.valueList[key]
                                        ? this.$getdate(res.valueList[key], 1)
                                        : ''
                                } else {
                                    item.value = res.valueList[key]
                                }
                            }
                        }
                    })
                    this.properties = res.properties
                })
                .catch(() => {})
                .finally(() => {
                    uni.hideLoading()
                })
        }
    },
    computed: {
        ...mapGetters(['deviceIdentify'])
    },
    components: {
        structTree,
        secondsDatetimePicker
    }
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
.width44,
.width100 {
    width: 44%;
    margin-right: 6%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
}
.width100 {
    width: 100%;
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
    z-index: 1;
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
    image {
        width: 48upx;
        height: 48upx;
    }
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
.structs {
    padding-left: 40upx;
    box-sizing: border-box;
}
.max80 {
    max-width: 80%;
}
.bordernoe {
    border-bottom: 1px solid $uni-color-borders;
}
.shade {
    position: absolute;
    right: 0;
    width: 38px;
    height: 20px;
}
.dbgc {
    background-color: #ddd;
}
</style>
