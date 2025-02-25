<template>
	<view class="page-wrap">
		<view class="page-content2">
			<view class="swiper-box">
				<u-swiper :list="list1" @change="swiperChange" @click="swiperClick"></u-swiper>
			</view>
			<view class="page-main">
				<notice-box />
				<product-box />
				<video-box v-if="hasLeave" />
				<good-foundation ref="goodFoundation" />

			</view>
		</view>
		<navbar></navbar>
		
		<u-popup :show="showUpdate" mode="bottom" :closeOnClickOverlay="false"
			:safeAreaInsetBottom="false" bgColor="transparent">
			<view class="update flex-column">
				<view class="title">
					温馨提示
				</view>
				<view class="content">
					现在新版本更新啦，快去下载吧！
				</view>
				<view style="background-color: aliceblue; height: 1px;"></view>
				<view class="btn r-flex-row r-flex-items-center r-flex-center" @click="downTap">
					去下载
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import base from '@/mixins/base.js'
	// import Navbar from '@/components/navbar/navbar.vue'
	import NoticeBox from '@/components/NoticeBox.vue'
	import ProductBox from './components/ProductBox.vue'
	import VideoBox from './components/VideoBox.vue'
	import GoodFoundation from './components/GoodFoundation.vue'
	import {
		getUserInfo,
		download
	} from '@/config/api.js'
	import {
		VERSION
	} from '@/config/base.js'
	// export const iOS_VERSION = 100;
	// export const Android_VERSION = 100;
	export default {
		mixins: [base],
		components: {
			NoticeBox,
			ProductBox,
			VideoBox,
			GoodFoundation
		},
		data() {
			return {
				showUpdate: false,
				list1: [
					'https://static.hjgy.cc/static/banner/index1.jpg',
					'https://static.hjgy.cc/static/banner/index2.jpg',
					'https://static.hjgy.cc/static/banner/index3.jpg',
				],
				hasLeave: true,
				hasInvitationCode: false,
			}
		},
		onLoad(info) {
			let invitationCode = info.invitationCode
			if (invitationCode) {
				this.hasInvitationCode = true
				let that = this
				uni.navigateTo({
					url: '/pages/login/login?invitationCode=' + invitationCode
				})
			}

		},
		onShow() {

			// #ifdef APP
			this.judgeVersion()
			// #endif
			if (this.hasInvitationCode) {
				this.hasInvitationCode = false
				return
			}
			this.$store.commit('changeTab', 0)
			this.hasLeave = true
			this.$store.dispatch('getUserInfo')
			this.$nextTick(() => {
				this.$refs.goodFoundation.queryList()
			})


		},
		onHide() {
			this.hasLeave = false
		},
		methods: {
			async downTap() {
				const res = await download()
				// window.open(res)
				plus.runtime.openURL(res)
			},

			async judgeVersion() {
				console.error(VERSION)
				console.error(this.$store.state.userInfo.gender)
				if (VERSION !== this.$store.state.userInfo.gender) {
					this.showUpdate = true
				}
			},
			swiperChange(item) {
				// console.log('swiperChang==', item)
			},
			swiperClick(item) {
				console.log('swiperChang==', item)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.update {
		// width: 100vw;
		background-color: white;
		border-radius: 10px;

		.btn {
			height: 44px;
			color: #418C2D;
			font-size: 17px;
			font-weight: 600;
		}

		.content {
			text-align: center;
			font-size: 15px;
			font-weight: 400;
			margin-top: 25px;
			margin: 25px 14px;
		}

		.title {
			text-align: center;
			font-size: 18px;
			font-weight: 600;
			margin-top: 15px;
		}
	}

	.page-wrap {
		position: relative;

		.img-a {
			width: 36px;
			height: 36px;
			position: absolute;
			left: 16px;
			top: 40px;
			z-index: 2;
		}

		.page-content2 {
			padding-bottom: 10px;
			background: url('@/static/img/home/bg.png') no-repeat;
			background-size: contain;
			background-color: #3294fd;

			.page-main {
				padding: 0 16px;
			}
		}
	}
</style>