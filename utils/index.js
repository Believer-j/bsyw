// 获取缩写地址
export const getShortAddress = (value) => {
	var start = value.substring(0, 6);
	var end = value.substring(value.length - 6, value.length);
	return "0x..." + end
}

export const getShortAddress2 = (value) => {
	var start = value.substring(0, 6);
	var end = value.substring(value.length - 6, value.length);
	return start + '......' + end
}

export const isEmpty = (value) => {
	switch (typeof value) {
		case 'undefined':
			return true
		case 'string':
			if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
			break
		case 'boolean':
			if (!value) return true
			break
		case 'number':
			if (value === 0 || isNaN(value)) return true
			break
		case 'object':
			if (value === null || value.length === 0) return true
			for (const i in value) {
				return false
			}
			return true
	}
	return false
}

export const thousands = (value, decimals = 2) => {
	switch (typeof value) {
		case 'undefined':
			value = Number(0).toFixed(decimals)
			break
		case 'string':
			value = Number(value).toFixed(decimals)
			break
		case 'number':
			console.log('thousands===', value)
			value = value.toFixed(decimals)
			break
	}
	return value
	// const res = value.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
	// return res * 1
}

export const errorToast = (value) => {
	console.log('value====');
	uni.showToast({
		title: value,
		duration: 2500,
		icon: 'none'
		// icon: 'error',
		// iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
		// image: require('@/static/error_icon.png')
	})
}

export const successToast = (value) => {
	uni.showToast({
		title: value,
		duration: 2500,
		icon: 'none'
		// image: require('@/static/success_icon.png')
	})
}

export const copy = (value, msg) => {
	uni.setClipboardData({
		data: value.toString(),
		success() {
			uni.$u.toast(msg || '复制成功')
		},
		complete(res) {
			// console.log(res)
		}
	});
}

export const isPcMode = () => {
	const agent = navigator.userAgent.toLowerCase()
	if (/mac|windows|linux/i.test(agent)) return 1
	return 0
}
/**
 * 获取时间随机数
 * @param {number} len
 * @returns
 */
export const randomTimeStr = (prefix = new Date().getTime(), len = 13) => {
	const chars = '012345678';
	const maxPos = chars.length;
	let pwd = prefix.toString().substring(7);
	len = len - pwd.length;
	for (let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

export const priceFormat = (val, decimals = 3) => {
	return uni.$u.priceFormat(val, decimals)
}

export const showLoading = (title) => {
	uni.showLoading({
		title: '',
		mask: true
	})
}
export const sliceList = (list, start, length) => {
	if (list.length == 0) {
		return list
	}
	let tempList = []
	for (var i = start; i < start + length; i++) {
		if (list[i]) {
			tempList.push(list[i])
		} else {
			break
		}

	}
	console.log(tempList)
	return tempList
}

export const isValidPhoneNumber = (phoneNumber) => {
	return /^1[3-9]\d{9}$/.test(phoneNumber);

	// console.log(isValidPhoneNumber('13800138000')); // true 或 false
}
export const validateIdNumber = (idNumber)=> {
  var regExp = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  return regExp.test(idNumber);
}
export default {
	getShortAddress,
	getShortAddress2,
	isEmpty,
	thousands,
	errorToast,
	successToast,
	copy,
	isPcMode,
	randomTimeStr,
	priceFormat,
	showLoading,
	sliceList
}