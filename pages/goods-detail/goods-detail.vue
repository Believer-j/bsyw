<template>
	<view :style="{paddingBottom: toolbarHeight + 'px'}">
		<u-navbar :fixed="true" bgColor="rgba(255,255,255, 0)">
			<image slot='left' src="@/static/arrow_left_alpha.png" style="width: 28px; height: 28px;" @click="back">
			</image>
		</u-navbar>
		<u-swiper :list="data.urlBigList" :height="screenWidth + 'px'" radius="0px" circular
			indicatorStyle="bottom: 10px; right: 0px" @change="e => bannerIndex = e.current">
			<view slot="indicator" class="indicator-num">
				<text class="indicator-num__text">{{ bannerIndex + 1 }}/{{ data.urlBigList.length }}</text>
			</view>
		</u-swiper>
		<!-- -->
		<view style="margin: 12px 16px 0px 16px;">
			<view class="div flex-column">
				<view class="flex-row flex-items-center">
					<view style="color: #D91919;" class="font-20 font-weight-semibold">¥{{ data.price }}</view>
					<view v-if="data.integralStatus == 1" style="color: #9BA09F;" class="font-12 font-weight-regular">
						{{ '+' + data.integral + '积分' }}
					</view>
				</view>
				<view class="u-line-2 font-16 font-weight-semibold" style="color: #545958;">
					{{ data.name }}
				</view>
				<view class="flex-row flex-items-center flex-between" style="margin-top: 5px;">
					<view class="font-12 font-weight-regular" style="color: #9BA09F;">
						已售: {{ data.sell }}
					</view>
					<view class="flex-row flex-items-center">
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="share"
							style="border: none; background-color: transparent; box-shadow: none;">
							<image src="@/static/share.png" style="width: 15px; height: 13px; margin-right: 3px;">
							</image>
							<text class="font-12 font-weight-regular" style="color: #9BA09F;">分享</text>
						</button>
						<!-- #endif -->
						
						<view class="flex-row flex-items-center" @click="collectTap">
							<image :src="collected ? '../../static/collect_s.png' : '../../static/collect.png' "
								style="width: 15px; height: 14px; margin-right: 3px;">
							</image>
							<view class="font-12 font-weight-regular" style="color: #9BA09F;">收藏</view>
						</view>
					</view>
				</view>
			</view>
			<view class="div flex-row flex-items-center flex-between" style="margin-top: 12px;" @click="appraise">
				<text class="font-14 font-weight-medium" style="color: #545958;">评价内容</text>
				<view class="flex-row flex-items-center">
					<text class="font-14 font-weight-regular" style="color: #9BA09F;">{{ data.totalComment }}条评价</text>
					<image src="@/static/arrow_right_gary.png" style="width: 5px; height: 10px; margin-left: 5px;">
					</image>
				</view>
			</view>
			<view class="div flex-column" style="margin-top: 12px;">
				<text class="font-14 font-weight-medium" style="color: #545958;">平台保障</text>
				<view class="flex-row flex-wrap">
					<view v-for="(item,index) in data.guaranteeList" :key="index" class="flex-row flex-items-center"
						style="margin-right: 20px; margin-top: 5px;">
						<image src="@/static/gougou.png" style="width: 13px; height: 13px; margin-right: 6px;"></image>
						<text class="font-12 font-weight-regular" style="color: #545958;"> {{ item }}</text>
					</view>
				</view>
			</view>
			<view class="div flex-column" style="margin-top: 12px;" @click.stop="intoClinic">
				<text class="font-14 font-weight-medium" style="color: #545958;">适用诊所</text>
				<view class="flex-row flex-between" style="margin-top: 12px;">
					<view class="flex-row">
						<image :src="clinic.logo" mode="aspectFill"
							style="width: 60px; height: 60px; border-radius: 10px; min-width: 60px;"></image>
						<view class="flex-column" style="margin-left: 11px;">
							<view class="font-18 font-weight-semibold" style="color: #545958;">{{ clinic.name }}</view>
							<view class="flex-row flex-items-center">
								<image v-for="(item,index) in [1,1,1,1,1]" :key="index"
									style="width: 13px; height: 12px; margin-right: 5px;"
									:src="index < star ? '../../static/star_s.png' : '../../static/star.png'">
								</image>
							</view>
							<view v-if="clinic.specials.length != 0" class="flex-row flex-items-center"
								style="margin-top: 7px;">
								<view v-for="(item,index) in clinic.specials" :key="index"
									class="font-10 font-weight-semibold flex-column flex-items-center"
									style="height: 16px; border-radius: 2px; padding-left: 7px; padding-right: 7px; margin-right: 5px; color: #38BF9F; background-color: #EEFAF7;">
									{{ item }}
								</view>
							</view>
							<view class="flex-row" style="margin-top: 7px;">
								<image src="@/static/address.png"
									style="width: 13px; height: 12px; min-width: 13px; margin-right: 5px; margin-top: 4px;">
								</image>
								<view class="u-line-2 font-12 font-weight-regular" style="color: #9BA09F;">
									{{ clinic.addr }}
								</view>
							</view>
						</view>
					</view>
					<image v-show="parseInt(clinic.sysUser) !=  parseInt(userId)" src="@/static/im.png" style="width: 40px; height: 40px; min-width: 40px;" @click.stop="im"></image>
				</view>
			</view>

			<view v-if="data.goodsDetailImage.length != 0" class="div flex-column"
				style="margin-top: 12px; padding-left: 0px; padding-right: 0px; margin-bottom: 12px;">
				<text class="font-14 font-weight-medium" style="color: #545958; margin-left: 12px;">详情介绍</text>
				<view class="flex-column" style="margin-top: 12px;">
					<view v-for="(item,index) in [1]" :key="index" style="width: 100%;">
						<image :src="data.goodsDetailImage" mode="widthFix" :style="{width: '100%'}"></image>
					</view>
				</view>
			</view>

		</view>
		<view class="" style="position: fixed; bottom: 0px; left: 0px; right: 0px; background-color: white;"
			:style="{height: toolbarHeight + 'px' }">
			<view class="flex-row flex-items-center" style="height: 54px;">
				<view class="flex-column-center" style="width: 110px; height: 100%; " @click="intoClinic">
					<image src="@/static/toolbar_clinic.png" style="width: 22px; height: 20px;"></image>
					<text class="font-12 font-weight-regular" style="color: #9BA09F;">诊所</text>
				</view>
				<view class="flex-row-center font-18 font-weight-semibold"
					style="color: white; background-color: #18533C; height: 44px; border-radius: 15px;"
					:style="{width: screenWidth - 110 - 16 + 'px'}" @click="showReservation=true">
					立即购买
				</view>
			</view>
		</view>

		<u-popup :show="showReservation" :closeOnClickOverlay="false" round="15px">
			<view class="flex-column"
				style="margin-top: 20px; margin-left: 16px; margin-right: 16px; margin-bottom: 10px;">
				<view class="flex-row flex-items-center flex-between">
					<text style="color: #545958;" class="font-18 font-weight-medium">{{ clinic.name }}</text>
					<image src="@/static/close.png" style="width: 20px; height: 20px;" @click="showReservation=false">
					</image>
				</view>
				<view class="flex-row" style="margin-top: 20px;">
					<image :src="clinic.logo" mode="aspectFill" style="width: 80px; height: 80px; border-radius: 10px;">
					</image>
					<view class="flex-column" style="margin-left: 12px;">
						<view class="font-16 font-weight-regular u-line-2" style="color: #545958;">
							{{ data.name }}
						</view>
						<view class="font-16 font-weight-semibold" style="color: #D91919; margin-top: 5px;">
							{{ '¥ ' + parseFloat(data.price).toFixed(2) }}
						</view>
					</view>
				</view>
				<view style="width: 100%; height: 1px; background-color: #F5F5F5; margin-top: 19px;"></view>
				<view class="flex-column">
					<view class="font-16 font-weight-regular flex-row flex-items-center flex-between"
						style="height: 47px; color: #545958;">
						<text>消费数量</text>
						<view class="flex-row" style="height: 28px; border-radius: 6px; border: 1px solid #E3E9E6;">
							<view class="flex-row-center font-20 font-weight-bold"
								style="width: 28px; height: 100%; background-color: #FBFFFC; border-top-left-radius: 6px; border-bottom-left-radius: 6px;"
								@click.stop="down">-</view>
							<view style="background-color: #E3E9E6; width: 1px; height: 100%;"></view>
							<u-input v-model="reservationNum" border="none" type="number" inputAlign="center"
								color="#545958" customStyle="width: 50px;" :disabled="true"
								disabledColor="white"></u-input>
							<view style="background-color: #E3E9E6; width: 1px; height: 100%;"></view>
							<view class="flex-row-center font-20 font-weight-bold"
								style="width: 28px; height: 100%; background-color: #FBFFFC; border-top-right-radius: 6px; border-bottom-right-radius: 6px;"
								@click.stop="add">+</view>
						</view>
					</view>
					<view style="width: 100%; height: 1px; background-color: #F5F5F5;"></view>
				</view>
				<view class="flex-column">
					<view class="font-16 font-weight-regular flex-row flex-items-center flex-between"
						style="height: 47px; color: #545958;">
						<text>金额总计</text>
						<view class="">¥ {{ sumPrice }}</view>
					</view>
					<view style="width: 100%; height: 1px; background-color: #F5F5F5;"></view>
				</view>
				<view v-if="data.integralStatus == 1" class="flex-column">
					<view class="font-16 font-weight-regular flex-row flex-items-center flex-between"
						style="height: 47px; color: #545958;">
						<text>消耗积分</text>
						<view class="flex-row flex-items-center" @click="selectIntegralBtn">
							<view class="flex-column flex-items-end" style="margin-right: 8px;">
								<view class="">{{ integral }}</view>
								<view class="font-12 font-weight-regular" style="color: #9BA09F;">
									剩余积分:{{integralAmount}}</view>
							</view>
							<image
								:src=" selectIntegral ? '../../static/register/round_selected.png' : '../../static/register/round_select.png' "
								style="width: 18px; height: 18px;"></image>
						</view>
					</view>
					<view style="width: 100%; height: 1px; background-color: #F5F5F5;"></view>
				</view>
				<view class="flex-column">
					<view class="font-16 font-weight-regular flex-row flex-items-center flex-between"
						style="height: 47px; color: #545958;">
						<text>实付金额</text>
						<view class="font-weight-medium" style="color: #D91919;">¥ {{ realPrice }}</view>
					</view>
					<view style="width: 100%; height: 1px; background-color: #F5F5F5;"></view>
				</view>
				<view v-if="data.service == 1" class="flex-column">
					<view class="font-16 font-weight-regular flex-row flex-items-center flex-between"
						style="height: 47px; color: #545958;" @click="timeTap">
						<text>预约时间</text>
						<view class="flex-row flex-items-center flex-center" style="height: 47px;">
							<view>{{ time }}</view>
							<image src="@/static/date.png" style="width: 20px; height: 20px; margin-left: 12px;">
							</image>
						</view>
					</view>
					<view style="width: 100%; height: 1px; background-color: #F5F5F5;"></view>
				</view>
				<view class="flex-row-center btn" style="margin-top: 16px;"
					@click="$u.throttle(intoConfirmOrder, 2000)">
					立即下单
				</view>
			</view>
		</u-popup>
		<u-datetime-picker :show="showDatePicker" v-model="timeValue" mode="datetime" :minDate="Number(new Date())"
			@confirm="datePickerConfirm" @cancel="datePickerCancel"></u-datetime-picker>
	</view>
</template>

<script>
	// import {
	// 	goodsDetailApi,
	// 	collectApi
	// } from "@/api/index.js"
	// import {
	// 	walletInfoApi,
	// 	userInfoApi
	// } from "@/api/user.js"
	export default {
		data() {
			return {
				userId: '',
				goodsId: '',
				collected: false,
				data: {
					urlBigList: [],
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
			}
		},
		onLoad(info) {
			this.goodsId = info.id
			this.getGoodsDetail()
			if (this.$tool.isLogin()) {
				this.collect()
				this.getUserinfo()
			}
			this.share.path = `/pages/index/index?id=` + this.goodsId + '&type=' + 'DetailShare'
		},
		onShow() {
			if (this.$tool.isLogin()) {
				this.getWalletInfo()
			}
		},
		methods: {
			im() {
				// if (!this.$tool.isLogin(true)) {
				// 	return
				// }
				// uni.navigateTo({
				// 	url: `/course-detail/pages/im-detail?sysUserId=${this.clinic.sysUser}&userId=${this.userId}&titleName=系统客服`
				// })
			},
			async getUserinfo() {
				const res = await userInfoApi()
				this.$cookie.set('roleType', res.data.roleType)
				this.userId = res.data.id
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
				const res = await walletInfoApi()
				this.integralAmount = parseFloat(res.data.consumeAmount).toFixed(2)
			},
			/**
			 * 收藏相关
			 * 1 查询, 2 添加收藏, 3 移除收藏
			 */
			async collect(query = 1) {
				const res = await collectApi({
					type: 2,
					query: query,
					id: this.goodsId
				})
				if (query == 1) {
					this.collected = res.data.status == 1
				} else {
					this.collected = !this.collected
					this.$tool.showToast(query == 2 ? '收藏成功' : '已取消收藏')
				}
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
				const res = await goodsDetailApi({
					id: this.goodsId
				})
				console.log(res.data)
				this.data = res.data
				this.clinic = this.data.clinic
				this.clinic.specials = this.clinic.special.split('__')
				this.updatePrice()
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