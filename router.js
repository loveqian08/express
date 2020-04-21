var express = require('express')
// var Student = require('./http')
var Student = require('./student')
var bodyParser = require('body-parser')

// 创建一个路由容器
var router = express.Router()
// router.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// router.use(bodyParser.json())


// router.get('/', function(req, res, next) {
//   console.log(req.query)
//   var data = {currentPage:req.query.currentPage ,totalPages:0}
//   Student.find({})
//     .skip(Number(req.query.currentPage - 1) * 2)
//     .limit(parseInt(2))
//     .exec((err, doc) => {
//     if (err) {
//           res.json({
//               status: 400,
//               msg: JSON.stringify(err)
//           });
//       } else {
//         console.log(doc)
//           res.render('index.html', {
//             fruits: [
//               '苹果',
//               '香蕉',
//               '橘子'
//             ],
//             students: doc
//           })
//       }
//   })
// })

router.get('/', function(req, res, next) {
  var totalPages
  Student.find({})
    .exec((err, doc) => {
    if (err) {
          res.json({
              status: 400,
              msg: JSON.stringify(err)
          });
      } else {
        let limit = req.query.limit || 4 
        totalPages = Math.ceil(doc.length / limit)
        Student.find({})
          .skip(Number(req.query.currentPage - 1) * limit)
          .limit(parseInt(limit))
          .exec((err, doc) => {
          if (err) {
                res.json({
                    status: 400,
                    msg: JSON.stringify(err)
                });
            } else {
                // console.log(doc)
                res.render('index.html', {
                  fruits: [
                    '苹果',
                    '香蕉',
                    '橘子'
                  ],
                  students: doc,
                  currentPage: req.query.currentPage ? req.query.currentPage : 1,
                  totalPages: totalPages
                })
            }
        })
      }
  })
  
})



router.get('/students/new', function (req1, res) {
  res.render('new.html', {
    currentPage: req1.query.currentPage
  })
  let page = req1.query.currentPage
  // 新增就是save 
  router.post('/students/new', function (req, res) {
    Student.find(function (err, students) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      
      let obj = req.body
      obj.index = students.length
      new Student(obj).save(function (err) {
        if (err) {
          return res.status(500).send('Server error.')
        }
        res.redirect(`/?currentPage=${page}`)
      })
    })
  })
})

// 跳转到编辑页面
var pageNum
router.get('/students/edit', function (req1, res) {
  
  let id = req1.query.id.replace(/'/g, '')
  
  Student.findById(id, function(err, data) {
    pageNum  = req1.query.currentPage
    console.log('get的页面是' + pageNum) 
    if (err) throw err
    res.render('edit.html', {
      student: data
    })
    
  })
})
// 编辑更新学生
router.post('/students/edit', function (req, res) {
  let id = req.body.id.replace(/'/g, '')
  console.log('post的页面是' + pageNum)
  Student.findByIdAndUpdate(id, req.body, function(err) {
    if (err) return res.status(500).send('Server error')
    res.redirect(`/?currentPage=${pageNum}`)
  })
})

// 编辑更新学生
// router.post('/students/edit', function (req, res) {
//   let id = req.body.id.replace(/'/g, '')
//   console.log(req.body)
//   Student.findByIdAndUpdate(id, req.body, function(err) {
//     if (err) return res.status(500).send('Server error')
//     res.redirect('/')
//   })
// })

// 删除学生
router.get('/delete', function (req, res) {
  let id = req.query.id.replace(/'/g, '')
  Student.findByIdAndRemove(id, function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    Student.find(function (err, students) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      
      res.render('index.html', {
        fruits: [
          '苹果',
          '香蕉',
          '橘子'
        ],
        students: students
      })
    })
  })
})


// 分页
function setPage(pageCurrent, pageSum, callback) {
  $(".pagination").bootstrapPaginator({
      //设置版本号
      bootstrapMajorVersion: 3,
      // 显示第几页
      currentPage: pageCurrent,
      // 总页数
      totalPages: pageSum,
      //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
      onPageClicked: function (event,originalEvent,type,page) {
          // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
          currentPage = page
          callback && callback()
      }
  })
}

// 3. 把 router 导出
module.exports = router