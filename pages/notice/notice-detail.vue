<template>
	<view class="page-wrap page-gradient-bg">
		<u-navbar :fixed="true" title="" :placeholder="true" bgColor="rgba(255, 255, 255, 0)" :autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				公告详情
			</view>
		</u-navbar>
		<scroll-view scroll-y="true" :style="{height: pageHeight - 15 + 'px'}">
			<view class="notice-detail r-flex-column" style="">
				<text class="item_title">{{ content.title }}</text>
				<text class="item_content" style="color: gainsboro;">{{ content.createTime }}</text>
				<text
					class="item_content " :selectable="true" v-html="content.detail "></text>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
import {
		noticeDetailApi
	} from "@/config/api.js"
	import base from "@/mixins/base"
	export default {
		mixins: [base],
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
		// overflow: hidden;
		// background: white;
		min-height: 100vh;
		.notice-detail {
			margin: 12px;
			margin-top: 0px;
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