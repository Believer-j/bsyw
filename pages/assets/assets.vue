<template>
	<view>
		<view class="user-bg" style="min-height: calc(100vh - 54px);">
			<view class="page-main">
			<!-- #ifdef APP -->
				<view class="r-flex-row r-flex-items-center r-flex-center" style="padding-top: 42px;">
			<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="r-flex-row r-flex-items-center r-flex-center" style="padding-top: 12px;">
				<!-- #endif -->
				<image src="/static/bsyw-logo-green.png" mode="heightFix" style="height: 45px;"></image>
			</view>
				<view class="assets-info">
					<view class="amount-info flex-row flex-items-center flex-between">
						<view class="info-1">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>可用余额</text>
								</view>
								<view class="info-amount-num">
									¥ {{userInfo.amount}}
								</view>
							</view>
						</view>
						<view class="info-1 info-2">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>剩余待释放</text>
								</view>
								<view class="info-amount-num" style="">
									{{userInfo.staticAmount}} 积分
								</view>
							</view>
						</view>
					</view>

					<view class="amount-info flex-row flex-items-center flex-between">
						<view class="info-1">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>已释放积分</text>
								</view>
								<view class="info-amount-num">
									{{userInfo.releasedAmount}} 积分
								</view>
							</view>
							<view class="btns">
								<view class="btn" style="opacity: 0;">

								</view>
							</view>
						</view>

						<view class="info-1 info-2 flex-column flex-items-center flex-center">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>可用分红</text>
								</view>
								<view class="info-amount-num">
									{{userInfo.released}} 分红
								</view>
							</view>
							<view class="btns">
								<view class="btn" @click="openTranCnysfer">
									转出
								</view>
							</view>
						</view>

					</view>
				</view>
				<u-tabs :list="navList" :current="current" lineColor="#389838"
					activeStyle="color: #333333; font-size: 16px; fontWeight: 500;" @click="handleChangeNav" style="height: 50px;"></u-tabs>
				<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
					:up="upOption" :height="scrollHeight + 'px'">
					<no-data v-if="listData.length==0" :version="0" />
					<view style="background-color: transparent;" v-else>

						<view v-for="item in listData" :key="item.sort" class="flex-column"
							style="padding: 14px 12px; background-color: rgba(255, 255, 255, 0.8); border-radius: 6px; margin: 10px;">
							<view class="flex-row flex-items-center flex-between">
								<text v-if="current == 0" class="font-16 font-weight-medium">{{ item.proName }}</text>
								<text v-if="current == 0">{{ item.status == 1 ? '已发货' : '待发货' }}</text>

<!--								<text v-if="current == 1">{{ `质押数量: ${item.amount}` }} 积分</text>-->
<!--								<text v-if="current == 1">{{ item.status == 1 ? '质押中' : '已解押' }}</text>-->

								<text v-if="current == 1" class="font-16 font-weight-medium">转出</text>
								<text v-if="current == 1">{{ item.status == 1 ? '已完成' : '处理中' }}</text>

								<text v-if="current > 1"
									class="font-16 font-weight-medium">{{ navList[current].name }}</text>
								<text v-if="current > 2">已完成</text>
							</view>
							<view class="flex-row flex-items-center flex-between" style="margin-top: 10px;">
								<text v-if="current == 0">{{ `金额: ${item.amountCny}` }}</text>
<!--								<text v-if="current == 1">{{ `到期收益: ${item.fee}` }} 积分</text>-->
								<text v-if="current == 1">{{ `数量: ${item.amount}` }}</text>
								<text v-if="current > 1">{{ `数量: ${item.amount} 积分` }}</text>

								<text v-if="current !== 1" style="color: #999999;">{{ item.time }}</text>
							</view>
							<view v-if="current == 1" class="flex-row flex-items-center flex-between"
								style="margin-top: 10px;">
<!--								<text v-if="current == 1" style="">{{ `剩余质押天数: ${item.hash}` }} 天</text>-->
								<text v-if="current == 1" style="">{{ `手续费: ${item.fee}` }}</text>
								<text style="color: #999999;">{{ item.time }}</text>
							</view>

						</view>

					</view>
				</mescroll-uni>
			</view>
			<navbar></navbar>
			<transfer-cny-popup ref="transferCnyPopup" @success="handleChangeNav({index: 2})" />
			<Withdrawal-cny-popup ref="withdrawalCnyPopup" @success="handleChangeNav({index: 1})" />
			<transfer-usdt-popup ref="transferUsdtPopup" />
			<Withdrawal-usdt-popup ref="withdrawalUsdtPopup" />
			<recharge-popup ref="rechargePopup" />
			<withdraw-popup ref="withdrawPopup" />
		</view>
	</view>
</template>

<script>
	import base from '@/mixins/base.js'
	import RecordList from './components/RecordList.vue'
	import TransferCnyPopup from './components/TransferCnyPopup.vue'
	import WithdrawalCnyPopup from './components/WithdrawalCnyPopup.vue'
	import TransferUsdtPopup from './components/TransferUsdtPopup.vue'
	import WithdrawalUsdtPopup from './components/WithdrawalUsdtPopup.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		assetRecords
	} from "@/config/api.js"
	export default {
		mixins: [base, MescrollMixin],
		components: {
			RecordList,
			TransferCnyPopup,
			WithdrawalCnyPopup,
			TransferUsdtPopup,
			WithdrawalUsdtPopup
		},
		data() {
			return {
				option: {},
				navList: [{
					id: '1',
					name: '订单记录'
				},
        //   {
				// 	id: '2',
				// 	name: '质押记录'
				// },
          {
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
				listData: [],
				current: 0,
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					empty: {
						use : false
					}
				},
				downOption: {
					
				}
			}
		},
		computed: {
			scrollHeight() {
				const sys = this.$u.sys()
				// #ifdef APP
				return sys.windowHeight - 490
				// #endif
				// #ifdef H5
				return sys.windowHeight - 460
				// #endif
				
			}
		},
		onShow() {
			this.$store.dispatch('getUserInfo')
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh==');
		},
		methods: {
			// 划转人民币
			openTranCnysfer() {
				this.$refs.transferCnyPopup.open()
			},
			// 提现人民币
			openWithdrawalCny() {
				this.$refs.withdrawalCnyPopup.open()
			},
			// 划转usdt
			openTranUsdtsfer() {
				this.$refs.transferUsdtPopup.open()
			},
			// 提现usdt
			openWithdrawalUsdt(type) {
				// this.$refs.withdrawalUsdtPopup.open()
				this.$refs.withdrawPopup.open({
					type
				})
			},
			// 去充值 1:cny 2usdt
			openRecharge(type) {
				this.$refs.rechargePopup.open({
					type
				})
			},
			handleChangeNav(item) {
				this.current = item.index
				this.listData = []
				this.mescroll.resetUpScroll(true);
			},
			/*上拉加载的回调*/
			upCallback(page) {
				assetRecords({
					page: page.num,
					limit: page.size,
					type: this.navList[this.current].id
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

		}
	}
</script>

<style lang="scss" scoped>
	.user-bg {
		background-image: url('/static/img/user-bg.jpg');
		background-size: 100% 100%;
	}

	.page-main {
		// padding-bottom: 70px;

		.assets-info {
			// background: linear-gradient(171deg, #2CA6FF 0%, #2487FC 58%);
			padding: 10px 16px 14px 16px;

			.amount-info {
				height: 120px;
				margin-bottom: 15px;
				display: flex;
				align-items: center;
				background: linear-gradient(205deg, #DEECF8 0%, #FFFFFF 100%);
				border-radius: 8px;

				.info-1 {
					padding: 9px 18px 12px 18px;

					.info-amount {
						flex: 1;

						.info-amount-title {
							display: flex;
							align-items: center;

							text {
								color: #333333;
								line-height: 16px;
								padding-left: 2px;
							}
						}

						.info-amount-num {
							font-weight: 500;
							font-size: 20px;
							color: #333333;
							line-height: 35px;
						}
					}

					.btns {
						display: flex;

						.btn {
							width: 70px;
							height: 28px;
							background-color: #389838;
							box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.25);
							border-radius: 8px;
							color: #FFFFFF;
							line-height: 28px;
							text-align: center;
							margin-bottom: 10px;

							&:nth-child(n+2) {
								margin-left: 10px;
							}
						}
					}

				}
			}

			.wages-box {
				display: flex;
				align-items: center;
				justify-content: center;

				.wages-item {
					width: 50%;
					text-align: center;

					.title {
						color: #FFFFFF;
						line-height: 16px;
					}

					.title-2 {
						font-weight: 500;
						color: #FFFFFF;
						line-height: 16px;
						padding: 10px 0 8px 0;
					}

					.btns {
						display: flex;
						justify-content: center;

						.btn {
							width: 51px;
							height: 24px;
							line-height: 22px;
							box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.25);
							border-radius: 7px 7px 7px 7px;
							border: 1px solid #FFFFFF;
							text-align: center;
							font-size: 12px;
							color: #FFFFFF;

							&:nth-child(n+2) {
								margin-left: 10px;
							}
						}
					}
				}

				.wages-day {}

				.wages-month {
					border-left: 1px solid rgba(255, 255, 255, 0.15);
				}
			}

			.wages-cny {
				margin-bottom: 20px;
				padding-bottom: 20px;
				border-bottom: 1px solid rgba(255, 255, 255, 0.15);
				// background: linear-gradient(205deg, #DEECF8 0%, #FFFFFF 100%);
				// border-radius: 8px;
				// .wages-item{
				// 	padding: 9px 18px 12px 18px;
				// 	.title {
				// 		color: #333333;
				// 	}
				// 	.title-2 {
				// 		color: #333333;
				// 	}
				// 	.btns{
				// 		.btn{
				// 			background: linear-gradient(180deg, #5AA6FD 0%, #1D73EB 100%);
				// 			box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.25);
				// 			color: #FFFFFF;
				// 		}
				// 	}
				// }
			}
		}
	}
</style>