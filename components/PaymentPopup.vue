<template>
	<u-popup :show="show" mode="bottom" @close="close" :closeOnClickOverlay="false" :round="16"
		class="transfer-popup all-bottom" closeable :safeAreaInsetBottom="false">
		<view class="title">
			抢购
		</view>
		<view class="box" v-if="payInfo">
			<view class="amount-money">
				<view class="num">
					{{payInfo.priceCny}}
				</view>
				<view class="unit">
					元
				</view>
				<view class="num">
					≈{{payInfo.priceUsdt}}
				</view>
				<view class="unit">
					USDT
				</view>
			</view>
			<view class="pay-options">
				<view class="tip">
					请选择支付方式
				</view>
				<view :class="cnyClass" @click="handleChangePay(1)">
					<!-- <image class="img-2" src="@/static/img/common/pay-1.png" mode=""></image> -->
					<view class="info">
						<view class="info-1">
							投资金额(人民币)
						</view>
						<view class="info-2">
							<text class="num">{{userInfo.amountCny}}</text>
							<text class="unit"> 元</text>
						</view>
					</view>
					<view class="radio">
					</view>
				</view>
				<!-- ['pay-option', payId==2?'active-pay':''] -->
				<view :class="usdtClass" @click="handleChangePay(2)">
					<!-- <image class="img-2" src="@/static/img/common/pay-2.png" mode=""></image> -->
					<view class="info">
						<view class="info-1">
							投资金额(USDT)
						</view>
						<view class="info-2">
							<text class="num">{{userInfo.amountUsdt}}</text>
							<text class="unit"> USDT</text>
						</view>
					</view>
					<view class="radio">
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="recharge-btn" @click="confirm">
			确认购买
		</view> -->
		<u-button type="primary" :disabled="hasSave" text="确认购买" size="large" @click="confirm"></u-button>
	</u-popup>
</template>
<script>
	import base from '@/mixins/base';
	import {
		orderBuy
	} from '@/config/api.js'
	export default {
		mixins: [base],
		computed: {
			cnyClass(){
				let arr = ['pay-option']
				if(this.payId ==1){
					arr.push('active-pay')
				}
				return arr
			},
			usdtClass(){
				let arr = ['pay-option']
				if(this.payId ==2){
					arr.push('active-pay')
				}
				return arr
			},
			hasSave(){
				return !this.payId
			}
		},
		data() {
			return {
				show: false,
				payId: undefined,
				payInfo: undefined
			}
		},
		methods: {
			open(item) {
				console.log('open===', item);
				this.payInfo = item
				this.show = true
			},
			handleChangePay(item) {
				this.payId = item
			},
			async confirm() {
					const {
						id
					} = this.payInfo
					const res = await orderBuy({
						productId: id,
						payType: this.payId
					})
					console.log('res===', res)
					uni.showToast({
						title: '购买成功',
					})
					this.$store.dispatch('getUserInfo')
					this.close()
			},
			close() {
				console.log('close');
				this.payInfo = undefined
				this.show = false
				// console.log('close');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.box {
		.amount-money {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30px 0;

			.num {
				font-weight: 500;
				font-size: 32px;
				color: #222222;
				line-height: 45px;
			}

			.unit {
				font-weight: 600;
				font-size: 14px;
				color: #999999;
				line-height: 20px;
				padding-left: 6px;
			}
		}

		.pay-options {
			.tip {
				color: #333333;
				line-height: 20px;
				padding-bottom: 10px;
			}

			.pay-option {
				background: #FFFFFF;
				border-radius: 16px 16px 16px 16px;
				border: 1px solid #E7E7E7;
				display: flex;
				align-items: center;
				padding: 13px 11px;
				margin-bottom: 16px;

				.info {
					flex: 1;
					padding-left: 10px;

					.info-1 {
						color: #333333;
						line-height: 20px;
					}

					.info-2 {
						display: flex;
						align-items: center;

						.num {
							font-weight: 500;
							font-size: 16px;
							color: #333333;
							line-height: 22px;
						}

						.unit {
							font-size: 12px;
							color: #999999;
							line-height: 14px;
							padding-left: 2px;
						}
					}
				}

				.radio {
					width: 14px;
					height: 14px;
					border-radius: 50%;
					border: 1px solid #B4B4B4;
				}
			}

			.active-pay {
				.radio {
					border: 3px solid #1C73EA;
				}
			}
		}
	}
</style>