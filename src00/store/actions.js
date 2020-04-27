// import {
//   RECEIVE_ADDRESS,
//   RECEIVE_CATEGORYS,
//   RECEIVE_SHOPS,
//   RECEIVE_USER,
//   RECEIVE_TOKEN,
//   RESET_USER,
//   RESET_TOKEN,
//   RECEIVE_GOODS,
//   RECEIVE_RATINGS,
//   RECEIVE_INFO
// } from './mutation-types'
// import {
//   reqAddress,
//   reqCategorys,
//   reqShopList,
//   reqAutoLogin,
//   reqGoods,
//   reqRatings,
//   reqInfo
// } from '../api'
export default ({
  // // 获取地址信息
  // async getAddress({
  //   state,
  //   commit
  // }) {
  //   // 解构获取经纬度
  //   const {
  //     longitude,
  //     latitude
  //   } = state
  //   const result = await reqAddress({
  //     longitude,
  //     latitude
  //   })
  //   // 判断是否成功获取数据
  //   if (result.code === 0) {
  //     const address = result.data
  //     // 调用mutation，更新地址信息
  //     commit(RECEIVE_ADDRESS, address)
  //   }
  // },
  // // 获取商品分类信息
  // async getCategorys({
  //   commit
  // }) {
  //   const result = await reqCategorys()
  //   if (result.code === 0) {
  //     const categorys = result.data
  //     commit(RECEIVE_CATEGORYS, categorys)
  //   }
  // },
  // // 获取商铺列表信息
  // async getShops({
  //   state,
  //   commit
  // }) {
  //   const {
  //     longitude,
  //     latitude
  //   } = state
  //   const result = await reqShopList({
  //     longitude,
  //     latitude
  //   })
  //   if (result.code === 0) {
  //     const shops = result.data
  //     commit(RECEIVE_SHOPS, shops)
  //   }
  // },
  // // 保存用户信息和token信息
  // saveUser({
  //   commit
  // }, user) {
  //   // 取出token信息
  //   const token = user.token
  //   // 保存token
  //   commit(RECEIVE_TOKEN, token)
  //   localStorage.setItem('token_key', token)
  //   // 删除token
  //   delete user.token
  //   // 保存user
  //   commit(RECEIVE_USER, user)
  // },
  // // 退出登录
  // resetLogin({
  //   commit
  // }) {
  //   commit(RESET_USER)
  //   commit(RESET_TOKEN)
  //   localStorage.removeItem('token_key')
  // },
  // // 自动登录
  // async autoLogin({
  //   state,
  //   commit
  // }) {
  //   // 从state中取出token
  //   const {
  //     token
  //   } = state
  //   if (token) {
  //     // 调用自动登录接口
  //     const result = await reqAutoLogin()
  //     if (result.code === 0) {
  //       // 有user数据
  //       const user = result.data
  //       commit(RECEIVE_USER, user)
  //     }
  //   }
  // },
  // // 获取点餐信息
  // async getGoods({
  //   commit
  // }) {
  //   const result = await reqGoods()
  //   if (result.code === 0) {
  //     const goods = result.data
  //     commit(RECEIVE_GOODS, {
  //       goods
  //     })
  //   }
  // },
  // // 获取评价信息
  // async getRatings({
  //   commit
  // }) {
  //   const result = await reqRatings()
  //   if (result.code === 0) {
  //     const ratings = result.data
  //     commit(RECEIVE_RATINGS, {
  //       ratings
  //     })
  //   }
  // },
  // // 获取商铺信息
  // async getInfo({
  //   commit
  // }) {
  //   const result = await reqInfo()
  //   if (result.code === 0) {
  //     const info = result.data
  //     commit(RECEIVE_INFO, {
  //       info
  //     })
  //   }
  // }
})