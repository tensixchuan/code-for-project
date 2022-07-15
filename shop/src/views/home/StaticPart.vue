<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe60b;</span>
    暨南大学石牌校区
    <span class="iconfont position__notice">&#xe60a;</span>
  </div>
  <div class="search">
    <span class="iconfont search__icon">&#xeafe;</span>
    兴安超市
  </div>
  <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg">
  </div>
  <div class="icons">
    <div v-for="item in iconList" :key="item.title" class="icons__item">
      <img class="icons__item__img" v-bind:src="item.src">
      <p class="icons__item__desc">{{item.title}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>
<script>
export default {
  name: 'static-part',
  setup () {
    const iconList = [
      { title: '超市便利', src: require('../../assets/超市.png') },
      { title: '菜市场', src: require('../../assets/菜市场.png') },
      { title: '鲜果', src: require('../../assets/水果店.png') },
      { title: '大牌免运', src: require('../../assets/大牌免运.png') },
      { title: '蛋糕', src: require('../../assets/蛋糕.png') },
      { title: '医药健康', src: require('../../assets/医药健康.png') },
      { title: '鲜花绿植', src: require('../../assets/鲜花.png') },
      { title: '家居', src: require('../../assets/家居.png') },
      { title: '签到', src: require('../../assets/签到.png') },
      { title: '红包', src: require('../../assets/红包.png') }
    ]
    return { iconList }
  }

}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem;
  overflow-y: auto;
  // background: #f1f1f1;
}
.position {
  vertical-align: middle;
  position: relative;
  line-height: 0.22rem;
  padding: 0.16rem 0 0.16rem 0;
  font-size: 0.16rem;
  @include ellipsis;
  color: $content-fontcolor;
  .position__icon {
    position: relative;
    top: 0.02rem;
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
  background: $search-bgColor;
  color: $search-fontColor;
  margin: 0 0 0.12rem;
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
  margin: 0.12rem 0;
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.15rem;
  color: $content-fontcolor;
  &__item {
    width: 20%;
    text-align: center;
    &__img {
      width: 0.4rem;
      height: 0.4rem;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem;
      font-size: 0.12rem;
    }
  }
}
.gap {
  height: 0.1rem;
  background: $content-bgColor;
  margin: 0 -0.18rem;
}
</style>
