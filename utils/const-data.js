module.exports = {
  SECRET_KEY: 'sxiagn-website-token',
  VISA_GREE: [ // 不需要校验的路由
    '/article/login',
    '/problem/feedback',
    '/article/list/byTextType',
    '/article/getAllArticleList',
    '/article/details',
    '/article/getHotArticleList',
    '/article/getAllProblemList',
    '/covid/pandemic/list'
  ],
  ERR_CODE_LIST: ['PROTOCOL_CONNECTION_LOST', 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR', 'ETIMEDOUT']
}