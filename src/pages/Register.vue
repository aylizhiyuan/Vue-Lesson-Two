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
              <el-form :model="regForm" class="regform" :rules="rules" :label-position="'left'" label-width="80px" ref="regForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="regForm.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="regForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                  <el-input v-model="regForm.checkPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="submitForm('regForm')">注册</el-button>
                  <el-button type="danger" @click="resetForm('regForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-main>
    </div>
</template>

<script>
    //引入request发请求的axios实例
    import request from '@/utils/request'
    export default {
      name: "Register",
      data(){
        //第一次输入密码的自定义验证规则
        let validatorPass1 = (rule,value,callback)=>{
          //console.log(value);
          //密码必须是数字和字母的组合，密码的字符不能是空格，不能是中文，而且长度必须在6-16位
          let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
          if(!reg.test(value)){
            callback(new Error('密码必须是数字和字母的组合,长度6-16位'))
          }else{
            callback()
          }
        };
        //第二次输入密码的时候
        let validatorPass2 = (rule,value,callback)=>{
          if(value !== this.regForm.password){
            callback(new Error('两次密码输入一样,请重新输入'))
          }else{
            callback();
          }
        };
        return {
          //绑定的表单数据
          regForm:{
            username:'',
            password:'',
            checkPassword:''
          },
          //当前切换的导航
          activeIndex:"/register",
          //表单验证规则
          rules:{
            //用户名的验证规则
            username:[
              {required:true,message:"请输入用户名",trigger:'blur'},
              {min:6,max:16,message:'用户名必须在6-16位之间',trigger:'blur'}
            ],
            //密码的验证规则
            password:[
              {required:true,message:'请输入密码',trigger:'blur'},
              //自定义的验证规则
              {validator:validatorPass1,trigger:'blur'}
            ],
            //确认密码的验证规则
            checkPassword:[
              {required:true,message:'请输入确认密码',trigger:'blur'},
              {validator:validatorPass2,trigger:'blur'}
            ]
          }
        }
      },
      methods:{
        handleSelect:function(key,keypath){
          //console.log(keypath);
        },
        //重置表单数据
        resetForm:function(formName){
          //清空表单数据
          this.$refs[formName].resetFields();
        },
        //发送表单数据
        submitForm:function(formName){
            this.$refs[formName].validate((valid)=>{
              if(valid){
                //验证规则成功之后，再进行发送请求
                request({
                  url:'/api/register',
                  method:'post',
                  data:this.regForm
                }).then(({data})=>{
                  let success = data.success; //成功与否的布尔值
                  let message = data.message;
                  let userInfo = data.data; //用户的信息
                  if(success){
                    //成功后跳转
                    this.$router.push('/login');
                  }else{
                    //失败后给出错误提示
                    this.$message.success(message);
                  }
                }).catch(err=>{
                  console.log(err);
                })
              }else{
                //console.log('验证失败');
                return false;
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
