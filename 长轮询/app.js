const express = require('express')
const app = new express()
app.use(express.static(__dirname))
app.get('/clock',function(req,res){
    let timer = setInterval(()=>{
        let date = new Date()
        let seconds = date.getSeconds()
        if(seconds%5 === 0) {
            res.send(new Date().toTimeString())
            clearInterval(timer)
        }
    },1000)
})
app.listen(3000)