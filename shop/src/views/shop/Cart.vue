<template>
  <div class="cart">
    <div class="product">
      <template v-for="item in productList" :key="item.name">
        <div class="product__item" v-if="item.count>0">
          <div class="iconfont product__item__check">&#xe69b;</div>
          <img class="product__item__img" :src="item.imgUrl">
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus" @click="changeCartItemInfo(shopId,item._id,item,-1)">-</span>{{item.count}}
            <span class="product__number__plus" @click="changeCartItemInfo(shopId,item._id,item,1)">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img">
        <div class="check__icon__tag">{{count}}</div>
      </div>
      <div class="check__info">总计：
        <span class="check__info__price">&yen; {{cost}}</span>
      </div>
      <div class="check__button">结算</div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommenCartEffect } from './commenCartEffect'

const useCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })
  const cost = computed(() => { // 总价
    let cost = 0
    const productList = cartList[shopId]
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        console.log(i, product, product.count)
        cost += product.count * product.price
      }
      console.log(productList, count)
    }
    return cost.toFixed(2)
  })
  const count = computed(() => { // 总数量
    let count = 0
    const productList = cartList[shopId]
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        console.log(i, product, product.count)
        count += product.count
      }
      console.log(productList, count)
    }
    return count
  })
  console.log('12345656', cartList, productList)
  const { changeCartItemInfo } = useCommenCartEffect()
  return { count, cost, productList, changeCartItemInfo }
}
export default {
  name: 'cart-part',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { count, cost, productList, changeCartItemInfo } = useCartEffect(shopId)
    return { count, cost, shopId, productList, changeCartItemInfo }
  }
}
</script>

<style lang="scss" scroped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  background: $bgColor;
}
.check {
  display: flex;
  align-items: center;
  height: 0.49rem;
  line-height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  &__icon {
    position: relative;
    width: 0.84rem;
    line-height: 0.48rem;
    &__img {
      display: block;
      margin: 0 auto;
      width: 0.28rem;
      height: 0.28rem;
    }
    &__tag {
      position: absolute;
      left: 0.5rem;
      top: -0.08rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      line-height: 0.2rem;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      background: $highlight-fontColor;
      color: $bgColor;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    color: $content-fontcolor;
    &__price {
      font-size: 0.18rem;
      color: $highlight-fontColor;
    }
  }
  &__button {
    width: 0.98rem;
    line-height: 0.5rem;
    background: #4fb0f9;
    text-align: center;
    color: $bgColor;
    font-size: 0.16rem;
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
    &__check {
      color: $content-notice-fontcolor;
      font-size: 0.2rem;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
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
    &__price {
      margin: 0.06rem 0;
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
