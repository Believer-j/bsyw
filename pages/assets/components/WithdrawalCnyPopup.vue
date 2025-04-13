<template>
	<u-popup :show="show" mode="center" @close="close" @open="open" :closeOnClickOverlay="false" :round="16"
		class="transfer-popup" closeable>
		<view class="title">
      积分转出
		</view>
		<view class="form-box">

			<view class="form-item form-item-bg">
				<view class="tag">
          转出数量
				</view>
				<view class="form-item-content">
					<u--input type="digit" class="account-input" placeholder="请输入转出数量" border="none"
						v-model="form.amount">
					</u--input>
				</view>
			</view>
			<view class="form-tip">
				可用积分： {{userInfo.shares}}
			</view>
			<view class="form-item form-item-bg">
				<view class="tag">
					资金密码
				</view>
				<view class="form-item-content">
					<u--input class="account-input" type="password" placeholder="请输入资金密码" border="none"
						v-model="form.password">
					</u--input>
				</view>
			</view>
<!--			<view class=" form-item-bg flex-row flex-items-start" style="margin-top: 15px;">-->
<!--				<view class="tag" style="margin-top: 15px; margin-left: 10px;">-->
<!--					质押时间-->
<!--				</view>-->
<!--				<view class="form-item-content">-->
<!--					<u-radio-group v-model="form.timeDay" placement="column" size="30px" iconSize="30px" @change="groupChange" style="margin-left: 10px; margin-top: 15px; margin-bottom: 5px;">-->
<!--						<u-radio :customStyle="{marginBottom: '10px'}" v-for="(item, index) in radiolist1" :key="index"-->
<!--							:label="item.name" :name="item.name" activeColor="#389838" size="17px" iconSize="17px" labelSize="15px" >-->
<!--						</u-radio>-->
<!--					</u-radio-group>-->
<!--				</view>-->
<!--			</view>-->
		</view>
		<view class="btns">
			<u-button class="btn-2" text="取消" size="large" @click="close"></u-button>
			<u-button class="btn-1" style="background-color: #389838;" type="primary" :disabled="hasSave" text="确认"
				size="large" @click="confirm"></u-button>
		</view>
	</u-popup>
</template>
<script>
	import utils from '@/utils/index.js'
	import base from '@/mixins/base.js'
	import {
		transferApi
	} from '@/config/api.js'
	export default {
		mixins: [base],
		computed: {
			hasSave() {
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
					password: undefined,
					amount: undefined,
					time: '30',
					timeDay: '30天'
				},
				radiolist1: [{
						name: '30天',
						time: '30',
						disabled: false
					},
					{
						name: '90天',
						time: '90',
						disabled: false
					},
					{
						name: '180天',
						time: '180',
						disabled: false
					}
				],
			}
		},
		methods: {
			groupChange(n) {
				this.form.time = n.replace('天', '')
			},
			open() {
				this.show = true
			},
			async confirm() {
				const {
					type = 1,
						amount,
						password,
						time
				} = this.form
				if (!amount || Number(amount) == 0) {
					utils.errorToast('请输入数量!')
					return
				}
				if (!password) {
					utils.errorToast('请输入资金密码!')
					return
				}
				// 判断余额
				if (Number(this.$store.state.userInfo.amount) < Number(amount)) {
					utils.errorToast('可用积分不足!')
					return
				}
				const res = await transferApi({
					type,
					amount,
					password,
					time
				});
				uni.showToast({
					title: '转出成功!'
				});
				this.$store.dispatch('getUserInfo')
				this.$emit('success')
				this.close()
			},
			close() {
				this.show = false
				for (let key in this.form) {
					this.form[key] = undefined
				}
				// console.log('close');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 60px 0 14px 0;

		.btn-cancel {
			width: 48%;
			height: 42px;
			line-height: 42px;
			background: #E6E6E6;
			border-radius: 4px 4px 4px 4px;
			text-align: center;
			font-size: 16px;
			color: #30302E;
		}

		.btn-confirm {
			width: 48%;
			height: 42px;
			background: #418C2D;
			line-height: 42px;
			border-radius: 4px 4px 4px 4px;
			text-align: center;
			font-size: 16px;
			color: #fff;
		}

		.btn-1 {
			width: 46%;
			font-size: 16px;
		}

		.btn-2 {
			width: 46%;
			background: #E6E6E6;
			font-size: 16px;
			color: #30302E;
		}
	}
</style>