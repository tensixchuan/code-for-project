<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{name}}</h1>
  </div>
</template>

<script>

import {useStore} from 'vuex'
import {toRefs} from 'vue'
export default {
  name: 'HomeView',
  // computed:{
  //   name(){
  //     return this.$store.state.name
  //   }
  // }
  
  // 使用Composition API 
  setup(){
    const store = useStore();
    const {name} = toRefs(store.state)
    return {
      name
    }
  }
}
</script>
