<template>
	<view class="font-16 font-weight-regular page-gradient-bg"
		style="width: 100vw; color: #545958; font-size: 400; min-height: 100vh;">
		<u-navbar :fixed="true" title="" height="70px" :placeholder="true" bgColor="rgba(255, 255, 255, 0)" :autoBack="true" >
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				我的团队
			</view>
		</u-navbar>
		<view class="flex-column flex-items-center flex-center team_all">
			<text class="team_all_num">¥{{ $store.state.userInfo.performance }}</text>
			<text class="team_all_title">团队总业绩</text>
		</view>
		<view class="team_list_title">团队列表</view>
		<no-data v-if="dataList.length == 0" :version="0" style="margin-top: 60px;"></no-data>
		<view v-else class="team_list">
			<view v-for="(item,index) in dataList" :key="index" class="flex-row flex-items-center flex-between team_item u-border-bottom">
				<view class="flex-row flex-items-center">
					<u-icon name="account" size="30px"></u-icon>
					<text class="team_name">{{ item.nick ? item.nick : item.mobile }}</text>
				</view>
				<text class="team_num">{{ item.teamPerformance }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import noData from '../../components/noData.vue';
	import {
		teamListApi
	} from "@/config/api.js"
	export default {
		components: {
			noData
		},
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
				const res = await teamListApi()
				this.dataList = res
			}
		}
	}
</script>

<style lang="scss">
	.team_list {
		margin-top: 10px;
		max-height: calc(100vh - 190px);
		overflow: scroll;
		
		.team_item {
			height: 50px;
			// background-color: #389838;
			margin-top: 10px;
			margin-left: 15px;
			margin-right: 15px;
			
			.team_name {
				font-size: 18px;
				font-weight: 500;
				margin-left: 10px;
			}
			.team_num {
				font-size: 18px;
				font-weight: 500;
				color: #389838;
			}
		}
	}
	.team_list_title {
		margin-top: 15px;
		height: 20px;
		margin-left: 15px;
		font-size: 20px;
		font-weight: 500;
		color: #666666;
	}
	.team_all {
		width: calc(100vw - 30px);
		margin-left: 15px;
		background-color: rgba(255, 255, 255, 0.7);
		height: 80px;
		margin-top: 10px;
		border-radius: 10px;
		
		.team_all_num {
			color: #389838;
			font-size: 28px;
			font-weight: 600;
		}
		.team_all_title {
			color: #333333;
			font-size: 18px;
			font-weight: 400;
		}
	}
</style>
