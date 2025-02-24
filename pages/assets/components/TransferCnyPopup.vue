<template>
	<u-popup :show="show" mode="center" @close="close" @open="open" :closeOnClickOverlay="false" :round="16"
		class="transfer-popup" closeable>
		<view class="title">
			划转至投资金额(CNY)
		</view>
		<view class="form-box">
			<view class="form-item form-item-bg">
				<view class="tag">
					划转金额
				</view>
				<view class="form-item-content">
					<u--input class="account-input" type="digit" placeholder="请输入划转金额" border="none" v-model="form.amount">
					</u--input>
				</view>
			</view>
      <view class="form-tip">
        提现余额：¥ {{userInfo.withdrawCny}}
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
		<view class="btns">
			<u-button class="btn-2" text="取消" size="large" @click="close"></u-button>
			<u-button class="btn-1" type="primary" :disabled="hasSave" text="确认" size="large" @click="confirm"></u-button>
		</view>
	</u-popup>
</template>
<script>
import utils from '@/utils/index.js'
import base from '@/mixins/base.js'
import {transfer} from '@/config/api.js'
	export default {
		mixins: [base],
		computed: {
			hasSave(){
				let mark = false
				// for(let key in this.form){
				// 	if(!this.form[key]){
				// 		mark = false
				// 	}
				// }
				return mark
			}
		},
		data() {
			return {
				show: false,
				form: {
          type: 1,
          password: undefined,
          amount: undefined
				}
			}
		},
		methods: {
			open() {
				// console.log('open');
				this.show = true
			},
			async confirm(){
				try{
          const {
            type = 1,
            amount,
            password
          } = this.form
					// 判断账户类型: 只有 CNY 账户能够划转 CNY
          if(this.$store.state.userInfo.type === 2){
            utils.errorToast('仅支持USDT余额划转!')
            return
          }
          // 判断余额
          if(Number(this.$store.state.userInfo.withdrawCny) < Number(amount)){
            utils.errorToast('可用CNY提现余额不足!')
            return
          }
          const res = await transfer({
            type,
            amount,
            password
          });
          uni.showToast({
            title: '划转成功!'
          });
          this.$store.dispatch('getUserInfo')
          this.close()
				}catch(e){
					//TODO handle the exception
				}
			},
			close() {
				this.show = false
				for(let key in this.form){
					this.form[key] = undefined
				}
				// console.log('close');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.btns{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 60px 0  14px 0;
		.btn-cancel{
			width: 48%;
			height: 42px;
			line-height: 42px;
			background: #E6E6E6;
			border-radius: 4px 4px 4px 4px;
			text-align: center;
			font-size: 16px;
			color: #30302E;
		}
		.btn-confirm{
			width: 48%;
			height: 42px;
			background: #2488FC;
			line-height: 42px;
			border-radius: 4px 4px 4px 4px;
			text-align: center;
			font-size: 16px;
			color: #fff;
		}
		.btn-1{
			width: 46%;
			font-size: 16px;
		}
		.btn-2{
			width: 46%;
			background: #E6E6E6;
			font-size: 16px;
			color: #30302E;
		}
	}
</style>