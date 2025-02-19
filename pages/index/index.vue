<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="tap"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			async tap() {
				// this.$store.dispatch('login')
			 // const res = await this.$web3.getBalance(this.$store.state.address)
			 // console.log(this.$web3.formatEther(res.value))
			 // console.log(this.$web3.parseEther('1'))
			 const res = await this.$web3.readContract('0x36Fdc78c6ecf0503F7106859eE7e1CC0A27a00b5', 'balanceOf', [this.$store.state.address])
			 console.log(res)
			 console.log(this.$web3.formatEther(res))
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
