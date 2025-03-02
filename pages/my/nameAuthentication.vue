<template>
	<view class="page-wrap page-gradient-bg">
		<header-box :title="headerTitle" backUrl="/pages/my/my" />
		<view class="page-content page-main page-header-main">
			<view class="page-title">
				<view class="title">
					证件信息
				</view>
				<view class="tip">
					请确保信息无误，并本人操作
				</view>
				<view class="tip" style="margin-top: 6px;">
					实名信息异常, 可能导致股份转出失败, 请仔细核实
				</view>
				
			</view>
			<!-- <view class="sfz-info">
				<view class="sfz-item">
					<upload-img ref="uploadImg1" class="upload-file" :uploadUrl="uploadUrl" type="1"
						@handleUpload="handleUpload1" />
				</view>
				<view class="sfz-item">
					<upload-img ref="uploadImg2" class="upload-file" :uploadUrl="uploadUrl" type="2"
						@handleUpload="handleUpload2" />
				</view>
			</view> -->
			<view class="input-item">
				<view class="tag">
					真实姓名
				</view>
				<view class="form-item-content">
					<view class="text" v-if="hasAuth">
						{{authParams.realName}}
					</view>
					<u--input v-else class="account-input" placeholder="请输入真实姓名" border="none" v-model="authParams.realName"
						fontSize="18px" color="#333">
					</u--input>
				</view>
			</view>
			<view class="input-item">
				<view class="tag">
					身份证号
				</view>
				<view class="form-item-content">
					<view class="text" v-if="hasAuth">
						{{authParams.idNo}}
					</view>
					<u--input v-else class="account-input" placeholder="请输入16位身份证号码" border="none" v-model="authParams.idNo"
						fontSize="18px" color="#333">
					</u--input>
				</view>
			</view>
      <view class="input-item">
        <view class="tag">
          手机号码
        </view>
        <view class="form-item-content">
          <view class="text" v-if="hasAuth">
            {{authParams.idUrl}}
          </view>
          <u--input v-else class="account-input" placeholder="请输入实名手机号码" border="none" v-model="authParams.idUrl"
                    fontSize="18px" color="#333">
          </u--input>
        </view>
      </view>
			<view class="btns">
				<!-- // 认证状态 0 未实名, 1 已申请，2 未通过 3 已实名 -->
<!--				<u-button type="primary" v-if="userInfo.authStatus==0" :disabled="hasSave" text="立即认证" size="large"-->
<!--					@click="getAuth"></u-button>-->
<!--				<u-button  type="primary" v-if="userInfo.authStatus==2" :disabled="hasSave" text="重新认证" size="large"-->
<!--					@click="getAuth"></u-button>-->
			</view>

      <view v-if="userInfo.authStatus == 0" :disabled="hasSave" class="flex-row-center font-18 font-weight-semibold"
            style="color: white; background-color: #389838; height: 44px; border-radius: 15px; width: 90vw;"
            @click="getAuth">
        立即认证
      </view>

      <view v-if="userInfo.authStatus == 2" :disabled="hasSave" class="flex-row-center font-18 font-weight-semibold"
            style="color: white; background-color: #389838; height: 44px; border-radius: 15px; width: 90vw;"
            @click="getAuth">
        重新认证
      </view>

		</view>
	</view>
</template>

<script>
	import base from '@/mixins/base.js'
	import {
		authApply
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
				// authStatus: 3,  // 认证状态 0 未实名, 1 已申请，2 未通过 3 已实名
				const {
					authStatus
				} = this.userInfo
				if (authStatus == 0 || authStatus == 2) {
					return false
				}
				return true
			},
			headerTitle() {
				let str = '实名认证'
				const {
					authStatus
				} = this.userInfo
				switch (authStatus) {
					case 0:
						str += ` (未实名)`
						break;
					case 1:
						str += ` (已申请)`
						break;
					case 2:
						str += ` (未通过)`
						break;
					case 3:
						str += ` (已实名)`
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
				uploadUrl: '/base/api/user//upload',
				fileList1: [],
				authParams: {
					realName: undefined,
					idNo: undefined,
					idUrl: undefined,
					// idBackUrl: undefined
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
					idNo,
					idUrl,
					idBackUrl,
					authStatus
				} = this.userInfo

				this.authParams.realName = realName
				this.authParams.idNo = idNo
				this.authParams.idUrl = idUrl
				// if (idUrl) {
				// 	this.authParams.idUrl = idUrl
				// 	this.$refs.uploadImg1.initFile([{
				// 		// name: "c8d2165004954d61dd1bdfc3f519c1b.jpg"
				// 		// size: 212165
				// 		status: "success",
				// 		thumb: idUrl,
				// 		type: "image",
				// 		url: idUrl
				// 	}])
				// }
				// if (idBackUrl) {
				// 	this.authParams.idBackUrl = idBackUrl
				// 	this.$refs.uploadImg2.initFile([{
				// 		// name: "c8d2165004954d61dd1bdfc3f519c1b.jpg"
				// 		// size: 212165
				// 		status: "success",
				// 		thumb: idBackUrl,
				// 		type: "image",
				// 		url: idBackUrl
				// 	}])
				// }
			},
			handleUpload1(list) {
				console.log('handleUpload=z正面==', list)
				if (list.length) {
					this.authParams.idUrl = list[0].url
				}
			},
			handleUpload2(list) {
				console.log('handleUpload==背面==', list)
				if (list.length) {
					this.authParams.idBackUrl = list[0].url
				}
			},
			async getAuth() {
				const {
					idNo
				} = this.authParams
				console.log(this.authParams)
				const mark = validateIdNumber(idNo)
				if (!mark) {
          uni.$u.toast('请输入正确的身份证号!')
					return false
				}
				try {
					const res = await authApply({
						...this.authParams
					})
          uni.$u.toast('实名申请成功!')
					this.$store.dispatch('getUserInfo')
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/my/my'
						})
					}, 500)

				} catch (e) {
					//TODO handle the exception
          uni.$u.toast('实名申请失败!')
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