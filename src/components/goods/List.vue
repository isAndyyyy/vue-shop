<template>
    <div>
<!-- 面包蟹导航 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片视图区 -->
<el-card>
    <el-row :gutter="20">
      <el-col :span="8">
         <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
         </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加商品</el-button>
      </el-col>
    </el-row>

    <el-table :data="goodsList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column label="商品价格(元)" prop="goods_price" width="60px"></el-table-column>
      <el-table-column label="商品重量(Kg)" prop="goods_weight" width="60px"></el-table-column>
      <el-table-column label="创建时间" prop="add_time" width="170px">
        <template slot-scope="scope">
              {{ scope.row. add_time | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
</el-card>
    </div>
</template>

<script>
export default {
  name: 'VueShopList',

  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },

  created () {
    this.getGoodsList()
  },

  methods: {
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('请求失败！')
      this.goodsList = res.data.goods
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>

</style>
