<template>
	<view class="box">
		<view class="item" v-for="item in tabList" :key="item.id" @click="goLink(item)">
			<view class="icon">
				<image class="img-2" :src="item.icon" mode=""></image>
			</view>
			<view class="name">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				tabList: [{
					id: '1',
					name: '产品收益',
					icon: require('@/static/img/home/product-1.png'),
					link: '/pages/index/productRevenue'
				},{
					id: '2',
					name: '新闻媒体',
					icon: require('@/static/img/home/product-2.png'),
					link: '/pages/index/playerEarnings'
				},{
					id: '3',
					name: '市场需求',
					icon: require('@/static/img/home/product-4.png'),
					link: '/pages/index/quarterlyEarnings'
				},{
					id: '4',
					name: '联系客服',
					icon: require('@/static/img/home/product-3.png'),
					link: '/pages/index/incomeInvestment'
				}]
			}
		},
		methods: {
			goLink(item){
				const {link} = item
				uni.navigateTo({
					url: link
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		margin-top: 10px;
		background: #FFFFFF;
		box-shadow: 0px 4px 16px 0px rgba(160,170,197,0.25);
		border-radius: 8px 8px 8px 8px;
		display: flex;
		padding: 17px 0 9px 0;
		.item{
			width: 25%;
			text-align: center;
			
			.icon{
				text-align: center;
				padding-bottom: 2px;
			}
		}
	}
</style>