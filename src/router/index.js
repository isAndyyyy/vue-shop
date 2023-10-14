import Vue from 'vue'
import VueRouter from 'vue-router'
// login home welcome一起加载
// import Login from '@/components/Login.vue'
// import Home from '@/components/Home.vue'
// import Welcome from '@/components/Welcome.vue'
// import User from '@/components/user/User.vue'
// import RightsVue from '@/components/power/Rights.vue'
// import Roles from '@/components/power/Roles.vue'
// import CateVue from '@/components/goods/Cate.vue'
// import Params from '@/components/goods/Params.vue'
// import List from '@/components/goods/List.vue'
// import Order from '@/components/order/Order.vue'
// import Report from '@/components/report/Report.vue'

// 路由懒加载
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Welcome.vue')
const User = () => import(/* webpackChunkName: "User_RightsVue_Roles" */ '@/components/user/User.vue')
const RightsVue = () => import(/* webpackChunkName: "User_RightsVue_Roles" */ '@/components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "User_RightsVue_Roles" */ '@/components/power/Roles.vue')
const CateVue = () => import(/* webpackChunkName: "CateVue_Params" */ '@/components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: "CateVue_Params" */ '@/components/goods/Params.vue')
const List = () => import(/* webpackChunkName: "List_Order_Report" */ '@/components/goods/List.vue')
const Order = () => import(/* webpackChunkName: "List_Order_Report" */ '@/components/order/Order.vue')
const Report = () => import(/* webpackChunkName: "List_Order_Report" */ '@/components/report/Report.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, // 路由重定向
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children:
        [{ path: '/welcome', component: Welcome },
          { path: '/users', component: User },
          { path: '/rights', component: RightsVue },
          { path: '/roles', component: Roles },
          { path: '/categories', component: CateVue },
          { path: '/params', component: Params },
          { path: '/goods', component: List },
          { path: '/orders', component: Order },
          { path: '/reports', component: Report }
        ] // 子组件应写成数组的形式
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将访问哪一个路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  //   next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
