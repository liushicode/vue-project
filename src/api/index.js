// 写请求接口
import ajax from './ajax'

const base = '/api'
// 请求根据经纬度获取地址信息
export const reqAddress = ({
  longitude,
  latitude
}) => ajax.get(base + `/position/${latitude},${longitude}`)
// 请求获取食品分类列表
export const reqCategorys = () => ajax.get(base + '/index_category')
// 请求根据经纬度获取商铺列表
export const reqShopList = ({
  longitude,
  latitude
}) => ajax.get(base + `/shops?latitude=${latitude}&longitude=${longitude}`)
// 请求获取短信验证码
export const reqSendCode = (phone) => ajax({
  method: 'GET',
  url: base + '/sendcode',
  params: {
    phone
  }
})
// 请求用户名密码登录
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
  method: 'POST',
  url: base + '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})
// 请求手机短信验证码登录
export const reqSmsLogin = (phone, code) => ajax({
  method: 'POST',
  url: base + '/login_sms',
  data: {
    phone,
    code
  }
})
// 请求自动登陆的接口
export const reqAutoLogin = () => ajax({
  method: 'GET',
  url: base + '/auto_login',
  headers: {
    needToken: true
  }
})
// 点餐信息接口
export const reqGoods = () => ajax.get('/goods')
// 评价信息接口
export const reqRatings = () => ajax.get('/ratings')
// 商铺信息接口
export const reqInfo = () => ajax.get('/info')