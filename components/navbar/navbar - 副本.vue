<template>
	<u-tabbar :value="tabId" activeColor="#1C73EA" inactiveColor="#92909E" @change="handleChangeTab">
		<!-- <u-tabbar-item v-for="item in navList" :key="item.id" :text="item.title" :name="item.id"
			:icon="item.id===navId?item.activeImg:item.inactiveImg" @click="handleChangeNav(item)"></u-tabbar-item> -->
		<u-tabbar-item text="首页" icon="home" @click="handleChangeNav(navList[0])"></u-tabbar-item>
		<u-tabbar-item text="资产" icon="play-right"  @click="handleChangeNav(navList[1])"></u-tabbar-item>
		<u-tabbar-item text="我的" icon="account"  @click="handleChangeNav(navList[2])"></u-tabbar-item>
	</u-tabbar>
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
				tabId: 0,
				navList: [{
					id: '/pages/index',
					title: '首页',
					inactiveImg: require('@/static/img/navBar/home-1.svg'),
					activeImg: require('@/static/img/navBar/home-2.svg'),
					link: '/pages/index/index'
				}, {
					id: '/pages/assets',
					title: '资产',
					inactiveImg: require('@/static/img/navBar/assets-1.svg'),
					activeImg: require('@/static/img/navBar/assets-2.svg'),
					link: '/pages/assets/assets'
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
			handleChangeTab(val){
				console.log('tabId==', val)
				console.log('tabId==', this.tabId)
				this.tabId = val
				console.log('tabId==', this.tabId)
			},
			handleChangeNav(item) {
				if (item.id === this.navId) {
					return false;
				}
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