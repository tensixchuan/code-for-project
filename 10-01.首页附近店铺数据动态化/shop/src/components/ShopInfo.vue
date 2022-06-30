<template>
  <div class="shop">
    <img class="shop__img" :src="item.imgUrl">
    <div :class="{'shop__content':true,'shop__content--bordered':hideBorder?false:true}">
      <div class="shop__title">{{item.name}}</div>
      <div class="shop__tags">
        <span class="shop__tag">月售{{item.sales}}</span>
        <span class="shop__tag">起送￥{{item.expressLimit}}</span><span class="shop__tag">基础运费￥{{item.expressPrice}}</span>
      </div>
      <div class="shop__highlight">{{item.slogin}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shop-info',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scroped>
@import "../style/viriables.scss";
.shop {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &__img {
    height: 0.56rem;
    width: 0.56rem;
    margin-right: 0.16rem;
  }
  &__content {
    flex: 1;
    padding: 0.12rem 0;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgColor;
    }
  }
  &__title {
    font-size: 0.16rem;
  }
  &__tags {
    margin-top: 0.08rem;
  }
  &__tag {
    margin-right: 0.16rem;
  }
  &__highlight {
    color: red;
    margin-top: 0.1rem;
    font-size: 0.13rem;
  }
}
</style>
