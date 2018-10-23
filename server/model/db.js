const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mylogin')
const db = mongoose.connection

//声明我们使用的promise是ES6里面的promise对象
mongoose.Promise = global.Promise
db.on('error',function(){
  console.log('数据库连接失败')
})
db.on('open',function(){
  console.log('数据库连接成功')
})
