const express = require('express')
const router = require('./utils/router')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json({limit : '2100000kb'}))
app.use(router)

app.listen(3000, () => {
  console.log('服务器开启成功~~')
})