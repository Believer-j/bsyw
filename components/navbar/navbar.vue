<template>
	<u-tabbar :value="tabId" activeColor="#18533C" inactiveColor="#92909E" @change="handleChangeTab">
		<u-tabbar-item text="首页">
			<!-- <image class="u-page__item__slot-icon" slot="active-icon"
				src="@/static/img/navBar/home-2.svg"></image>
			<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/img/navBar/home-1.svg">
			</image> -->
			<image class="u-page__item__slot-icon" slot="active-icon" src="@/static/img/tabbar/home-s.png"></image>
			<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/img/tabbar/home.png">
			</image>
		</u-tabbar-item>
		<u-tabbar-item text="专区">
			<image class="u-page__item__slot-icon" slot="active-icon" src="@/static/img/tabbar/tab1-s.png"></image>
			<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/img/tabbar/tab1.png">
			</image>
		</u-tabbar-item>
		<u-tabbar-item text="资产">
			<image class="u-page__item__slot-icon" slot="active-icon" src="@/static/img/tabbar/tab2-s.png"></image>
			<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/img/tabbar/tab2.png">
			</image>
		</u-tabbar-item>
		<u-tabbar-item text="我的">
			<image class="u-page__item__slot-icon" slot="active-icon" src="@/static/img/tabbar/tab3-s.png"></image>
			<image class="u-page__item__slot-icon" slot="inactive-icon" src="@/static/img/tabbar/tab3.png">
			</image>
		</u-tabbar-item>
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
				navList: [{
					id: '/pages/index',
					title: '首页',
					inactiveImg: require('@/static/img/navBar/home-1.svg'),
					activeImg: require('@/static/img/navBar/home-2.svg'),
					link: '/pages/index/index'
				}, {
					id: '/pages/alloy',
					title: '合金',
					inactiveImg: require('@/static/img/navBar/home-1.svg'),
					activeImg: require('@/static/img/navBar/home-2.svg'),
					link: '/pages/alloy/index'
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
				userInfo: 'userInfo',
				tabId: 'tabId'
			})
		},
		mounted() {
			const path = window.location.href
			let index = this.navList.findIndex(val => path.includes(val.id))
			index = index === -1 ? 0 : index

			this.$store.commit('changeTab', index)
		},
		methods: {
			handleChangeTab(val) {
				// this.tabId = val
				this.$store.commit('changeTab', val)
				uni.navigateTo({
					url: this.navList[val].link // 跳转到对应路径的页面
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-page__item__slot-icon {
		width: 24px;
		height: 24px;
	}

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