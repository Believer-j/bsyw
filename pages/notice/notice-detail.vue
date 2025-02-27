<template>
	<view class="page-wrap page-gradient-bg">
		<header-box title="公告详情" backUrl="/pages/notice/notice" />
		<view class="notice-detail r-flex-column" style="">
			<text class="item_title">{{ content.title }}</text>
			<text class="item_content" style="color: gainsboro;">{{ content.createTime }}</text>
			<text
				class="item_content " v-html="content.detail"></text>
		</view>
		
	</view>
</template>

<script>
import {
		noticeDetailApi
	} from "@/config/api.js"
	export default {
		data() {
			return {
				id: '',
				content: {}
			}
		},
		onLoad(info) {
			this.id = info.id
			this.getNoticeDetail()
		},
		methods: {
			async getNoticeDetail() {
				this.content = await noticeDetailApi(this.id)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.page-wrap {
		overflow: hidden;
		// background: white;
		min-height: 100vh;
		.notice-detail {
			margin: 12px;
			margin-top: 80px;
			background-color: white;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			padding: 15px;
		}
		.item_title {
			font-weight: 500;
			font-size: 16px;
		}
		
		.item_content {
			font-weight: 400;
			font-size: 14px;
			margin-top: 8px;
			word-break: break-all;
		}
	}
</style>