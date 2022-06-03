const express = require('express')
const connection = require('./mysql')
const comonUtils = require('./common')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// 生成token插件
const jwt = require('jsonwebtoken')
const CONST_DATA = require('./const-data')
const AESUTIL = require('./crypto')

// 根据用户名与密码登录
router.post('/article/login', (req, res) => {
  const { userName, password } = req.body
  if(userName && password) {
    connection.query(`select * from user_info where userName='${AESUTIL.decrypt(userName)}' and password='${AESUTIL.decrypt(password)}'`,  (error, results)=> {
      if(error) {
        comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试')
        return
      }
      if(!results.length) { 
        comonUtils.resSend(res, -1, null, '账号或密码错误')
      } else {
        const token = jwt.sign(  
          { user: { name: userName, password: password } },
          CONST_DATA.SECRET_KEY,
          { expiresIn: '3h' }
        )
        comonUtils.resSend(res, 0, token, '执行成功')
      }
    })
    return
  }
  comonUtils.resSend(res, -1, '请求参数不正确', '执行失败')
})


// 首页问题反馈
router.post('/problem/feedback', (req, res) => {
  const { problemDesc } = req.body
  if(problemDesc) {
    const createTime = comonUtils.getNowFormatDate()
    connection.query(`insert into problem_list(problemDesc,createTime,isFinish) value('${problemDesc}','${createTime}','${false}')`,  (error, results)=> {
      error ? comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试') : comonUtils.resSend(res, 0, null, '执行成功')
    })
    return
  }
  comonUtils.resSend(res, -1, '入参异常，请检查传参是否正确', '执行失败')
})

// 发表文章
router.post('/article/add', async (req, res) => {
  const { title, contentDesc, textType } = req.body
  // console.log('解析token后获取的数据', req.user)
  if(title && contentDesc && textType) {
    const contentStr = comonUtils.setSymbol(contentDesc)
    const newTitle = comonUtils.setSymbol(title)
    const createTime = comonUtils.getNowFormatDate()
    connection.query(`insert into text_list(title,contentDesc,textType,createTime) value('${newTitle}','${contentStr}','${textType}','${createTime}')`, (error, results)=> {
      error ? comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试') : comonUtils.resSend(res, 0, null, '执行成功')
    })
    return
  }
  comonUtils.resSend(res, -1, '入参异常，请检查传参是否正确', '执行失败')
})
// 编辑文章
router.post('/article/edit', async (req, res) => {
  const { title, contentDesc, textType, id } = req.body
  if(title && contentDesc && textType && id) {
    const contentStr = comonUtils.setSymbol(contentDesc)
    const newTitle = comonUtils.setSymbol(title)
    const createTime = comonUtils.getNowFormatDate()
    connection.query(`update text_list set title='${newTitle}',textType='${textType}',contentDesc='${contentStr}',createTime='${createTime}' where id='${id}'`, (error, results)=> {
      error ? comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试') : comonUtils.resSend(res, 0, null, '执行成功')
    })
    return
  }
  comonUtils.resSend(res, -1, '入参异常，请检查传参是否正确', '执行失败')
})

// 根据文章类别查询文章列表
router.get('/article/list/byTextType', (req, res) => {
  const { textType } = req.query
  if(textType) {
    connection.query(`select * from text_list where textType=${textType}`,  (error, results)=> {
      const resultList = textType === '3' ? comonUtils.resSend(res, 0, [], '执行成功') : comonUtils.resSend(res, 0, comonUtils.arraySort(results, 'id', true), '执行成功')
      error ? comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试') : resultList
    })
    return
  }
  comonUtils.resSend(res, -1, '入参异常，请检查传参是否正确', '执行失败')
})

// 获取所有文章
router.get('/article/getAllArticleList', (req, res) => {
  connection.query(`select * from text_list order by id desc`,  (error, results)=> {
    error ? comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试') : comonUtils.resSend(res, 0, results, '执行成功')
  })
})

// 根据文章id查询文章
router.get('/article/details', (req, res) => {
  const { id } = req.query
  if(id) {
    connection.query(`select * from text_list where id=${id}`,  (error, results)=> {
      error ? comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试') : comonUtils.resSend(res, 0, {...results[0]}, '执行成功')
    })
    return
  }
  comonUtils.resSend(res, -1, '入参异常，请检查传参是否正确', '执行失败')
})


// 根据文章id与textType删除文章
router.get('/article/delete/byIdAndTextTye', (req, res) => {
  const { id, textType } = req.query
  if(id && textType) {
    connection.query(`delete from text_list where id='${id}' and textType='${textType}'`,  (error, results)=> {
      error ? comonUtils.resSend(res, -1, null, '服务器异常，请稍后重试') : comonUtils.resSend(res, 0, results, '执行成功')
    })
    return
  }
  comonUtils.resSend(res, -1, '入参异常，请检查传参是否正确', '执行失败')
})

// 图片上传
// router.post('/text/upload', upload.single('fileName'),(req, res) => {
//   const filename = `http://192.168.1.3:3000/`+req.file.filename;
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

setInterval(() => {
  connection.query(`select * from text_list where textType=1`,  (error, results) => {
    console.log('5小时后mysql自动重连成功')
  })
}, 1000*60*60*5);

module.exports = router