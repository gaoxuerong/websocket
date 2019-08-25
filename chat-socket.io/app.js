const express = require('express');
const path = require('path');
const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve('index.html'));
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const SYSTEM = '系统';
let sockets = {}
io.on('connection', function (socket) {
  let username;
  socket.on('message', function (msg) {
    if (username) {
      let result = msg.match(/@([^ ]+) (.+)/);
      if (result) {
        let toUser = result[1]
        let content = result[2]
        let toSocket = socket[toUser]
        toSocket ? toSocket.emit('message', {
          user: username,
          content: msg,
          createAt: new Date()
        }) : socket.send({
          user: SYSTEM,
          content: `你私聊的用户不在线`,
          createAt: new Date()
        });
      } else {
        io.emit('message', {
          user: username,
          content: msg,
          createAt: new Date()
      });
      }
    } else {
      let oldsoket = sockets[msg]
        if(oldsoket){
          socket.emit('message',{ user: SYSTEM, content: `${username} 已经被占用，换个用户名吧`, createAt: new Date() })
        }else {
          username = msg;
          socket[username] = socket;
          socket.broadcast.emit('message', { user: SYSTEM, content: `${username}加入了聊天室`, createAt: new Date() });
        }
    }
  });
});
server.listen(3000);