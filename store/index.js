import Vue from 'vue'
import Vuex from 'vuex'
// import FingerprintJS from 'fingerprintjs';
import { // 始终保持和本地的一致
	clear, // 清理所有
	setAddr, // 设置地址
	getAddr, // 获取地址
	setUser, // 设置用户信息
	getUser, // 获取用户信息
	getToken, // 获取token
	setToken, // 设置token
	setInviteCode, // 设置邀请码
	getInviteCode, // 获取邀请码
} from '@/utils/cookie.js'
import {
	getShortAddress,
	errorToast,
	isPcMode,
} from '@/utils/index.js'
import {
	checkSign,
	getUserInfo
} from "@/config/api.js"
import app from '@/main.js'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		deviceId: uni.getDeviceInfo().deviceId, // 唯一设备id -- 清除缓存失效
		userInfo: getUser() || {}, // 用户信息
		isLogin: getAddr() || getToken(), // 是否登录
		loginLoading: false, // 登录加载
		token: getToken() || '', // 登录token
		locale: 'en',
		tabId: 0
	},
	mutations: {
		changeTab(state, val = 0) {
			console.log('val===', val);
			state.tabId = val
			uni.setStorageSync('tabId', val)
		},
		// 退出登录
		logout(state) {
			clear()
			state.isLogin = false
			state.userInfo = {}
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		// 设置用户信息
		setUserInfo(state, user) {
			state.userInfo = user
			setUser(user)
			state.isLogin = true
			state.loginLoading = false
		},
		// 设置token
		setToken(state, token) {
			state.token = token
			setToken(token)
		}
	},
	actions: {
		// 获取用户信息
		async getUserInfo({
			state,
			commit
		}) {
			try {
				const res = await getUserInfo({
					token: state.token,
				})
				commit('setUserInfo', res)
				
				
				
			} catch (e) {

			}
		},
		// 登录
		async login({
			state,
			commit,
			dispatch,
		}) {
			try {
				state.loginLoading = true
				let params = {
					udid: state.deviceId,
					content: signMessage,
				}
				uni.showLoading()
				try {
					// 刷新用户信息
					dispatch('getUserInfo')
				} catch (e) {
					//TODO handle the exception
					state.loginLoading = false
				}
				uni.hideLoading()
			} catch (e) {
				//TODO handle the exception
				state.loginLoading = false
				errorToast('Please switch to blast network!')
			}
		}
	},
	getters: {
		shortAddress: state => getShortAddress(state.address), // 省略地址
	}
})
export default store