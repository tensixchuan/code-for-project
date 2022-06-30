<template>
  <div class="content">
    <div class="category">
      <div :class="{'category__item':true,'category__item--active': currentTab===item.tab}" v-for="item in categories" :key="item.tab" @click="handleTabClick(item.tab)">
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item.name">
        <img class="product__item__img" :src="item.imgUrl">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus" @click="()=>{changeCartItemInfo(shopId,item._id,item,-1)}">-</span>{{item.count || 0}}
          <span class="product__number__plus" @click="()=>{changeCartItemInfo(shopId,item._id,item,1)}">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '../../utils/request'
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCommenCartEffect } from './commenCartEffect'
const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }]

// tab切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关逻辑
const useCurrentListEffect = (shopId, currentTab) => {
  const data = reactive({ contentList: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    console.log(shopId, currentTab.value, result)
    if (result?.errno === 0 && result?.data?.length) {
      data.contentList = result.data
    }
    return result.data
  }

  watchEffect(() => { getContentData() })

  const { contentList } = toRefs(data)
  return { contentList }
}

export default {
  name: 'content-part',
  setup () {
    const router = useRoute()
    const shopId = router.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { contentList } = useCurrentListEffect(shopId, currentTab)
    const { changeCartItemInfo } = useCommenCartEffect()
    return { categories, contentList, currentTab, shopId, handleTabClick, changeCartItemInfo }
  }
}
</script>

<style lang="scss">
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
}
.category {
  width: 0.76rem;
  height: 100%;
  overflow-y: scroll;
  background: $search-bgColor;
  margin-right: 0.16rem;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid $content-bgColor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: red;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
      margin: 0 0.05rem;
    }
    .product__number {
      position: absolute;
      right: 0.18rem;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.18rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.08rem;
      }
      &__plus {
        color: $bgColor;
        background: $highlight-bgColor;
        margin-left: 0.07rem;
      }
    }
  }
}
</style>
