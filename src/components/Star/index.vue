<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" :class="cls" :key="index" v-for="(cls,index) in classArr"></span>
  </div>
</template>
<script>
export default {
  name: 'Star',
  // 图片2x图 3x图，评分
  props: ['size', 'score'],
  computed: {
    classArr () {
      // 类名on为亮星，half为半星，off为灰色星
      let clsArr = []
      // 评分最大整数
      const starInt = Math.floor(this.score)
      // 添加亮星
      for (let i = 0; i < starInt; i++) {
        clsArr.push('on')
      }
      // 添加半星
      if(this.score*10 - starInt*10 > 5){
        clsArr.push('half')
      }
      // 添加灰色星
      while(clsArr.length < 5){
        clsArr.push('off')
      }
      return clsArr
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>