import {
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_ADDRESS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
import { reqAddress, reqCategorys, reqShopList, reqAutoLogin, reqGoods, reqRatings, reqInfo } from '../api'
export default ({})
// export default {
//   // 保存地址信息
//   async getAddress ({ state, commit }) {
//     const { longitude, latitude } = state
//     const result = await reqAddress({ longitude, latitude })
//     if (result.code === 0) {
//       const address = result.data
//       commit(RECEIVE_ADDRESS, address)
//     }
//   },
//   // 保存商品分类信息
//   async getCategorys ({ commit }) {
//     const result = await reqCategorys()
//     if (result.code === 0) {
//       const categorys = result.data
//       commit(RECEIVE_CATEGORYS, categorys)
//     }
//   },
//   // 保存商铺列表信息
//   async getShops ({ state, commit }) {
//     const { longitude, latitude } = state
//     const result = await reqShopList({ longitude, latitude })
//     if (result.code === 0) {
//       const shops = result.data
//       commit(RECEIVE_SHOPS, shops)
//     }
//   },
//   // 保存用户信息和token
//   saveUser ({ commit }, user) {
//     // 取出token
//     const token = user.token
//     // 保存token信息
//     commit(RECEIVE_TOKEN, token)
//     localStorage.setItem('token_key', token)
//     // 删除token信息，因为用户数据不需要
//     delete user.token
//     // 保存用户信息
//     commit(RECEIVE_USER, user)
//   },
//   // 退出登录，清空用户信息和token
//   resetLogin ({ commit }) {
//     commit(RESET_USER)
//     commit(RESET_TOKEN)
//     localStorage.removeItem('token_key')
//   },
//   // 自动登录，更新user信息
//   async autoLogin ({ state, commit }) {
//     // state中有token才能自动登录
//     if (state.token) {
//       // 调用自动登录接口
//       const result = await reqAutoLogin()
//       if (result.code === 0) {
//         // 获取user信息
//         const user = result.data
//         // 更新user信息
//         commit(RECEIVE_USER, user)
//       }
//     }
//   },
//   // 获取食物信息，存到vuex中
//   async getGoods ({ commit }) {
//     const result = await reqGoods()
//     if (result.code === 0) {
//       const goods = result.data
//       commit(RECEIVE_GOODS, { goods })
//     }
//   },
//   // 获取评价信息，存到vuex中
//   async getRatings ({ commit }) {
//     const result = await reqRatings()
//     if (result.code === 0) {
//       const ratings = result.data
//       commit(RECEIVE_RATINGS, { ratings })
//     }
//   },
//   // 获取商铺信息，存到vuex中
//   async getInfo ({ commit }) {
//     const result = await reqInfo()
//     if (result.code === 0) {
//       const info = result.data
//       commit(RECEIVE_INFO, { info })
//     }
//   }
// }