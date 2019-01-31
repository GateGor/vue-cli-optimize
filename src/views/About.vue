<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted() {
    this.$userApi.login({id:'ebdois'})
    this.$userApi.getOrder().then(res=>{
      console.log(res);
      
    })
  },
}
</script>