<template>
	<view class="page-wrap">

		<!-- #ifdef H5 -->
		<!-- <view
			style="position: absolute; background-color: red; right: 15px; top: 140px; background-color: #418C2D; border-radius: 4px; color: white;  padding: 7px 10px;"
			@click="downTap">
			下载APP
		</view> -->
		<!-- #endif -->

		<view class="page-content2 page-gradient-bg">
			<view class="r-flex-column" style="padding-top: 50px; ">
				<view class="r-flex-all-center">
					<image src="/static/bsyw-logo-bianxing.png" mode="widthFix" style="width: 70%;"></image>
				</view>
				<text class="font-24 font-weight-medium" style="margin-top: 20px; margin-left: 40px;">您好，欢迎使用</text>
				<text class="font-weight-semibold" style="font-size: 28px; margin-top: 7px; margin-left: 40px;">白沙源物平台</text>
			</view>
			<view class="login-wrapper">

				<view class="nav-box">
					<view v-for="item in navList" :key="item.id" @click="handleChangeNav(item)"
						:class="['nav-item', item.id == navId ? 'active-nav':'']">
						{{item.name}}
					</view>
				</view>
				<view class="login-form-box" v-if="navId==1">
					<view class="form-item">
						<view class="form-item-label">
							手机号
						</view>
						<view class="form-item-content">
							<u--input class="account-input" v-model="form.mobile" placeholder="请输入手机号" border="surround"
								clearable></u--input>
						</view>
					</view>
					<view class="form-item">
						<view class="form-item-label">
							密码
						</view>
						<view class="form-item-content">
							<u--input type="password" v-model="form.password" placeholder="请输入登录密码" border="surround"
								clearable></u--input>
						</view>
					</view>
					<!-- <view class="login-btn" @click="handleLogin">
						登录
					</view> -->
					<view class="btns">
						<u-button type="primary" :disabled="hasLogin" text="登录" size="large" cus
							:customStyle="{backgroundColor: '#418C2D'}" @click="handleLogin"></u-button>
					</view>
				</view>
				<view class="login-form-box" v-else>
					<!-- 1, 手机号
2, 登录密码
3, 确认登录密码
4, 资金密码
5, 确认资金密码
6, 邀请码 -->
					<view class="form-item">
						<view class="form-item-label">
							手机号
						</view>
						<view class="form-item-content">
							<u--input size="large" v-model="form.mobile" placeholder="请输入手机号" border="surround"
								clearable></u--input>
						</view>
					</view>
					<view class="form-item">
						<view class="form-item-label">
							登录密码
						</view>
						<view class="form-item-content">
							<u--input type="password" v-model="form.password" placeholder="请输入登录密码" border="surround"
								clearable></u--input>
						</view>
					</view>
					<view class="form-item">
						<view class="form-item-label">
							确认登录密码
						</view>
						<view class="form-item-content">
							<u--input type="password" v-model="form.confirmPassword" placeholder="请输入确认登录密码"
								border="surround" clearable></u--input>
						</view>
					</view>
					<view class="form-item">
						<view class="form-item-label">
							资金密码
						</view>
						<view class="form-item-content">
							<u--input type="password" v-model="form.fundPassword" placeholder="请输入资金密码"
								border="surround" clearable></u--input>
						</view>
					</view>
					<view class="form-item">
						<view class="form-item-label">
							确认资金密码
						</view>
						<view class="form-item-content">
							<u--input type="password" v-model="form.confirmFundPassword" placeholder="请输入确认资金密码"
								border="surround" clearable></u--input>
						</view>
					</view>

					<view class="form-item">
						<view class="form-item-label">
							邀请码
						</view>
						<view class="form-item-content">
							<u--input v-model="form.inviteCode" placeholder="请输入邀请码" border="surround"
								clearable></u--input>
						</view>
					</view>
					<!-- <view class="login-btn" @click="register">
						注册
					</view> -->
					<view class="btns">
						<u-button type="primary" :disabled="hasRegister" text="注册" size="large"
							:customStyle="{backgroundColor: '#418C2D'}" @click="getRegister"></u-button>
					</view>

				</view>

			</view>

		</view>

	</view>
</template>

<script>
	import {
		isValidPhoneNumber
	} from '@/utils/index.js'
	import {
		login,
		register,
		download
	} from '@/config/api.js'
	export default {
		computed: {
			hasLogin() {
				const {
					mobile,
					password
				} = this.form
				if (mobile && password) {
					return false;
				}
				return true
			},
			hasRegister() {
				const {
					mobile,
					password,
					confirmPassword,
					fundPassword,
					confirmFundPassword,
					inviteCode
				} = this.form
				if (mobile && password && confirmPassword && fundPassword && confirmFundPassword && inviteCode) {
					return false;
				}
				return true
			}
		},
		data() {
			return {
				navId: '',
				navList: [{
					id: '1',
					name: '登录'
				}, {
					id: '2',
					name: '注册'
				}],
				form: {
					account: undefined,
					pass: undefined,
					mobile: undefined,
					password: undefined,
					confirmPassword: undefined,
					fundPassword: undefined,
					confirmFundPassword: undefined,
					inviteCode: undefined,
					// 	"mobile": "13881724499",  手机号
					// 	"password": "a123456",  登录密码
					// 	"confirmPassword": "a123456",  确认登录密码
					// 	"fundPassword": "123456",  资金密码(6位纯数字)
					// 	"confirmFundPassword": "123456", 确认资金密码
					// 	"inviteCode": "F4fkrNK2"  邀请码
				},
				checked: false
			};
		},
		onLoad(info) {
			let invitationCode = info.invitationCode
			if (invitationCode) {
				this.handleChangeNav(this.navList[1])
				this.form.inviteCode = invitationCode
			} else {
				this.handleChangeNav()
			}
		},
		methods: {
			async downTap() {
				const res = await download()
				window.open(res)
			},
			handleChangeNav(item) {
				item = !item ? this.navList[0] : item
				if (this.navId == item.id) {
					return false
				}
				this.navId = item.id
				for (let key in this.form) {
					this.form[key] = undefined
				}
			},
			// 注册
			async getRegister() {
				// this.handleChangeNav()
				const {
					mobile,
					password,
					confirmPassword,
					fundPassword,
					confirmFundPassword,
					inviteCode
				} = this.form
				console.log(isValidPhoneNumber(mobile));
				// 	"mobile": "13881724499",  手机号
				// 	"password": "a123456",  登录密码
				// 	"confirmPassword": "a123456",  确认登录密码
				// 	"fundPassword": "123456",  资金密码(6位纯数字)
				// 	"confirmFundPassword": "123456", 确认资金密码
				// 	"inviteCode": "F4fkrNK2"  邀请码

				if (!isValidPhoneNumber(mobile)) {
					uni.showToast({
						title: '请输入正确的手机号',
					})
					return false
				}
				if (password !== confirmPassword) {
					uni.showToast({
						title: '二次密码必须相同'
					})
					return false
				}
				// if (password !== confirmPassword) {
				// 	uni.showToast({
				// 		title: '密码必须是8-16位,字母+数字组合'
				// 	})
				// 	return false
				// }
				if (fundPassword !== confirmFundPassword) {
					uni.showToast({
						title: '二次资金密码必须相同'
					})
					return false
				}
				console.log('验证成功', this.form)

				try {
					const res = await register({
						mobile,
						password,
						confirmPassword,
						fundPassword,
						confirmFundPassword,
						inviteCode
					});
					uni.showToast({
						title: '注册成功'
					});
					this.handleChangeNav()
				} catch (e) {
					// uni.showToast({
					// 	icon: 'error',
					// 	title: 'error! try again later'
					// });
				}
			},
			// login
			async handleLogin() {
				const {
					mobile,
					password
				} = this.form
				try {
					const res = await login({
						mobile,
						password
					});
					if (res) {
						uni.showToast({
							title: '登录成功'
						});
						await this.$store.commit('setToken', res)
						await this.$store.dispatch('getUserInfo')
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}, 2000);
						// if (this.$store.state.userInfo && this.$store.state.userInfo.mobile) {
						// 	uni.navigateTo({
						// 		url: '/pages/index/index'
						// 	})
						// }

					}
				} catch (e) {
					//TODO handle the exception
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-wrapper {
		padding-top: 20px;
		min-height: 100vh;

		.nav-box {
			display: flex;
			padding: 0 80px;
			justify-content: space-between;

			.nav-item {
				font-weight: 500;
				font-size: 17px;
				color: #2A2E44;
				padding: 14px 0;
			}

			.active-nav {
				position: relative;

				&:before {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 12px;
					border-color: transparent transparent #fff transparent;
				}
			}
		}

		.login-form-box {
			background: #fff;
			padding: 24px;

			.form-item {
				&:nth-child(n+2) {
					margin-top: 24px;
				}

				.form-item-label {
					font-size: 15px;
					color: #333333;
					line-height: 18px;
					height: 23px;
					margin-bottom: 8px;
				}

				.form-item-content {}
			}

			.btns {
				padding-top: 48px;
			}
		}
	}
</style>