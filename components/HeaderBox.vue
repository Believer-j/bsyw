<template>
	<u-sticky :offsetTop="0" :customNavHeight="0">
		<view class="header-wrap">
			<view class="left-box" @click="goBackFn">
				<u-icon v-if="showBack" name="arrow-left" :color="colors" size="16" bold></u-icon>
				<text v-if="leftText" :style="{color: colors}">{{leftText}}</text>
			</view>
			<view class="title" :style="{color: colors}">{{title}}</view>
		</view>
	</u-sticky>
</template>

<script>
	export default {
		name: "defaultHeader",
		// props: ['bgColor', 'hideBg', 'showBack', 'leftText', 'title', 'goBack', 'height'],
		props: {
			showBack: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: ''
			},
			leftText: {
				type: String,
				default: ''
			},
			colors: {
				type: String,
				default: '#000'
			},
			backUrl: {
				type: String,
				default: '/pages/index/index'
			},
		},
		data() {
			return {

			};
		},
		methods: {
			goBackFn() {
				// if (this.goBack) {
				// 	this.goBack()
				// } else {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// }
				uni.navigateTo({
					url: this.backUrl
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.header-wrap {
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		padding: 30px 18px 20px;
		width: 100%;
		background-color: #fff;
		.left-box{
			// width: 100px;
		}
		.title{
			flex: 1;
			font-weight: 500;
			font-size: 18px;
			line-height: 20px;
			text-align: center;
		}
	}
</style>