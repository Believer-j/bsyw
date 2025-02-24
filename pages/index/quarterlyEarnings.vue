<template>
	<view class="page-wrap">
		<header-box title="市场需求" />
		<view class="page-main">
			<!-- <image class="img-desc" src="@/static/img/home/product-detail-1.png" mode=""></image> -->
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

			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.page-wrap {
		// background: linear-gradient(180deg, #B7D9F6 0%, rgba(227, 238, 255, 0) 100%);
		padding-top: 60px;
		.page-main {
			background: url('https://static.hjgy.cc/static/demand.jpg') no-repeat;
			width:100%;
			height: 1600px;
			background-size: contain;
			background-color: #020b1c;
		}
	}
</style>