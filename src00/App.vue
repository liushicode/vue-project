<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide';
//import { reqAddress, reqCategorys, reqShopList } from './api'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted() {
    this.$store.dispatch('getAddress');
    // 页面加载完成后，调用action方法，自动登录
    this.$store.dispatch('autoLogin');
    // this.$store.dispatch('getCategorys')
    // this.$store.dispatch('getShops')
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
