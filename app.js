/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */

var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
// var favicon = require('serve-favicon')
var path = require('path')
var app = express()

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router)


// app.use(function (req, res, next) {
//   res.locals.createPagination = function (pages, page) {
//     var url = require('url'),
//       qs = require('querystring'),
//       params = qs.parse(url.parse(req.url).query),
//       str = '',
//       list_len = 2,
//       total_list = list_len * 2 + 1,
//       j = 1,
//       pageNo = parseInt(page);
//     if (pageNo >= total_list) {
//       j = pageNo - list_len;
//       total_list = pageNo + list_len;
//       if (total_list > pages) {
//         total_list = pages;
//       }
//     } else {
//       j = 1;
//       if (total_list > pages) {
//         total_list = pages;
//       }
//     }
//     params.page = 0
//     for (j; j <= total_list; j++) {
//       params.page = j
//       clas = pageNo == j ? "active" : "no"
//       str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">' + j + '</a></li>'
//     }
//     return str
//   }


app.listen(3000, function () {
  console.log('running 3000...')
})

module.exports = app
