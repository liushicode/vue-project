// 引入mock
import Mock from 'mockjs'
// 引入模板数据
import data from './data.json'

// mockjs，拦截ajax请求，生成随机数据
// Mock.mock('地址',模拟的数据)
Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/ratings', { code: 0, data: data.ratings })
Mock.mock('/info', { code: 0, data: data.info })
