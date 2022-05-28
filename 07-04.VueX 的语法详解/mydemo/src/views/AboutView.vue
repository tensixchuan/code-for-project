<!-- AboutView.vue
第一步：派发一个action -->
<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{name}}</h1>
  </div>
</template>
<script>
// https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register
import {useStore} from 'vuex'
import {toRefs} from 'vue'
import axios from 'axios'
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
    axios.get('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register')
      .then((response)=>{
        const data = response.data.desc;
        console.log(data)
      })
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
