<template>
	<view class="foundation-box">
		<view class="title-info">
			<view class="title">
				合金原料
			</view>
			<view class="more">
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="img">
					<image :src="item.icon"></image>
				</view>
				<view class="info">
					<view class="name">
						{{item.title}}
					</view>
					<view class="time-info">
						<text>非卖品: 我的合金{{item.userNum}}枚</text>
					</view>
					<view class="time-info">
						<text>总剩余: {{item.alloyTotal}}枚</text>
					</view>
				</view>
				<view class="btn" @click="goDetail(item)">
					<text>详情</text>
				</view>
			</view>
		</view>
		<payment-popup ref="paymentPopup" />
	</view>
</template>

<script>
	import {
		alloy
	} from '@/config/api.js'
	export default {
		data() {
			const list = []
			for (let i = 1; i < 6; i++) {
				var icon = ""
				if (i === 1) {
					icon = require('@/static/img/common/a-alloy1.jpg')
				} else if (i === 2) {
					icon = require('@/static/img/common/a-alloy2.jpg')
				} else if (i === 3) {
					icon = require('@/static/img/common/a-alloy3.jpg')
				} else if (i === 4) {
					icon = require('@/static/img/common/a-alloy4.jpg')
				} else if (i === 5) {
					icon = require('@/static/img/common/a-alloy5.jpg')
				}
				list.push({
					id: i,
					icon: icon,
					title: `合金原料${i}号`,
					desc: `点击查看详情`,
					detailImg: `https://static.hjgy.cc/static/a-detail${i}.jpg`,
					userNum: 0,
					alloyTotal: 0
				})
			}
			return {
				list
			}
		},
		created() {
			this.getList()
		},
		methods: {
			async getList() {
				console.log(222)
				try {
					const res = await alloy()
					console.log(res)
					if (res) {
						this.list.forEach((val, index) => {
							const sort = index +1
							val.userNum = res[`user${sort}`] || 0
							val.alloyTotal = res[`alloy${sort}`] || 0
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			goDetail(item) {
				const {
					title,
					id
				} = item
				uni.navigateTo({
					url: `/pages/alloy/allayDetail?name=${title}&id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.foundation-box {
		padding: 16px 0 60px 0;

		.title-info {
			display: flex;
			align-items: center;
			padding-bottom: 14px;

			.title {
				flex: 1;
				font-weight: 500;
				font-size: 18px;
				color: #389839;
				line-height: 21px;
			}

			.more {
				text {
					color: #7589A9;
					line-height: 16px;
					padding-right: 4px;
				}
			}
		}

		.list {
			.item {
				background: linear-gradient(156deg, #EFF7FF 0%, #FFFFFF 100%);
				box-shadow: 0px 4px 10px 0px rgba(146, 146, 146, 0.15);
				border-radius: 8px 8px 8px 8px;
				padding: 17px 16px 13px 10px;
				display: flex;
				align-items: center;
				margin-bottom: 15px;

				.img {
					width: 90px;
					height: 90px;
					background: #E4E4E4;
					border-radius: 4px 4px 4px 4px;
					border: 1px solid #E1F1FB;

					// margin-top: 4px;
					image {
						width: 90px;
						height: 90px;
					}
				}

				.info {
					padding-left: 10px;
					width: calc(100% - 150px);

					.name {
						font-weight: 500;
						font-size: 16px;
						color: #000000;
						line-height: 19px;
					}

					.time-info {
						padding: 7px 0;
						display: flex;
						align-items: center;
						color: #999;

						text {
							padding-left: 2px;
							line-height: 16px;
						}
					}
				}

				.btn {
					width: 60px;
					height: 28px;
					background: #EFAB46;
					border-radius: 5px 5px 5px 5px;
					display: flex;
					align-items: center;
					justify-content: center;

					.img-5 {}

					text {
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