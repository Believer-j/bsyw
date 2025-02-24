<template>
	<view class="page-wrap">
		<header-box title="充值" backUrl="/pages/assets/assets" />
		<view class="page-content page-main page-header-main">
			<view class="qrcode-box">
				<qrcode-info ref="qrcodeInfo" :width="130" />
			</view>
			<view class="recharge-link">
				<view class="link-title">
					<view class="title">
						充值地址
					</view>
					<image class="img-2" src="@/static/img/common/copy-2.png" mode="" @click="copyCode"></image>
				</view>
				<view class="text">
					{{payUrl}}
				</view>
			</view>
			<view class="recharge-num">
				<view class="title">
					充值金额
				</view>
				<view class="form-item">
					<view class="tag">
						$
					</view>
					<view class="form-item-content">
						<u--input type="digit" v-model="amount" placeholder="请输入充值金额" border="none" clearable fontSize="22" color="#000">
						</u--input>
					</view>
					
				</view>
				<view class="tags">
					充值手续费将从充值金额中扣除,请保证您的充值金额足够购买商品
				</view>
			</view>
			<view class="btns">
				<u-button type="primary" :disabled="hasSave" text="确认充值" size="large" @click="confirm"></u-button>
			</view>
			<view  style="text-align: left;
					font-weight: 500;
					font-size: 14px;
					color: #FF0000;padding: 10px;">
				充值说明：<br>
				①请复制充值地址后进行转账<br>
				②请在充值完成后填写您的转账金额(务必填写项准确,否则无法入账)<br>
				③充值后请等待网络确认,系统会自动核对到账信息,请耐心等待！
			</view>
		</view>
	</view>
</template>

<script>
  import utils from '@/utils/index.js'
  import base from '@/mixins/base.js'
  import {chainRecharge} from '@/config/api.js'
	export default {
		mixins: [base],
		computed: {
			hasSave(){
				return !this.payUrl || !this.amount
			}
		},
		data() {
			return {
				type: undefined,
				option: {},
				payUrl: undefined,
				amount: undefined
			}
		},
		onLoad(options) {
			console.log('options==', options)
			switch (options.payId) {
				case 'BSC':
					this.payUrl = this.userInfo.bscAddress || '0xc14B8016958d8E27C5b12D84A14327D6d00152d4'
          this.type = 2
					break;
				case 'TRC':
					this.payUrl = this.userInfo.tronAddress || "TEfwxg2iaAnzq6Z7csyy3s3xhncENTYLtf"
          this.type = 3
					break;
				default:
					break;
			}
			console.log('this.payUrl==', this.payUrl)
			this.$nextTick(() => {
				this.$refs.qrcodeInfo.init(this.payUrl)
			})
		},
		methods: {
			rightClick() {
				console.log('rightClick');
			},
			leftClick() {
				console.log('leftClick');
			},
			// 复制
			copyCode() {
				uni.setClipboardData({
					data: this.payUrl,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});
					}
				});
			},
			// 充值
			async confirm(){
        try{
          // 判断账户类型: 只有 CNY 账户能够划转 CNY
          if(this.$store.state.userInfo.type === 1){
            utils.errorToast('仅支持CNY充值!')
            return
          }

          const res = await chainRecharge({
            "type": this.type,
            "amount": this.amount
          });
          uni.showToast({
            title: '充值提交成功,等待确认中...!'
          });
          // TODO 跳转资产中心
					uni.navigateTo({
						url: '/pages/assets/assets'
					})
        }catch(e){
          //TODO handle the exception
        }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-wrap {
		background: linear-gradient(180deg, #B7D9F6 0%, rgba(227, 238, 255, 0) 100%);

		.page-main {
			.qrcode-box {
				padding: 26px 0 0 0;
				background: #FFFFFF;
				border-bottom: 1px dashed #C8C8C8;
				border-radius: 20px 20px 6px 6px;
				margin-top: 20px;
			}

			.recharge-link {
				padding: 14px 14px 14px 20px;
				border-radius: 6px 6px 20px 20px;
				background: #FFFFFF;
				margin-bottom: 14px;

				.link-title {
					display: flex;

					.title {
						font-size: 16px;
						color: #333333;
						line-height: 19px;
						flex: 1;
					}
				}

				.text {
					padding-top: 6px;
					font-weight: 400;
					font-size: 12px;
					color: #666666;
					line-height: 14px;
					word-break: break-all;
				}
				
			}

			.recharge-num {
				background: #FFFFFF;
				padding: 20px;
				.tags{
					text-align: left;
					font-weight: 500;
					font-size: 14px;
					color: #FF0000;
				}
				.title {
					font-size: 12px;
					color: #333333;
					line-height: 14px;
					padding-bottom: 18px;
				}
			}
			.form-item{
				display: flex;
				align-items: center;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				.tag{
					font-weight: 500;
					font-size: 22px;
					color: #000000;
					width: 20px;
				}
				.form-item-content{
					width: calc(100% - 20px);
				}
				
			}
			
		}
		.btns{
			padding-top: 30px;
		}
	}
</style>