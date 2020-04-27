import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from '../mutation-types'
import {
  reqGoods,
  reqRatings,
  reqInfo
} from '../../api'
import Vue from 'vue'
const state = {
  goods: [],
  ratings: [],
  info: {},
  cartFoods: []// 购物车食物数据
}
const mutations = {
  // 更新点餐信息
  [RECEIVE_GOODS] (state, {
    goods
  }) {
    state.goods = goods
  },
  // 更新评价信息
  [RECEIVE_RATINGS] (state, {
    ratings
  }) {
    state.ratings = ratings
  },
  // 更新商铺信息
  [RECEIVE_INFO] (state, {
    info
  }) {
    state.info = info
  },
  // 增加食物数量
  [ADD_FOOD_COUNT] (state, { food }) {
    if (!food.count) {
      // 响应式数据
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  // 减少食物数量
  [REDUCE_FOOD_COUNT] (state, { food }) {
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  }
}
const actions = {
  // 获取点餐信息
  async getGoods ({ commit }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {
        goods
      })
    }
  },
  // 获取评价信息
  async getRatings ({ commit }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {
        ratings
      })
    }
  },
  // 获取商铺信息
  async getInfo ({ commit }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {
        info
      })
    }
  },
  // 更新食物数量
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, { food })
    } else {
      commit(REDUCE_FOOD_COUNT, { food })
    }
  }
}
const getters = {
  totalCount () {
    return state.cartFoods.reduce((prev, food) => prev + food.count, 0)
  },
  totalPrice () {
    return state.cartFoods.reduce((prev, food) => prev + food.count*food.price, 0)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}