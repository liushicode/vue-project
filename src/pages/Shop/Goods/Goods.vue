<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" :class="{current:currentIndex === index}" v-for="(good,index) in goods" :key="index" @click="clickItem(index)">
            <img class="icon" v-if="good.icon" :src="good.icon">
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <ShopCart />
      </div>
    </div>
    <Food :food="food" ref="food" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
// 引入BScroll,实现页面滚动
import BScroll from 'better-scroll'
import Food from './Food'
import ShopCart from './ShopCart'
export default {
  name: 'Good',
  data () {
    return {
      scrollY: 0,// 右侧滑动对象滑动距离
      tops: [],// 右侧滑动列表每个li高度累加形成的范围数组
      food: {}
    }
  },
  components: {
    Food, ShopCart
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    currentIndex () {
      const { scrollY, tops } = this
      const index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      )
      if (this.index !== index && this.leftScroll) {
        this.index = index
        const li = this.$refs.leftUl.children[index]
        // 让左侧列表自动滑倒对应li位置
        this.leftScroll.scrollToElement(li, 300)
      }
      return index
    }
  },
  async mounted () {
    await this.$store.dispatch('getGoods')
    // 自定义的方法，初始化滑动对象
    this._initBScroll()
    // 初始化高度数组
    this._initTop()
  },
  methods: {
    _initBScroll () {
      // 创建左侧滑动对象
      this.leftScroll = new BScroll('.menu-wrapper', {
        click: true
      })
      // 创建右侧滑动对象
      this.rightScroll = new BScroll('.foods-wrapper', {
        click: true,
        probeType: 2
      })
      // 实时获取右侧滑动对象滑动的距离，从而影响计算属性currentIndex
      this.rightScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
      this.rightScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
    },
    _initTop () {
      const tops = []
      let top = 0
      tops.push(top)
      // 获取右侧滑动对象中所有li
      const list = this.$refs.rightUl.children
      // 转换为真实数组，累加高度的值添加到tops数组中
      Array.prototype.slice.call(list).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    clickItem (index) {
      // 点击左侧列表右侧滑动到对应位置
      const scrollY = this.tops[index]
      this.scrollY = scrollY
      this.rightScroll.scrollTo(0, -scrollY, 100)//滑动指定距离，参数x,y,time
    },
    showFood (food) {
      // 点击显示Food组件
      this.food = food
      this.$refs.food.foodShow()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>

