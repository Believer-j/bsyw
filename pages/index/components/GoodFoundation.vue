<template>
	<view class="foundation-box">
		<view class="title-info">
			<view class="title">
				合金工业优质产品
			</view>
			<view class="more">
<!--				<text>全部</text>-->
<!--				<image class="img-3" src="@/static/img/home/more.png" mode=""></image>-->
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="img">
<!--          {{item.urlSmall}}-->
         <image :src="item.urlSmall"></image>
				</view>
				<view class="info">
					<view class="name">
						{{item.title}}
					</view>
					<view class="time-info">
						<image class="img-4" src="@/static/img/home/time.png" mode=""></image>
						<text>单价:¥{{item.priceCny}}≈${{item.priceUsdt}}</text>
					</view>
					<view class="tags">
						<view class="tag" v-if="item.subtitle1">
							{{item.subtitle1}}
						</view>
						<view class="tag" v-if="item.subtitle2">
							{{item.subtitle2}}
						</view>
					</view>
				</view>
				<view class="btn" @click="goBuy(item)" v-if="item.id !== 1">
					<image class="img-5" src="@/static/img/home/qg.png" mode=""></image>
					<text>去抢购</text>
				</view>
        <view class="btn" v-if="item.id === 1">
          <image class="img-5" src="@/static/img/home/qg.png" mode=""></image>
          <text>赠送</text>
        </view>
			</view>
		</view>
		<payment-popup ref="paymentPopup" />
	</view>
</template>

<script>
	import {getProductList} from '@/config/api.js'
	export default {
		data(){
			return {
				list: []
			}
		},
		methods: {
			async queryList(){
				this.list = []
				try{
					const res = await getProductList()
					console.log('res===', res)
					this.list = res
				}catch(e){
					//TODO handle the exception
				}
			},
			goBuy(item){
				this.$refs.paymentPopup.open(item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.foundation-box{
		padding: 16px 0 60px 0;
		.title-info{
			display: flex;
			align-items: center;
			padding-bottom: 14px;
			.title{
				flex: 1;
				font-weight: 500;
				font-size: 18px;
				color: #333333;
				line-height: 21px;
			}
			.more{
				text{
					color: #7589A9;
					line-height: 16px;
					padding-right: 4px;
				}
			}
		}
		.list{
			.item{
				background: #EEF5FF;
				box-shadow: 0px 4px 10px 0px rgba(146,146,146,0.15);
				border-radius: 8px 8px 8px 8px;
				padding: 17px 16px 13px 10px;
				display: flex;
				align-items: center;
				margin-bottom: 15px;
				.img{
					width: 63px;
					height: 63px;
					background: #E4E4E4;
					border-radius: 4px 4px 4px 4px;
					border: 1px solid #E1F1FB;
					// margin-top: 4px;
					image{
						width: 63px;
						height:63px;
					}
				}
				.info{
					padding-left: 10px;
					flex: 1;
					.name{
						font-weight: 500;
						font-size: 16px;
						color: #000000;
						line-height: 19px;
					}
					.time-info{
						padding: 7px 0;
						display: flex;
						align-items: center;
						text{
							padding-left: 2px;
							color: #333333;
							line-height: 16px;
						}
					}
					.tags{
						font-size: 12px;
						color: #1C72EA;
						text-align: center;
						display: flex;
						.tag{
							padding: 0 6px;
							height: 21px;
							border-radius: 9px 9px 9px 9px;
							border: 1px solid #1C72EA;
							line-height: 20px;
							margin-right: 6px;
						}
					}
				}
				.btn{
					width: 60px;
					height: 28px;
					background: #EFAB46;
					border-radius: 5px 5px 5px 5px;
					display: flex;
					align-items: center;
					justify-content: center;
					.img-5{
						
					}
					text{
						padding-left: 2px;
						font-size: 12px;
						color: #FFFFFF;
						line-height: 14px;
						line-height: 28px;
					}
				}
			}
		}
		
	}
</style>