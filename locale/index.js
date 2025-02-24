// import en from './en.json'
// import zhHans from './zh-Hans.json'
// import ja from './ja.json'
// export default {
// 	en,
// 	'zh-Hans': zhHans,
// 	'zh-Hant': zhHant,
// 	ja
// }
// i18n.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
 
// 引入语言文件
import en from './en.json'; // 美国
import cn from './cn.json'; // 中国
import jp from './jp.json'; // 日本
import kr from './kr.json'; // 韩国
import de from './de.json'; // 德国
 
Vue.use(VueI18n);
 
const messages = {
  en,
	cn,
	jp,
	kr,
	de
};
 
// 设置默认语言
const defaultLang = 'en';
 
const i18n = new VueI18n({
  locale: defaultLang, // set locale
  messages, // set locale messages
});
 
export default i18n;
