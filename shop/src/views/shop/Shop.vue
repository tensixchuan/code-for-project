<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6db;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xeafe;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
  </div>
  <Content />
  <cart />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const rout = useRoute()
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    const result = await get('/api/shop/' + rout.params.id)
    console.log(result)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  getItemData()
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'shop-page',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    return { item, getItemData, handleBackClick }
  }
}
</script>

<style lang='scss' scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem 0.2rem;
  overflow-y: auto;
}
.search {
  margin: 0.14rem 0 0.04rem 0;
  display: flex;
  text-align: center;
  &__back {
    width: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.25rem;
    color: $search-iconColor;
  }
  &__content {
    flex: 1;
    display: flex;
    border-radius: 0.16rem;
    background: $search-bgColor;
    &__icon {
      width: 0.4rem;
      line-height: 0.32rem;
      font-size: 0.2rem;
      color: $search-iconColor;
    }
    &__input {
      flex: 1;
      line-height: 0.32rem;
      border: none;
      background: none;
      padding-right: 0.2rem;
      font-size: 0.14rem;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
