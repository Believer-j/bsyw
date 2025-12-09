import {
	mapState
} from 'vuex'
import {
	ABI,
	USDT_CONTRACT_ADDR,
	USDB_CONTRACT_ADDR,
	PHOENIX_CONTRACT_ADDR,
	WIN_CONTRACT_ADDR,
	WIN1_CONTRACT_ADDR,
	SPHOENIX_CONTRACT_ADDR,
	FRONT_CONTRACT_ADDR,
	DAO_CONTRACT_ADDR,
	IDO_CONTRACT_ADDR,
	GAME_CONTRACT_ADDR,
} from '@/utils/constant.js'
export default {
	computed: {
		...mapState({
			curTheme: 'curTheme',
			userInfo: 'userInfo',
			hasChatShow: 'hasChatShow'
		}),
		scrollStyle() {
			const paddingTop = this.$u.addUnit(this.$u.getPx(50) + this.$navbarHeight + 36, 'px')
			return {
				paddingTop
			}
		},
		inviterUrl() {
			const {
				invitation
			} = this.userInfo
			return `https://phoenixnet.club/#/?invitationCode=${invitation}`
		},
		statusBarHeight() {
			const sys = uni.$u.sys()
			return sys.statusBarHeight
		},
		navbarHeight() {
			return this.statusBarHeight + 44
		},
		screenWidth() {
			const sys = uni.$u.sys()
			return sys.windowWidth
		},
		pageHeight() {
			const sys = uni.$u.sys()
			return sys.windowHeight - this.navbarHeight
		},
	},
	watch: {
		'$store.state.curTheme': {
			handler(newVal,oldVal){
				this.themeChange && this.themeChange()
			}
		},
		'$store.state.locale': {
			handler(newVal,oldVal){
				this.localeChange && this.localeChange()
			}
		}
	},
	data() {
		return {
			usdtContractAddr: USDT_CONTRACT_ADDR, // usdt 代币地址
			usdbContractAddr: USDB_CONTRACT_ADDR, // usdb 代币地址
			pexContractAddr: PHOENIX_CONTRACT_ADDR, // pex 代币地址
			winContractAddr: WIN_CONTRACT_ADDR, // win 代币地址
			win1ContractAddr: WIN1_CONTRACT_ADDR, // win 代币地址
			spexContractAddr: SPHOENIX_CONTRACT_ADDR, // spex 代币地址
			daoContractAddr: DAO_CONTRACT_ADDR, // dao 代币地址
			frontContractAddr: FRONT_CONTRACT_ADDR, // front 代币地址
			idoContractAddr: IDO_CONTRACT_ADDR, // ido 代币地址
			gameContractAddr: GAME_CONTRACT_ADDR, // game 代币地址
			abi: ABI,
			scrollTop: 0,
			mescroll: null,
			up: {
				empty: {
					use: false
				}
			},
			page: 1,
			limit: 10,
			totalCount: 0
		}
	},
	onLaunch() {
		// this.$store.commit('setTheme')
	},
	methods: {
		mescrollInit(mescroll) {
			this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
		},
		upCallback() {
			this.mescroll.endBySize(0, 0);
		},
		resetPage(){
			this.page = 1
			this.limit = 10
		}
	}
}