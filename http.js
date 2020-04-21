var fs = require('fs')

var dbPath = './db.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

exports.addStudent = function (student,callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) return callback(err)
    var students = JSON.parse(students)
    student.id = students[students.length - 1].id++  
    students.push(student)
    var fileDate = JOSN.stringify({students: students})
    fs.writeFile(dbPath, fileDate, function(err) {
      if (err) return callback(err)
      // 成功的话 就没有参数可以穿
      callback(null)
    })
  })
}