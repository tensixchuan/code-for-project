<template>
  <div class="registerwrapper">
    <img class="registerwrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="registerwrapper__input">
      <input class="registerwrapper__input__content" placeholder="请输入手机号" v-model="usernumber">
    </div>
    <div class="registerwrapper__input">
      <input class="registerwrapper__input__content" type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="registerwrapper__input">
      <input class="registerwrapper__input__content" type="password" placeholder="请确认密码" v-model="repeat">
    </div>
    <div class="registerwrapper__register-botton" @click='handleRegister'>注册</div>
    <div class="loginwrapper__login-link" @click="handleLogin">已有账号登录</div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = () => {
  const router = useRouter()
  const handleLogin = () => {
    localStorage.isLogin = false
    router.push({ name: 'login' })
  }
  return { handleLogin }
}
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ usernumber: '', password: '', repeat: '' })
  const handleRegister = async () => {
    try {
      if (data.usernumber === '') {
        showToast('账号不能为空')
        return
      } else if (data.password !== data.repeat) {
        showToast('两次密码不相同，请重新输入')
        data.password = ''
        data.repeat = ''
        return
      } else if (data.password === '') {
        showToast('密码不能为空')
        return
      }
      const result = await post('/api/user/register', {
        usernumber: data.usernumber,
        password: data.password
      })
      console.log(result)
      if (result?.errno === 0) {
        showToast('注册成功')
        localStorage.isLogin = false
        router.push({ name: 'login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { usernumber, password, repeat } = toRefs(data)
  return { usernumber, password, repeat, handleRegister }
}

export default {
  name: 'register-page',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { usernumber, password, repeat, handleRegister } = useRegisterEffect(showToast)
    const { handleLogin } = useLoginEffect()
    // const handleRegister = () => {
    //   localStorage.isLogin = false
    //   router.push({ name: 'login' })
    // }
    return { show, toastMessage, usernumber, password, repeat, handleRegister, handleLogin }
  }
}
</script>

<style lang="scss" scroped>
@import "../../style/viriables.scss";
.registerwrapper {
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
  &__register-botton {
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    text-align: center;
    color: white;
    font-size: 0.16rem;
  }
  &__register-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
