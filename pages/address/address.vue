<template>
	<view class="page-gradient-bg" style="min-height: 100vh;">
		<!-- <u-navbar title="我的收货地址" :placeholder="true" height="70px" :autoBack="true">
			<view class="" style="color: #18533C; font-size: 15px;" slot="right" @click="editing = !editing">
				{{ editing ? '取消' : '管理' }}
			</view>
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				
			</view>
		</u-navbar> -->
		<u-navbar :fixed="true" title="" :placeholder="true" bgColor="rgba(255, 255, 255, 0)" :autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				我的收货地址
			</view>
			<view class="" style="color: #18533C; font-size: 15px;" slot="right" @click="editing = !editing">
				{{ editing ? '取消' : '管理' }}
			</view>
		</u-navbar>
		<view class="address-wrap  r-flex-column content" :style="{maxHeight: pageHeight - 64 + 'px', minHeight: pageHeight - 64 + 'px'}">
			<view v-for="(item,index) in dataList" :key="index" class="r-flex-row r-flex-items-center r-flex-between">
				<view class="item r-flex-row r-flex-items-center r-flex-between" :class="[editing ? 'editingWidth' : 'normalWidth']" @click="selectAddress(index)">
					<view class="r-flex-column">
						<view class="r-flex-row r-flex-items-center">
							<text class="name">{{ item.name }}</text>
							<text class="phone">{{ item.mobile }}</text>

						</view>
						<text
							class="address">{{ `${item.province}${item.city}${item.area}${item.detailsAddr}` }}</text>
					</view>
					<u-icon v-if="!editing && !isSelect" name="edit-pen" color="#E2E2E2" size="28" @click="edit(item)"></u-icon>
				</view>
				<view v-if="editing" class="font-16 r-flex-all-center" style="color: #e74d23; width: 50px;" @click="deleteAddr(item)">
					删除
				</view>
			</view>
		</view>
		<view class="address-add-wrap r-flex-all-center">
			<view class="btn r-flex-all-center" @click="gotoAddressAdd">
				+ 添加收货地址
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addressListApi,
		deleteAddressApi
	} from '@/config/api.js'
	import base from '@/mixins/base'
	export default {
		mixins: [base],
		data() {
			return {
				dataList: [],
				editing: false,
				isSelect: false
			}
		},
		onLoad(info) {
			this.isSelect = info.select == '1'
			this.getAddressList()
		},
		methods: {
			selectAddress(index) {
				if (!this.isSelect) {
					return
				}
				var pages = getCurrentPages(); // 获取当前挂载的路由数组
				var prePage = pages[pages.length - 2] //获取 上一个页面
				uni.navigateBack({
					success() {
						prePage.$vm.selectAddress(index) // 当返回成功的时候调用上一级页面的回调
					}
				})
			},
			gotoAddressAdd() {
				uni.navigateTo({
					url: '/pages/address/address-add'
				})
			},
			async getAddressList() {
				const res = await addressListApi()
				this.dataList = res
			},
			edit(item) {
				let data = JSON.stringify(item);
				uni.navigateTo({
					url: '/pages/address/address-add?data=' + data
				})
			},
			goCurrent() {
				this.getAddressList()
			},
			async deleteAddr(item) {
				await deleteAddressApi(item.id)
				this.getAddressList()
			}
		}
	}
</script>

<style lang="scss">
	.address-add-wrap {
		width: 100vw;
		height: 54px;
		background: #FFFFFF;
		margin-top: 10px;

		.btn {
			width: 344px;
			height: 44px;
			background: #389838;
			border-radius: 15px;

			font-weight: 600;
			font-size: 18px;
			color: #FFFFFF;
		}
	}

	.address-wrap {
		// min-height: calc(100vh - 48px);
		overflow: scroll;
		max-height: calc(100vh - 70px - 64px);
		min-height: calc(100vh - 70px - 64px);
		.normalWidth {
			width: calc(100vw - 28px);
		}
		.editingWidth {
			width: calc(100vw - 78px);
		}
		.item {
			margin-top: 10px;
			// height: 84px;
			background: #FFFFFF;
			border-radius: 15px;
			padding: 16px 12px;
			margin-left: 14px;
			margin-right: 14px;
			

			.default {
				padding: 2px 4px;
				border-radius: 2px;
				border: 1px solid #18533C;

				font-weight: 600;
				font-size: 10px;
				color: #18533C;
				margin-left: 6px;
			}

			.name {
				font-weight: 600;
				font-size: 16px;
				color: #4F5755;
			}

			.phone {
				font-weight: 400;
				font-size: 14px;
				color: #545958;
				margin-left: 6px;
			}

			.address {
				font-weight: 400;
				font-size: 12px;
				color: #9BA09F;
				margin-top: 5px;
			}
		}
	}
</style>