<template>
  <div class="docker">
    <!-- BEM
    Block__Element--Modifier -->
    <span class="docker__item docker__item--active">
      <div class="iconfont">&#xe64f;</div>
      <div class="docker__title">首页</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe63f;</div>
      <div class="docker__title">购物车</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe645;</div>
      <div class="docker__title">订单</div>
    </span>
    <span class="docker__item">
      <div class="iconfont"> &#xe8a0;</div>
      <div class="docker__title">我的</div>
    </span>
  </div>
</template>

<style lang="scss">
.docker {
  padding: 0 0.18rem;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 49px;
  width: 100%;
  border-top: 1px solid #f1f1f1;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 20px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
