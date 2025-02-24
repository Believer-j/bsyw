<template>
	<view class="page-wrap">
		<header-box :title="detail.name" backUrl="/pages/alloy/index"/>
		<view class="page-main" :style="{backgroundImage:  `url(${imgSrc})`}">
			<!-- <image class="img-desc" v-if="imgSrc" :src="imgSrc" mode=""></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			// imgStyle(){
			// 	const winWidth = window.innerWidth
			// 	console.log('===winWidth', winWidth);
			// 	// 322*1280
			// 	const imgHeight = 1280*winWidth/322
			// 	return {
			// 		width: '100%',
			// 		height: `${imgHeight}px`
			// 	}
			// }
		},
		data() {
			return {
				detail: {},
				imgSrc: undefined
			}
		},
		onLoad(options) {
			console.log('opt===', options)
			this.detail = options
			this.imgSrc= `https://static.hjgy.cc/static/a-detail${options.id}.jpg`
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.page-wrap {
		// background: linear-gradient(180deg, #B7D9F6 0%, rgba(227, 238, 255, 0) 100%);
		background-color: #fff;
		padding-top: 80px;
		.page-main {
			// background: url('@/static/img/home/product-detail-2.png') no-repeat;
			height: 900px;
			background-repeat: no-repeat;
			background-size: contain;
			background-color: #fff;
			width:100%;
		}
	}
</style>