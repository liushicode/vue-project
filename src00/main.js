import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex仓库
import store from './store'
// 引入表单验证
import './validate'
// 引入mock
import './mock/mock-server'
// 定义事件总线
Vue.prototype.$bus = new Vue()

// 引入moment时间格式化插件
import moment from 'moment'
// 定义一个全局过滤器实现日期格式化
Vue.filter('datafmt', function (input, fmtstring) {
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format(fmtstring);
})

// 引入vue-lazyload，懒加载，在商品图片加载出来之前显示，图片用v-lazy指令
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
Vue.use(VueLazyload, {
  loading,
})

// 引入公共组件
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import { Button } from 'mint-ui';
import CartControl from './components/CartControl/CartControl.vue'

// 注册公用组件
Vue.component(Header.name, Header)
Vue.component(Star.name, Star)
Vue.component(Button.name, Button)
Vue.component(CartControl.name, CartControl)

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
  // 注册仓库
  store
})
