
var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')

http.createServer(function(req, res){
  var pathObj = url.parse(req.url, true)
  console.log(pathObj)

  switch (pathObj.pathname) {
    case '/loadmore':

      var curIdx = pathObj.query.index//重0开始加载数据
      var len = pathObj.query.length//每次加载的长度为5
      var data = []

      for(var i = 0; i < len; i++) {
        data.push('新闻' + (parseInt(curIdx) + i))
      }
      res.end(JSON.stringify(data))
        console.log(data)
      break;

    default:
     fs.readFile(path.join(__dirname , pathObj.pathname), function(err, data){
      if(err){
        res.statusCode = 404
        res.end('Not found')
      }else{
        res.end(data)
      }
     })
      
  }
}).listen(9292)


