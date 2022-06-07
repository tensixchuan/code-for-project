<template>
  <div class="content">
    <div class="category">
      <div class="category__item category__item--active">
        全部商品
      </div>
      <div class="category__item">
        秒杀
      </div>
      <div class="category__item">
        新鲜水果
      </div>
    </div>
    <div class="product">
      <div class="product__item">
        <img class="product__item__img" src="http://www.dell-lee.com/imgs/vue3/near.png">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'content-part'
}
</script>

<style lang="scss">
@import "../../style/viriables.scss";
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
      background: white;
    }
  }
}
.product {
  overflow-y: scroll;
  &__item {
    display: flex;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid $content-bgColor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
    }
  }
}
</style>
