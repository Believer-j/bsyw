<template>
	<view class="video-box">
		<!-- <image class="img-2" src="@/static/img/home/play.png" mode=""></image> -->
		<!-- <video class="video" src="https://amazon-static.oss-cn-hongkong.aliyuncs.com/alloy.mp4" controls
			poster="@/static/img/home/video.png" style="width:100%;height:100%;" objectFit="cover">
			</video> -->
		<!-- <view v-html="getVideo()"></view> -->
		<video class="video" :src="videoSrc" :poster="poster" style="width:100%;height:100%;" controls objectFit="cover"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc: "https://static.hjgy.cc/static/alloy2.mp4",
				poster: "https://static.hjgy.cc/static/video1.jpg"
			}
		},
		methods: {
			getVideo() {
				return`<video class="video" src="https://static.hjgy.cc/static/alloy2.mp4" poster="../../static/img/home/video.png" style="width:100%;height:100%;" controls objectFit="cover"></video>`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-box {
		height: 200px;
		background: rgba(150, 150, 150, 0.2);
		border-radius: 7px 7px 7px 7px;
		margin: 12px 0;
		position: relative;

		.img-2 {
			position: absolute;
			left: calc(50% - 16px);
			top: calc(50% - 16px);
		}
	}
</style>