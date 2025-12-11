<template>
	<view class=" page-gradient-bg" style="height: 100vh;">
		<view class="" style="width: 100vw;" :style="{height: navbarHeight + 'px'}">
			<view class="" style="width: 100vw;" :style="{height: statusBarHeight + 'px'}">
			</view>
			<view class="" style="width: 100vw;padding-top: 5px;" :style="{height: navbarHeight - statusBarHeight + 'px'}">
				<view class="flex-row flex-items-center flex-between" style="color: #545958; margin-left: 15px; margin-right: 15px; height: 34px; background-color: white; border-radius: 17px;">
					<image src="/static/img/search.png" style="width: 20px; height: 20px; margin-left: 14px;"></image>
					<input v-model="serchKey" style="margin-left: 10px; width: calc(100% - 104px);" type="text"  />
					<view class="flex-row-center" style="width: 60px; height: 100%;" @click="search">
						{{ searching ? '取消' : '搜索'  }}
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" style="" :style="{height: pageHeight - navbarHeight - 5 + 'px'}">
			<view v-for="(item, index) in 10" :key="index" class="merchant_item flex-row flex-between">
				<view class="">
					<image class="logo" src="/static/img/common/720.png" mode="aspectFill"></image>
				</view>
				<view class="flex-column right">
					<view class="flex-row flex-between">
						<span class="name">龙潭寺诊所</span>
						<view class="flex-row flex-items-center">
							<image src="/static/img/daohang.png" style="width: 12px; height: 13px;"></image>
							<span style="font-size: 12px; color: #545958; margin-left: 5px;">300m</span>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<navbar></navbar>
	</view>
</template>

<script>
	import base from '@/mixins/base';
	export default {
		mixins: [base],
		data() {
			return {
				searching: false,
				serchKey: ''
			}
		},
		methods: {
			search() {
				if (this.searching) {
					this.searching = false
					this.serchKey = ''
					return
				}
				uni.hideKeyboard()
				console.log(this.serchKey)
				this.searching = true
			}
		}
	}
</script>

<style scoped>
	.name {
		font-weight: 600;
		font-size: 18px;
		color: #545958;
	}
	.merchant_item {
		background-color: white;
		border-radius: 15px;
		margin: 12px 15px;
		/* height: 100px; */
		padding: 20px 12px;
	}
	.merchant_item .right {
		width: calc(100% - 72px);
		
	}
	.merchant_item .logo {
		width: 60px;
		height: 60px;
		min-width: 60px;
		border-radius: 7px;
	}
</style>