const express = require('express')
const router = require('./utils/router')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
// 解析token插件
const jwt = require('express-jwt')
const CONST_DATA = require('./utils/const-data')

app.use(cors())
app.use(bodyParser.json({
  limit: '2100000kb'
}))
// 1. 使用中间件解析token使用 .unless; 2. 排除无需校验的路由(比如: 登录)
const jwtParams = {
  secret: CONST_DATA.SECRET_KEY,
  algorithms: ['HS256'] // 使用何种加密算法解析
}
app.use(
  jwt(jwtParams).unless({
    path: CONST_DATA.VISA_GREE
  }) // 无需校验的页面
)
app.use(router)

// 错误中间件
app.use((err, req, res, next) => {
  let code = 500;
  let msg = '服务器异常，请稍后重试';
  // token解析的错误
  if (err.name === 'UnauthorizedError') {
    code = 403
    msg = '登录失效，请登录'
  }
  res.statusCode = code;
  res.send({
    code,
    msg
  })
})

app.listen(3000, () => {
  console.log('服务器开启成功~~')
})