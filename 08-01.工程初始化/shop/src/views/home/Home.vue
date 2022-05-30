<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker />
</template>

<script>
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from './Docker.vue'
export default {
  components: { StaticPart, Nearby, Docker },
  name: 'home-page'
}
</script>

<style lang="scss" scroped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem;
  overflow-y: auto;
}
</style>
