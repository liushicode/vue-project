<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:" :class="{ on: loginWay }" @click="loginWay = true">
            短信登录
          </a>
          <a href="javascript:" :class="{ on: !loginWay }" @click="loginWay = false">
            密码登录
          </a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="phone" v-validate="'required|changePhone'" />
              <span style="color:red">{{ errors.first('phone') }}</span>
              <!-- 输入号码校验正确或倒计时结束后按钮可以点击，disabled为false -->
              <button :disabled="!isRightPhone || count > 0" :class="{ right: isRightPhone }" @click.prevent="sendCode" class="get_verification">
                {{ count > 0 ? `已发送(${count}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="code" v-validate="'required'" />
              <span style="color:red">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" name="name" v-validate="'required'" />
                <span style="color:red">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd" name="pwd" v-validate="'required'" />
                <span style="color:red">{{ errors.first('pwd') }}</span>
                <div class="switch_button" :class="{ on: isShowPwd }" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{ right: isShowPwd }"></div>
                  <span class="switch_text">{{ isShowPwd ? 'abc' : '' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" name="captcha" v-validate="'required'" />
                <span style="color:red">{{ errors.first('captcha') }}</span>
                <img class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="sendCaptcha" ref="captcha" />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import { reqSendCode, reqPwdLogin, reqSmsLogin } from '../../api'
export default {
  name: 'Login',
  data () {
    return {
      loginWay: true, //登录方式
      phone: '', //手机号码
      count: 0, //显示倒计时
      isShowPwd: false, //是否展示密码明文
      code: '', //短信验证码
      name: '', //用户名
      pwd: '', //密码
      captcha: '' //图形验证码
    }
  },
  computed: {
    // 校验手机号码
    isRightPhone () {
      return /^1[3456789]\d{9}$/.test(this.phone)
    }
  },
  methods: {
    // 点击发送验证码触发
    async sendCode () {
      // 点击发送短信验证码后，先开启倒计时
      this.count = 5
      this.timeId = setInterval(() => {
        this.count--
        if (this.count <= 0) {
          // 还原默认值0，此时显示'获取验证码'
          this.count = 0
          // 清除定时
          clearInterval(this.timeId)
        }
      }, 1000)
      // 调用接口，请求发送短信验证码
      const result = await reqSendCode(this.phone)
      if (result.code === 0) {
        Toast('发送成功')
      } else {
        MessageBox('提示', '发送失败')
        this.count = 0
      }
    },
    // 点击图形验证码，发送请求
    sendCaptcha () {
      // 设置一个动态请求参数，就能每次请求到不同图片
      this.$refs.captcha.src =
        `http://localhost:5000/captcha?time=` + Date.now()
    },
    // 登录
    async login () {
      // 判断登录方式，校验表单数据
      const { loginWay, phone, code, name, pwd, captcha } = this
      let names
      // 判断登录方式
      if (loginWay) {
        names = ['phone', 'code']
      } else {
        names = ['name', 'pwd', 'captcha']
      }
      // 表单整体校验
      const success = await this.$validator.validateAll(names)
      if (success) {
        // console.log('表单校验成功')
        // 再次判断登录方式，调用不同的请求接口，进行登录
        let result
        if (loginWay) {
          result = await reqSmsLogin(phone, code)
          // 清空短信验证码
          this.code = ''
        } else {
          result = await reqPwdLogin({ name, pwd, captcha })
          // 刷新图形验证码,清空验证码输入框
          this.sendCaptcha()
          this.captcha = ''
        }
        // console.log(result)
        // 判断登录是否成功
        if (result.code === 0) {
          // 保存用户信息，把用户数据存到vuex,跳转界面
          const user = result.data
          this.$store.dispatch('saveUser', user)
          this.$router.replace('/profile')
        } else {
          Toast('登录失败')
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right
                color #000
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
