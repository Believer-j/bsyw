<template>
	<view class="box">
		<view class="title-info">
			<view class="title">
				邀请记录
			</view>
			<view class="select-box">
				<u-action-sheet :actions="list" :show="show" :closeOnClickOverlay="true" :closeOnClickAction="true"
					@select="selectClick"></u-action-sheet>
				<!-- 	<u-button @click="show = true">打开ActionSheet</u-button> -->
				<view class="select-item-btn" @click="handleOpenLevel">
					<text>{{levelName}}</text>
					<u-icon name="arrow-down-fill" color="#666" size="10"></u-icon>
				</view>
			</view>
		</view>
		<view class="list">
			<no-data v-if="listData.length==0" />
			<view class="item" v-for="item in listData" :key="item.mobile">
				<image class="img-2" src="@/static/img/my/head.png" mode=""></image>
				<view class="info">
					<view class="title">
						{{item.nick}} ({{item.mobile}})
					</view>
					<view class="tj">
<!--						推荐人数：{{item.inviteNumber}}-->
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		inviteRecords
	} from '@/config/api.js'
	export default {
		computed: {
			levelName() {
				let target = this.list.find(val => val.id === this.levelId)
				return target ? target.name : ''
			}
		},
		data() {
			return {
				levelId: '1',
				// title: '标题',
				list: [{
						id: '1',
						name: '一级',
						// subname: "选项一描述",
						// color: '#ffaa7f',
						// fontSize: '20',
						// loading: true, 开启load加载
						// disabled: true, //选项二禁用
					},
					{
						id: '2',
						name: '二级',
					},
					{
						id: '3',
						name: '三级',
					}
				],
				show: false,
				listData: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			handleOpenLevel() {
				this.show = !this.show
			},
			selectClick(item) {
				this.levelId = item.id
				this.show = false
				this.getList()
			},
			async getList() {
				try {
					const res = await inviteRecords(this.levelId)
					this.listData = res || []
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding-bottom: 20px;

		.title-info {
			display: flex;
			padding: 24px 0 16px 0;

			.title {
				font-weight: 500;
				font-size: 18px;
				color: #333333;
				line-height: 21px;
				flex: 1;
			}

			.select-box {
				.select-item-btn {
					background: #E0E0E0;
					border-radius: 4px 4px 4px 4px;
					padding: 0 8px;
					display: flex;
					align-items: center;

					text {
						margin-right: 6px;
						color: #333333;
						line-height: 24px;
					}
				}

			}
		}

		.list {
			background: #FFFFFF;
			border-radius: 4px 4px 4px 4px;
			padding: 26px 16px 10px 16px;

			.item {
				display: flex;
				padding-bottom: 14px;

				.info {
					padding-left: 12px;
					flex: 1;

					.title {
						font-weight: 500;
						font-size: 16px;
						color: #333333;
						line-height: 22px;
					}

					.tj {
						padding-top: 4px;
						font-weight: 400;
						color: #999999;
						line-height: 20px;
					}
				}
			}
		}
	}
</style>