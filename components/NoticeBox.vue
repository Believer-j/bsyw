<template>
	<view class="notice-box" @click="intoNoticeList">
		<view class="tip">
			<view class="tip-1">
				最新
			</view>
			<view class="tip-2">
				资讯
			</view>
		</view>
		<view class="content">
			<u-notice-bar direction="column" :text="dataList" icon="" bgColor="#fff" color="#333333"></u-notice-bar>
		</view>
		<!-- <view class="content">
			<view class="text">
			</view>
		</view>
		<view class="next-icon">
			<u-icon name="arrow-right" color="rgba(90,90,90,0.3)" size="14"></u-icon>
		</view> -->
	</view>
</template>

<script>
	import base from '../mixins/base';
	import {
		noticeListApi
	} from "../config/api.js"
	export default {
		name:"NoticeBox",
		mixins: [base],
		data() {
			return {
				dataList: []
			};
		},
		mounted() {
			this.getList()
		},
		methods: {
			async getList() {
				const res = await noticeListApi()
				var texts = []
				for (var index = 0; index < res.length; index++) {
					var element = res[index];
					texts.push(element.title)
				}
				this.dataList = texts;
			},
			intoNoticeList() {
				uni.navigateTo({
					url:'/pages/notice/notice'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.notice-box{
	padding: 8px 6px;
	display: flex;
	align-items: center;
	background: #FFFFFF;
	box-shadow: 0px 3px 12px 0px rgba(149,170,223,0.25);
	border-radius: 8px 8px 8px 8px;
	.tip{
		width: 50px;
		font-size: 14px;
		font-weight: 600;
		line-height: 16px;
		text-align: center;
		.tip-1{
			color: #EDAA2B;
		}
		.tip-2{
			color: #EDAA2B;
		}
	}
	.content{
		border-left: 1px solid #E3E3E3;
		width: calc(100% - 50px);
		padding-left: 8px;
	}
}
</style>