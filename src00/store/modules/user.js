import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
} from '../mutation-types'
import {
  reqAutoLogin,
} from '../../api'
const state = {
  user: {},
  token: localStorage.getItem('token_key'),
}
const mutations = {
  //保存用户信息
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  // 保存token
  [RECEIVE_TOKEN](state, token) {
    state.token = token
  },
  // 重置用户信息
  [RESET_USER](state) {
    state.user = {}
  },
  // 重置token
  [RESET_TOKEN](state) {
    state.token = ''
  },
}
const actions = {
  // 保存用户信息和token信息
  saveUser ({ commit }, user) {
    // 取出token信息
    const token = user.token
    // 保存token
    commit(RECEIVE_TOKEN,token)
    localStorage.setItem('token_key',token)
    // 删除token
    delete user.token
    // 保存user
    commit(RECEIVE_USER,user)
  },
  // 退出登录
  resetLogin ({commit }) {
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token_key')
  },
  // 自动登录
  async autoLogin ({ state,commit }) {
    // 从state中取出token
    const { token } = state
    if (token) {
      // 调用自动登录接口
      const result = await reqAutoLogin()
      if (result.code === 0) {
        // 有user数据
        const user = result.data
        commit(RECEIVE_USER,user)
      }
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