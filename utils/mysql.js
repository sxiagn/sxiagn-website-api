const mysql = require('mysql')

const sqlConfig = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sxiagn_website_api'
}
let connection = mysql.createConnection(sqlConfig)
connection.connect()
// 监听连接失败，失败后重新连接
connection.on('error', err =>{
  if (err) connection = mysql.createConnection(sqlConfig)
})
module.exports = connection