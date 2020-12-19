<template>
  <div class="hello">
    HelloWorld
  </div>
</template>

<script>
// 前端路由常见两种模式
// 默认内部两个栈实现，当后退时，会把栈顶的内容放到另一个内容中，如果此时输入了另一个网址，则想另一个沾清空
 
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
