<template>
  <div>
    <div class="el-col-24 table-search">
      <el-form :inline="true" :model="search">
        <el-form-item>
          <el-input v-model="search.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="primary">新增</el-button>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>


    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {

      data() {
        return {
          search:{
            name:'',
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
</script>

<style scoped>
  .table-search{
    background: #f2f2f2;
    padding: 10px 0 10px 10px;
    margin-bottom: 10px;
    font-size: 26px;
  }
  .table-search .el-form-item{
    margin-bottom: 0;
  }
</style>
