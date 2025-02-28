<template>
	<u-popup :show="show" mode="bottom" @close="close" :closeOnClickOverlay="false" :round="16"
		class="transfer-popup all-bottom" closeable :safeAreaInsetBottom="false">
		<view class="title">
      请选择USDT提现方式
		</view>
    <view class="box">
      <view class="pay-options">
        <view class="tip">
        </view>
        <view :class="optionClass(item)" v-for="item in options" :key="item.id" @click="handleChangePay(item)">
          <image class="img-2" :src="item.icon" mode=""></image>
          <view class="info">
            <view class="info-1">
              {{item.name}}
            </view>
          </view>
          <view class="radio">
          </view>
        </view>
      </view>
    </view>

    <view class="form-box1">
      <view class="form-item form-item-bg">
        <view class="tag">
          提现地址
        </view>
        <view class="form-item-content">
          <u--input class="account-input" placeholder="请输入提现地址" border="none" v-model="form.address">
          </u--input>
        </view>
      </view>
      <view class="form-item form-item-bg">
        <view class="tag">
          提现金额
        </view>
        <view class="form-item-content">
          <u--input ype="number" class="account-input" placeholder="请输入提现金额" border="none" v-model="form.amount">
          </u--input>
        </view>
      </view>
      <view class="form-tip">
        可用余额：$ {{userInfo.withdrawUsdt}}
      </view>
      <view class="form-item form-item-bg">
        <view class="tag">
          资金密码
        </view>
        <view class="form-item-content">
          <u--input class="account-input" type="password" placeholder="请输入资金密码" border="none" v-model="form.password">
          </u--input>
        </view>
      </view>
    </view>

		<u-button style="margin-top: 10px" type="primary" :disabled="hasSave" text="确认提现" size="large"
              @click="confirm"></u-button>
	</u-popup>

</template>
<script>
	import utils from '@/utils/index.js'
	import base from '@/mixins/base';
	import {
    withdraw
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
        return !this.payId
      },
			options() {
				const {
					type
				} = this.payInfo
				const list = [{
					id: 'BSC',
					type: 1,
					name: 'BSC BEP20 提现',
					// icon: require('@/static/img/common/pay-1.png')
				}, {
					id: 'TRON',
					type: 1,
					name: 'TRON TRC20 提现',
					// icon: require('@/static/img/common/pay-2.png')
				}]
				return list.filter(val => val.type === type)
			}
		},
		data() {
			return {
        popShow: false,
				show: false,
				payId: undefined,
				payInfo: {},
				amount: undefined,
				type: undefined,
        form: {
          type: undefined,
          address: undefined,
          amount: undefined,
          password: undefined
        }
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
      async confirm() {
        try{
          if(this.payId === "TRON"){
            utils.errorToast('暂不支持 TRON TRC20 USDT 提现!')
            return
          }
          var pay = this.payId === "BSC" ? 2 : 3
          const {
            type = pay,
            address,
            amount,
            password
          } = this.form
          // 判断余额
          if(Number(this.$store.state.userInfo.withdrawUsdt) < Number(amount)){
            utils.errorToast('可用USDT提现余额不足!')
            return
          }
          const res = await withdraw({
            "type" : pay,
            address,
            amount,
            password
          });
          uni.showToast({
            title: '提现成功!'
          });
          this.$store.dispatch('getUserInfo')
          this.close()
        }catch(e){
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
  .form-box1{
    margin-top: 0px;
    .form-item{
      margin-top: 10px;
      display: flex;
      align-items: center;
      .tag{
        width: 70px;
        line-height: 18px;
        padding: 0 0 0 8px;
        margin-right: 8px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
      }
      .form-item-content{
        width: calc(100% - 100px);
        background-color: #F4F5F7;
      }
    }
    .form-item-bg{
      background-color: #F4F5F7;
    }
    .form-tip{
      color: #EFAB46;
      padding: 5px 0 0 10px;
    }
  }
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