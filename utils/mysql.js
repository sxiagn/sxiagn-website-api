const mysql      = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sxiagn_website_api'
})

connection.connect()

module.exports = connection