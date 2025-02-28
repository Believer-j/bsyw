<template>
	<view class="no-data flex-column flex-items-center flex-center">
		<image v-if="version == 1" src="@/static/img/common/placeholder.jpg" style="height: 32px;" mode="heightFix"></image>
		<image v-else src="@/static/img/common/place.png" style="width: 70vw;" mode="widthFix"></image>
		<view class="text">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		name:"noData",
		props: {
			version: {
				type: Number,
				default: 1
			}
		},
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