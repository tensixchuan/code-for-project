<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('api/shop/hot-list')
    console.log('result:', result, result?.errno === 0, result?.data?.length)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'nearby-part',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scroped>
@import "../../style/viriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.04rem;
    font-size: 0.18rem;
    color: #333333;
    font-weight: normal;
  }
}
</style>
