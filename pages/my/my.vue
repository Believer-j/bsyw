<template>
	<view class="page-wrap user-bg" style="min-height: calc(100vh - 48px);">
		<view class="page-content">
			<view class="user-info">
				<view class="icons">
					<image class="img-7" src="@/static/img/logo/bsyw-logo.png" mode=""></image>
				</view>
				<view class="infos">
					<view class="info-name">
						<view class="name">
							邮箱: {{userInfo.mobile}}
						</view>
					</view>
					<view class="info-name">
						<view class="title-name title-name-1" v-if="userInfo.teamLevel >= 0">
							<image class="img-8" src="@/static/img/my/title-1.png" mode=""></image>
							<view class="text">
								{{ userInfo.teamName || "暂无等级"}}
							</view>
						</view>
						<view class="title-name title-name-2" v-if="userInfo.personalLevel >= 0">
							<image class="img-8" src="@/static/img/my/title-2.png" mode=""></image>
							<view class="text">
								{{ userInfo.personalName || "暂无称号"}}
							</view>
						</view>
						<view class="title-name title-name-3" v-if="userInfo.quarterLevel >= 0">
							<image class="img-8" src="@/static/img/my/title-3.png" mode=""></image>
							<view class="text">
								{{ userInfo.personalName || "暂无原料"}}
							</view>
						</view>
					</view>
					<view class="invitation">
						昵称: {{userInfo.nick}}
					</view>
				</view>
			</view>
			<set-box />
			<view class="flex-row flex-items-center flex-center" style="height: 54px; margin-top: 25px;">
				
				<view class="flex-row-center font-18 font-weight-semibold"
					style="color: white; background-color: #389838; height: 44px; border-radius: 15px; width: 90vw;"
					 @click="logout">
					退出登录
				</view>
			</view>
			<!-- <my-team /> -->
			<!-- <invitation-record /> -->
		</view>
		
		<navbar></navbar>
	</view>
</template>

<script>
	import base from '@/mixins/base.js'
	import SetBox from './components/SetBox.vue'
	import MyTeam from './components/MyTeam.vue'
	import InvitationRecord from './components/InvitationRecord.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [base],
		components: {
			SetBox,
			MyTeam,
			InvitationRecord
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		data() {
			return {
				option: {},
			}
		},
		onShow() {
			this.$store.dispatch('getUserInfo')
		},
		methods: {
			logout() {
				this.$store.commit('logout')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-bg {
		background-image: url('/static/img/user-bg.jpg');
		background-size: 100% 100%;
	}
	.page-content {
		padding-bottom: 60px;
		// background-color: #3294fd;

		.user-info {
			padding: 80px 0 28px 16px;
			display: flex;
			align-items: center;

			.icons {}

			.infos {
				padding-left: 10px;

				.info-name {
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.name {
						font-weight: 500;
						font-size: 18px;
						color: #4F5755;
						line-height: 21px;

					}

					.title-name {
						display: flex;
						align-items: center;
						position: relative;
						margin: 0 4px;

						&:before {
							content: '';
							border-radius: 18px;
							position: absolute;
							left: 4px;
							width: 100%;
							bottom: 2px;
							height: 22px;
						}

						.text {
							font-size: 9px;
							color: #FFFFFF;
							line-height: 22px;
							text-shadow: 0px 1px 1px #AF591F;
							position: relative;
							z-index: 1;
							padding-right: 3px;
						}
					}

					.title-name-1 {
						&:before {
							background: linear-gradient(270deg, #155EB6 0%, #62C8FC 61%, #D4F3FB 100%);
							border: 1px solid #DCFFFF;
						}
					}

					.title-name-2 {
						&:before {
							background: linear-gradient(270deg, #F44147 0%, #FD8F92 43%, #FCA2A4 100%);
							border: 1px solid #F6CEC9;
						}
					}

					.title-name-3 {
						&:before {
							background: linear-gradient(270deg, #966A0F 0%, #EDA53C 33%, #E3E892 100%);
							border: 1px solid #FFFEDB;
						}
					}
				}

				.invitation {
					font-size: 12px;
					color: #4F5755;
					line-height: 14px;
					padding-top: 5px;
				}
			}
		}
	}
</style>