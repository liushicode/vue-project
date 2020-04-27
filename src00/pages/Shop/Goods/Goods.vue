<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li
            class="menu-item"
            :class="{current:currentIndex === index}"
            v-for="(good, index) in goods"
            :key="index"
            @click="clickItem(index)"
          >
            <img
              class="icon"
              :src="good.icon"
              v-show="good.icon"
            />
            <span class="text bottom-border-1px">{{ good.name }}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                    :src="food.icon"
                  />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food
      :food="food"
      ref="food"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
// 引入实现页面滚动的插件
import BScroll from 'better-scroll'
// 引入组件
import Food from './Food'
import ShopCart from './ShopCart'
export default {
  name: 'Goods',
  components: {
    Food,ShopCart
  },
  data () {
    return {
      scrollY: 0, // 滑动距离
      tops: [],// 右侧列表滑动距离组成的范围数组
      food: {}
    }
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
      // 判断当前的index与计算属性得到的index是否一致，不一致就让左侧滑动
      // 因为左侧滑动对象是渲染完才创建的，所以判断时要确保滑动对象存在
      if (this.index !== index && this.leftScroll) {
        // 切换显示计算出的index，js是动态语言，可以直接.index
        this.index = index
        // 找到对应的li
        const li = this.$refs.leftUl.children[index]
        // 让左侧列表滑动到对应的li元素
        this.leftScroll.scrollToElement(li, 300)
      }
      return index
    }
  },
  async mounted () {
    await this.$store.dispatch('getGoods')
    // 下划线开头代表自己定义方法
    // 发送请求后初始化滑动对象
    this._initBscroll()
    // 初始化滑动距离的数组数据
    this._initTops()
  },
  methods: {
    _initBscroll () {
      // 左侧滑动对象
      this.leftScroll = new BScroll('.menu-wrapper', {
        click: true // 可触发点击
      })
      // 右侧滑动对象
      this.rightScroll = new BScroll('.foods-wrapper', {
        click: true,
        probeType: 2// 可以获取滚动的位置，设置为1会有延时
      })
      // 绑定滚动事件，获取实时的滚动位置scrollY,从而影响计算属性中currentIndex变化
      this.rightScroll.on('scroll', ({ x, y }) => {
        //console.log(y)
        this.scrollY = Math.abs(y)
      })
      this.rightScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops数组数据
    _initTops () {
      let tops = []
      let top = 0
      tops.push(top)
      // 获取右侧ul中的所有li
      const list = this.$refs.rightUl.children
      // 转为真实数组,并进行遍历，往tops中添加数据
      Array.prototype.slice.call(list).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    // 点击左侧滑动对象，右侧列表对应滑动
    clickItem (index) {
      // 获取此时滑动的距离
      const scrollY = this.tops[index]
      // 解决因为计算属性，产生的延迟问题
      this.scrollY = scrollY
      // 让右侧列表滑动对应距离,设置为负值
      this.rightScroll.scrollTo(0, -scrollY, 100)
    },
    // 点击显示food组件
    showFood (food) {
      // food设置给Goods组件，再作为属性传递给Food组件
      this.food = food
      // 调用food组件中的方法显示food
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
