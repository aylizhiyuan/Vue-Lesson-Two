//引入数据库连接文件
const db = require('../model/db')
const register = async ctx=>{
  console.log(ctx.request.body);
}

module.exports = {
  register
}
