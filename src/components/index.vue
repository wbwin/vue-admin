<template>
<div>
    <el-row>
      <el-col :span="3" >
        <div class="row-nav">
          <span class="row-nav-span">W-Admin</span>
        </div>
      </el-col>
      <el-col :span="21" >
        <div class="row-nav-right">
          <span class="row-nav-right-name">王大大<img src="../../static/image/ed.jpg"/></span>
        </div>
      </el-col>
    </el-row>
  <div class="main">
    <el-container style="height: 100%;">
      <el-aside width="12.5%">
        <el-menu default-active="$route.path" style="height: 100%">
          <template v-for="(item,index) in $router.options.routes">
            <el-submenu :index="index+''">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="(child,childIndex) in item.children" :index="child.path" :key="child.path" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)"><span >{{child.name}}</span></el-menu-item>

            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="el-col-24 nav-tip">
          <strong>{{$route.name}}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-style">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{path:item.path}">
              {{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="el-col-24">
          <transition name="el-fade-in-linear">
            <router-view></router-view>
          </transition>
        </div>

      </el-main>
    </el-container>
  </div>
</div>
</template>

<script>
  import {getUserList} from "../api/api";
    export default {
        name: "index",

    }

</script>

<style>
  .row-nav{
    width: 100%;
    height: 60px;
    background: #c1c1c1;
    line-height: 60px;
    padding: 0 20px;
  }
  .row-nav span{
    font-size: 30px;
    color: #000;

  }
  .row-nav-right{
    padding-right: 60px;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    background: #c1c1c1;
    text-align: right;
  }
  .row-nav-right img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 10px;
  }
  .main{
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
  }
  .nav-tip{
    margin-bottom: 10px;
  }
  .breadcrumb-style{
    float: right;
  }
</style>
