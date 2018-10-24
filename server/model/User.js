const mongoose = require('mongoose')
//创建我们的数据库集合的架构
//这里面，指定集合里面的字段，字段的类型
const UserSchema = new mongoose.Schema({
  //常用的数据类型
  //1.String
  //2.Number
  //3.Date
  //4.Boolean
  //5.ObjectID
  //6.Array
  username:String,
  password:String,
  token:String,
  create_time:String
})
//可以添加一些自定义的实例方法
UserSchema.statics = {
  getUserByName:function(username){
    return new Promise((resolve,reject)=>{
      User.findOne({username},(err,doc)=>{
        if(err){
          reject(err)
        }else{
          resolve(doc)
        }
      })
    })
  }
}


//生成模型，说白了，就是创建一个集合
//第一个参数是模型的名字，集合的名字
//第二个参数是集合使用的架构
const User = mongoose.model('User',UserSchema)
module.exports = User

//总结：所有的操作都是在User模型上的
//例如查询的时候User.find()
//例如修改的时候User.update()
//删除的时候User.delete()
//添加的时候 let newUser = new User() -----> newUser.save()


