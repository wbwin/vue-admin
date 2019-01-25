<template>
  <div>
    <div class="el-col-24 table-search">
      <el-form :inline="true" :model="search" size="medium" ref="search">
        <el-form-item>
          <el-input v-model="search.name"  placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="getUserLists()">查询</el-button>
          <el-button type="primary" @click.native="showAddDialogTableVisible()">新增</el-button>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>


    </div>
    <el-table :data="tableData" v-loading="listLoading" @selection-change="selectChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex"></el-table-column>
      <el-table-column prop="date" label="生日" width="120"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column  label="操作" width="150" style="text-align: center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showDialogTableVisible(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native="delUserList(scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="buttom-pagination">
      <el-button type="danger" @click.native="delsUserList()" :disabled="this.selectList.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next"  :page-size="20" @current-change="handleCurrentChange" :total="total"  style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog title="编辑" :visible.sync="dialogTableVisible"  :close-on-click-modal="false">
      <el-form  label-width="80px" :modal="editForm">
        <el-form-item size="small" label="姓名" >
          <el-input style="width: 220px" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item size="small" label="性别">
          <template>
            <el-radio-group v-model="editForm.sex">
            <el-radio  :label="1">男</el-radio>
            <el-radio  :label="0">女</el-radio>
            <el-radio  :label="-1">保密</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item size="small" label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item size="small" label="地址">
          <el-input type="textarea" v-model="editForm.address" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="sureEdit()">确定</el-button>
          <el-button @click.native="dialogTableVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addTableVisible" :close-on-click-modal="false">
      <el-form  label-width="80px" :modal="addForm">
        <el-form-item size="small" label="姓名" >
          <el-input style="width: 220px" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item size="small" label="性别">
          <template>
            <el-radio-group v-model="addForm.sex">
              <el-radio  :label="1">男</el-radio>
              <el-radio  :label="0">女</el-radio>
              <el-radio  :label="-1">保密</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item size="small" label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item size="small" label="地址">
          <el-input type="textarea" v-model="addForm.address" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="sureAdd()">提交</el-button>
          <el-button @click.native="addTableVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../common/js/until'
  import {getUserList,editUser,delUser,delsUser,addUser} from "../../api/api";
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
          selectList:[],
          listLoading:false,
          //编辑界面数据
          editForm: {
            id:0,
            name: '',
            sex: -1,
            date: '',
            address: ''
          },
          addTableVisible:false,
          addForm: {
            name: '',
            sex: -1,
            date: '',
            address: ''
          }
        }
      },

      created() {
        let that=this
        that.getUserLists()
      },
      methods:{
        selectChange(val){
          let that=this
          that.selectList=val
        },
        formatSex(row,column){
          return row.sex==1?'男':row.sex==0?'女':'保密'
        },
        getUserLists(){
          let that=this
          that.listLoading=true
          let param={page:that.page,name:that.search.name}
          getUserList(param).then((res) => {
            that.listLoading=false
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
        showDialogTableVisible(index,row){
          let that=this
          that.dialogTableVisible=true
          that.editForm=Object.assign({}, row)
        },
        showAddDialogTableVisible(){
          this.addTableVisible = true;
          this.addForm = {
            name: '',
            sex: -1,
            date:'',
            address: ''
          };
        },
        sureAdd(){
          let that=this
          that.$confirm('确定提交吗？','提示',{}).then(()=>{
            let param=Object.assign({},that.addForm)
            param.date = (!param.date || param.date == '') ? '' : util.formatDate.format(new Date(param.date), 'yyyy-MM-dd');
            addUser(param).then((res)=>{
              that.$message({
                message:'提交成功',
                type:'success'
              })
              that.addTableVisible=false
              that.getUserLists()
            })
          })
        },
        sureEdit(){
          let that=this
          that.$confirm('确定修改当前用户信息？','提示',{}).then(()=>{
            let param=Object.assign({},that.editForm)
            param.date = (!param.date || param.date == '') ? '' : util.formatDate.format(new Date(param.date), 'yyyy-MM-dd');
            editUser(param).then((res)=>{
              that.$message({
                message:'修改成功',
                type:'success'
              })
              that.dialogTableVisible=false
              that.getUserLists()
            })
          })
        },
        delUserList(row){
          let that=this

          that.$confirm('确定删除用户？','提示',{}).then(()=>{
            that.listLoading=true
            let param={id:row.id}
            delUser(param).then((res)=>{
              that.listLoading=false
              that.$message({
                message:'删除成功',
                type:'success'
              })
              that.getUserLists()
            })
          })
        },
        delsUserList(){
          let that=this
          let ids=that.selectList.map(item=>item.id).toString()
          that.$confirm('确认删除选中的用户信息吗？','提示',{type:'danger'}).then(()=>{
            let param={ids:ids}
            that.listLoading=true

            delsUser(param).then((res)=>{
              that.listLoading=false
              that.$message({
                message:'删除成功',
                type:'success'
              })

              that.getUserLists()
            })
          })
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
