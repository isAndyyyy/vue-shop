// 引包
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import '@/assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import * as echarts from 'echarts'
// 导入 nProgress 包对应的js和css
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
// 全局注册
Vue.prototype.$http = axios
Vue.component('tree-table', TreeTable)
Vue.prototype.$echarts = echarts

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios 请求拦截  .request为一个请求拦截器 用use方法为请求拦截器挂载一个回调函数
// 请求拦截器的作用就是预处理请求
// 在request拦截器中，展示进度条 nProgress.start()
axios.interceptors.request.use((config) => {
  nProgress.start()
  // 查看config的内容
  console.log(config)
  // 为请求头headers添加Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  nProgress.start()
  // 最后必须return config（固定写法）
  return config
})
// 在response拦截器中，隐藏进度条 nProgress.done()
axios.interceptors.request.use(config => {
  nProgress.done()
  return config
})

// 时间过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
