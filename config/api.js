import uniRequest from './request.js'

// 注册
export const register = (data) => {
	return uniRequest('/base/api/user/register', {
		method: 'post',
		data,
	})
}


// 登录
export const login = (data) => {
	return uniRequest('/base/api/user/login', {
		method: 'post',
		data,
	})
}


// 用户信息
export const getUserInfo = (data) => {
	return uniRequest('/base/api/user/info', {
		method: 'get',
		data,
	})
}

export const alloy = (data) => {
	return uniRequest('/base/api/user/alloy', {
		method: 'get',
		data,
	})
}


// 产品列表
export const getProductList = (data) => {
	return uniRequest('/base/api/home/product/list', {
		method: 'get',
		data,
	})
}

// 专区列表
export const getCityList = (data) => {
	return uniRequest('/base/api/home/city/list', {
		method: 'get',
		data,
	})
}

// 实名认证
export const authApply = (data) => {
	return uniRequest('/base/api/user/authApply', {
		method: 'post',
		data,
	})
}

// 文件上传 文件: MultipartFile file
export const uploadFile = (data) => {
	return uniRequest('/base/api/user//upload', {
		method: 'post',
		data,
	})
}

// 文件上传 Base64: String file
export const uploadBase64 = (data) => {
	return uniRequest('/base/api/user/upload/base64', {
		method: 'post',
		data,
	})
}

// 首页下单
export const orderBuy = (data) => {
	return uniRequest('/base/api/home/order', {
		method: 'post',
		data,
	})
}

// 邀请列表 data = 1,2,3 restfull 请求
export const inviteRecords = (data) => {
	return uniRequest('/base/api/user/invite/records/'+ data, {
		method: 'get',
		data,
	})
}

// 团队详情
export const teamInfo = (data) => {
	return uniRequest('/base/api/user/team/info', {
		method: 'get',
		data,
	})
}

// 资产记录 1 认购记录 2充值记录 3 提现记录 4 流水记录
export const assetRecords = (data) => {
	return uniRequest('/base/api/asset/records', {
		method: 'post',
		data,
	})
}

// 划转
export const transfer = (data) => {
	return uniRequest('/base/api/asset/transfer', {
		method: 'post',
		data,
	})
}

// 提现
export const withdraw = (data) => {
	return uniRequest('/base/api/asset/withdraw', {
		method: 'post',
		data,
	})
}

// 编辑用户信息
export const editUser = (data) => {
	return uniRequest('/base/api/user/edit', {
		method: 'post',
		data,
	})
}

// 链上充值: BSC || TRON
export const chainRecharge = (data) => {
	return uniRequest('/base/api/asset/chain/recharge', {
		method: 'post',
		data,
	})
}

// 下载链接
export const download = (data) => {
	return uniRequest('/base/api/user/download', {
		method: 'post',
		data,
	})
}

// 地址列表
export const addressListApi = (data) => {
	return uniRequest('/base/api/user/user/addr', {
		method: 'post',
		data,
	})
}

// 新增地址
export const addAddressApi = (data) => {
	return uniRequest('/base/api/user/add/addr', {
		method: 'post',
		data,
	})
}

// 修改地址
export const updateAddressApi = (data) => {
	return uniRequest('/base/api/user/update/addr', {
		method: 'post',
		data,
	})
}
// 删除地址
export const deleteAddressApi = (data) => {
	return uniRequest('/base/api/user/delete/addr/' + data, {
		method: 'post',
		data: {},
	})
}
// 通知列表
export const noticeListApi = (data) => {
	return uniRequest('/base/api/home/notices', {
		method: 'post',
		data,
	})
}
// 通知详情
export const noticeDetailApi = (data) => {
	return uniRequest('/base/api/home/notice/' + data, {
		method: 'post',
		data: {},
	})
}
// 商品详情
export const goodsDetailApi = (data) => {
	return uniRequest('/base/api/home/product/' + data, {
		method: 'post',
		data: {},
	})
}

// t团队列表
export const teamListApi = (data) => {
	return uniRequest('/base/api/user/teams', {
		method: 'post',
		data,
	})
}

// 下单
export const buyApi = (data) => {
	return uniRequest('/base/api/home/order', {
		method: 'post',
		data,
	})
}

