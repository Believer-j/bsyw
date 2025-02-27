<template>
	<view class="qrcode" :style="boxStyle">
		<canvas id="qrcode" canvas-id="qrcode" :style="imageStyle"></canvas>
		<!-- <view v-for="(row, rowI) in modules" :key="rowI" style="display: flex;flex-direction: row;">
			<view v-for="(col, colI) in row" :key="colI">
				<view v-if="col.isBlack" style="width: 4px;height: 4px;background-color: #1C73EA;">
				</view>
				<view v-else style="width: 4px;height: 4px;background-color: white;">
				</view>
			</view>
		</view> -->
	</view>
</template>
<script>
	import UQRCode from 'uqrcodejs';
	export default {
		props: {
			width: {
				type: Number,
				default: 200
			}
		},
		computed: {
			boxStyle() {
				return {
					width: `${this.width}px`,
					height: `${this.width}px`
				}
			},
			imageStyle() {
				return {
					width: `${this.width}px`,
					height: `${this.width}px`
				}
			}
		},
		data() {
			return {
				// 二维码图片的base64编码
				qrCodeBase64: '',
				modules: []
			}
		},
		methods: {
			init(str) {
				// this.createQRCode(str)
				this.createCode(str)
			},
			async createCode(str) {
				// 获取uQRCode实例
				var qr = new UQRCode();
				// 设置二维码内容
				qr.data = str;
				// 设置二维码大小，必须与canvas设置的宽高一致
				qr.size = this.width;
				// 设置二维码前景图，可以是路径
				qr.foregroundImageSrc = require('@/static/img/common/144x144.png');
				// 调用制作二维码方法
				qr.make();
				// 获取canvas上下文
				var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
				// 设置uQRCode实例的canvas上下文
				qr.canvasContext = canvasContext;
				// 调用绘制方法将二维码图案绘制到canvas上
				qr.drawCanvas();
				// this.modules = qr.modules;

			}
		}
	}
</script>
<style lang="scss" scoped>
	.qrcode {
		margin: 0 auto;
	}
</style>