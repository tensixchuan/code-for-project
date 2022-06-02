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
  <Toast v-if="data.showToast" :message="data.toastMessage" />
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast from '../../components/Toast'

export default {
  name: 'login-page',
  components: { Toast },
  setup () {
    const data = reactive({
      usernumber: '',
      password: '',
      showToast: false,
      toastMessage: ''
    })
    const router = useRouter()
    const showToast = (messgae) => {
      data.toastMessage = messgae
      data.showToast = true
      setTimeout(() => {
        data.showToast = false
      }, 2000)
    }
    const handleLogin = async () => {
      try {
        const result = await post('111/api/user/login', {
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
    return { handleLogin, handleRegister, data }
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
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    text-align: center;
    color: white;
    font-size: 0.16rem;
  }
  &__login-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
