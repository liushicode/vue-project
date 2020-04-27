/**
 * 拦截器
 */
import axios from 'axios'
import qs from 'qs'

// 引入store
import store from '../store'
// 引入路由
import router from '../router'
// 引入toast
import { Toast } from 'mint-ui'

// 请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    // post请求方式，转换请求参数形式
    config.data = qs.stringify(data)
  }
  // 判断请求头是否需要携带token
  if (config.headers.needToken) {
    // 取出token
    const token = store.state.user.token
    if (!token) {
      // 如果token不存在
      const error = new Error('token不存在，请重新登录')
      // 定义错误状态码
      error.status = 401
      throw error
    } else {
      // token存在
      config.headers.authorization = token
    }
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // 处理错误信息
  // 判断错误信息是请求的还是响应的
  if (!error.respose) {
    // 说明是请求的错误信息
    if (error.status === 401) {
      // token不存在,当前不是login界面
      if (router.currentRoute.path !== '/login') {
        // 提示错误信息,跳转页面
        Toast(error.message)
        router.replace('/login')
      }
    }
  } else {
    // 说明是响应的错误信息
    if (error.response.status === 401) {
      // token过期,跳转到login界面
      if (router.currentRoute.path !== '/login') {
        // 显示错误信息
        Toast(error.response.data.message)
        // 重置token
        store.dispatch('resetLogin')
        // 跳转界面
        router.replace('/login')
      }
    } else if (error.response.status === 404) {
      Toast('资源不存在')
    } else {
      Toast('请求错误', error.message)
    }
  }
  //返回一个promise对象,中断错误消息
  return new Promise(() => { })
})

export default axios

