const mysql = require('mysql')

const sqlConfig = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sxiagn_website_api',
  useConnectionPooling: true
}
let connection = mysql.createConnection(sqlConfig)
connection.connect(handleErro)
connection.on('error', handleErro)

function handleErro(err) {
  if (!err) return
  // 如果是连接断开，自动重新连接
  const errCodeList = ['PROTOCOL_CONNECTION_LOST', 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR', 'ETIMEDOUT']
  errCodeList.includes(err.code) ? connection.connect(): console.error('数据库报错', err.stack || err)
}
module.exports = connection