<template>
	<view class="record-box">
		<u-tabs :list="navList" :current="current" lineColor="#389838"
			activeStyle="color: #333333; font-size: 16px; fontWeight: 500;" @click="handleChangeNav"></u-tabs>
		<view class="list">
			<no-data v-if="listData.length==0" :version="0" />
			<view style="background-color: transparent;" v-else>
				<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
					:up="upOption">
					<view v-for="item in listData" :key="item.sort" class="record-item flex-column">
						<view class="flex-row flex-items-center flex-between">
							<text v-if="current == 0" class="font-16 font-weight-medium">{{ item.proName }}</text>
							<text v-if="current == 0">{{ status == 1 ? '已发货' : '待发货' }}</text>

							<text v-if="current == 1">{{ `质押数量:${item.amount}` }}</text>
							<text v-if="current == 1">{{ status == 1 ? '质押中' : '已解押' }}</text>

							<text v-if="current == 2" class="font-16 font-weight-medium">转出</text>
							<text v-if="current == 2">{{ status == 1 ? '确认中' : '已完成' }}</text>

							<text v-if="current > 2"
								class="font-16 font-weight-medium">{{ navList[current].name }}</text>
							<text v-if="current > 2">已完成</text>
						</view>
						<view class="flex-row flex-items-center flex-between" style="margin-top: 10px;">
							<text v-if="current == 0">{{ `金额: ${item.amountCny}` }}</text>
							<text v-if="current == 1">{{ `到期收益:${item.fee}` }}</text>
							<text v-if="current == 2">{{ `数量: ${item.amount}` }}</text>
							<text v-if="current > 2">{{ `数量: ${item.amount}股` }}</text>

							<text v-if="current !== 1" style="color: #999999;">{{ item.time }}</text>
						</view>
						<view v-if="current == 1" class="flex-row flex-items-center flex-between"
							style="margin-top: 0px;">
							<text style="margin-top: 10px;">{{ `剩余质押天数:${item.hash}` }}</text>
							<text style="color: #999999;">{{ item.time }}</text>
						</view>

					</view>
				</mescroll-uni>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		assetRecords
	} from '@/config/api.js'
	import base from '@/mixins/base'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [base, MescrollMixin],
		data() {
			return {
				navList: [{
					id: '1',
					name: '订单记录'
				}, {
					id: '2',
					name: '质押记录'
				}, {
					id: '3',
					name: '转出记录'
				}, {
					id: '4',
					name: '释放记录'
				}, {
					id: '5',
					name: '推荐记录'
				}, {
					id: '6',
					name: '合伙分红'
				}, {
					id: '7',
					name: '平级分红'
				}, {
					id: '8',
					name: '业绩分红'
				}],
				navId: undefined,
				listData: [],
				current: 0,
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						ues: false
					}
				},
			}
		},
		created() {
			// this.handleChangeNav()
		},
		methods: {

			/*上拉加载的回调*/
			upCallback(page) {
				assetRecords({
					page: page.num,
					limit: page.size,
					type: this.navId
				}).then((data) => {
					// 接口返回的当前页数据列表 (数组)
					let curPageData = data.list;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = data.totalPage;
					
					//设置列表数据
					if (page.num == 1) this.listData = []; //如果是第一页需手动置空列表
					this.listData = this.listData.concat(curPageData); //追加新数据
					
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(curPageLen, totalPage);
				}).catch((e) => {
					//  请求失败,隐藏加载状态
					this.mescroll.endErr()
				})

				

			},


			handleChangeNav(item) {

				item = item || this.navList[0]
				if (item.id === this.navId) {
					return false
				}
				this.current = item.index
				this.navId = item.id
				this.resetPage()
				this.listData = []
				this.getList()
			},
			addPage() {
				if (this.totalCount > this.page * this.limit) {
					this.page += 1
					this.getList()
				} else {
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
					const {
						list = [], totalCount = 0
					} = res
					const arr = list.map((val, index) => {
						const {
							amountCny,
							amountUsdt
						} = val
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
	.record-title1 {
		font-size: 16px;
	}

	.record-box {
		margin-bottom: 20px;

		.nav-list {
			display: flex;
			// overflow-y: auto;
			max-width: calc(100vw - 20px);
			overflow: scroll;
			padding: 10px 10px 12px 10px;

			.nav-item {
				width: 100px;
				font-size: 16px;
				line-height: 22px;
				padding: 8px 0;
				white-space: nowrap;
				color: #666666;
				text-align: center;
				margin-left: 10px;
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
					background: #418C2D;
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
			background: transparent;
			border-radius: 4px;
			padding: 10px 12px 10px;

			.record-item {
				padding: 10px 6px 14px;
				background-color: rgba(255, 255, 255, 0.8);
				border-radius: 6px;
				margin-bottom: 10px;


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

							&:nth-child(n+2) {
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

							.info {
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