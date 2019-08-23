const express = require('express');
const path = require('path');
const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve('index.html'));
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const SYSTEM = '系统';
io.on('connection', function (socket) {
  let username;
  socket.on('message', function (msg) {
    if (username) {
      let result = msg.match(/@([^ ]+) (.+)/);
      if (result) {

      } else {
        socket.emit('message', {
          user: username,
          content: msg,
          createAt: new Date()
      });
      }
    } else {
      username = msg;
      socket[username] = socket;
      socket.broadcast.emit('message', { user: SYSTEM, content: `${username}加入了聊天室`, createAt: new Date() });
    }
  });
});
server.listen(3000);