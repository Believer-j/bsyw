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

				<view style="font-weight: 500;font-size: 18px;color: #333333;line-height: 21px; margin-left: 15px; margin-top: 30px">
					白沙商家
				</view>
				<view v-for="(item, index) in datas" :key="index" class="merchant_item flex-row flex-between">
					<view class="">
						<image class="logo" :src="item.url" mode="aspectFill"></image>
					</view>
					<view class="flex-column right">
						<view class="flex-row flex-between">
							<span class="name">{{ item.name }}</span>
							<view v-if="showDistance" class="flex-row flex-items-center">
								<image src="/static/img/daohang.png" style="width: 12px; height: 13px;"></image>
								<span
									style="font-size: 12px; color: #545958; margin-left: 5px;">{{ item.distance }}m</span>
							</view>
						</view>
						<view class="flex-row flex-items-center" style="margin-top: 5px;">
							<view class="flex-row flex-items-center" >
								<view class=""
									style="padding: 4px 7px; background-color: #EEFAF7; border-radius: 2px; color: #38BF9F; font-weight: 500; font-size: 10px;">
									{{ item.province }}
								</view>
							</view>
							<view class="flex-row flex-items-center" style="margin-left: 5px;">
								<view class=""
									style="padding: 4px 7px; background-color: #F6F4ED; border-radius: 2px; color: #DC8924; font-weight: 500; font-size: 10px;">
									{{ item.city }}
								</view>
							</view>
							<view class="flex-row flex-items-center" style="margin-left: 5px;">
								<view class=""
									style="padding: 4px 7px; background-color: #EDF4F6; border-radius: 2px; color: #549AF4; font-weight: 500; font-size: 10px;">
									{{ item.area }}
								</view>
							</view>
						</view>
						<view class="flex-row" style="margin-top: 5px;">
							<image src="/static/img/phone.png" style="width: 12px; height: 13px;"></image>
							<view
								style="font-size: 12px; color: #545958; margin-left: 5px;">{{ item.mobile }}</view>
						</view>
						<view class="flex-row flex-between" style="margin-top: 5px;">
							<view class="flex-row" style="margin-right: 10px;" @click="openLocation(item)">
								<image src="/static/address.png" style="width: 12px; height: 13px;"></image>
								<view
									style="font-size: 12px; color: #545958; margin-left: 5px;">{{ item.details }}</view>
							</view>
							<view class="flex-row-center copyBtn" @click="copy(item)">
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
	import {
		merchantApi
	} from "@/config/api.js"

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
				datas: [],
				latitude: 0,
				longitude: 0,
				showDistance: false
			}
		},
		onLoad() {
			this.getDatas()
			let that = this
			setTimeout(function() {
				that.getLocation()
			}, 500);
		},
		methods: {
			openLocation(item) {
				uni.openLocation({
					latitude: Number(item.dimension),
					longitude: Number(item.longitude),
					success: function() {
						console.log('success');
					},
					fail: (e) => {
						console.log(e)
					}
				});
			},
			copy(item) {
				uni.setClipboardData({
					data: item.details,
					showToast: false,
					success: () => {
						uni.showToast({
							title: "地址已复制"
						})
					}
				})
			},
			async getDatas() {
				const res = await merchantApi()
				this.datas = res
				this.processLocation()
			},
			getLocation() {
				let that = this
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						console.log(res)
						that.latitude = res.latitude
						that.longitude = res.longitude
						that.processLocation()
					},
					fail: (e) => {
						console.log(e)
					},
					complete: () => {
						console.log('wancheng----')
					}
				});
			},
			processLocation() {
				if (this.longitude == 0) {
					return
				}
				let list = uni.$u.deepClone(this.datas);
				for (var index = 0; index < list.length; index++) {
					var element = list[index];
					const distance = this.calculateGCJ02Distance(Number(element.longitude), Number(element.dimension), this.longitude, this
						.latitude)
					element.distance = distance
					list[index] = element
				}
				this.showDistance = true
				this.datas = list
			},
			/**
			 * 计算两个 GCJ02 经纬度之间的直线距离（单位：米）
			 * @param {Number} lng1 第一个点的经度
			 * @param {Number} lat1 第一个点的纬度
			 * @param {Number} lng2 第二个点的经度
			 * @param {Number} lat2 第二个点的纬度
			 * @returns {Number} 两点间距离（米），保留2位小数
			 */
			calculateGCJ02Distance(lng1, lat1, lng2, lat2) {
				// 地球半径（米），GCJ02基于地球椭球，取平均半径即可
				const EARTH_RADIUS = 6371000;

				// 经纬度转弧度（弧度 = 角度 × π / 180）
				const radLat1 = lat1 * Math.PI / 180;
				const radLat2 = lat2 * Math.PI / 180;
				const radLng1 = lng1 * Math.PI / 180;
				const radLng2 = lng2 * Math.PI / 180;

				// Haversine 公式核心计算
				const deltaLat = radLat2 - radLat1; // 纬度差
				const deltaLng = radLng2 - radLng1; // 经度差
				const a =
					Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
					Math.cos(radLat1) * Math.cos(radLat2) *
					Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
				const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

				// 计算距离（米），保留2位小数
				const distance = EARTH_RADIUS * c;
				const m = Math.floor(Math.round(distance * 100) / 100);
				if (m > 1000) {
					return `${Math.floor(m / 1000)}km`
				} else {
					return m + 'm'
				}
			}

		}
	}
</script>

<style scoped>
	.copyBtn {
		min-width: 61px;
		width: 50px;
		height: 24px;
		background: #18533C;
		border-radius: 4px;
		font-weight: 500;
		font-size: 14px;
		color: #FFFFFF;
	}

	.name {
		font-weight: 500;
		font-size: 16px;
		color: #000000;
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