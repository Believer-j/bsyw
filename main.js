import App from './App';
import Vue from 'vue';

// import uView from "@/uni_modules/uview-ui"
import uView from 'uview-ui'
Vue.use(uView);
// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		// unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		},
		button: {
			// color: 'rgba(179, 32, 215, 1)'
			color: '#1C72EA'
		},
		textarea: {
			// color: 'rgba(179, 32, 215, 1)'
			background: '#21243C'
		}
	}
})

import HeaderBox from '@/components/HeaderBox.vue' 
import navbar from '@/components/navbar/navbar.vue' 
import SignIn from '@/components/SignIn.vue' 
import NoData from '@/components/noData.vue';
import QrcodeInfo from '@/components/QrcodeInfo.vue';
import PaymentPopup from '@/components/PaymentPopup.vue';
import UploadImg from '@/components/UploadImg.vue';
import RechargePopup from '@/components/RechargePopup.vue'
import WithdrawPopup from '@/components/WithdrawPopup.vue'

Vue.component('HeaderBox', HeaderBox)
Vue.component('navbar', navbar)
Vue.component('SignIn', SignIn)
Vue.component('NoData', NoData)
Vue.component('QrcodeInfo', QrcodeInfo)
Vue.component('PaymentPopup', PaymentPopup)
Vue.component('UploadImg', UploadImg)
Vue.component('RechargePopup', RechargePopup)
Vue.component('WithdrawPopup', WithdrawPopup)


import utils from "@/utils/index.js";
Vue.prototype.$utils = utils;
import  '@/utils/filter.js'

// 仓库
import store from "@/store/index.js";
Vue.prototype.$store = store;
Vue.prototype.$getUserInfo = () => store.dispatch('getUserInfo'); // 全局刷新用户信息
Vue.prototype.$deviceId = store.state.deviceId; // 唯一设备id

// 导航栏高度
Vue.prototype.$navbarHeight = uni.getSystemInfoSync().statusBarHeight || 18;


// 挂载vue
import './uni.promisify.adaptor';
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
	...App
});
app.$mount();
export default app