import axios from "axios"
import qs from "qs"
// 引入store
import store from '../store'
import router from '../router'
import { Toast } from 'mint-ui'

// 请求拦截器
axios.interceptors.request.use(config => {
  // 结构获取method对象和data对象
  //console.log(config);
  const {
    method,
    data
  } = config
  if (method.toUpperCase() === "POST" && data instanceof Object) {
    // 将对象转为url参数格式
    config.data = qs.stringify(data)
  }
  // 判断发送请求需不需要携带token
  if (config.headers.needToken) {
    // 从store中取出token
    const token = store.state.user.token
    if (!token) {
      // 判断如果token不存在
      const error = new Error('token不存在，请重新登录')
      // 设置错误码
      error.status.code = 401
      throw error
    } else {
      // token存在，设置请求头中的authorization属性值为token，携带token发送请求
      config.headers.authorization = token
    }
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(
  response => {
    //console.log(response);
    return response.data
  },
  error => {
    console.log(error);
    // 处理请求时的错误消息及响应时错误消息
    // 判断错误是请求时产生的还是响应时产生
    if (!error.response) {
      // 说明是请求时错误消息
      // 判断token不存在
      if (error.status === 401) {
        // 当前不是login界面，跳转到login界面，提示重新登录
        if (router.currentRoute.path !== '/login') {
          // 提示错误信息，跳转
          Toast(error.message)
          router.replace('/login')
        }
      }
    } else {
      // 是响应时的错误消息，获取错误码
      const status = error.response.status
      if (status === 401) {
        // token过期
        if (router.currentRoute.path !== '/login') {
          // 提示错误信息，跳转
          Toast(error.response.data.message)
          // token已过期，要重置token
          store.dispatch('resetLogin')
          // 跳转
          router.replace('/login')
        } else if (status === 404) {
          Toast('资源不存在')
        } else {
          Toast('请求错误' + error.message)
        }
      }
    }
    return new Promise(() => {})
  }
)
export default axios
