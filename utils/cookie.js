export const set = (key, value) => {
	uni.setStorageSync(key, value)
}
export const get = (key) => {
	return uni.getStorageSync(key) || ''
}
export const remove = (key) => {
	uni.removeStorageSync(key)
}
export const clear = () => {
	const res = uni.getStorageInfoSync();
	res.keys.map((item) => {
		if (item == 'redirect' || item == 'spread') {
			return
		}
		remove(item)
	})
}
export const setAddr = (value) => {
	uni.setStorageSync('address', value)
}
export const getAddr = (value) => {
	return uni.getStorageSync('address')
}
export const setUser = (value) => {
	uni.setStorageSync('userInfo', value)
}
export const getUser = (value) => {
	return uni.getStorageSync('userInfo')
}
export const setToken = (value) => {
	uni.setStorageSync('token', value)
}
export const getToken = (value) => {
	return uni.getStorageSync('token')
}
export const setInviteCode = (value) => {
	uni.setStorageSync('inviteCode', value)
}
export const getInviteCode = (value) => {
	return uni.getStorageSync('inviteCode')
}

export default {
	set,
	get,
	remove,
	clear,
	setAddr,
	getAddr,
	setUser,
	getUser,
	setToken,
	getToken,
	setInviteCode,
	getInviteCode
}