<template>
	<view class="page-wrap page-gradient-bg">
		<!-- <header-box :title="headerTitle" backUrl="/pages/my/my" /> -->
		<u-navbar :fixed="true" title="" :placeholder="true" bgColor="rgba(255, 255, 255, 0)" :autoBack="true">
			<view slot='center' class="font-18 font-weight-medium" style="color: #000;">
				{{ headerTitle }}
			</view>
		</u-navbar>
		<view class="page-content page-main ">
			<view class="page-title">
				<view class="title">
					绑定银行卡
				</view>
				<view class="tip">
					请确保信息无误，并本人操作
				</view>
				<view class="tip" style="margin-top: 6px;">
					银行卡信息异常, 可能导致积分转出失败, 请仔细核实
				</view>

			</view>
			<view class="input-item">
				<view class="tag">
					开户行
				</view>
				<view class="form-item-content">
					<u--input v-if="hasAuth" class="account-input" :placeholder="authParams.bankName" border="none"
						v-model="authParams.bankName" fontSize="18px" color="#333">
					</u--input>
					<u--input v-else class="account-input" placeholder="请输入开户行" border="none"
						v-model="authParams.bankName" fontSize="18px" color="#333">
					</u--input>
				</view>
			</view>
			<view class="input-item">
				<view class="tag">
					银行卡号
				</view>
				<view class="form-item-content">
					<u--input v-if="hasAuth" class="account-input" :placeholder="authParams.bankNo" border="none"
						v-model="authParams.bankNo" fontSize="18px" color="#333">
					</u--input>
					<u--input v-else class="account-input" placeholder="请输入银行卡号" border="none"
						v-model="authParams.bankNo" fontSize="18px" color="#333">
					</u--input>
				</view>
			</view>

			<view v-if="userInfo.bankStatus == 0" :disabled="hasSave"
				class="flex-row-center font-18 font-weight-semibold"
				style="color: white; background-color: #389838; height: 44px; border-radius: 15px; width: 90vw;"
				@click="getAuth">
				立即绑定
			</view>

			<view v-if="userInfo.bankStatus == 1" :disabled="hasSave"
				class="flex-row-center font-18 font-weight-semibold"
				style="color: white; background-color: #389838; height: 44px; border-radius: 15px; width: 90vw;"
				@click="getAuth">
				重新绑定
			</view>

		</view>
	</view>
</template>

<script>
	import base from '@/mixins/base.js'
	import {
		bankApply
	} from '@/config/api.js'
	import {
		validateIdNumber
	} from '@/utils/index.js'

	export default {
		mixins: [base],
		computed: {
			hasSave() {
				const {
					realName,
					idNo
				} = this.authParams
				if (idNo && realName) {
					return false
				}
				return true
			},
			hasAuth() {
				// bankStatus: 3,  // 认证状态 0 未实名, 1 已申请，2 未通过 3 已实名
				const {
					bankStatus
				} = this.userInfo

				if (bankStatus == 0) {
					return false
				}
				return true
			},
			headerTitle() {
				let str = '绑定银行卡'
				const {
					realName
				} = this.userInfo

				const {
					bankStatus
				} = this.userInfo
				switch (bankStatus) {
					case 0:
						str += ` (` + realName + `)`
						break;
					case 1:
						str += ` (` + realName + `)`
						break;
					case 2:
						str += ` (` + realName + `)`
						break;
					case 3:
						str += ` (` + realName + `)`
						break;
					default:
						break;
				}
				return str
			}
		},
		data() {
			return {
				option: {},
				uploadUrl: '/base/api/user/upload',
				fileList1: [],
				authParams: {
					realName: undefined,
					bankNo: undefined,
					bankName: undefined,
				}

			}
		},
		mounted() {
			this.init()
		},
		methods: {
			// 初始化数据
			init() {
				const {
					realName,
					bankNo,
					bankName,
					idBackUrl,
					authStatus
				} = this.userInfo

				this.authParams.realName = realName
				this.authParams.bankNo = bankNo
				this.authParams.bankName = bankName

			},
			async getAuth() {
				try {
					const res = await bankApply({
						...this.authParams
					})
					uni.$u.toast('银行卡绑定成功!')
					this.$store.dispatch('getUserInfo')
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/my/my'
						})
					}, 500)

				} catch (e) {
					uni.$u.toast('绑定失败, 请先实名认证!')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-wrap {
		// background: #fff;
		min-height: 100vh;

		.page-main {
			position: relative;
			z-index: 1;

			&:before {
				// content: '';
				// height: 236px;
				// background: linear-gradient( 180deg, #FFFFFF 43%, #ECEEFA 100%);
				// position: absolute;
				// left: 0;
				// top: 0;
				// width: 100%;
			}

			.page-title {
				margin-top: 15px;

				.title {
					font-weight: 500;
					font-size: 17px;
					color: #333333;
					line-height: 24px;
					padding-bottom: 4px;
				}

				.tip {
					color: #999999;
					line-height: 18px;
				}
			}

			.sfz-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 6px;

				.sfz-item {
					width: 49%;
					height: 140px;

					image {
						width: 180px;
						height: 136px;
					}
				}
			}

			.input-item {
				padding: 6px 0;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #dadbde;

				.tag {
					width: 95px;
					padding: 0 0 0 8px;
					font-size: 15px;
					color: #333333;
					line-height: 18px;
				}

				.form-item-content {
					width: calc(100% - 95px);
					height: 48px;

					.text {
						font-weight: 500;
						font-size: 18px;
						color: #333333;
						line-height: 48px;
					}

					.uni-input-input {
						font-weight: 500;
					}
				}
			}

			.title {
				font-size: 12px;
				color: #333333;
				line-height: 14px;
				padding-bottom: 18px;
			}

			.unit {
				font-weight: 500;
				font-size: 15px;
				color: #333;
				width: 80px;
			}

			.btns {
				padding-top: 30px;
			}
		}
	}
</style>