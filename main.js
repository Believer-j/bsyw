import App from './App'
// uv-ui 工具库
import uvUI from '@/uni_modules/uv-ui-tools'
import utils from './utils/index.js'
import store from './store/index.js'
import cookie from './utils/cookie.js'
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uvUI);
  app.config.globalProperties.$utils = utils
  app.config.globalProperties.$store = store
  app.config.globalProperties.$cookie = cookie
  return {
    app
  }
}
