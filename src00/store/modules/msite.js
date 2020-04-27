import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShopList,
} from '../../api'
const state = {
  longitude: '116.36867',
  latitude: '40.10038',
  address: {},
  categorys: [],
  shops: [],
}
const mutations = {
  // 更新地址信息
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  // 更新商品分类
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  // 更新商铺信息
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
}
const actions = {
  // 获取地址信息
  async getAddress({
    state,
    commit
  }) {
    // 解构获取经纬度
    const {
      longitude,
      latitude
    } = state
    const result = await reqAddress({
      longitude,
      latitude
    })
    // 判断是否成功获取数据
    if (result.code === 0) {
      const address = result.data
      // 调用mutation，更新地址信息
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 获取商品分类信息
  async getCategorys({
    commit
  }) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },
  // 获取商铺列表信息
  async getShops({
    state,
    commit
  }) {
    const {
      longitude,
      latitude
    } = state
    const result = await reqShopList({
      longitude,
      latitude
    })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}