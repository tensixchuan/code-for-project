<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{myname}}</h1>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  computed:{
    myname(){
      return this.$store.state.name
    }
  }
}
</script>
