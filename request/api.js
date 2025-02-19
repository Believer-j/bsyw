import uniRequest from "./request";

// 登录验签
export const checkSign = (data) => {
	return uniRequest('/base/api/pex/checkSign', {
		method: 'post',
		data,
	})
}

// 获取用户信息
export const getUserInfoApi = (data) => {
	return uniRequest('/base/api/pex/user/info', {
		method: 'post',
		data,
	})
}