<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-menu router  @select="handleSelect" :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/register">注册</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-main class="bg-dark">
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form :model="loginForm" :rules="rules"  class="loginform" :label-position="'left'" label-width="80px" ref="loginForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('loginForm')">登录</el-button>
              <el-button type="danger" @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
  //发请求的文件引入进来
  import request from '../utils/request'
  export default {
    name: "Login",
    data(){
      return {
        activeIndex:"/login",
        loginForm:{
          username:'',
          password:''
        },
        rules:{
          username:[
            {required:true,message:"请输入用户名",trigger:'blur'},
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
          ]
        }
      }
    },
    methods:{
      handleSelect:function(key,keypath){
        console.log(keypath);
      },
      resetForm:function(formName){
        //清空表单数据
        this.$refs[formName].resetFields();
      },
      //发送表单数据
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //验证成功
            request({
              url:'/api/login',
              method:'post',
              data:this.loginForm
            }).then(({data})=>{
              if(data.success){
                //登录成功
                //1.把token存到cookies或者是sessionstorage/localstorage里面去,用户名也得存进去store
                this.$store.dispatch('UserLogin',data.token)
                this.$store.dispatch('UserName',data.username)
                //2.跳转到首页
                this.$router.push('/')
              }else{
                this.$message.info(data.message)
              }
            }).catch(err=>{
              console.log(err);
            })
          }else{
            return false
          }
        })
      }
    }
  }
</script>

<style scoped type="text/scss">
  .el-row {
    margin-bottom:20px;
  &:last-child {
     margin-bottom:0;
   }
  }
  .bg-dark {
    background:#f1f1f1;
  }
</style>
