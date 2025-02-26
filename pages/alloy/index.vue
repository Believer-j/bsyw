<template>
	<view class="page-wrap page-gradient-bg">
		<view class="page-content2">
			<view class="swiper-box">
				<u-swiper :list="list1" @change="swiperChange" @click="swiperClick"></u-swiper>
			</view>
			<view class="page-main">
				<video-box v-if="hasLeave" />
				<good-foundation />
			</view>
		</view>
		<navbar></navbar>
	</view>
</template>

<script>
	import base from '@/mixins/base.js'
	import GoodFoundation from './components/GoodFoundation.vue'
	import VideoBox from './components/VideoBox.vue'
	export default {
		mixins: [base],
		components: {
			VideoBox,
			GoodFoundation
		},
		data() {
			return {
				list1: [
					'https://static.hjgy.cc/static/banner/a-banner1.jpg',
					'https://static.hjgy.cc/static/banner/a-banner2.jpg',
					'https://static.hjgy.cc/static/banner/a-banner3.jpg',
				],
				hasLeave: true
			}
		},
		onShow() {
			this.hasLeave = true
		},
		onHide(){
			console.log('-------------------')
			this.hasLeave = false
		},
		methods: {
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
	.page-wrap {
		position: relative;
		min-height: calc(100vh - 54px);
		.img-a{
      width: 36px;
      height: 36px;
			position: absolute;
			left:16px;
			top: 40px;
			z-index: 2;
		}

		.page-content2 {
			padding-bottom: 10px;
			// background: url('@/static/img/home/bg.png') no-repeat;
			// background-size: contain;
			// background-color: #3294fd;

			.page-main {
				padding: 0 16px;
			}
		}
	}
</style>