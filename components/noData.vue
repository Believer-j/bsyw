<template>
	<view class="no-data">
		<image src="@/static/img/common/placeholder.jpg" style="height: 32px;" mode="heightFix"></image>
		<view class="text">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		name:"noData",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.no-data{
		text-align: center;
		padding: 40px 0;
		.text{
			color: #C1C1C8;
			line-height: 22px;
		}
	}

</style>