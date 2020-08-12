<template>
  <div>
    <div class="el-col-24 table-search">
      <el-form :inline="true" :model="search" ref="searchForm" size="medium">
        <el-form-item label="用户名称：" prop="name">
          <el-input v-model="search.name" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户账户：" prop="account">
          <el-input v-model="search.account" placeholder="用户账户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-refresh" @click="resetForm('searchForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="getUserLists()">查询</el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="showAddDialogTableVisible()">注册</el-button>
        </el-form-item>
      </el-form>

    </div>
    <el-table ref="multipleTable" :data="tableData" border v-loading="listLoading">
      <!-- @row-click="toggleSelection" @selection-change="selectChange" -->
      <el-table-column header-align="center" align="center" type="index" width="50">
      </el-table-column>
      <!-- <el-table-column header-align="center" align="center" type="selection"></el-table-column> -->
      <el-table-column prop="account" header-align="center" align="center" label="账号"></el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="用户姓名"></el-table-column>
      <el-table-column prop="state" header-align="center" align="center" label="状态" :formatter="formatState"></el-table-column>
      <el-table-column header-align="center" align="center" label="操作" style="text-align: center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-circle-check" size="mini" @click.stop="enable(scope)">启用</el-button>
          <el-button type="info" icon="el-icon-switch-button" size="mini" @click.stop="cancellation(scope)">注销</el-button>
          <el-button type="warning" icon="el-icon-edit" size="mini" @click.stop="changeAccount(scope)">修改</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="buttom-pagination">
      <el-pagination layout="prev, pager, next" :page-size="10" @current-change="handleCurrentChange" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog :title="dialogType?'修改':'注册'" width="35%" :center="true" :visible.sync="addTableVisible" :destroy-on-close="true" :close-on-click-modal="false">
      <el-form label-width="120px" :model="dialogForm" ref="dialogForm" :rules="rules">
        <el-form-item size="small" label="用户账号" prop="account">
          <el-input style="width: 220px" v-model="dialogForm.account" :disabled="dialogType"></el-input>
        </el-form-item>
        <el-form-item size="small" label="用户姓名" prop="name">
          <el-input style="width: 220px" v-model="dialogForm.name" :disabled="dialogType"></el-input>
        </el-form-item>
        <el-form-item size="small" label="登录密码" prop="pass">
          <el-input style="width: 220px" type="password" v-model="dialogForm.pass"></el-input>
        </el-form-item>
        <el-form-item size="small" label="密码确认" prop="checkPass">
          <el-input style="width: 220px" type="password" v-model="dialogForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-refresh" @click="resetForm('dialogForm')">重置</el-button>
          <el-button type="primary" :icon="dialogType?'el-icon-document-checked':'el-icon-circle-plus-outline'" @click="dialogSubmit('dialogForm')">{{dialogType?'保存':'确认创建'}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import util from '@/assets/js/until'
import { getUserList, editUser, cancellationUser, delsUser, addUser } from "../../api/api";
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.dialogForm.checkPass !== '') {
          this.$refs.dialogForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.dialogForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      search: {
        name: '',
        account: '',
      },
      tableData: [
        {}
      ],
      dialogTableVisible: false,
      page: 1,
      total: 1,
      selectList: [],
      listLoading: false,
      //编辑界面数据
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        date: '',
        address: ''
      },
      addTableVisible: false,
      dialogForm: {
        name: '',
        account: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],

      },
      dialogType: 0,//0为注册，1为修改
    }
  },

  created () {
    let that = this
    that.getUserLists()
  },
  methods: {
    //启用账户
    enable (scope) {

    },
    //注销账户
    cancellation (scope) {
      let that = this
      that.$confirm('确认注销该账户吗？', '提示', {}).then(() => {
        let param = Object.assign({}, { id: scope.row.id })
        cancellationUser(param).then((res) => {
          that.$message({
            message: res.data.msg,
            type: 'success'
          })
          that.getUserLists()
        })
      })
      console.log(scope)
    },
    //修改账户
    changeAccount (scope) {
      let that = this
      that.dialogForm = scope.row
      that.dialogType = 1
      that.addTableVisible = true;
    },
    //多选框改变
    selectChange (val) {
      let that = this
      that.selectList = val
    },
    //多选框改变
    toggleSelection (rows) {
      console.log(rows)
      if (rows) {
        this.$refs.multipleTable.toggleRowSelection(rows);
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //判断状态
    formatState (row, column) {
      return row.state ? '启用' : '注销'
    },
    //注册框提交
    dialogSubmit (formName) {
      let that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.$confirm('确认创建吗？', '提示', {}).then(() => {
            let param = Object.assign({}, that.dialogForm)
            addUser(param).then((res) => {
              that.$message({
                message: '提交成功',
                type: 'success'
              })
              that.addTableVisible = false
              that.getUserLists()
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
    showAddDialogTableVisible () {
      this.addTableVisible = true;
      this.addForm = {
        name: '',
        sex: -1,
        date: '',
        address: ''
      };
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
