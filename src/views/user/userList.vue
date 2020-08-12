<template>
  <div>
    <div class="el-col-24 table-search">
      <el-form :inline="true" :model="search" ref="searchForm" size="medium">
        <el-form-item label="微信号：" prop="wxNumb">
          <el-input v-model="search.wxNumb" placeholder="微信号"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="name">
          <el-input v-model="search.name" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="注册时间：" prop="time">
          <el-date-picker v-model="search.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-refresh" @click="resetForm('searchForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="getUserLists()">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
    <el-table ref="multipleTable" :data="tableData" :default-sort="{prop: 'date', order: 'descending'}" border v-loading="listLoading">
      <!-- @row-click="toggleSelection" @selection-change="selectChange" -->
      <el-table-column header-align="center" align="center" type="index" width="50">
      </el-table-column>
      <!-- <el-table-column header-align="center" align="center" type="selection"></el-table-column> -->
      <el-table-column prop="account" header-align="center" align="center" label="头像"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="微信号"></el-table-column>
      <el-table-column prop="state" header-align="center" align="center" label="昵称" :formatter="formatState"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" sortable label="注册时间"></el-table-column>
      <el-table-column header-align="center" align="center" label="操作" style="text-align: center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-view" size="mini" @click.stop="toUserDetail(scope)">查看详情</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="buttom-pagination">
      <el-pagination layout="prev, pager, next" :page-size="10" @current-change="handleCurrentChange" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
import { getUserList, editUser, cancellationUser, delsUser, addUser } from "../../api/api";
export default {
  data () {
    return {
      search: {
        wxNumb: '',
        name: '',
        time: '',
      },
      tableData: [
        {}
      ],
      page: 1,
      total: 1,
      selectList: [],
      listLoading: false,
    }
  },
  created () {
    let that = this
    that.getUserLists()
  },
  methods: {
    //查看详情
    toUserDetail (scope) {
      let that = this
      let param = { path: '/userDetail', name: 'userDetail', meta: { name: '用户详情' } }
      that.$emit('menuItemClick', param)
    },
    //判断状态
    formatState (row, column) {
      return row.state ? '启用' : '注销'
    },
    //重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    //获取信息
    getUserLists () {
      let that = this
      that.listLoading = true
      let param = { page: that.page, name: that.search.name }
      getUserList(param).then((res) => {
        that.listLoading = false
        if (res.status == 200) {
          that.tableData = res.data.users
          that.total = res.data.total
        }
      });
    },
    handleCurrentChange (val) {
      let that = this
      that.page = val
      that.getUserLists()
    },

  },
}
</script>

<style scoped>
.table-search {
  background: #f2f2f2;
  padding: 10px 0 10px 10px;
  margin-bottom: 10px;
  font-size: 26px;
}
.table-search .el-form-item {
  margin-bottom: 0;
  margin-right: 40px;
}
.buttom-pagination {
  margin-top: 20px;
}
</style>
