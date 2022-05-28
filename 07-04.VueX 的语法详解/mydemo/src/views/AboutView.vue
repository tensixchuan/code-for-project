<!-- AboutView.vue
第一步：派发一个action -->
<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{name}}</h1>
  </div>
</template>
<script>

import {useStore} from 'vuex'
import {toRefs} from 'vue'
export default {
  name: 'AboutPage',
  // computed:{
  //   myname(){
  //     return this.$store.state.name
  //   }
  // },
  // methods:{
  //   handleClick(){
  //     // 想改变数据的话，vuex要求第一步先派发一个action
  //     this.$store.dispatch('changeName','wang')
  //   }
  // }
  setup(){
    const store = useStore();
    const {name} = toRefs(store.state)
    const handleClick = function(){
      // store.dispatch('changeName','wang')
      store.commit('changeName','wang')
    }
    return {
      name,handleClick
    }
  }
}
</script>
