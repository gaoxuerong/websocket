const express = require('express')
const app = new express()
app.use(express.static(__dirname))
app.get('/clock',function(req,res){
    res.send(new Date().toTimeString())
})
app.listen(8000)