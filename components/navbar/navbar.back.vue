<template>
	<view class="nav-box">
		<view v-for="item in navList" :key="item.id" :class="['nav-item',item.id==navId?'nav-active':'']"
			@click="handleChangeNav(item)">
			<view class="nav-item-icon">
				<image class="nav-img" :src="item.id===navId?item.activeImg:item.inactiveImg"></image>
			</view>
			<view class="nav-item-title">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: "navbar",
		components: {},
		data() {
			return {
				navList: [{
					id: '/pages/index',
					title: '首页',
					inactiveImg: require('@/static/img/navBar/home-1.svg'),
					activeImg: require('@/static/img/navBar/home-2.svg'),
					link: '/pages/index/index',

				}, {
					id: '/pages/assets',
					title: '资产',
					inactiveImg: require('@/static/img/navBar/assets-1.svg'),
					activeImg: require('@/static/img/navBar/assets-2.svg'),
					link: '/pages/assets/assets',

				}, {
					id: '/pages/my',
					title: '我的',
					inactiveImg: require('@/static/img/navBar/my-1.svg'),
					activeImg: require('@/static/img/navBar/my-2.svg'),
					link: '/pages/my/my'

				}],
			};
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			}),
			navId() {
				let {
					path
				} = this.$route
				path = path === '/' ? '/pages/index/index' : path
				const target = this.navList.find(val => path.includes(val.id))
				return target ? target.id : ''
			}
		},
		created() {
			// this.handleChangeNav(this.navList[0])
		},
		methods: {
			handleChangeNav(item) {
				if (item.id === this.navId) {
					return false;
				}
				// this.navId = item.link
				uni.navigateTo({
					url: item.link // 跳转到对应路径的页面
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: 0px -1px 12px 0px rgba(97, 97, 97, 0.25);
		width: 100%;
		display: flex;

		.nav-item {
			width: 33.3%;
			text-align: center;
			padding: 10px 0 4px 0;

			.nav-item-icon {

				.nav-img {
					width: 24px;
					height: 24px;
				}
			}

			.nav-item-title {
				font-size: 10px;
				color: #92909E;
				line-height: 12px;
			}
		}

		.nav-active {
			.nav-item-title {
				color: #1C73EA;
			}
		}
	}
</style>