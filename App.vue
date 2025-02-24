<script>
	import store from '@/store/index.js'
	export default {
		onLaunch: function() {
			console.log('==store.state.userInfo===', store.state.userInfo);
			if(!store.state.userInfo){
				store.dispatch('getUserInfo')
			}
			console.log('deviceId-----', this.$deviceId)
		},

		onShow: function(options) {
			console.log('App Show', options)

		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import './static/style/base.scss';

	* {
		box-sizing: border-box;
	}

	page {
		background-color: #F7F7F7;
		width: 100vw;
	}

	::v-deep.upwarp-nodata {
		color: #AEAEAE;
	}

	.r-flex {
		display: flex;
	}

	.r-flex-row {
		display: flex;
		flex-direction: row;
	}

	.r-flex-row-reverse {
		display: flex;
		flex-direction: row-reverse;
	}

	.r-flex-column {
		display: flex;
		flex-direction: column;
	}

	.r-flex-column-reverse {
		display: flex;
		flex-direction: column-reverse;
	}

	.r-flex-all-center {
		display: flex;
		align-items: center;
		justify-content: center
	}

	// 换行
	.r-flex-wrap {
		flex-wrap: wrap;
	}

	// 主轴起点对齐
	.r-flex-start {
		justify-content: flex-start
	}

	// 主轴中间对齐
	.r-flex-center {
		justify-content: center
	}

	// 主轴终点对齐
	.r-flex-end {
		justify-content: flex-end
	}

	// 主轴等比间距
	.r-flex-between {
		justify-content: space-between
	}

	// 主轴均分间距
	.r-flex-around {
		justify-content: space-around
	}

	// 交叉轴起点对齐
	.r-flex-items-start {
		align-items: flex-start
	}

	// 交叉轴中间对齐
	.r-flex-items-center {
		align-items: center
	}

	// 交叉轴终点对齐
	.r-flex-items-end {
		align-items: flex-end
	}

	// 交叉轴第一行文字基线对齐
	.r-flex-items-baseline {
		align-items: baseline
	}

	// 交叉轴方向拉伸对齐
	.r-flex-items-stretch {
		align-items: stretch
	}
	@keyframes progross1 {
	    to {
	        transform: rotate(360deg);
	    }
	}
	@keyframes progross2 {
	    to {
	        transform: rotate(0deg);
	    }
	}
</style>