<template>
    <div>
    <!-- 面包蟹导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
      <el-card>
        <el-row>
          <el-col>
            <el-button type="primary">添加分类</el-button>
          </el-col>
        </el-row>
         <!-- 表格区域 -->
         <tree-table
         :data="CategoriesList"
         :columns="columns"
         :selection-type="false"
         :expand-type="false"
         show-index
         index-text=" "
         border>
         <!-- 是否有效 -->
         <template slot="isOk" slot-scope="scope">
             <i class="el-icon-success"
             v-if="scope.row.cat_deleted===true"
             style="color:lightgreen"></i>
             <i class="el-icon-error"
              v-else
              style="color:red"></i>
         </template>

         <!-- 排序 -->
         <template slot="order" slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
         </template>

        <!-- 操作按钮 -->
         <template slot="option">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
         </template>
         </tree-table>
         <!-- 分页区域 -->
       </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      CategoriesList: [],
      total: 0,
      // 为table指定列的定义
      columns: [{
        label: '分类属性',
        prop: 'cat_name'
      },
      {
        label: '是否有效',
        // 表示将当前列定为模板列
        type: 'template',
        // 表示当前这一列使用的模板名称
        template: 'isOk'

      },
      {
        label: '排序',
        // 表示将当前列定为模板列
        type: 'template',
        // 表示当前这一列使用的模板名称
        template: 'order'

      },
      {
        label: '操作',
        // 表示将当前列定为模板列
        type: 'template',
        // 表示当前这一列使用的模板名称
        template: 'option'

      }
      ]
    }
  },
  created () {
    this.getCategoriesList()
  },

  methods: {
    async getCategoriesList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('请求获取失败！')
      this.CategoriesList = res.data.result
      this.total = res.data.total
      // console.log(this.CategoriesList)
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
