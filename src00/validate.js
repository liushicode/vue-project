//Vue表单验证
import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate'
Vue.use(VeeValidate);
// 汉化
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Validator.localize("zh_CN", {
  messages: zh_CN.messages,
  attributes: {
    phone: "手机号码",
    code: "短信验证码",
    name: "用户名",
    pwd: "密码",
    captcha:"图形验证码"
  }
})
Validator.extend('changePhone', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {
    const reg = /^[1]\d{10}$/
    return reg.test(value)
  }
})