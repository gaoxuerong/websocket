const express = require('express')
const app = new express()
app.use(express.static(__dirname))
app.get('/clock',function(req,res){
    setInterval(()=>{
      res.write(`
      <script>
        parent.setTime("${new Date().toTimeString()}")
      </script>
      `)
    },1000)
})
app.listen(3000)
// 缺点  浏览器一直处于刷新状态，因为请求一直没有结束