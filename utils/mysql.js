const mysql = require('mysql')
const CONST_DATA = require('./const-data')
const sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sxiagn_website_api',
  useConnectionPooling: true
}
let connection = null;
const handleDisconnection = () => {
  connection = mysql.createConnection(sqlConfig)
  connection.connect(err => {
    err && setTimeout('handleDisconnection()', 2000)
  });
  connection.on('error', err => {
    CONST_DATA.ERR_CODE_LIST.includes(err.code) ? handleDisconnection() : console.log('服务器错误', err)
  });
}
handleDisconnection()

module.exports = connection