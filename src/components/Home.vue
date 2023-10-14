<template>
<el-container>
  <!-- 头部区域 -->
  <el-header>
    <div>
        <img id=logo src="../assets/logo.png" alt="">
        <span>后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <!-- 页面主体区域 -->
  <el-container>
  <!-- 侧边栏 -->
<el-aside :width="isCollapse ?'64px':'200px'">
  <div class="toggle-button" @click="toggleCollapse">|||</div>
    <!-- 侧边栏菜单区域 -->
       <el-menu
      background-color=" #b6adad;"
      text-color="#"
      active-text-color="#409EFF"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="activePath">
      <!-- router参数为侧边栏打开路由模式 -->

      <!-- 一级菜单 -->
      <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
        <!-- 一级菜单模板区域 -->
        <template slot="title">
            <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>{{item.authName}} </span>
        </template>

        <!-- 二级菜单 -->
        <el-menu-item
        :index="'/'+subItem.path"
        v-for="subItem in item.children"
        :key="subItem.id"
        @click="saveNavState('/'+subItem.path)">
            <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{subItem.authName}} </span>
            </template>
        </el-menu-item>

      </el-submenu>
    </el-menu>
    </el-aside>
  <!-- 右侧内容主体 -->
    <el-main>
      <!-- 路由占位符 -->
<router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // 生命周期函数
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    logout () {
      window.sessionStorage.clear()// 清除token
      this.$router.push('/login')// 重定向到home
    },
    // 获取所有的菜单
    async getMenuList () {
    // 结构赋值data，重命名为res
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.meg)
      else {
        this.menulist = res.data
        // console.log(this.menulist)
      }
      // console.log(res)
    },
    // 点击按钮实现侧边栏的折叠
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }

}
</script>
<style>
.el-header{
    background: #0d0d0d;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    color: #fff;/*字体颜色*/
    font-size: 25px;/*字体大小*/
    align-items: center;
    > div{
        display: flex;
        align-items: center;
        span{
            margin-left: 20px;
            margin-right: 600px;
            margin-top: 0;
        }
    }
}
.el-aside{
    background: #0d0d0d;
    .el-menu{
    border-left: 0;
    }
}
.el-main{
    background: #f2f0f0;
}
.el-container{
    height: 100%;
}
#logo{
    height: 50px;
    width: 50px;
}
.toggle-button{
  background: #706a6a;
  font-size: 13px;
  line-height: 24px;
  color: black;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
