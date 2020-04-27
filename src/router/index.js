import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 声明使用路由插件
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes
})
