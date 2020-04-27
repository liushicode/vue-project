import Vue from 'vue'
// 引入校验表单插件
import VeeValidate, { Validator } from 'vee-validate'
// 声明使用插件包
Vue.use(VeeValidate);
// 引入汉化
import zh_CN from 'vee-validate/dist/locale/zh_CN';

// 提示语汉化
Validator.localize("zh_CN", {
  // 汉化
  messages: zh_CN.messages,
  attributes: {
    phone: "手机号码",
    code: "短信验证码",
    name: "用户名",
    pwd: "密码",
    captcha: "图形验证码"
  }
})
// 自定义表单校验规则
Validator.extend('changePhone', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {
    const reg = /^[1]\d{10}$/
    return reg.test(value)
  }
})
