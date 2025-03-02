<template>
	<view class="page-gradient-bg" style="min-height: 100vh;">
		<u-navbar title="" :placeholder="true" height="70px" :autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				找回密码
			</view>
		</u-navbar>
		<view class="find-form-box">
			<view class="form-item">
				<view class="form-item-label">
					邮箱
				</view>
				<view class="form-item-content">
					<u--input class="account-input" v-model="form.mobile" placeholder="请输入邮箱" border="surround"
						clearable></u--input>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					验证码
				</view>
				<view class="form-item-content">
					<u-input class="account-input" v-model="form.code" placeholder="请输入验证码" border="surround"
						clearable>
						<template slot="suffix">
							<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒后重新获取"></u-code>
							<u-button @tap="getCode" :text="tips" type="success" style="background-color: transparent; border: none; color: #389838;"></u-button>
						</template>
					</u-input>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					新密码
				</view>
				<view class="form-item-content">
					<u--input type="password" v-model="form.password" placeholder="请输入登录密码" border="surround"
						clearable></u--input>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					确认密码
				</view>
				<view class="form-item-content">
					<u--input type="password" v-model="form.confirmPassword" placeholder="请输入登录密码" border="surround"
						clearable></u--input>
				</view>
			</view>
			<view class="btns">
				<u-button type="primary" text="重置" size="large"
					:customStyle="{backgroundColor: '#418C2D'}" @click="confirm"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		sendEmailApi,
		findPWDApi
	} from '@/config/api.js'
	import {
		des_encrypt_data
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				form: {
					mobile: undefined,
					password: undefined,
					confirmPassword: undefined,
					code: undefined,
					type: "1",
				},
				tips: '',
				value: ''
			}
		},
		methods: {
			async confirm() {
				let msg = ''
				if (!this.$u.test.email(this.form.mobile)) {
					msg = '请输入邮箱'
				} else if (!this.$u.test.code(this.form.code, 6)) {
					msg = '请输入验证码'
				} else if (!this.form.password) {
					msg = '请输入密码'
				} else if (!this.form.confirmPassword) {
					msg = '请输入确认密码'
				}
				if (msg.length != 0) {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
					return
				}
				let params = des_encrypt_data(this.form)
				await findPWDApi(this.form)
				uni.showToast({
					title: '重置成功'
				});
				setTimeout(function() {
					uni.navigateBack()
				}, 2000);
			},
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (!this.$u.test.email(this.form.mobile)) {
						uni.showToast({
							title: '请输入邮箱',
							icon: 'none',
							duration: 2000
						});
						return
					}
					let params = des_encrypt_data({
						type: '2',
						email: this.form.mobile
					})
					await sendEmailApi(params)
					this.$refs.uCode.start();
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			}
		}
	}
</script>

<style lang="scss">
	.find-form-box {
		// background: rgba(255, 255, 255, 0.8);
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
</style>