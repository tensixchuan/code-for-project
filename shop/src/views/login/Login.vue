<template>
  <div class="loginwrapper">
    <img class="loginwrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="loginwrapper__input">
      <input class="loginwrapper__input__content" placeholder="请输入手机号" v-model="data.usernumber">
    </div>
    <div class="loginwrapper__input">
      <input class="loginwrapper__input__content" type="password" placeholder="请输入密码" v-model="data.password">
    </div>
    <div class="loginwrapper__login-botton" @click='handleLogin'>登录</div>
    <div class="loginwrapper__login-link" @click="handleRegister">立即注册</div>
  </div>
  <Toast v-if="toastData.showToast" :message="toastData.toastMessage" />
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// const useToastEffect = () => {
//   const toastData = reactive({
//     showToast: false,
//     toastMessage: ''
//   })
//   const showToast = (messgae) => {
//     toastData.toastMessage = messgae
//     toastData.showToast = true
//     setTimeout(() => {
//       toastData.showToast = false
//     }, 2000)
//   }
//   return { toastData, showToast }
// }
export default {
  name: 'login-page',
  components: { Toast },
  setup () {
    const router = useRouter()
    const data = reactive({ usernumber: '', password: '' })
    const { toastData, showToast } = useToastEffect()
    const handleLogin = async () => {
      try {
        const result = await post('/api/user/login', {
          usernumber: data.usernumber,
          password: data.password
        })
        console.log(result)
        if (result?.errno === 0) {
          localStorage.isLogin = true
          localStorage.usernumber = data.usernumber
          router.push({ name: 'home' })
        } else {
          showToast('登录失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    }
    const handleRegister = () => {
      router.push({ name: 'register' })
    }
    return { handleLogin, handleRegister, data, toastData }
  }
}
</script>

<style lang="scss" scroped>
@import "../../style/viriables.scss";
.loginwrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto 0.4rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
    border-radius: 6px;
    padding: 0 0.1rem;
    &__content {
      line-height: 0.48rem;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-size: 0.16rem;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-botton {
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $highlight-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    text-align: center;
    color: $bgColor;
    font-size: 0.16rem;
  }
  &__login-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
