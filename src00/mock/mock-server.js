// 引入Mock
import Mock from 'mockjs'
// 引入模板数据
import data from './data.json'
// mock.js:拦截ajax请求，生成随机数据,用法：Mock.mock('地址'，'数据') 
// 第一个参数是要拦截的地址，第二个是要返回的数据
Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/ratings', { code: 0, data: data.ratings })
Mock.mock('/info', {code: 0, data: data.info })  
