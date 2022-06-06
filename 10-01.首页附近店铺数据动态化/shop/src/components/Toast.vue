<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'toast-part',
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const showToast = (messgae) => {
    toastData.toastMessage = messgae
    toastData.showToast = true
    setTimeout(() => {
      toastData.showToast = false
    }, 2000)
  }
  return { toastData, showToast }
}
</script>

<style>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>
