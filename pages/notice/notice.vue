<template>
	<view class="page-wrap page-gradient-bg" style="overflow: hidden;">
		<!-- <header-box title="公告列表" backUrl="/pages/index/index" /> -->
		<u-navbar :fixed="true" title="" :placeholder="true" bgColor="rgba(255, 255, 255, 0)"
			:autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				公告列表
			</view>
		</u-navbar>
		<view class="flex-column" style=" background-color: white; border-radius: 15px 15px 0px 0px; overflow: hidden;" :style="{height: pageHeight + 'px'}">
			<u-tabs :list="tabs" lineColor="#18533C" activeStyle="color:#18533C;font-weight: 600;font-size: 16px;" inactiveStyle="color: #9BA09F;font-size: 14px;font-weight: 400;" @click="tabsTap"></u-tabs>
			<view style=" overflow: scroll; color: #545958;" :style="{maxHeight: pageHeight + 'px'}">
				<view v-for="(item,index) in dataList" :key="index" class="item r-flex-column" style="padding-bottom: 0px;"
					@click="intoDetail(item.id)">
					<view class="u-line-2" style="font-size: 16px; font-weight: 600;">
						我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题
					</view>
					<view class="flex-column u-line-3" style="margin-top: 10px;font-size: 14px; background-color: #F4F9F7; border-radius: 12px 12px 0px 0px;">
						<view class="" style="margin: 10px;">
							我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容我的内容
						</view>
						
					</view>
					<view class="" style="height: 8px; width: 100%; background-color: #F4F9F7; border-radius: 0px 0px 12px 12px;">
						
					</view>
					<view class="flex flex-row flex-between flex-wrap">
						<view v-for="(item,index) in 6" :key="index" class="flex-row-center" style="border-radius: 10px; overflow: hidden; margin-top: 10px; width: calc((100vw - 60px) / 3.0); height: calc((100vw - 60px) / 3.0);">
							<image :src="imgURL" mode="aspectFill"></image>
						</view>
					</view>
					<view class="flex-row flex-items-center" style="border-top: 1px solid #F5F5F5; width: 100%; height: 40px; margin-top: 10px;">
						<view class="flex-row-center" style="width: 50%; height: 100%; color: #545958; font-size: 15px;" @click.stop="copy(item)">
							<image src="/static/copy.png" style="width: 16px; height: 16px;"></image>
							<span style="margin-left: 10px;">点击复制</span>
						</view>
						<view class="flex-row-center" style="width: 50%; height: 100%; color: #545958; font-size: 15px;" @click.stop="save(item)">
							<image src="/static/save.png" style="width: 16px; height: 16px;"></image>
							<span style="margin-left: 7px;">一键保存</span>
						</view>
					</view>
					<!-- <text class="item_title u-line-1">{{ item.title }}</text> -->
					<!-- <text class="item_content u-line-3">{{ removeHTMLTags(item.subTitle) }}</text> -->
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		noticeListApi
	} from '@/config/api.js'
	import base from '@/mixins/base'
	export default {
		mixins: [base],
		data() {
			return {
				tabIndex: 0,
				tabs: [{
						name: "新闻公告"
					},
					{
						name: "操作流程"
					},
					{
						name: "工具流下载"
					}
				],
				imgURL: "https://static-bsyw.oss-cn-shanghai.aliyuncs.com/img/product1.png",
				dataList: [1,1,,11,1,1,1]
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			save(item) {
				// uni.downloadFile({
				// 	url: 'https://static-bsyw.oss-cn-shanghai.aliyuncs.com/img/bsmj.mp4',
				// 	success: (res) => {
				// 		console.log(res)
				// 	}
				// })
				
				uni.request({
					url: this.imgURL,
					responseType: 'arraybuffer',
					success: (res) => {
						console.log(res)
					},
					fail: (e) => {
						console.log('fail', e)
					}
				})
			},
			copy(item) {
				uni.setClipboardData({
					data: '.'
				})
			},
			tabsTap(item) {
				console.log(item)
			},
			async getList() {
				const res = await noticeListApi()
				// this.dataList = res
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
			margin: 10px;
			background-color: white;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			padding: 10px;
		}
	}
</style>