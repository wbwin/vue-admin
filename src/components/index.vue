<template>

</template>

<script>
  import {getUserList} from "../api/api";
    export default {
        name: "index",
      created() {
        getUserList('').then((res) => {
          console.log(res)
        });
      }
    }

</script>

<style>

</style>
