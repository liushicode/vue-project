import ajax from './ajax'

const BASE = `/api`
// 根据经纬度获取位置
export const reqAddress = ({
  longitude,
  latitude
}) => ajax.get(BASE + `/position/${latitude},${longitude}`)

// 获取食品分类列表
export const reqCategorys = () => ajax.get(BASE + `/index_category`)
// 根据经纬度获取商铺列表
export const reqShopList = ({
  longitude,
  latitude
}) => ajax({
  method: 'GET',
  url: BASE + `/shops`,
  params: {
    longitude,
    latitude
  }
})

// 根据手机号，请求发送短信验证码
export const reqSendCode = (phone) => ajax({
  method: 'GET',
  url: BASE + `/sendcode`,
  params: {
    phone
  }
})
// 用户名密码登录
export const reqPwdLogin = ({
  name,
  pwd,
  captcha
}) => ajax({
  method: 'POST',
  url: BASE + '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})
// 手机短信登录
export const reqSmsLogin = (phone, code) => ajax({
  method: 'POST',
  url: BASE + '/login_sms',
  data: {
    phone,
    code
  }
})

// 自动登录接口
export const reqAutoLogin = () => ajax({
  method: 'GET',
  url: BASE + '/auto_login',
  headers: {
    needToken: true //标识，请求时要携带token
  }
})
// 请求goods点餐信息接口
export const reqGoods = () => ajax.get('/goods')
// 请求评价信息接口
export const reqRatings = () => ajax.get('/ratings')
// 请求商铺信息接口
export const reqInfo = () => ajax.get('/info')