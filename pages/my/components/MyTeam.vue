<template>
	<view class="box">
		<view class="title-info">
			<view class="title">
				我的团队
			</view>
			<view class="title-2">
				团队总注册
			</view>
			<view class="num">
				{{infos.totalTeamRegister}}人
			</view>
		</view>
		<view class="content">
			<view class="info-item">
				<view class="title">
					团队总注册
				</view>
				<view class="num">
					{{infos.totalTeamRegister}}人
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					团队今日注册
				</view>
				<view class="num">
					{{infos.todayTeamRegister}}人
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					今日获得佣金
				</view>
				<view class="num">
					{{infos.todayBrokerage}}元
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					团队总激活
				</view>
				<view class="num">
					{{infos.totalTeamActive}}单
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					团队昨日激活
				</view>
				<view class="num">
					{{infos.yesterdayTeamActive}}单
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					团队总参投
				</view>
				<view class="num">
					{{infos.totalTeamInvestCny}}元
				</view>
			</view>
			<!-- <view class="info-item">
				<view class="title">
					团队总参投
				</view>
				<view class="num">
					${{infos.totalTeamInvestUsdt}}
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {teamInfo} from '@/config/api.js'
	export default {
		data() {
			return {
				infos: {}
			}
		},
		created() {
			this.getTeam()
		},
		methods: {
			async getTeam(){
				try{
					const res = await teamInfo()
					this.infos = res
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		.title-info {
			display: flex;
			align-items: center;
			padding: 20px 0 16px 0;

			.title {
				font-weight: 500;
				font-size: 18px;
				color: #333333;
				line-height: 25px;
				flex: 1;
			}

			.title-2 {
				font-size: 14px;
				color: #666666;
			}

			.num {
				font-weight: 500;
				font-size: 16px;
				color: #000000;
				padding-left: 6px;
			}
		}

		.content {
			background: #FFFFFF;
			border-radius: 4px 4px 4px 4px;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: 20px;
			.info-item {
				width: 33.3%;
				text-align: center;
				padding-top: 20px;
				.title {
					color: #666666;
					line-height: 20px;
					padding-bottom: 6px;
				}

				.num {
					font-weight: 500;
					font-size: 16px;
					color: #000000;
					line-height: 22px;
				}
			}

		}
	}
</style>