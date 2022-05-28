<!-- AboutView.vue
第一步：派发一个action -->
<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{myname}}</h1>
  </div>
</template>
<script>

export default {
  name: 'AboutPage',
  computed:{
    myname(){
      return this.$store.state.name
    }
  },
  methods:{
    handleClick(){
      // 想改变数据的话，vuex要求第一步先派发一个action
      this.$store.dispatch('changeName','wang')
    }
  }
}
</script>
