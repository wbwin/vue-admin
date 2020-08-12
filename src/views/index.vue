<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="row-nav">
          <span class="row-nav-span">宠宠窝后台管理系统</span>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="row-nav-right">
          <el-dropdown trigger="hover">
            <span class="row-nav-right-name el-dropdown-link">王大大<img src="@/assets/img/ed.jpg" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <div class="main">
      <el-container style="height: 100%;">
        <el-aside width="12.5%">
          <el-menu :default-active="editableTabsValue" style="height: 100%">
            <template v-for="(item,index) in $router.options.routes">
              <el-submenu :index="index+''" :key="index+'a'" v-if="index!=0">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span>{{item.name}}</span>
                </template>
                <template v-for="(child,childIndex) in item.children">
                  <el-menu-item :index="child.name" v-if="!child.meta.parentName" :class="[$route.meta.parentName==child.name?'is-active':'']" :key="child.path" @click="menuItemClick(child)"><span>{{child.meta.name}}</span></el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="el-col-24 nav-tip">
            <!-- <strong>{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-style">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{path:item.path}">
                {{item.name}}
              </el-breadcrumb-item>
            </el-breadcrumb> -->
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="tabClick" @tab-remove="removeTab">
              <el-tab-pane v-for="(item, index) in editableTabs" :key="index" :label="item.meta.name" :name="item.name">
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="el-col-24">
            <transition name="el-fade-in-linear">
              <router-view @menuItemClick="menuItemClick"></router-view>
            </transition>
          </div>

        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getUserList } from "../api/api";
export default {
  name: "index",
  data () {
    return {
      editableTabsValue: '导航二',
      editableTabs: [],
      tabIndex: 0,
      defaultActive: 0,
    }
  },
  created () {
    console.log(this.$router.options.routes)
  },
  methods: {
    menuItemClick (child) {
      let that = this

      let index = that.editableTabs.findIndex(item => item.name == child.name)
      if (index == -1) {
        that.editableTabs.push(child)
      }

      that.editableTabsValue = child.name
      if (that.$route.path != child.path) {
        that.$router.push(child.path)
      }
      console.log(child.path)
    },
    tabClick (targetName) {
      let that = this
      that.$router.push(this.editableTabs[targetName.index].path)
    },
    removeTab (targetName) {
      let that = this
      let tabs = that.editableTabs;
      let activeName = that.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push(nextTab.path)
            }
          }
        });
      }
      that.editableTabsValue = activeName;
      that.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
}

</script>

<style>
.row-nav {
  width: 100%;
  height: 60px;
  background: #c1c1c1;
  line-height: 60px;
  padding: 0 20px;
}
.row-nav span {
  font-size: 30px;
  color: #000;
}
.row-nav-right {
  padding-right: 60px;
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
  background: #c1c1c1;
  text-align: right;
}
.row-nav-right img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 10px;
}
.main {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
}
.nav-tip {
  margin-bottom: 10px;
}
.breadcrumb-style {
  float: right;
}
</style>
