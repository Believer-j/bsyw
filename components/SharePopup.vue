<template>
	<u-popup :show="show" mode="center" @close="close" @open="open" :closeOnClickOverlay="false" :round="16"
		class="share-popup" closeable>
		<view class="title">
			分享
		</view>
		<view class="popup-content">
			
			<view class="qrcode-box">
				<view class="title" style="text-align: center;padding-bottom:10px;">
					白沙源物
				</view>
				<qrcode-info ref="qrcodeInfo" />
			</view>
			<view class="link">
				链接：{{userInfo.inviteUrl}}
			</view>
			<view class="copy-link" @click="copyUrl">
				<image class="nav-img" src="@/static/img/common/copy.png" mode=""></image>
				<view class="tip">
					复制邀请链接
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	import {mapState} from 'vuex'
	import {copy} from '@/utils/index.js'
	export default {
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			open() {
				// console.log('open');
				this.show = true
				this.$nextTick(()=> {
					this.$refs.qrcodeInfo.init(this.userInfo.inviteUrl)
				})
			},
			copyUrl(){
				copy(this.userInfo.inviteUrl)
			},
			close() {
				this.show = false
				// console.log('close');
			}
		}
	}
</script>