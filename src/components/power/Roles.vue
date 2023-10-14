<template>
  <div>
   <!-- 面包蟹区域 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
   </el-breadcrumb>
   <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮区 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogVisible_add=true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope"><!-- 作用域插槽 -->
           <el-row :class="['bdbottom',i1===0?'bdtop':'']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
             <!-- 渲染一级权限 -->
             <el-col :span="5">
              <el-tag>
                {{ item1.authName }}
                <i class="el-icon-close"></i>
              </el-tag>
                <i class="el-icon-caret-right"></i>
             </el-col>
             <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
              <!-- 通过for循环 嵌套循环二级权限 -->
              <el-row :class="[i2===0?'':'bdtop']" v-for="(item2,i2) in item1.children" :key="item2.id">
                <el-col :span="6"><!-- 二级权限 -->
                  <el-tag type="success">
                      {{ item2.authName }}
                      <i class="el-icon-close"></i>
                  </el-tag>
                      <i class="el-icon-caret-right"></i>
              </el-col>
                <el-col span="18"><!-- 三级权限 -->
                   <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id">
                       {{ item3.authName }}
                       <i class="el-icon-close"></i>
                   </el-tag>
                </el-col>
              </el-row>
             </el-col>
           </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditInfo(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="showDelInfo(scope.row.id)">删除</el-button>
          <el-button
           size="mini"
           type="warning"
           icon="el-icon-setting"
           @click="showSetRightsdialog(scope.row)"
           >分配权限</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-card>

<!-- 添加角色dialog -->
<el-dialog
  title="添加角色"
  :visible.sync="dialogVisible_add"
  width="50%"
  @close="dialogcolsed_add">
  <!-- 内容主体区域 -->
  <el-form :model="roleAddList" ref="addRolesFormRef" label-width="70px">
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="roleAddList.roleName"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="roleAddList.roleDesc"></el-input>
  </el-form-item>
  </el-form>
  <!-- 底部按钮区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_add = false">取 消</el-button>
    <el-button type="primary" @click="addRole">确 定</el-button>
  </span>
</el-dialog>

<!-- 分配权限dialog -->
<el-dialog title="分配权限" :visible.sync="dialogVisible_setRights" width="500px">
    <el-tree
    :data="rightsList"
    :props="treeProps"
    show-checkbox
    node-key="id"
    default-expand-all
    :default-checked-keys="defKeys"
    ref="treeRef"
    ></el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_setRights = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </div>
</el-dialog>

<!-- 删除角色dialog -->
<el-dialog title="角色删除" :visible.sync="dialogVisible_delete"  ref="delRef">
  <el-form :model="delRoleForm" label-width="70px">
    <el-form-item label="角色名称" prop="roleName" >
      <el-input v-model="delRoleForm.roleName" :readonly="readOnly"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input v-model="delRoleForm.roleDesc" :readonly="readOnly"></el-input>
    </el-form-item>
    <el-form-item label="角色ID" prop="roleId">
      <el-input v-model="delRoleForm.roleId" :readonly="readOnly"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_delete=false">取 消</el-button>
    <el-button type="primary" @click="delUserInfo">确 定</el-button>
  </div>
</el-dialog>

<!-- 编辑角色dialog -->
<el-dialog title="编辑角色" :visible.sync="dialogVisible_edit" @close="editFormcolsed">
  <el-form :model="editForm" ref="editFormRef" label-width="70px">
    <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="editForm.roleName"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="editForm.roleDesc"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_edit = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      rolesList: [],
      rightsList: [],
      dialogVisible_setRights: false,
      dialogVisible_edit: false,
      dialogVisible_delete: false,
      dialogVisible_add: false,
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的结点的id值数组
      defKeys: [],
      roleId: '',
      roleAddList: {
        roleName: '',
        roleDesc: ''
      },
      delRoleForm: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      },
      readOnly: true,
      editForm: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      }
    }
  },
  created () {
    this.getRolesList()
  },

  mounted () {
  },

  methods: {
    // 获得角色列表
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('请求失败！')
      // this.$message.success('请求成功！')
      this.rolesList = res.data
      // console.log(this.rolesList)
    },
    // 首先显示现有权限
    async showSetRightsdialog (role) {
      this.roleId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('请求失败!')
      this.rightsList = res.data
      this.$message.success('列表请求成功!')
      this.getLeafKeys(role, this.defKeys)

      this.dialogVisible_setRights = true

      // console.log(this.rightsList)
      // console.log(this.defKeys)
    },
    // 通过递归的方式,获取角色下所有三级权限的id,并存到defKeys数组中
    getLeafKeys (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      // 递归调度
      node.children.forEach(item =>
        this.getLeafKeys(item, arr))
    },
    async allotRights () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      console.log(idStr)
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) return this.$message.error('权限授权失败!')
      this.$message.success('权限授权成功!')
      this.getRolesList()
      this.dialogVisible_setRights = false
    },
    dialogcolsed_add () {
      this.dialogVisible_add = false
    },
    async addRole () {
      await this.$http.post('roles', this.roleAddList)
      console.log(this.roleAddList)
      this.dialogVisible_add = false
      this.getRolesList()
    },
    async delUserInfo () {
      await this.$http.delete(`roles/${this.delRoleForm.roleId}`)
      this.$message.success('删除成功！')
      console.log(this.delRoleForm.roleId)
      this.dialogVisible_delete = false
      // 刷新列表
      this.getRolesList()
    },
    // 删除用户信息前展示已有信息
    async showDelInfo (id) {
      this.dialogVisible_delete = true
      const { data: res } = await this.$http.get(`roles/${id}`)
      this.$message.success('获取信息成功！')
      this.delRoleForm = res.data
    },
    editFormcolsed () {
      this.$refs.editFormRef.resetFields()
    },
    // 编辑用户信息前展示已有信息
    async showEditInfo (id) {
      this.dialogVisible_edit = true
      const { data: res } = await this.$http.get(`roles/${id}`)
      if (res.meta.status !== 200) this.$message.error('请求失败！')
      this.$message.success('获取信息成功！')
      this.editForm = res.data
    },
    async editUserInfo () {
      await this.$http.put(`roles/${this.editForm.roleId}`,
        {
          roleName: this.editForm.roleName,
          roleDesc: this.editForm.roleDesc
        })
      // console.log(res.meta.status)
      // 关闭dialog
      this.dialogVisible_edit = false
      // 刷新列表
      this.getRolesList()
    }
  }
}

</script>

<style lang="less" scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
border-top: 1px solid #eee;
}

.bdbottom{
border-bottom: 1px solid #eee;
}
</style>
