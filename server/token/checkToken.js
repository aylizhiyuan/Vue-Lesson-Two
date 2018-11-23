module.exports = async ( ctx, next ) => {
  const XToken = ctx.get('X-Token');
  if (XToken === '') {
    ctx.throw(401, "no token detected in http header 'X-Token'");
  }
  let tokenContent;
  try {
    tokenContent = await jwt.verify(XToken, 'secret');     //如果token过期或验证失败，将抛出错误
  }catch(err){
    ctx.throw(401, 'invalid token');
  }
  await next();
}
