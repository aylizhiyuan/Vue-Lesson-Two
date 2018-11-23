<template>
  <!--组件必须有一个根元素，所以在写组件内容的时候，一定记得加个div-->
    <div>
      <h1>hello world</h1>
    </div>
</template>
<script>
    import request from '@/utils/request'
    export default {
      name: "Home",
      //组件挂载完毕的时候发个请求，请求服务器的数据
      mounted(){
        request({
          url:'/api/home',
          method:'get',
        }).then(({data})=>{
          console.log(data);
        })
      }
    }
</script>

<style scoped>

</style>
