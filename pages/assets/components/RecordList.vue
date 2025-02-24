<template>
	<view class="record-box">
		<view class="nav-list">
			<view v-for="item in navList" :key="item.id" :class="['nav-item', navId == item.id? 'active-nav': '']"
				@click="handleChangeNav(item)">
				{{item.name}}
			</view>
		</view>
		<view class="list">
			<no-data v-if="listData.length==0" />
			<template v-else>
				<view v-for="item in listData" :key="item.sort" class="record-item">
					<view class="item-info">
						<view class="title" v-if="navId == 1">
							{{item.proName}}
						</view>
            <view class="title" v-else-if="navId == 2">
              充值
            </view>
            <view class="title" v-else-if="navId == 3">
              提现
            </view>
            <view class="title" v-else>
              {{item.remark}}
            </view>
						<view class="tags">
							<view class="tag">
								<view class="label">
									金额:
								</view>
								<view class="content" v-if="navId == 1">
									{{item.type == 1 ? `¥${item.amountCny}` : `$${item.amountUsdt}`}}
								</view>
                <view class="content" v-else-if="navId == 2">
                  {{item.operateType == 1 ? `¥${item.amount}` : `$${item.amount}`}}
                </view>
                <view class="content" v-else-if="navId == 3">
                  {{item.operateType == 1 ? `¥${item.amount}` : `$${item.amount}`}}
                </view>
                <view class="content" v-else>
                  {{item.operateType == 1 ? `¥${item.amount}` : `$${item.amount}`}}
                </view>
							</view>
							<view class="tag">
								<view class="label">
									时间:
								</view>
								<view class="info">
									{{item.time}}
								</view>
							</view>
						</view>
					</view>
					<view class="right-info">
            {{item.status == 1 ? `已完成` : item.status == 0 ?`确认中` : `信息错误`}}
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		assetRecords
	} from '@/config/api.js'
	import base from '@/mixins/base'
	export default {
		mixins: [base],
		data() {
			return {
				navList: [{
					id: '1',
					name: '认购记录'
				}, {
					id: '2',
					name: '充值记录'
				}, {
					id: '3',
					name: '提现记录'
				}, {
					id: '4',
					name: '收益明细'
				}],
				navId: undefined,
				listData: []
			}
		},
		created() {
			this.handleChangeNav()
		},
		methods: {
			handleChangeNav(item) {
				item = item || this.navList[0]
				if (item.id === this.navId) {
					return false
				}
				this.navId = item.id
				this.resetPage()
				this.listData = []
				this.getList()
			},
			addPage(){
				if(this.totalCount > this.page*this.limit){
					this.page+=1
					this.getList()
				}else{
					console.log('最后一页')
				}
			},
			async getList() {
        console.log('navId: ' + this.navId);
				try {
					const res = await assetRecords({
						page: this.page,
						limit: this.limit,
						type: this.navId
					})
					const startSort = (this.page - 1) * this.limit + 1
					const {list=[], totalCount=0} = res
					const arr = list.map((val, index) => {
						const {amountCny,amountUsdt} = val
						return {
							...val,
							sort: index + startSort,
							amountCny: amountCny || 0,
							amountUsdt: amountUsdt || 0
						}
					})
					this.listData.push(...arr)
					this.totalCount = totalCount
					console.log('res===', this.listData)
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record-box {
		margin-bottom: 20px;

		.nav-list {
			display: flex;
			overflow-y: auto;
			padding: 10px 10px 12px 10px;

			.nav-item {
				width: 100px;
				font-size: 16px;
				line-height: 22px;
				padding: 8px 0;
				white-space: nowrap;
				color: #666666;
				text-align: center;
				// margin-right: -50%;
			}

			.active-nav {
				font-weight: 500;
				color: #333333;
				position: relative;

				&:before {
					content: '';
					width: 24px;
					height: 3px;
					background: #2488FC;
					border-radius: 18px;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
				}
			}
		}

		.list {
			min-height: 200px;
			background: #FFFFFF;
			border-radius: 4px;
			padding: 10px 12px 10px;

			.record-item {
				display: flex;
				padding: 10px 6px 14px;
				background-color: #EEF5FF;
				border-radius: 4px;
				margin-bottom:10px;
				&:nth-child(n+2) {
					border-top: 1px solid rgba(0, 0, 0, 0.1);
				}

				.item-info {
					flex: 1;

					.title {
						font-size: 16px;
						color: #333333;
						line-height: 19px;
						padding-bottom: 10px;
					}

					.tags {
						display: flex;

						.tag {
							display: flex;
							align-items: center;
							padding-top: 4px;
							&:nth-child(n+2){
								padding-left: 10px;
							}

							.label {
								font-size: 12px;
								color: #999999;
								line-height: 14px;
								padding-right: 2px;
							}

							.content {
								font-weight: 500;
								font-size: 14px;
								color: #333333;
								line-height: 16px;
							}
							.info{
								font-size: 12px;
								color: #999999;
							}
						}
					}
				}

				.right-info {
					width: 52px;
					font-size: 13px;
					color: #999999;
					line-height: 15px;
				}
			}
		}
	}
</style>