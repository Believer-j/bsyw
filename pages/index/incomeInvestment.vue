<template>
	<view class="page-wrap">
		<!-- <header-box title="投资收益" colors="#fff" /> -->
		<view class="page-main">
			<web-view :src=hasLeave></web-view>
			<!-- <web-view src="http://www.baidu.com"></web-view> -->
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
        hasLeave: this.$store.state.userInfo.investment
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.page-wrap {
		// background: linear-gradient(180deg, #B7D9F6 0%, rgba(227, 238, 255, 0) 100%);

		.page-main {
			
		}
	}
</style>