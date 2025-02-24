<template>
	<u-popup :show="show" mode="bottom" @close="close" :closeOnClickOverlay="false" :round="16"
		class="transfer-popup all-bottom" closeable :safeAreaInsetBottom="false">
		<view class="title">
			{{type == 1 ? "CNY" : "USDT"}} 充值
		</view>
		<view class="box">
			<view class="recharge-num">
				<view class="amount-money" v-if="type == 1">
					<view class="tag" >
						{{type == 1 ? "￥" : "$"}}
					</view>
					<view class="form-item-content" v-if="type == 1">
						<u--input type="digit" v-model="amount" placeholder="请输入充值金额" border="none" clearable fontSize="22"
							color="#000">
						</u--input>
					</view>
				</view>
			</view>
			<view class="pay-options">
				<view class="tip">
					请选择充值方式
				</view>
				<view :class="optionClass(item)" v-for="item in options" :key="item.id" @click="handleChangePay(item)">
					<image class="img-2" :src="item.icon" mode=""></image>
					<view class="info">
						<view class="info-1">
							{{item.name}}
						</view>
						<!-- <view class="info-2">
							<text class="num">{{userInfo.amountCny}}</text>
							<text class="unit"> 元</text>
						</view> -->
					</view>
					<view class="radio">
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="recharge-btn" @click="confirm">
			确认购买
		</view> -->
		<u-button type="primary" :disabled="hasSave" text="确认充值" size="large" @click="confirm"></u-button>
	</u-popup>
</template>
<script>
	import utils from '@/utils/index.js'
	import base from '@/mixins/base';
	import {
		orderBuy
	} from '@/config/api.js'
	export default {
		mixins: [base],
		computed: {
			cnyClass() {
				let arr = ['pay-option']
				if (this.payId == 1) {
					arr.push('active-pay')
				}
				return arr
			},
			usdtClass() {
				let arr = ['pay-option']
				if (this.payId == 2) {
					arr.push('active-pay')
				}
				return arr
			},
			hasSave() {
				if (this.type === 1) {
					return !this.payId || !this.amount
				} else {
					return !this.payId
				}
			},
			options() {
				const {
					type
				} = this.payInfo
				const list = [{
					id: 1,
					type: 1,
					name: '微信充值',
					icon: require('@/static/img/common/pay-1.png')
				}, {
					id: 2,
					type: 1,
					name: '支付宝充值',
					icon: require('@/static/img/common/pay-2.png')
				}, {
					id: 'BSC',
					type: 2,
					name: 'BSC BEP20 充值',
					icon: require('@/static/img/common/pay-1.png')
				}, {
					id: 'TRON',
					type: 2,
					name: 'TRON TRC20 充值',
					icon: require('@/static/img/common/pay-2.png')
				}]
				return list.filter(val => val.type === type)
			}
		},
		data() {
			return {
				show: false,
				payId: undefined,
				payInfo: {},
				amount: undefined,
				type: undefined
			}
		},
		methods: {
			// type 1:cny 2usdt
			open(item) {
				this.payId = undefined
				this.payInfo = item
				this.show = true
				this.type = item.type
				console.log('open type===', this.type);
			},
			optionClass(item) {
				let arr = ['pay-option']
				if (this.payId == item.id) {
					arr.push('active-pay')
				}
				return arr
			},
			handleChangePay(item) {
				this.payId = item.id
			},
			confirm() {
				const {
					type
				} = this.payInfo
				switch (type) {
					case 1:
						this.cnyRecharge()
						break;
					case 2:
						this.usdtRecharge()
						break;
					default:
						break;
				}
			},
			// usdt 充值
			usdtRecharge() {
				try {
					if (this.payId === "BSC") {
						uni.navigateTo({
							url: `/pages/assets/recharge?payId=${this.payId}`,
							query: {
								num: 1
							}
						})
					}
					if (this.payId === "TRON") {
						utils.errorToast('暂不支持 TRON TRC20 USDT 充值!')
						return
					}
					this.close()
				} catch (e) {
					//TODO handle the exception
				}
			},
			// cny充值
			async cnyRecharge() {
				try {
					if (this.$store.state.userInfo.type === 2) {
						utils.errorToast('仅支持USDT充值!')
						return
					}
					uni.showToast({
						title: '支付通道对接中...',
					})
					this.$store.dispatch('getUserInfo')
					this.close()
				} catch (e) {
					//TODO handle the exception
				}
			},
			close() {
				console.log('close');
				this.payInfo = {}
				this.amount = undefined
				this.show = false
				// console.log('close');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.box {
		.recharge-num{
			margin: 30px;
		}
		.amount-money {
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);

			.tag {
				font-weight: 600;
				font-size: 14px;
				color: #999999;
				line-height: 20px;
				padding-left: 6px;
				width: 20px;
			}

			.form-item-content {
				width: calc(100% - 20px);
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