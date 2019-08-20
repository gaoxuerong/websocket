let express = require('express');
let app = express();
app.use(express.static(__dirname));
// let websocketserver = require('ws').Server
// let server = new websocketserver({port: 8888})
// server.on('connection', function(socket){
//   console.log(`2.server 监听到了客户端的连接`)
//   socket.on('message',function(message) {
//     console.log(`4.客户端传过来的消息：${message}`)
//     socket.send(`5.server said: ${message}`)
//   })
// })
app.listen(3000);