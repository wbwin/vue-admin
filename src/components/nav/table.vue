<template>
  <div>
    <div class="el-col-24 table-search">
      <el-form :inline="true" :model="search" size="medium">
        <el-form-item>
          <el-input v-model="search.name"  placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
          <el-button type="primary" >新增</el-button>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>


    </div>
    <el-table :data="tableData" >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex"></el-table-column>
      <el-table-column prop="date" label="生日" width="120"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column  label="操作" width="150" style="text-align: center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="dialogTableVisible==true">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="buttom-pagination">
      <el-button type="danger">批量删除</el-button>
      <el-pagination layout="prev, pager, next"  :page-size="20" @current-change="handleCurrentChange" :total="total"  style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog title="新增信息" :visible="dialogTableVisible">
      <el-form  label-width="80px">
        <el-form-item size="small" label="姓名" >
          <el-input style="width: 220px" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item size="small" label="性别">
          <template>
            <el-radio v-model="addForm.sex" label="1">男</el-radio>
            <el-radio v-model="addForm.sex" label="2">女</el-radio>
            <el-radio v-model="addForm.sex" label="-1">保密</el-radio>
          </template>
        </el-form-item>
        <el-form-item size="small" label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item size="small" label="地址">
          <el-input type="textarea" v-model="addForm.addr" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
          <el-button >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserList} from "../../api/api";
    export default {
      data() {
        return {
          search:{
            name:'',
          },
          tableData: [],
          dialogTableVisible:false,
          page:1,
          total:1,

          //新增界面数据
          addForm: {
            name: '',
            sex: -1,
            birth: '',
            addr: ''
          }
        }
      },

      created() {
        let that=this
        that.getUserLists()
      },
      methods:{
        formatSex(row,column){
          return row.sex==1?'男':row.sex==0?'女':'保密'
        },
        getUserLists(){
          let that=this
          let param={page:that.page,name:that.search.name}
          getUserList(param).then((res) => {
            if(res.status==200){
              that.tableData=res.data.users
              that.total=res.data.total
            }
          });
        },
        handleCurrentChange(val){
          let that=this
          that.page=val
          that.getUserLists()
        },
      },
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
  .buttom-pagination{
    margin-top: 20px;
  }
</style>
