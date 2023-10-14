<template>
    <div>
    <!-- 面包蟹导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
        <!--头部警告区 -->
     <el-alert title="注意：只允许第三级分类设置相关参数！" type="warning" show-icon></el-alert>

     <!-- 选择商品分类区域 -->
     <el-row class="cat-opt">
        <el-col>
            <span>选择商品分类：</span>
            <!-- 选择商品分类的级联选择框 -->
             <el-cascader
             expand-trigger="hover"
             v-model="selectedCateKeys"
             :options="CategoriesList"
             :props="cateProps"
             @change="handleChange"></el-cascader>
        </el-col>
    </el-row>
    </el-card>
    </div>
</template>

<script>
export default {
  name: 'VueShopParams',

  data () {
    return {
      CategoriesList: [],
      // 级联选择器的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'

      },
      // 级联选择框双向绑定的数组
      selectedCateKeys: []
    }
  },

  created () {
    this.getCategoriesList()
  },

  methods: {
    async getCategoriesList () {
      const { data: res } = await this.$http.get('categories')
      this.CategoriesList = res.data
    },
    // 级联选择框选中项变化会执行的函数
    handleChange () {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        return 0
      }
      console.log(this.selectedCateKeys)
    }
  }
}
</script>

<style lang="less" scoped>
.cat-opt{
    margin:15px;
}
</style>
