<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div v-for="(item,index) in nearbyList" :key="index" class="nearby__item">
      <img class="nearby__item__img" :src="item.src">
      <div class="nearby__item__content">
        <div class="nearby__item__title">{{item.title}}</div>
        <div class="nearby__item__tags">
          <span v-for="tag in item.tags" :key="tag" class="nearby__item__tag">{{tag}}</span>
        </div>
        <div class="nearby__item__highlight">{{item.desc}}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'nearby-part',
  setup () {
    const nearbyList = [{
      src: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '超市',
      tags: ['月售一万+', '起送￥0', '基础运费￥5'],
      desc: '6元无门槛红包'
    },
    {
      src: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售一万+', '起送￥0', '基础运费￥5'],
      desc: '6元无门槛红包'
    },
    {
      src: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售一万+', '起送￥0', '基础运费￥5'],
      desc: '6元无门槛红包'
    }]
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
  &__item {
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
      border-bottom: 0.01rem solid $content-bgColor;
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
}
</style>
