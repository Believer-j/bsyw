<template>
	<view class="page-wrap">
		<header-box title="公告列表" backUrl="/pages/index/index" />
		<view style="margin-top: 80px;">
			<view v-for="(item,index) in 10" :key="index" class="item r-flex-column" @click="intoDetail">
				<text class="item_title u-line-1">公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题</text>
				<text
					class="item_content u-line-3">公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容内容公告内容公告内容内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			intoDetail() {
				uni.navigateTo({
					url: '/pages/notice/notice-detail'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.page-wrap {
		overflow: hidden;
		background: white;
		min-height: 100vh;

		.item {
			// height: 80px;
			margin: 12px;
			background-color: white;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			padding: 10px;

			.item_title {
				font-weight: 500;
				font-size: 16px;
			}

			.item_content {
				font-weight: 400;
				font-size: 14px;
				margin-top: 8px;
			}
		}
	}
</style>