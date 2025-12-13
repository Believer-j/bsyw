<template>
	<view class=" page-gradient-bg" style="height: 100vh;">
		<scroll-view scroll-y="true" style="" :style="{height: scrollHeight + 'px'}">
			<!-- #ifdef APP -->
			<view class="r-flex-row r-flex-items-center r-flex-center" style="padding-top: 42px;">
			<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="r-flex-row r-flex-items-center r-flex-center" style="padding-top: 12px;">
				<!-- #endif -->
					<image src="/static/bsyw-logo-green.png" mode="heightFix" style="height: 45px;"></image>
				</view>
				<view style="margin: 14px;">
					<u-swiper :list="list1" height="200px"></u-swiper>
				</view>
				
				<view class="" style="font-weight: 500;font-size: 18px;color: #333333;line-height: 21px; margin-left: 15px;">
					商家
				</view>
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
						<view class="flex-row flex-between" style="margin-top: 5px;">
							<p style="margin-right: 10px;">
								<image src="/static/address.png" style="width: 12px; height: 13px;"></image>
								<span style="font-size: 12px; color: #545958; margin-left: 5px;">四川声成都市繁花似锦的开发和建设倒海翻江开始</span>
							</p>
							<view class="flex-row-center copyBtn">
								复制
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
		computed: {
			scrollHeight() {
				const sys = uni.$u.sys()
				return sys.windowHeight - this.tabbarHeight - 2
			}
		},
		data() {
			return {
				list1: ['https://static-bsyw.oss-cn-shanghai.aliyuncs.com/img/banner2.png',
					'https://static-bsyw.oss-cn-shanghai.aliyuncs.com/img/banner3.png',
				],
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.copyBtn {
		min-width: 61px;
		width: 61px;
		height: 28px;
		background: #18533C;
		border-radius: 6px;
		font-weight: 600;
		font-size: 16px;
		color: #FFFFFF;
	}
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