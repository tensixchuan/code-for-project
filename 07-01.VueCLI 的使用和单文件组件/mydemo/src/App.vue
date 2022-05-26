<template>
  <div>
    <input v-model="inputValue"/>
    <button class="button" @click="handleSubmit">提交</button>
    <ul>
      <list-item 
        v-for="(item,index) in list" 
        :key="index" 
        :msg="item"/>
    </ul>
  </div>
</template>

<script>
import { reactive,ref } from 'vue'
import ListItem from './components/ListItem'
export default {
  name: 'App',
  components:{ListItem},
  setup(){
    const list = reactive([])
    const inputValue = ref("")
    const handleSubmit = function(){
      list.push(inputValue.value);
      inputValue.value="";
    }
    return {list,inputValue,handleSubmit}
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.button{
  margin: 20px;
}
</style>
