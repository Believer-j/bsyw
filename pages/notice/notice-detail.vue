<template>
	<view class="page-wrap">
		<header-box title="公告详情" backUrl="/pages/index/index" />
		<view class="notice-detail r-flex-column" style="">
			<text class="item_title">公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题</text>
			<text class="item_content" style="color: gainsboro;">2024-23-12 12:12:12</text>
			<text
				class="item_content">公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容内容公告内容公告内容内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容</text>
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
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.page-wrap {
		overflow: hidden;
		background: white;
		min-height: 100vh;
		.notice-detail {
			margin: 12px;
			margin-top: 80px;
			background-color: white;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			padding: 10px;
		}
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
</style>