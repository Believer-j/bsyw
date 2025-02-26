<template>
	<view class="page-gradient-bg" style="min-height: 100vh;">
		<u-navbar title="我的收货地址" :placeholder="true" :autoBack="true">
			<view class="" style="color: #18533C; font-size: 15px;" slot="right">
				管理
			</view>
		</u-navbar>
		<view class="address-wrap  r-flex-column content">
			<view v-for="(item,index) in 13" :key="index" class="item r-flex-row r-flex-items-center r-flex-between">
				<view class="r-flex-column">
					<view class="r-flex-row r-flex-items-center">
						<text class="name">土豆豆</text>
						<text class="phone">15028932832</text>
						<view class="default">
							默认
						</view>
					</view>
					<text class="address">成都市高新区天府五街美年广场1号成都市高新区天府五街美年广场1号</text>
				</view>
				<u-icon name="edit-pen" color="#E2E2E2" size="28"></u-icon>
			</view>
		</view>
		<view class="address-add-wrap r-flex-all-center">
			<view class="btn r-flex-all-center">
				+ 添加收获地址
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.address-add-wrap {
		width: 100vw;
		height: 54px;
		background: #FFFFFF;
		margin-top: 10px;
		
		.btn {
			width: 344px;
			height: 44px;
			background: #18533C;
			border-radius: 15px;
			
			font-weight: 600;
			font-size: 18px;
			color: #FFFFFF;
		}
	}
	.address-wrap {
		// min-height: calc(100vh - 48px);
		overflow: scroll;
		max-height: calc(100vh - 48px - 64px);
		.item {
			margin-top: 10px;
			// height: 84px;
			background: #FFFFFF;
			border-radius: 15px;
			padding: 16px 12px;
			margin-left: 14px;
			margin-right: 14px;
			.default {
				padding: 2px 4px;
				border-radius: 2px;
				border: 1px solid #18533C;
				
				font-weight: 600;
				font-size: 10px;
				color: #18533C;
				margin-left: 6px;
			}
			.name {
				font-weight: 600;
				font-size: 16px;
				color: #4F5755;
			}
			.phone {
				font-weight: 400;
				font-size: 14px;
				color: #545958;
				margin-left: 6px;
			}
			.address {
				font-weight: 400;
				font-size: 12px;
				color: #9BA09F;
				margin-top: 5px;
			}
		}
	}
</style>