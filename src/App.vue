<!--
 * @Description: file information
 * @Author: Alex
 * @Date: 2020-08-10 17:36:20
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-11 15:10:15
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.el-form--inline .el-form-item__content {
  vertical-align: middle;
}
</style>
