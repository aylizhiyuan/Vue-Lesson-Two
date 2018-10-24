//引入数据库连接文件
const db = require('../model/db')
//引入User集合
const User = require('../model/User')
//引入密码加密的模块
const sha1 = require('sha1')
//引入格式化日期的moment模块
const moment = require('moment')
//引入创建token的方法
const createToken = require('../token/createToken')
//post请求/reigster的处理函数
//因为这个处理函数需要将用户名.密码写入数据库，所以呢，我们需要在数据库中创建User集合
//通过controller/user.js这个文件，来对数据库进行增删改查操作....
const register = async ctx=>{
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  //1.判断数据库是否同名的用户，如果存在，则不允许注册
  //2.需要验证下数据的合法性--- validator验证，也可以不验证，保险的话，前端验完，后端再验一次
  //3.注册的时候通过都需要对时间进行格式化/密码进行加密
  //4.将注册用户的信息保存在数据库中
  //5.生成token，将成功的注册信息以及token放回给前端
  let doc = await User.getUserByName(username);
  if(doc){
    //说明数据库中有重名的用户
    //直接返回一个对象，提醒用户不允许重复注册
    ctx.status = 200;
    ctx.body = {
      success:false,
      message:'用户名不允许重复'
    }
  }else{
    //说明数据库里面没有重名的用户
    //可以放心注册了
    //这里一般为了安全，还会对username/password进行二次验证
    //为了节省时间，我就不验证了，可以利用node里面的一个模块
    //可以很方便的进行验证 ---- validator模块

    //也可以使用crypto模块-node原生的加密模块进行加密
    password = sha1(password);
    let date = new Date();
    let create_time = moment(date).format('YYYY-MM-DD HH:mm:ss') //当前时间就被格式化为年月日、时分秒了
    //生成token
    let token = createToken(username)
    //创建新用户
    let newUser = new User({
      username,
      password,
      token,
      create_time
    })
    //将新用户保存到User集合里面
    let userInfo = await new Promise((resolve,reject)=>{
      newUser.save((err,doc)=>{
        if(err){
          reject(err)
        }
        resolve(doc)
      })
    })
    ctx.status = 200;
    ctx.body = {
      success:true,
      message:'注册成功',
      data:userInfo
    }
  }
}
module.exports = {
  register
}
