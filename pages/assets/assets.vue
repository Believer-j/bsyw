<template>
	<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
		<view class="page-wrap">
			<view class="page-main">
				<view class="assets-info">
					<view class="amount-info">
						<view class="info-1">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>投资金额(CNY)</text>
								</view>
								<view class="info-amount-num">
									¥ {{userInfo.amountCny}}
								</view>
							</view>
							<view class="btns">
								<view class="btn" @click="openRecharge(1)">
									充值
								</view>
							</view>
						</view>
						<view class="info-1 info-2">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>提现余额(CNY)</text>
								</view>
								<view class="info-amount-num">
									¥ {{userInfo.withdrawCny}}
								</view>
							</view>
							<view class="btns">
								<view class="btn" @click="openWithdrawalCny">
									提现
								</view>
								<view class="btn" @click="openTranCnysfer">
									划转
								</view>
							</view>
						</view>
					</view>
					<view class="amount-info">
						<view class="info-1">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>投资金额(USDT)</text>
								</view>
								<view class="info-amount-num">
									$ {{userInfo.amountUsdt}}
								</view>
							</view>
							<view class="btns">
								<view class="btn" @click="openRecharge(2)">
									充值
								</view>
							</view>
						</view>
						<view class="info-1 info-2">
							<view class="info-amount">
								<view class="info-amount-title">
									<image class="img-2" src="@/static/img/assets/asset.png" mode=""></image>
									<text>提现余额(USDT)</text>
								</view>
								<view class="info-amount-num">
									$ {{userInfo.withdrawUsdt}}
								</view>
							</view>
							<view class="btns">
								<view class="btn" @click="openWithdrawalUsdt(1)">
									提现
								</view>
								<view class="btn" @click="openTranUsdtsfer">
									划转
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="wages-box">
						<view class="wages-item wages-day">
							<view class="title">
								投资金额(USDT)
							</view>
							<view class="title-2">
								$ {{userInfo.amountUsdt}}
							</view>
							<view class="btns">
								<view class="btn" @click="openRecharge(2)">
									充值
								</view>
							</view>

						</view>
						<view class="wages-item wages-month">
							<view class="title">
								提现余额(USDT)
							</view>
							<view class="title-2">
								$ {{userInfo.withdrawUsdt}}
							</view>
							<view class="btns">
								<view class="btn" @click="openWithdrawalUsdt">
									提现
								</view>
								<view class="btn" @click="openTranUsdtsfer">
									划转
								</view>
							</view>
						</view>
					</view> -->
				</view>
				<record-list ref="recordList" />
			</view>
			<navbar></navbar>
			<transfer-cny-popup ref="transferCnyPopup" />
			<Withdrawal-cny-popup ref="withdrawalCnyPopup" />
			<transfer-usdt-popup ref="transferUsdtPopup" />
			<Withdrawal-usdt-popup ref="withdrawalUsdtPopup" />
      <recharge-popup ref="rechargePopup" />
      <withdraw-popup ref="withdrawPopup" />
		</view>
	</scroll-view>
</template>

<script>
	import base from '@/mixins/base.js'
	import RecordList from './components/RecordList.vue'
	import TransferCnyPopup from './components/TransferCnyPopup.vue'
	import WithdrawalCnyPopup from './components/WithdrawalCnyPopup.vue'
	import TransferUsdtPopup from './components/TransferUsdtPopup.vue'
	import WithdrawalUsdtPopup from './components/WithdrawalUsdtPopup.vue'
	export default {
		mixins: [base],
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
			scrolltolower() {
				console.log('scrolltolower==');
				this.$refs.recordList.addPage()
			}

		}
	}
</script>

<style lang="scss" scoped>
	.page-main {
		padding-bottom: 70px;

		.assets-info {
			background: linear-gradient(171deg, #2CA6FF 0%, #2487FC 58%);
			padding: 60px 16px 14px 16px;

			.amount-info {
				margin-bottom: 20px;
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
							background: linear-gradient(180deg, #5AA6FD 0%, #1D73EB 100%);
							box-shadow: inset 0px 1px 4px 0px rgba(255, 255, 255, 0.25);
							border-radius: 8px;
							color: #FFFFFF;
							line-height: 28px;
							text-align: center;
							margin-bottom: 10px;
							&:nth-child(n+2){
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
			.wages-cny{
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