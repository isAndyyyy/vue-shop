<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
           </div>
        <!-- 登录表单区域 -->
        <!-- 通过引用ref的方法重置表单 -->
    <el-form ref="loginFormRef"  :model="loginform" :rules="loginFormRules" label-width="0" class="login_form">
        <!-- 用户名 -->
       <el-form-item prop="username"><!--长度验证加在item上不是input上-->
           <el-input prefix-icon="el-icon-s-custom" v-model="loginform.username"></el-input>
       </el-form-item>
       <!-- 密码 -->
        <el-form-item prop="passwords"><!--长度验证加在item上不是input上-->
           <el-input prefix-icon="el-icon-lock" v-model="loginform.password" type="password"> </el-input>
       </el-form-item>
       <!-- 按钮区域 -->
       <el-form-item class="btns">
           <el-button type="primary" @click="login">登录</el-button>
           <el-button type="info" @click="resetLoginForm">重置</el-button>
       </el-form-item>
   </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginform: {
        username: 'admin',
        password: '123456'
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 10,
          message: '长度在 5 到 10 个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 10,
          message: '长度在 5 到 10 个字符',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮
    resetLoginForm () {
      // 表单重置 利用resetFields函数
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // this.loginLoading = true
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return (this.loginLoading = false)
        }
        const { data: res } = await this.$http.post('login', this.loginform)
        if (res.meta.status !== 200) {
          // this.loginLoading = false
          // console.log('登录失败')
          return this.$message.error('登录失败 帐号或密码错误!')
        }
        this.$message.success('登录成功!')
        // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
        //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式路由导航跳转到后台主页,路由地址是 /home
        this.$router.push('/home')
        // this.loginLoading = false

        // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
        //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
        // window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式路由导航跳转到后台主页,路由地址是 /home
        // this.$router.push('/home')
        // this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login_container {
        background: #2b4b5b;
        height: 100%;
    }

    .login_box {
        height: 300px;
        width: 450px;
        background: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .avatar_box {
            height: 130px;
            width: 130px;
            border: 1px solid#eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>
