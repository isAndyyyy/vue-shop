<template>
    <div>
    <!-- 面包蟹导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
        <el-row>
          <el-col :span="8">
            <el-input placeholder="请输入内容">
               <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>

        <!-- 订单列表数据 -->
        <el-table :data="orderList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="订单编号" prop="order_number"></el-table-column>
          <el-table-column label="订单价格" prop="order_price" width="60px"></el-table-column>
          <el-table-column label="是否付款" prop="pay_status" width="80px">
            <template slot-scope="scope">
               <el-tag type="success" v-if="scope.row.pay_status===1">已付款</el-tag>
               <el-tag type="danger" v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否发货" prop="is_send" width="60px"></el-table-column>
          <el-table-column label="下单时间" prop="create_time" width="190px">
            <template slot-scope="scope">
                {{ scope.row.create_time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template>
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button type="success" icon="el-icon-location" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    </div>
</template>

<script>
export default {

  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      orderList: [],
      total: 0

    }
  },

  created () {
    this.getOrderList()
  },

  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      console.log(res)
      this.orderList = res.data.goods
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>

</style>
