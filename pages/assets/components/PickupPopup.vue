<template>
	<u-popup :show="show" mode="center" @close="close" @open="open" :closeOnClickOverlay="false" :round="16"
		class="transfer-popup" closeable>
		<view class="title">
			确认自提
		</view>
		<view class="flex-row-center" style="margin-top: 50px; font-size: 18px; font-weight: 500;">
			确认分公司 50% 产品已经自提?
		</view>
		<view class="btns">
			<u-button class="btn-2" text="取消" size="large" @click="close"></u-button>
			<u-button class="btn-1" style="background-color: #389838;" type="primary" text="确认" size="large"
				@click="confirm"></u-button>
		</view>
	</u-popup>
</template>
<script>
	import base from '@/mixins/base.js'
	
	export default {
		mixins: [base],
		
		data() {
			return {
				show: false,
			}
		},
		methods: {
			open() {
				this.show = true
			},
			confirm() {
				this.$emit('confirmPickUp')
				this.close()
			},
			close() {
				this.show = false
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