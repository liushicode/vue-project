// 引入路由组件，是静态引入方式，最终会一次性打包
// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// 路由懒加载，动态引入方式，用到谁就加载对应组件，动态打包
const Msite = ()=>import ('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Info from '../pages/Shop//Info/Info.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'

export default [
  {
    path: '/msite',
    component: Msite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component:Goods
      },
      {
        path: '/shop/info',
        component:Info
      },
      {
        path: '/shop/ratings',
        component:Ratings
      },
      {
        path: '/shop',
        redirect:'/shop/goods'
      }
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
