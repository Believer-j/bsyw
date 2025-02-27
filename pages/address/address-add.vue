<template>
	<view class="font-16 font-weight-regular page-gradient-bg"
		style="width: 100vw; color: #545958; font-size: 400; min-height: 100vh;">
		<u-navbar :fixed="true" title="添加收货地址" height="70px" :placeholder="true" bgColor="#FAFCFF" :autoBack="true">

		</u-navbar>
		<view
			style="background-color: #FFFFFF; border: 1px; border-radius: 5px; margin-top: 31px; margin-left: 16px; margin-right: 16px; padding: 11px 12px 11px 12px;">
			<view class="flex-row flex-between">
				<text>收货人</text>
				<u-input placeholder="请填写收货人姓名" border="none" confirmType="done" inputAlign="right"
					v-model="parameters.name">
				</u-input>
			</view>
			<view style="height: 1px; background-color: #F5F5F5; margin-top: 11px; margin-bottom: 10px;"></view>
			<view class="flex-row flex-between" style="">
				<text>手机号码</text>
				<u-input placeholder="请填写收货人手机号码" type="number" maxlength="11" border="none" confirmType="done"
					inputAlign="right" v-model="parameters.mobile">
				</u-input>
			</view>
			<view style="height: 1px; background-color: #F5F5F5; margin-top: 11px; margin-bottom: 10px;"></view>
			<view class="flex-row flex-between" style="">
				<text>所在地区</text>
				<view class="flex-row flex-items-center">
					<addressSelect :parameters="parameters" @change='addressChange'></addressSelect>
					<view style="margin-left: 8px;">
						<image src="@/static/address.png" style="width: 17px; height: 16px;"></image>
					</view>
				</view>
			</view>
			<view style="height: 1px; background-color: #F5F5F5; margin-top: 11px; margin-bottom: 10px;"></view>
			<view class="flex-column" >
				<text>详细地址</text>
				<view class="" style="margin-top: 6px; margin-bottom: 14px;">
					<tui-textarea placeholder="请填写街道、楼牌号等" v-model="parameters.detailsAddr" background-color="#F4F9F7"
						:border-bottom="false" :border-top="false" radius="12rpx" height="101px">
					</tui-textarea>
					<view style="margin: -25px 0px 0px 15px;" class="clearBtn" @click="parameters.detailsAddr=''">
						清除
					</view>
				</view>
			</view>
			<!-- <view class="flex-row flex-between" style="margin-top: 16px;">
				<text>设为默认地址</text>
				<u-switch space="2" v-model="tempDefaultSta" @change="defaultSwitch($event)" activeColor="#18533C"
					inactiveColor="rgb(230, 230, 230)">
				</u-switch>
			</view> -->
		</view>

		<view class="flex-row flex-center flex-items-center"
			style="bottom: 0; height: 45px; margin: 59px 14px 5px 17px; border-radius: 10px; background-color: #389838;"
			@click="isEdit ? $u.throttle(addressUpdate, 3000) : addressAdd()">
			<text class="font-18 font-weight-semibold" style=" color: #FFFFFF;">保存</text>

		</view>

	</view>
</template>

<script>
	import tuiTextarea from "@/components/tui-textarea/tui-textarea.vue"
	import addressSelect from "@/components/address-select/address-select.vue";
	// import {
	// 	empty,
	// 	showToast
	// } from "@/tools/index.js";
	import {
		addAddressApi,
		updateAddressApi
	} from '@/config/api.js'

	export default {
		components: {
			tuiTextarea,
			addressSelect
		},
		data() {
			return {
				parameters: {
					account: '',
					area: '',
					city: '',
					defaultSta: 0,
					detailsAddr: '',
					id: 0,
					mobile: '',
					name: '',
					province: '',
					status: 0,
					userId: 0

				},
				tempDefaultSta: false, //临时默认地址变量
				isEdit: false, // 是否是编辑地址
			}
		},
		onLoad(options) {
			if (Object.keys(options).length !== 0) {
				let data = JSON.parse(options.data);
				if (data.mobile) {
					this.$nextTick(() => {
						this.isEdit = true
						this.parameters = data
						this.parameters.defaultSta == 1 ? this.tempDefaultSta = true : this.tempDefaultSta = false
					})
					
					//this.parameters.defaultAddr = JSON.parse(this.parameters.defaultAddr)
				}
			}
		},
		methods: {
			showToast(msg) {
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				});
			},
			addressChange(e) {
				this.parameters.area = e.area
				this.parameters.city = e.city
				this.parameters.province = e.province
			},
			//返回上一页
			back() {
				uni.navigateBack()
			},
			//默认地址选择
			defaultSwitch(event) {
				if (event) {
					this.parameters.defaultSta = 1
					this.tempDefaultSta = true
				} else {
					this.parameters.defaultSta = 0
					this.tempDefaultSta = false
				}
			},

			jumpParmas(obj) {
				if (uni.$u.test.isEmpty(obj.name)) {

					this.showToast('请输入收货人姓名')
					return false
				}
				if (!uni.$u.test.mobile(obj.mobile)) {
					this.showToast('请输入正确的手机号')
					return false
				}
				if (uni.$u.test.isEmpty(obj.area)) {
					this.showToast('请选择所在地区')
					return false
				}
				if (uni.$u.test.isEmpty(obj.detailsAddr)) {
					this.showToast('请输入详细地址')
					return false
				}
				return true
			},

			//添加地址
			async addressAdd() {
				let temp = {
					area: this.parameters.area,
					city: this.parameters.city,
					defaultSta: this.parameters.defaultSta,
					detailsAddr: this.parameters.detailsAddr,
					mobile: this.parameters.mobile,
					name: this.parameters.name,
					province: this.parameters.province,
					addrId: ''
				}
				if (!this.jumpParmas(temp)) {
					return
				}
				const res = await addAddressApi(temp)
				this.showToast('添加地址成功')
				setTimeout(function() {
					var pages = getCurrentPages(); // 获取当前挂载的路由数组
					var prePage = pages[pages.length - 2] //获取 上一个页面
					uni.navigateBack({
						success() {
							prePage.$vm.goCurrent() // 当返回成功的时候调用上一级页面的回调
						}
					})
				}, 1000);

			},
			//修改地址
			async addressUpdate() {
				let temp = {
					area: this.parameters.area,
					city: this.parameters.city,
					defaultSta: this.parameters.defaultSta,
					detailsAddr: this.parameters.detailsAddr,
					mobile: this.parameters.mobile,
					name: this.parameters.name,
					province: this.parameters.province,
					id: this.parameters.id
				}
				if (!this.jumpParmas(temp)) {
					console.log('xxx')
					return
				}
				const res = await updateAddressApi(temp)
				this.showToast('修改地址成功')
				setTimeout(function() {
					var pages = getCurrentPages(); // 获取当前挂载的路由数组
					var prePage = pages[pages.length - 2] //获取 上一个页面
					uni.navigateBack({
						success() {
							prePage.$vm.goCurrent() // 当返回成功的时候调用上一级页面的回调
						}
					})
				}, 1000);
			},


		}
	}
</script>

<style lang="scss">
	.clearBtn {
		position: relative;
		z-index: 999;
		font-size: 12px;
		color: #A1A09E;
	}
</style>