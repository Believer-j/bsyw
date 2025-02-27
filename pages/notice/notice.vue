<template>
	<view class="page-wrap page-gradient-bg">
		<header-box title="公告列表" backUrl="/pages/index/index" />
		<view style="margin-top: 80px;">
			<view v-for="(item,index) in dataList" :key="index" class="item r-flex-column" @click="intoDetail(item.id)">
				<text class="item_title u-line-1">{{ item.title }}</text>
				<text
					class="item_content u-line-3">{{ removeHTMLTags(item.subTitle) }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		noticeListApi
	} from '@/config/api.js'
	
	export default {
		data() {
			return {
				dataList: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			async getList() {
				const res = await noticeListApi()
				this.dataList = res
			},
			removeHTMLTags(str) {
			    return str.replace(/<[^>]*>/g, '');
			},
			intoDetail(id) {
				uni.navigateTo({
					url: `/pages/notice/notice-detail?id=${id}`
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.page-wrap {
		overflow: hidden;
		// background: white;
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