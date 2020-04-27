<template>
  <div>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter" />
  </div>
</template>
<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  // 注册组件
  components: {
    Footer
  },
  mounted () {
    // 调用action方法，发送异步请求，获取地址信息
    this.$store.dispatch('getAddress')
    // 调用自动登录接口
    this.$store.dispatch('autoLogin')
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
