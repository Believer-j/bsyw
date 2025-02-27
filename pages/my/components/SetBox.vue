<template>
	<view class="box">
		<view class="invitation-info">
			<image class="img-9" src="@/static/img/my/invitaion.png" mode=""></image>
			<view class="code">
				<view class="tag">
					邀请码：
				</view>
				<view class="text">
					{{userInfo.inviteCode}}
				</view>
			</view>
			<view class="btn" @click="copyCode">
				复制分享
			</view>
		</view>
		<view class="set-list">
			<view class="set-item" @click="openEditPhone">
				<image class="img-10" src="@/static/img/my/set-2.png" mode=""></image>
				<view class="title">
					修改手机
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view>
			<view class="set-item" @click="openEditNick">
				<image class="img-10" src="@/static/img/my/set-2.png" mode=""></image>
				<view class="title">
					修改昵称
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view>
			<view class="set-item" @click="openLoginPwd">
				<image class="img-10" src="@/static/img/my/set-1.png" mode=""></image>
				<view class="title">
					修改登录密码
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view>
			<view class="set-item" @click="openNumPwd">
				<image class="img-10" src="@/static/img/my/set-1.png" mode=""></image>
				<view class="title">
					修改资金密码
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view>
			<view class="set-item" @click="goNameAuth">
				<image class="img-10" src="@/static/img/my/set-3.png" mode=""></image>
				<view class="title">
					实名认证
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view>
			<view class="set-item" @click="goAddress">
				<u-icon name="map-fill" color="#2d2d2d" size="18"></u-icon>
				<view class="title">
					收货地址
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view>
			<view class="set-item" @click="share">
				<image class="img-10" src="@/static/img/my/set-4.png" mode=""></image>
				<view class="title">
					分享链接
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view>
			<!-- <view class="set-item" @click="layout">
				<image class="img-10" src="@/static/img/my/set-3.png" mode=""></image>
				<view class="title">
					退出登录
				</view>
				<u-icon name="arrow-right" color="#999" size="12"></u-icon>
			</view> -->
		</view>
		<edit-nickname-popup ref="editNicknamePopup" />
		<edit-phone-popup ref="editPhonePopup" />
		<edit-login-pwd ref="editLoginPwd" />
		<edit-num-pwd ref="editNumPwd" />
		<share-popup ref="sharePopup" />
	</view>
</template>

<script>
	import EditNicknamePopup from './EditNicknamePopup.vue'
	import EditLoginPwd from './EditLoginPwd.vue'
	import EditNumPwd from './EditNumPwd.vue'
	import EditPhonePopup from './EditPhonePopup.vue'
	import SharePopup from '@/components/SharePopup.vue'
	import {
		mapState
	} from 'vuex'
	import {
		copy
	} from '@/utils/index.js'
	export default {
		components: {
			EditNicknamePopup,
			EditPhonePopup,
			EditLoginPwd,
			EditNumPwd,
			SharePopup
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		data() {
			return {

			}
		},
		methods: {
			// 复制
			copyCode() {
				copy(this.userInfo.inviteCode)
			},
			openEditNick() {
				this.$refs.editNicknamePopup.open()
			},
			openEditPhone() {
				this.$refs.editPhonePopup.open()
			},
			openLoginPwd() {
				this.$refs.editLoginPwd.open()
			},
			openNumPwd() {
				this.$refs.editNumPwd.open()
			},
			share() {
				this.$refs.sharePopup.open()
			},
			// 实名认证
			goNameAuth() {
				uni.navigateTo({
					url: '/pages/my/nameAuthentication'
				})
			},
			goAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			layout() {
				this.$store.commit('logout')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background: #FFFFFF;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px 12px 6px 6px;
		padding: 0 16px;

		.invitation-info {
			padding: 13px 0 18px 0;
			display: flex;
			align-items: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);

			.code {
				padding: 0 0 0 4px;
				flex: 1;

				.tag {
					font-size: 12px;
					color: rgba(102, 102, 102, 1);
					line-height: 14px;
					padding-bottom: 2px;
				}

				.text {
					color: rgba(51, 51, 51, 1);
				}
			}

			.btn {
				width: 64px;
				border-radius: 4px 4px 4px 4px;
				border: 1px solid #1C73EA;
				font-size: 12px;
				color: #1C73EA;
				line-height: 23px;
				text-align: center;
			}
		}

		.set-list {
			padding: 9px 0;

			.set-item {
				padding: 15px 0;
				display: flex;
				align-items: center;

				.title {
					padding-left: 12px;
					flex: 1;
					font-size: 17px;
					color: #333333;
					line-height: 18px;
				}
			}
		}
	}
</style>