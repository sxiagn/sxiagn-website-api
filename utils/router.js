const express = require('express')
const connection = require('./mysql')
const comonUtils = require('./common')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// 首页问题反馈
router.post('/problem/feedback', (req, res) => {
  const { problemDesc } = req.body
  if(problemDesc) {
    const createTime = comonUtils.getNowFormatDate()
    connection.query(`insert into problem_list(problemDesc,createTime,isFinish) value('${problemDesc}','${createTime}','${false}')`,  (error, results)=> {
      if(!error){
        res.send({
          code: 0,
          msg: '执行成功'
        })
      } else{
        res.send({
          code: -1,
          msg: '服务器错误'
        })
      }
    })
  } else {
    res.send({
      code: -1,
      data: '请检查传参',
      msg: '执行失败'
    })
  }
})
// 发表文章
router.post('/add/article', async (req, res) => {
  const { title, contentDesc, textType } = req.body
  const tokenIsValid = await comonUtils.tokenValid(connection, req.headers.authorization)
  if (!tokenIsValid) {
    res.send({
      code: 403,
      msg: '登录失效，请登录'
    })
    return
  }
  if(title && contentDesc && textType) {
    const contentStr = comonUtils.setSymbol(contentDesc)
    const newTitle = comonUtils.setSymbol(title)
    const createTime = comonUtils.getNowFormatDate()
    connection.query(`insert into text_list(title,contentDesc,textType,createTime) value('${newTitle}','${contentStr}','${textType}','${createTime}')`, (error, results)=> {
      if(!error){
        res.send({
          code: 0,
          msg: '执行成功'
        })
      } else{
        res.send({
          code: -1,
          msg: '服务器错误~~'
        })
      }
    })
  } else {
    res.send({
      code: -1,
      data: '请检查传参',
      msg: '执行失败'
    })
  }
})
// 根据文章类别查询文章类别
router.get('/article/list', (req, res) => {
  const { textType } = req.query
  if(textType) {
    connection.query(`select * from text_list where textType=${textType}`,  (error, results)=> {
      if (error) throw error
      if(!error){
        res.send({
          code: 0,
          data: comonUtils.arraySort(results, 'id', true),
          msg: '执行成功'
        })
      } else{
        res.send({
          code: -1,
          msg: '服务器错误'
        })
      }
    })
  }else {
    res.send({
      code: -1,
      data: '请求参数不正确',
      msg: '执行失败'
    })
  }
})
// 根据文章id查询文章
router.get('/article/details', (req, res) => {
  const { id } = req.query
  if(id) {
    connection.query(`select * from text_list where id=${id}`,  (error, results)=> {
      if (error) throw error
      if(!error){
        res.send({
          code: 0,
          data: {
            ...results[0]
          },
          msg: '执行成功'
        })
      } else{
        res.send({
          code: -1,
          msg: '服务器错误'
        })
      }
    })
  }else {
    res.send({
      code: -1,
      data: '请求参数不正确',
      msg: '执行失败'
    })
  }
})
// 根据用户名与密码登录
router.post('/article/login', (req, res) => {
  const { userName, password } = req.body
  if(userName && password) {
    connection.query(`select * from user_info where userName='${userName}' and password='${password}'`,  (error, results)=> {
      if (error) throw error
      if(!results.length) {
        res.send({
          code: -1,
          data: null,
          msg: '账号或密码错误'
        })
      } else {
        console.log('数据', results[0])
        res.send({
          code: 0,
          data: results[0].token,
          msg: '执行成功'
        })
      }
      
    })
  }else {
    res.send({
      code: -1,
      data: '请求参数不正确',
      msg: '执行失败'
    })
  }
})

// 图片上传
// router.post('/text/upload', upload.single('fileName'),(req, res) => {
//   const filename = `http://192.168.1.3:3000/`+req.file.filename;
//   console.log('数据', req)
//   connection.query(`insert into text_list (filename) values('${filename}');`, function (error, results) {
//       if (error == null) {
//               res.send({
//                   msg: "新增成功",
//                   code: 200,
//               });
//       }else{
//           res.send({
//               msg: "服务器内部错误",
//               code: 500
//           });
//       }
//   });
// });

module.exports = router