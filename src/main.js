import Vue from 'vue'

import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex仓库
import store from './store'
// 引入校验文件validate
import './validate'
// 引入mockjs文件，拦截请求，生成随机数据
import './mock/mock-server'

// 引入vue-lazyload，懒加载，在商品图片加载出来之前显示，图片用v-lazy指令
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
Vue.use(VueLazyload, {
  loading,
})

// 引入公共组件
import Header from './components/Header'
import Star from './components/Star'
import { Button } from 'mint-ui'
import CartControl from './components/CartControl/CartControl.vue'

//注册公共组件
Vue.component(Header.name, Header)
Vue.component(Star.name, Star)
Vue.component(Button.name, Button)
Vue.component(CartControl.name,CartControl)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 注册组件
  components: {
    App
  },
  // 模板
  template: '<App/>',
  // 注册路由
  router,
  // 注册store
  store
})