<template>
	<view class="page-wrap">
		<header-box title="新闻媒体" />
		<view class="page-main">
			<view class="new-item">
				<image src="@/static/img/home/news.jpg"  style="width: 100vw;" mode="widthFix"></image>
			</view>
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

		.page-main {
			background-color: #fff;
			padding-top: 80px;
			.new-item{
				text-align: center;
				padding-bottom:20px;
			}
		}
	}
</style>