<template>
	<view class="page-wrap page-gradient-bg">
		<u-navbar :fixed="true" title="" :placeholder="true" bgColor="rgba(255, 255, 255, 0)" :autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				{{ title }}
			</view>
		</u-navbar>
		<scroll-view scroll-y="true" :style="{height: pageHeight - 15 + 'px'}">
			<view class="notice-detail r-flex-column" style="">
				<text class="item_title">{{ content.title }}</text>
				<text class="item_content" style="color: gainsboro;">{{ content.createTime }}</text>
				<text
					class="item_content " :selectable="true" v-html="content.detail "></text>
				
				<view v-if="content.urls && content.urls.length !== 0" class="flex flex-row flex-between flex-wrap">
					<view v-for="(subItem,subIndex) in content.urls" :key="subIndex" class="flex-row-center"
						style="border-radius: 10px; overflow: hidden; margin-top: 10px; width: calc((100vw - 60px) / 3.0); height: calc((100vw - 60px) / 3.0);">
						<view v-if="subItem.includes('.mp4')" class="" style="width: 100%; height: 100%; position: relative;" @click.stop="playVideo(subItem)">
							<image src="/static/img/common/480.png" mode="aspectFill" style="background-color: #F9F9F9; width: 100%; height: 100%;"></image>
							<image src="/static/img/play.png" style="width: 40px; height: 40px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></image>
						</view>
						<image v-else :src="subItem" mode="aspectFit" style="background-color: #F9F9F9;" @click.stop="showImages(content.urls, subIndex)"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<u-popup :show="showVideo" mode="center" closeable round="7px" :closeOnClickOverlay="false" @close="closeVideo">
			<view class="" style="height: 200px; width: 90vw; background: red; border-radius: 7px; margin-top: 40px;">
				<video :src="videoSrc" autoplay style="width:100%;height:100%;" controls objectFit="cover"></video>
			</view>
		</u-popup>
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
				content: {},
				title: '',
				showVideo: false,
				videoSrc: '',
			}
		},
		onLoad(info) {
			this.id = info.id
			this.title = info.title
			this.getNoticeDetail()
		},
		methods: {
			closeVideo() {
				this.videoSrc = ''
				this.showVideo = false
			},
			playVideo(subItem) {
				this.showVideo = true
				this.videoSrc = subItem
			},
			showImages(urls, current) {
				uni.previewImage({
					urls: urls,
					current: current
				})
			},
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