<!--
 * @Description: file information
 * @Author: Alex
 * @Date: 2020-08-10 17:40:39
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-11 14:44:19
-->
<template>
  <el-form ref="form" :rules="rules" class="login-content" label-position="left" label-width="0px" :model="form">
    <h4 class="title">系统登录</h4>
    <el-form-item prop="userName">
      <el-input v-model="form.userName" placeholder="请输入账号" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="fl mb20">记住密码</el-checkbox>

    <el-button type="primary" class="mb20" :loading="loading" @click.native.prevent="login()" style="width: 100%">登录</el-button>
  </el-form>
</template>

<script>
import { requestLogin } from '../api/api';

export default {
  name: 'login',
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      checked: true,
      loading: false,
      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    login () {
      let that = this;
      that.$refs.form.validate(valid => {
        if (valid) {
          that.loading = true;
          let param = {
            username: that.form.userName,
            password: that.form.password
          };
          requestLogin(param).then(data => {
            that.loading = false;
            if (data.res !== 200) {
              that.$message({
                message: '账号或密码错误',
                type: 'error'
              });
            } else {
              localStorage.setItem('user', JSON.stringify(data.data));
              that.$router.push({ path: '/main' });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-content {
  display: block;
  width: 350px;
  margin: 300px auto;
  padding: 35px 35px 15px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 25px #999;
  .title {
    text-align: center;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .fl {
    float: left;
  }
}
</style>
