<template>
	<view :style="{paddingBottom: toolbarHeight + 'px'}">
		<u-navbar :fixed="true" bgColor="rgba(255,255,255, 0)">
			<image slot='left' src="@/static/arrow_left_alpha.png" style="width: 28px; height: 28px;" @click="back">
			</image>
		</u-navbar>
		<u-swiper :list="data.urlBigsStr" :height="200 + 'px'" radius="0px" circular
			indicatorStyle="bottom: 10px; right: 0px" @change="e => bannerIndex = e.current">
			<view slot="indicator" class="indicator-num">
				<text class="indicator-num__text">{{ bannerIndex + 1 }}/{{ data.urlBigsStr.length }}</text>
			</view>
		</u-swiper>
		<!-- -->
		<view style="margin: 12px 16px 0px 16px;">
			<view class="div flex-column">
				<view class="flex-row flex-items-center">
					<view style="color: #D91919;" class="font-20 font-weight-semibold">¥{{ data.priceCny }}</view>
					<view v-if="data.integralStatus == 1" style="color: #9BA09F;" class="font-12 font-weight-regular">
						{{ '+' + data.integral + '积分' }}
					</view>
				</view>
				<view class="u-line-2 font-16 font-weight-semibold" style="color: #545958;">
					{{ data.title }}
				</view>
				
			</view>
			
			<view class="div flex-column" style="margin-top: 12px;">
				<text class="font-14 font-weight-medium" style="color: #545958;">{{ data.remark }}</text>
				
			</view>
			

			<view v-if="true" class="div flex-column"
				style="margin-top: 12px; padding-left: 0px; padding-right: 0px; margin-bottom: 12px;">
				<text class="font-14 font-weight-medium" style="color: #545958; margin-left: 12px;">详情介绍</text>
				<view class="flex-column" style="margin-top: 12px;">
					<view v-for="(item,index) in [1]" :key="index" style="width: 100%;">
						<image :src="data.urlDetail" mode="widthFix" :style="{width: '100%'}"></image>
					</view>
				</view>
			</view>

		</view>
		<view class="" style="position: fixed; bottom: 0px; left: 0px; right: 0px; background-color: white;"
			:style="{height: toolbarHeight + 'px' }">
			<view class="flex-row flex-items-center flex-center" style="height: 54px;">
				
				<view class="flex-row-center font-18 font-weight-semibold"
					style="color: white; background-color: #389838; height: 44px; border-radius: 15px;"
					:style="{width: screenWidth - 110 - 16 + 'px'}" @click="showReservation=true">
					立即购买
				</view>
			</view>
		</view>
		<u-popup :show="showReservation" mode="bottom" :closeOnClickOverlay="false" round="12px">
			<view class="" style="">
				<view class="flex-row flex-items-center flex-between" style="">
					<text class="font-22 font-weight-semibold">购买</text>
					<u-icon name="close" size="20px" @click="showReservation = false"></u-icon>
				</view>
				<p class="flex-row flex-items-center flex-between" style="margin-top: 15px;">
					<span class="font-16 font-weight-medium">商品金额</span>
					<span class="font-20 font-weight-semibold" style="color: #D91919;">¥{{data.priceCny}}</span>
				</p>
				<p class="flex-row flex-items-center flex-between" style="margin-top: 7px;">
					<span class="font-16 font-weight-medium">我的余额</span>
					<span class="font-20 font-weight-semibold" style="color: #D91919;">¥{{data.priceCny}}</span>
				</p>
				<p class="flex-row flex-items-center flex-between" style="margin-top: 2px;">
					<span></span>
					<span>余额不足</span>
				</p>
				
				<p class="flex-row flex-items-center flex-between" style="margin-top: 7px;">
					<span class="font-16 font-weight-medium" style="min-width: 80px;">收货地址</span>
					<view class="flex-row flex-items-center" @click="intoAddress">
						<span>{{ addressObj.id ? `${addressObj.name}, ${addressObj.city}${addressObj.area}${addressObj.detailsAddr}` : '请选择收货地址'}}</span>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</p>
				
				<view class="flex-row flex-items-center flex-center" style="height: 54px; margin-top: 25px;">
					
					<view class="flex-row-center font-18 font-weight-semibold"
						style="color: white; background-color: #389838; height: 44px; border-radius: 15px;"
						:style="{width: screenWidth - 110 - 16 + 'px'}" @click="confirmBuy">
						确认购买
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		goodsDetailApi,
		addressListApi
	} from "@/config/api.js"
	export default {
		data() {
			return {
				addressList: [],
				addressObj: {},
				userId: '',
				goodsId: '',
				collected: false,
				data: {
					urlBigsStr: [],
					goodsDetailImage: ''
				},
				clinic: {
					special: '',
					specials: []
				},
				reservationNum: 1,
				showReservation: false,
				star: 4,
				bannerIndex: 0,
				banners: [
					'../../static/temp3.jpeg',
					'../../static/temp2.jpeg',
					'../../static/temp1.jpeg',
				],
				guarantees: [],
				// 金额总计
				sumPrice: '0.00',
				// 实付金额
				realPrice: '0.00',
				// 消耗积分
				integral: 0,
				// 积分余额
				integralAmount: '',
				// 是否选择了抵扣积分
				selectIntegral: false,
				// 预约时间， 用来显示的
				time: '',
				// 用来picker中显示的
				timeValue: Number(new Date()),
				showDatePicker: false,
				share: {
					title: '',//自定义标题
					path: `/pages/index/index`,  //默认跳转首页?id=' + this.item.id
					imageUrl: '',  //可设置默认分享图，不设置默认截取头部5:4
				}
			}
		},
		computed: {
			screenWidth() {
				const sys = uni.$u.sys()
				return sys.screenWidth
			},
			toolbarHeight() {
				const sys = uni.$u.sys()
				return sys.safeAreaInsets.bottom + 54
			},
			isLogin() {
				return this.$store.state.token.length != 0
			}
		},
		onLoad(info) {
			this.goodsId = info.id
			this.getGoodsDetail()
			if (this.isLogin) {
				this.collect()
				this.getUserinfo()
				this.getAddressList()
			}
			this.share.path = `/pages/index/index?id=` + this.goodsId + '&type=' + 'DetailShare'
			
		},
		onShow() {
			if (this.isLogin) {
				this.getWalletInfo()
			}
		},
		methods: {
			confirmBuy() {
				
			},
			async getAddressList( index = 0) {
				const res = await addressListApi()
				this.addressList = res
				if (res.length != 0) {
					this.addressObj = res[index]
				}
			},
			selectAddress(index) {
				this.getAddressList(index)
			},
			intoAddress(){
				uni.navigateTo({
					url:'/pages/address/address?select=1'
				})
			},
			im() {
				// if (!this.$tool.isLogin(true)) {
				// 	return
				// }
				// uni.navigateTo({
				// 	url: `/course-detail/pages/im-detail?sysUserId=${this.clinic.sysUser}&userId=${this.userId}&titleName=系统客服`
				// })
			},
			async getUserinfo() {
				// const res = await userInfoApi()
				// this.$cookie.set('roleType', res.data.roleType)
				// this.userId = res.data.id
			},
			intoClinic() {
				uni.navigateTo({
					url: '/pages/clinic-detail/clinic-detail?id=' + this.clinic.id
				})
			},
			timeTap() {
				this.showReservation = false
				this.showDatePicker = true
			},
			datePickerConfirm(e) {
				console.log(e)
				this.datePickerCancel()
				this.time = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:00');
			},
			datePickerCancel() {
				this.showReservation = true
				this.showDatePicker = false
			},
			/**
			 * 获取可用积分
			 */
			async getWalletInfo() {
				// const res = await walletInfoApi()
				// this.integralAmount = parseFloat(res.data.consumeAmount).toFixed(2)
			},
			/**
			 * 收藏相关
			 * 1 查询, 2 添加收藏, 3 移除收藏
			 */
			async collect(query = 1) {
				// const res = await collectApi({
				// 	type: 2,
				// 	query: query,
				// 	id: this.goodsId
				// })
				// if (query == 1) {
				// 	this.collected = res.data.status == 1
				// } else {
				// 	this.collected = !this.collected
				// 	this.$tool.showToast(query == 2 ? '收藏成功' : '已取消收藏')
				// }
			},
			/**
			 * 点击收藏按钮
			 */
			collectTap() {
				if (!this.$tool.isLogin(true)) {
					return
				}
				this.collect(this.collected ? 3 : 2)
			},
			/**
			 * 获取商品详情数据
			 */
			async getGoodsDetail() {
				const res = await goodsDetailApi(this.goodsId)
				console.log(res)
				this.data = res
				// this.clinic = this.data.clinic
				// this.clinic.specials = this.clinic.special.split('__')
				// this.updatePrice()
			},
			/**
			 * 点击评价
			 */
			appraise() {
				uni.$u.route('/pages/appraise/appraise', {
					clinicId: this.clinic.id,
					productId: this.goodsId
				})
			},
			/**
			 * 确认下单
			 */
			intoConfirmOrder() {
				if (!this.$tool.isLogin(true)) {
					return
				}
				uni.$u.route('/pages/confirm-order/confirm-order', {
					goodsId: this.goodsId,
					num: parseInt(this.reservationNum),
					time: this.time,
					selectIntegral: this.selectIntegral ? 1 : 0
				});
			},
			/**
			 * 数量 减
			 */
			down() {
				let num = parseInt(this.reservationNum)
				if (num <= 1) {
					return
				}
				num -= 1
				this.reservationNum = num
				this.updatePrice()
			},
			/**
			 * 数量 加
			 */
			add() {
				let num = parseInt(this.reservationNum)
				num += 1
				this.reservationNum = num
				this.updatePrice()
			},
			selectIntegralBtn() {
				this.selectIntegral = !this.selectIntegral
				this.updatePrice()
			},
			/**
			 * 更新价格和积分
			 */
			updatePrice() {

				// 更新 金额总计
				let tempSumPrice = parseFloat(this.data.price) * this.reservationNum
				this.sumPrice = tempSumPrice.toFixed(2)
				// 积分
				if (this.selectIntegral) {
					let current = parseFloat(this.data.integral) * this.reservationNum
					if (current > parseFloat(this.integralAmount)) {
						current = parseFloat(this.integralAmount)
					}
					this.integral = current.toFixed(2)
				} else {
					this.integral = (0).toFixed(2)
				}
				// 实付金额
				this.realPrice = (parseFloat(this.sumPrice) - parseFloat(this.integral)).toFixed(2)


			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	// 默认样式
	button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 14px;
		padding-right: 14px;
		box-sizing: border-box;
		font-size: 12px;
		font-weight: 400;
		text-align: center;
		text-decoration: none;
		line-height: 1;
		border-radius: 5px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #A1A09E;
		background-color: #fff;
	}
	
	// 边框样式
	button::after {
		border: 0;
	}
	
	// 禁用时样式
	button[disabled] {
		background-color: #fff;
		color: #666;
	}
	
	// 点击时样式
	.button-hover {
		color: rgba(0, 0, 0, 0.6);
		background-color: #fff;
	}
	
	

	.btn {
		font-size: 18px;
		font-weight: 600;
		color: #FFFFFF;
		height: 44px;
		background: #18533C;
		border-radius: 15px;
	}

	.div {
		padding: 12px;
		// width: 100%;
		background: #FFFFFF;
		border-radius: 15px;
	}

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.4);
		// border-radius: 100px;
		border-top-left-radius: 100px;
		border-bottom-left-radius: 100px;
		width: 45px;
		@include flex;
		justify-content: center;

		&__text {
			color: #FFFFFF;
			font-size: 12px;
		}
	}
</style>