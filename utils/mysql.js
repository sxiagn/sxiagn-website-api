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
// 监听连接失败，失败后重新连接
connection.on('error', handleErro)

function handleErro(err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connection.connect();
    } else {
      console.error('数据库报错', err.stack || err);
    }
  }
}
module.exports = connection