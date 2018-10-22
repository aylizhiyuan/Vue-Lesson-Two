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
              <el-form class="regform" :label-position="left" label-width="80px" ref="regForm">
                <el-form-item label="用户名">
                  <el-input type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                  <el-input type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success">注册</el-button>
                  <el-button type="danger">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-main>
    </div>
</template>

<script>
    export default {
      name: "Register",
      data(){
        return {
          activeIndex:"/register"
        }
      },
      methods:{
        handleSelect:function(key,keypath){
          console.log(keypath);
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
