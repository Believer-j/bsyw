import Vue from 'vue'
import {
	thousands
} from './index.js'

// ,
Vue.filter('formatNum', val => {
	// console.log(val)
	// const arr=  val.split('.')
	// const num = arr[0]
	// const total = Math.
	// if(arr)
	return val.toLocaleString()
})
Vue.filter('thousands', (val, num = 2) => {
	return val*100 + '%' 
})