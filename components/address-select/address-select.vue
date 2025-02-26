<template>
	<view>
		<picker class="pickerList" mode="multiSelector" :range="region" range-key="label"
			:value="multiIndex" @change="pickerChange" @columnchange="pickerColumnchange">
			<!-- <view class="input" v-if="parametersTemp.area != ''">
				{{parametersTemp.province + parametersTemp.city + parametersTemp.area}}
			</view> -->
			<!-- <view class="input">
				{{parametersTemp.province + parametersTemp.city + parametersTemp.area}}
			</view> -->
			<u-input v-model="text" placeholder="请选择地址" input-align="right" border="none" :disabled="true" disabledColor="#FFFFFF" ></u-input>
			<!-- <view v-else class="placeholder-input">请选择地址</view> -->
			
		</picker>
	</view>
</template>

<script>
	import {
		regionData,
		CodeToText
	} from "element-china-area-data";
	export default {
		name:"address-select",
		props:{
			parameters:{
				type:Object,
				require:true
			},
			
		},
		watch: {
			parameters: {
				handler(newVal, oldVal) {
					this.parametersTemp = newVal
					this.text = this.parametersTemp.province + this.parametersTemp.city + this.parametersTemp.area
				}
			}
		},
		data() {
			return {
				text: '',
				parametersTemp: {},
				regionData: regionData, //地址集
				//当前选择地址
				region: [
					[],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
			};
		},
		mounted() {
			this.addrInit(this.multiIndex) //选项初始化 省市区联动
			//判断是否存在地址信息
			if (this.parameters.area != '') {
				let areaarr = [this.parameters.province, this.parameters.city, this.parameters.area]
				this.getRegionIndex(areaarr).then(res => {
					this.region = [
						[],
						[],
						[]
					];
					this.addrInit(this.multiIndex);
				})
			}
		},
		methods:{
			//初始化选择器
			addrInit(selectedArr = [0, 0, 0]) {
				for (let i = 0; i < this.regionData.length; i++) {
					this.region[0].push(this.regionData[i]);
				}
				for (let i = 0; i < this.regionData[selectedArr[0]].children.length; i++) {
					this.region[1].push(this.regionData[selectedArr[0]].children[i]);
				}
				for (let i = 0; i < this.regionData[selectedArr[0]].children[selectedArr[1]].children
					.length; i++) {
					this.region[2].push(this.regionData[selectedArr[0]].children[selectedArr[1]]
						.children[i]);
				}
				this.multiIndex = selectedArr;
			},
			//选择器改变
			pickerChange(e) {
				this.multiIndex = e.detail.value;
				this.parametersTemp.province = this.region[0][this.multiIndex[0]].label
				this.parametersTemp.city = this.region[1][this.multiIndex[1]].label
				this.parametersTemp.area = this.region[2][this.multiIndex[2]].label
				console.log(this.parametersTemp)
				this.$emit('change', this.parametersTemp)
				//this.parameters.address = this.parameters.province + this.parameters.city + this.parameters.area
			},
			//选择项目
			pickerColumnchange(e) {
				if (e.detail.column === 0) {
					this.multiIndex[0] = e.detail.value
					this.region[1] = this.regionData[this.multiIndex[0]].children.map((
						item,
						index) => {
						return item
					})
					if (this.regionData[this.multiIndex[0]].children.length === 1) { //判断第二列只有一个选项
						this.region[2] = this.regionData[this.multiIndex[0]].children[0]
							.children.map((item,
								index) => {
								return item
							})
					} else {
						if (this.regionData[this.multiIndex[0]].children[0].children) { //判断第二列有子项
							this.region[2] = this.regionData[this.multiIndex[0]].children[
									this.multiIndex[1]]
								.children.map((item, index) => {
									return item
								})
						} else {
							this.region[2] = [{
								label: '',
								value: ''
							}]
						}
					}
					this.multiIndex.splice(1, 1, 0)
					this.multiIndex.splice(2, 1, 0)
				}
				// 第二列滑动
				if (e.detail.column === 1) {
					this.multiIndex[1] = e.detail.value
					if (this.regionData[this.multiIndex[0]].children[this.multiIndex[1]]
						.children) {
						this.region[2] = this.regionData[this.multiIndex[0]].children[this.multiIndex[1]]
							.children.map((item, index) => {
								return item
							})
					} else {
						this.region[2] = [{
							label: '',
							value: ''
						}]
					}
					this.multiIndex.splice(2, 1, 0)
				}
				// 第三列滑动
				if (e.detail.column === 2) {
					this.multiIndex[2] = e.detail.value
				}
			},
			//获取地址index
			async getRegionIndex(data) {
				let [province, city, county] = [0, 0, 0];
				//返回汉字的话value改label
				province = this.region[0].findIndex((item, index) => {
					return data[0] == item.label;
				})
				city = this.region[0][province].children.findIndex((item, index) => {
					return data[1] == item.label;
				})
			
				if (this.region[0][province].children[city].children) { //是否存在第三级
					county = this.region[0][province].children[city].children.findIndex((item, index) => {
						return data[2] == item.label;
					})
				} else {
					county = 0
				}
				this.multiIndex = [province, city, county]
			},
		}
	}
</script>

<style>

</style>