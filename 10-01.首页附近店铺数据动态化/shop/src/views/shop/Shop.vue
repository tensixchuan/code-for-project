<template>
  <div class="wrapper">
    <ShopInfo :item="item" :hideBorder="true" />
  </div>

</template>

<script>
import { reactive } from 'vue'
import ShopInfo from '../../components/ShopInfo'
export default {
  name: 'shop-page',
  components: { ShopInfo },
  setup () {
    const item = reactive({
      _id: '1',
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      name: '沃尔玛',
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      tags: ['月售一万+', '起送￥0', '基础运费￥5'],
      slogin: '6元无门槛红包'
    })
    return { item }
  }
}
</script>

<style lang='scss' scroped>
.wrapper {
  padding: 0 0.18rem 0.2rem;
  overflow-y: auto;
}
</style>
