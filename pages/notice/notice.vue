<template>
	<view class="page-wrap page-gradient-bg" style="overflow: hidden;">
		<!-- <header-box title="公告列表" backUrl="/pages/index/index" /> -->
		<u-navbar :fixed="true" title="" :placeholder="true" bgColor="rgba(255, 255, 255, 0)" :autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				公告列表
			</view>
		</u-navbar>
		<view class="flex-column" style=" background-color: white; border-radius: 15px 15px 0px 0px; overflow: hidden;"
			:style="{height: pageHeight + 'px'}">
			<u-tabs :list="tabs" lineColor="#18533C" activeStyle="color:#18533C;font-weight: 600;font-size: 16px;"
				inactiveStyle="color: #9BA09F;font-size: 14px;font-weight: 400;" @click="tabsTap"></u-tabs>
			<view style=" overflow: scroll; color: #545958;" :style="{maxHeight: pageHeight + 'px'}">
				<view v-for="(item,index) in dataList" :key="index" class="item r-flex-column"
					style="padding-bottom: 0px;" @click="intoDetail(item.id)">
					<view class="u-line-2" style="font-size: 16px; font-weight: 600;">
						{{ item.title }}
					</view>
					<view class="flex-column u-line-3"
						style="margin-top: 10px;font-size: 14px; background-color: #F4F9F7; border-radius: 12px 12px 0px 0px;">
						<view class="" style="margin: 10px;">
							{{ removeHTMLTags(item.detail) }}
						</view>

					</view>
					<view class=""
						style="height: 8px; width: 100%; background-color: #F4F9F7; border-radius: 0px 0px 12px 12px;">

					</view>
					<view v-if="item.urls && item.urls.length !== 0" class="flex flex-row flex-between flex-wrap">
						<view v-for="(subItem,subIndex) in item.urls" :key="subIndex" class="flex-row-center"
							style="border-radius: 10px; overflow: hidden; margin-top: 10px; width: calc((100vw - 60px) / 3.0); height: calc((100vw - 60px) / 3.0);">
							<view v-if="subItem.includes('.mp4')" class="" style="width: 100%; height: 100%; position: relative;" @click.stop="playVideo(subItem)">
								<image src="/static/img/common/480.png" mode="aspectFill" style="background-color: #F9F9F9; width: 100%; height: 100%;"></image>
								<image src="/static/img/play.png" style="width: 40px; height: 40px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></image>
							</view>
							<image v-else :src="subItem" mode="aspectFit" style="background-color: #F9F9F9;" @click.stop="showImages(item.urls, subIndex)"></image>
						</view>
					</view>
					<view class="flex-row flex-items-center flex-around"
						style="border-top: 1px solid #F5F5F5; width: 100%; height: 40px; margin-top: 10px;">
						<view class="flex-row-center" style="width: 50%; height: 100%; color: #545958; font-size: 15px;"
						:style="{width: item.urls && item.urls.length !== 0 ? '50%' : '90%'}"
							@click.stop="copy(item)">
							<image src="/static/copy.png" style="width: 16px; height: 16px;"></image>
							<span style="margin-left: 10px;">点击复制</span>
						</view>
						<view v-if="item.urls && item.urls.length !== 0" class="flex-row-center" style="width: 50%; height: 100%; color: #545958; font-size: 15px;"
							@click.stop="save(item)">
							<image src="/static/save.png" style="width: 16px; height: 16px;"></image>
							<span style="margin-left: 7px;">一键保存</span>
						</view>
					</view>
					<!-- <text class="item_title u-line-1">{{ item.title }}</text> -->
					<!-- <text class="item_content u-line-3">{{ removeHTMLTags(item.subTitle) }}</text> -->
				</view>
			</view>
		</view>
		<u-popup :show="showVideo" mode="center" closeable round="7px" :closeOnClickOverlay="false" @close="closeVideo">
			<view class="" style="height: 200px; width: 90vw; background: red; border-radius: 7px; margin-top: 40px;">
				<video :src="videoSrc" autoplay style="width:100%;height:100%;" controls objectFit="cover"></video>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import permision from "@/js_sdk/wa-permission/permission.js"
	// #endif
	import {
		noticeListApi
	} from '@/config/api.js'
	import base from '@/mixins/base'
	export default {
		mixins: [base],
		data() {
			return {
				showVideo: false,
				videoSrc: '',
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
				bgURL: "https://static-bsyw.oss-cn-shanghai.aliyuncs.com/img/product15.png",
				dataList: [],
				tempList: []
			}
		},
		onLoad() {
			this.getList(this.tabIndex + 1)
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
			save(item) {
				uni.showLoading({
					mask: true,
					title: '下载中...'
				})
				this.tempList = []
				let that = this
				for (var index = 0; index < item.urls.length; index++) {
					var element = item.urls[index];
					uni.downloadFile({
						url: element,
						success: (res) => {
							that.tempList.push(res.tempFilePath)
							console.log('下载完成--', index + 1)
							if (that.tempList.length == item.urls.length) {
								console.log('全部下载完成')
								console.log(that.tempList)
								uni.hideLoading()
								that.saveImagesToAlbum()
							}
						},
						fail: (e) => {
							uni.hideLoading()
							uni.showToast({
								title: '下载失败'
							})
						}
					})
				}
			},
			saveImagesToAlbum() {
				// 先申请相册权限（App端需配置权限，H5无相册API）
				// #ifdef APP-PLUS
				let isIos = (plus.os.name == "iOS")
				if (isIos) {
					this.saveIOSImages()
				} else {
					this.requestAndroidPermission()
				}
				// #endif
			},
			saveIOSImages() {
				const a = permision.judgeIosPermission("photoLibrary")
				if (a) {
					this.savePhotos()
				} else {
					permision.gotoAppPermissionSetting()
				}
			},
			async requestAndroidPermission() {
				var result = await permision.requestAndroidPermission('android.permission.WRITE_EXTERNAL_STORAGE')
				var strStatus
				if (result == 1) {
					strStatus = "已获得授权"
					this.savePhotos()
				} else if (result == 0) {
					strStatus = "未获得授权"
				} else {
					strStatus = "被永久拒绝权限"
				}
				if (result != 1) {
					uni.showModal({
						content: strStatus + '，去设置照片与视频、相册权限',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppPermissionSetting()
							}
						}
					});
				}
			},
			async savePhotos() {
				// 批量保存
				for (const item of this.tempList) {
					try {
						await uni.saveImageToPhotosAlbum({
							filePath: item
						});
					} catch (err) {
						console.error(`保存${item}到相册失败：`, err);
					}
				}
				uni.showToast({
					title: '已保存到相册',
					icon: 'success'
				});
			},
			copy(item) {
				const text = this.removeHTMLTags(item.detail)
				uni.setClipboardData({
					data: text
				})
			},
			tabsTap(item) {
				this.tabIndex = item.index
				this.getList(this.tabIndex + 1)
			},
			async getList(type) {
				const res = await noticeListApi(type)
				this.dataList = res
				console.log(res)
			},
			removeHTMLTags(str) {
				return str.replace(/<[^>]*>/g, '');
			},
			intoDetail(id) {
				uni.navigateTo({
					url: `/pages/notice/notice-detail?id=${id}`
				})
			},

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