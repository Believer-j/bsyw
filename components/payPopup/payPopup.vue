<template>
	<view>
		<u-popup :show="show" mode="bottom" :safeAreaInsetBottom="false" :round="16" :closeable="false"
			@close="show = false">
			<view class="pay flex-column">
				<view class="pay-head r-flex-row r-flex-items-center r-flex-between">
					<text class="font-18 font-weight-regular" style="color: black;">申请布道者</text>
					<image src="@/static/close.png" @click="show = false">
					</image>
				</view>
				<view class="account-wrap r-flex-row r-flex-center r-flex-items-end">
					<text class="pay-text_medium" style="margin-left: 16px;">500</text>
					<text class="pay-text" style="margin-left: 4px;">USDT</text>
				</view>
				<text class="pay-method font-14 font-weight-regular ">请选择支付方式</text>
				<view class="pay-item r-flex r-flex-center flex-between" @click="current = 0">
					<image src="@/static/pay-icon1.png" mode=""></image>
					<view class="data-wrap">
						<text class="title">余额支付</text>
						<view class="money">
							<text>{{ $store.state.userInfo.totalUsdt || 0 }}</text>
							<text>USDT</text>
						</view>
					</view>
					<view :class="`check ${current === 0 ? 'active' : ''}`"></view>
				</view>
				<view class="pay-item r-flex r-flex-center flex-between" @click="current = 1">
					<image src="@/static/pay-icon2.png" mode=""></image>
					<view class="data-wrap">
						<label>链上支付</label>
					</view>
					<view :class="`check ${current === 1 ? 'active' : ''}`"></view>
				</view>
				<view :class="`pay-btn r-flex r-flex-center r-flex-items-center ${sermonStatus===0 ? 'active' : ''}`"
					@click="pay">
					{{ sermonStatus===0 ? '点击加入' : '已加入' }}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		sermon
	} from "@/config/api.js";
	export default {
		data() {
			return {
				show: false,
				current: 0,
				// 主网
				usdtContractAddr: '0x55d398326f99059fF775485246999027B3197955', // usdt 代币地址
				abi: [
					// erc 20
					'function name() public view returns (string memory)', //  name
					'function symbol() public view returns (string memory)', // 代币
					'function decimals() external view returns (uint8)', // 单位
					'function initialSupply() external view returns (uint256)', // 初始发行量
					'function totalSupply() external view returns (uint256)', // 总供给
					'function balanceOf(address account) external view returns (uint256)', // 获取余额
					'function transfer(address _to, uint256 _value) public returns (bool success)',
					'event Transfer(address indexed from, address indexed to, uint256 value)', // 转账事件
					'function approve(address spender, uint256 amount) public returns (bool)', // 授权
				],
			};
		},
		computed: {
			sermonStatus() {
				return this.$store.state.userInfo.sermonStatus || 0 // 0：未加入  1：已加入  2：等待中
			}
		},
		methods: {
			async pay() {
				if (this.sermonStatus !== 0) return
				uni.showLoading({
					title: '支付中,请等待...',
					mask: true
				});
				try {
					if (this.current == 1) {
						const addr = this.$store.state.userInfo.rechargeAddr
						let usdtAmount = 500;
						await this.transferUsdt(addr, usdtAmount);
					}
					// 余额不足
					let amount = this.$store.state.userInfo.totalUsdt
					if (Number(amount) < 500) {
						uni.showToast({
							icon: 'error',
							title: '可用余额不足'
						});
						return
					}
					let type = this.current == 0 ? 1 : 2;
					let params = {
						type: type
					};
					// 支付====
					// 成为步道者接口调用
					const data = await sermon(params)
					this.show = false;
					this.$emit('refresh')
					uni.showToast({
						icon: 'success',
						title: '支付成功',
					});
					await this.$store.dispatch('getUserInfo')
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: '支付失败, 请检查钱包余额'
					});
				}
				uni.hideLoading();
			},
			// Usdt 充值
			async transferUsdt(addr, amountUsdt) {
				const amountUsdtWei = this.$web3.utils.parseEther(amountUsdt.toString());
				const tc = await this.$web3.getSingerContract(this.usdtContractAddr, this.abi);
				return await tc.transfer(addr, amountUsdtWei);
			},
			open() {
				if (!!this.$store.state.isLogin) {
					this.show = true;
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先链接钱包',
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pay {
		width: 100%;
		padding: 20px 16px;

		.pay-head {
			image {
				width: 14px;
				height: 14px;
			}
		}

		.account-wrap {
			margin: 30px 0;

			.pay-text {
				color: #6B7885;
				font-size: 14px;
				font-weight: 400;
				margin-bottom: 4px;
			}

			.pay-text_medium {
				color: #313C56;
				font-size: 24px;
				font-weight: 500;
			}
		}

		.pay-method {
			color: #313C56;
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 14px;
			color: #333333;
			line-height: 16px;
		}

		.pay-item {
			width: 100%;
			height: 70px;
			background: #FFFFFF;
			border-radius: 16px;
			border: 1px solid #BE9663;
			margin-top: 16px;
			padding: 0 16px;
			align-items: center;

			image {
				width: 32px;
				height: 32px;
			}

			.data-wrap {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 10px;

				.title {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 14px;
					color: #333333;
					line-height: 16px;
					margin-bottom: 4px;
				}

				.money {
					text:nth-child(1) {
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 16px;
						color: #333333;
						line-height: 19px;
					}

					text:nth-child(2) {
						margin-left: 4px;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 12px;
						color: #999999;
						line-height: 14px;
					}
				}

				label {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 14px;
					color: #333333;
					line-height: 16px;
				}
			}

			.check {
				width: 12px;
				height: 12px;
				border: 1px solid #999;
				border-radius: 100px;

				&.active {
					border-width: 3px;
					border-color: #BE9663;
				}
			}
		}

		.pay-btn {
			width: 100%;
			height: 40px;
			border-radius: 26px;
			margin-top: 32px;
			font-family: PingFang SC, PingFang SC;
			font-weight: 500;
			font-size: 14px;
			color: #FFFFFF;
			line-height: 16px;
			background: #999;
			margin-bottom: 40px;

			&.active {
				background: #ECA720;
			}
		}
	}
</style>