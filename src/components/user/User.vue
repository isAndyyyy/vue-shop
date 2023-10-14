<template>
<div>
<!-- 面包蟹导航 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图区 -->
<el-card>
  <!-- 搜索与添加区 -->
<el-row :gutter="20">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUseList"><!-- query为api自带的数据查询请求 -->
        <el-button slot="append" icon="el-icon-search" @click="getUseList"></el-button>
      </el-input>
    </el-col>
       <el-col :span="4">
           <el-button type="primary" @click="adddialogVisible_add=true">添加用户</el-button>
    </el-col>
</el-row>
  <!-- 用户列表区域 -->
<el-table :data="userList" border stripe>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="姓名" prop="username"></el-table-column>
    <el-table-column label="邮箱" prop="email"></el-table-column>
    <el-table-column label="电话" prop="mobile"></el-table-column>
    <el-table-column label="角色" prop="role_name"></el-table-column>
    <el-table-column label="状态" prop="mg_state">
    <template slot-scope="scope"> <!-- 作用域插槽slot-scope 可以将父组件的数据传递给子组件 -->
        <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
    </template>
 </el-table-column>
<el-table-column label="操作">
    <template slot-scope="scope">
        <!-- 编辑按钮 -->
        <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="showEditInfo(scope.row.id)"
        ></el-button>
        <!-- 删除按钮 -->
        <el-button
         type="danger"
         icon="el-icon-delete"
         size="mini"
         @click="showDelInfo(scope.row.id)"
         ></el-button>
    </template>
  </el-table-column>
</el-table>
<!-- 分页区域 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>

<!-- 添加用户对话框 -->
<el-dialog
  title="添加用户"
  :visible.sync="adddialogVisible_add"
  width="50%"
  @close="adddialogcolsed">
  <!-- 内容主体区域 -->
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <!-- 底部按钮区域 -->
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="adddialogVisible = false">取 消</el-button> -->
    <!-- <el-button type="primary" @click="addUser">确 定</el-button> -->
    <button id="btn1">确 定</button>
    <button id="btn2">取 消</button>
  </span>
</el-dialog>

<!--编辑用户信息对话框 -->
<el-dialog title="编辑用户" :visible.sync="adddialogVisible_edit" @close="editFormcolsed">
  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="editForm.username" :readonly="readOnly" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="editForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="editForm.mobile"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible_edit = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </div>
</el-dialog>

<!--删除用户信息对话框 -->
<el-dialog title="删除用户" :visible.sync="adddialogVisible_delete" @close="deleteFormcolsed">
  <el-form :model="delForm" ref="delFormRef" label-width="70px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="delForm.username" :readonly="readOnly"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="delForm.email" :readonly="readOnly"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="delForm.mobile" :readonly="readOnly"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible_delete=false">取 消</el-button>
    <el-button type="primary" @click="delUserInfo">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 控制允许只读变量
      readOnly: true,
      // 获取用户列表时的查询对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条消息
        pagesize: 2
      },
      // 用户列表
      userList: [],
      // 用户总数
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      adddialogVisible_add: false,
      adddialogVisible_edit: false,
      adddialogVisible_delete: false,
      adddialogVisible_select: false,
      // 这是添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 这是添加表单的验证规则对象
      addFormRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 10,
          message: '用户名长度为3~10字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 15,
          message: '密码长度为6~15字符',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 15,
          message: '密码长度为6~15字符',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 15,
          message: '手机号长度为6~15字符',
          trigger: 'blur'
        }]
      },
      // 这是编辑用户的表单数据
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 这是编辑表单的验证规则对象
      editFormRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 10,
          message: '用户名长度为3~10字符',
          trigger: 'blur'
        }],
        password: [{
          required: false
        }],
        email: [{
          required: false
        }],
        mobile: [{
          required: false
        }]
      },
      // 这是删除用户的表单数据
      delForm: {
        username: '',
        email: '',
        mobile: ''
      }
    }
  },

  created () {
    this.getUseList()
  },

  mounted () {
    const btn1 = document.getElementById('btn1')
    const btn2 = document.getElementById('btn2')
    btn1.addEventListener('click', this.addUser)
    btn2.addEventListener('click', this.close)
  },

  methods: {
    // 获取用户列表
    async getUseList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.erorr('用户列表获取失败！')
      // console.log(res.data.users)
      // console.log(res.data.total)
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize// newSize为当前选择的新页数，将其传给queryInfo,再重新请求一次数据即可
      this.getUseList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUseList()
    },
    // 监听 switch开关 状态的改变
    async userStateChange (userinfo) {
      // console.log(userinfo)
      // 会返回一个Promise对象 为了简化处理Promise对象的过程所以在这里可以加async和await；最后又将data解构出来重新命名为res
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      // console.log(res)
      // console.log(typeof this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`))
      // console.log(this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`))
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.erorr('状态修改失败！')
      }
      this.$message.success('状态修改成功！')
    },
    // dialog的列表项重置
    adddialogcolsed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户功能
    addUser () {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return 0
        const { data: res } = await this.$http.post('users', this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) this.$message.error('添加失败！')
        this.$message.success('添加成功！')
        this.getUseList()
        this.adddialogVisible_add = false
      })
    },
    // 编辑用户信息前展示已有信息
    async showEditInfo (id) {
      this.adddialogVisible_edit = true
      const { data: res } = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) this.$message.error('请求失败！')
      this.$message.success('获取信息成功！')
      this.editForm = res.data
    },
    // 提交编辑过的信息
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return 0
        await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        // console.log(res.meta.status)
        // 关闭dialog
        this.adddialogVisible_edit = false
        // 刷新列表
        this.getUseList()
      })
    },
    // 如果没有提交需要刷新表单
    editFormcolsed () {
      this.$refs.editFormRef.resetFields()
    },
    deleteFormcolsed () {
      this.$refs.delFormRef.resetFields()
    },
    // 删除用户信息前展示已有信息
    async showDelInfo (id) {
      this.adddialogVisible_delete = true
      const { data: res } = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) this.$message.error('请求失败！')
      this.$message.success('获取信息成功！')
      this.delForm = res.data
    },
    // 提交删除过的信息
    delUserInfo () {
      this.$refs.delFormRef.validate(async valid => {
        if (!valid) return 0
        const { data: res } = await this.$http.delete('users/' + this.delForm.id)
        if (res.meta.status !== 200) return this.$message.erorr('用户列表获取失败！')
        this.$message.success('删除成功！')
        this.adddialogVisible_delete = false
        // 刷新列表
        this.getUseList()
      })
    },
    // 取消按钮功能实现
    close () {
      this.adddialogVisible_add = false
    }
  }
}

</script>

<style lang="less" scoped>
#btn1{
  margin: 20px;
  font-size:20px;
}
#btn2{
  margin: 20px;
  font-size:20px;
}
</style>
