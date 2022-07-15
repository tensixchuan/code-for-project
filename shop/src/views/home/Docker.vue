<template>
  <div class="docker">
    <!-- BEM
    Block__Element--Modifier -->
    <span v-for="(item, index) in dockerList" :key="item.text" :class="{'docker__item':true,'docker__item--active':index===0}">
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{item.text}}</div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'docker-part',
  setup () {
    const dockerList = [
      { icon: '&#xe64f;', text: '首页' },
      { icon: '&#xe63f;', text: '购物车' },
      { icon: '&#xe645;', text: '订单' },
      { icon: '&#xe8a0;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.docker {
  padding: 0 0.18rem;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  width: 100%;
  color: $content-fontcolor;
  border-top: 1px solid $content-bgColor;
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
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
