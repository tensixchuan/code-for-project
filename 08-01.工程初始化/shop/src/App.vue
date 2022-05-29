<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position__icon">&#xe60b;</span>
      暨南大学石牌校区南海楼实验室实验室实验室实验室
      <span class="iconfont position__notice">&#xe60a;</span>
    </div>
    <div class="search">
      <span class="iconfont search__icon">&#xeafe;</span>
      兴安超市
    </div>
    <div class="banner">
      <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg">
    </div>
    <div>123</div>
  </div>
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
@import "./style/viriables.scss";
@import "./style/mixins.scss";
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  // background: #f1f1f1;
}
.position {
  vertical-align: middle;
  position: relative;
  line-height: 0.22rem;
  padding: 0.16rem 0.3rem 0.16rem 0.16rem;
  font-size: 0.16rem;
  @include ellipsis;
  color: $content-fontcolor;
  .position__icon {
    position: relative;
    top: 2px;
    margin-right: 0.06rem;
    font-size: 0.2rem;
  }
  .position__notice {
    overflow: visible;
    position: absolute;
    top: 0.17rem;
    right: 0;
    margin: 0 0.1rem;
    font-size: 0.2rem;
  }
}

.search {
  line-height: 0.32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  margin: 0 0.16rem 0.12rem;
  border-radius: 0.16rem;
  font-size: 0.13rem;
  .iconfont {
    font-size: 0.18rem;
    display: inline-block;
    position: relative;
    top: 0.02rem;
    padding: 0 0.1rem;
  }
}
.banner {
  margin: 0 0.16rem;
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.docker {
  padding: 0 0.18rem;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 49px;
  width: 100%;
  color: $content-fontcolor;
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
