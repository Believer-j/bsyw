<template>
	<view class="signIn-box">
		<!-- <image class="sign-bg" src="@/static/img/home/sign-in.png" mode="" @click="handleSign"></image> -->
		<u-overlay :show="show"  @click="handleSign">
			<view class="sign-content">
				<view class="card">
					<view class="sign-icon">
						<!-- <image class="img-6" src="@/static/img/home/sign.png" mode=""></image> -->
					</view>
					
					<view class="info-1">
						恭喜获得，签到成功
					</view>
					<view class="info-2">
						获得
						<text class="integral">100积分</text>
						奖励！
					</view>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	export default {
		name:"SignIn",
		data() {
			return {
				show: false
			};
		},
		methods: {
			handleSign(){
				console.log(222)
				this.show = !this.show
			}
		}
	}
</script>

<style lang="scss" scoped>
.signIn-box{
	position: fixed;
	top: 400px;
	right: 5px;
	z-index: 100;
	.sign-bg{
		width: 46px;
		height: 50px;
	}
	.sign-content{
			margin: 0 16px;
			background: rgba(150,150,150,0.2);
			border-radius: 7px 7px 7px 7px;
			margin-top: 380px;
			position: relative;
			&:before{
				content: '';
				width: 88%;
				height: 140px;
				background: rgba(255,255,255,0.5);
				border-radius: 8px 8px 8px 8px;
				transform: rotate(4deg);
				position: absolute;
				z-index: 1;
				left: 18px;
				top: 25px;
			}
			.card{
				width: 88%;
				background: #FFFFFF;
				border-radius: 8px 8px 8px 8px;
				margin: 25px 0 0 18px;
				position: relative;
				text-align: center;
				padding-bottom: 28px;
				z-index: 2;
				.sign-icon{
					position: absolute;
					left: 0;
					top: -80px;
					width: 100%;
				}
				.info-1{
					padding-top: 65px;
					color: #000000;
					line-height: 16px;
					padding-bottom: 8px;
				}
				.info-2{
					font-size: 20px;
					color: #000000;
					line-height: 23px;
					.integral{
						font-weight: 500;
					}
				}
			}
	}
}
</style>