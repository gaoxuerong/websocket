let  express = require('express');
let app = express();
app.use(express.static(__dirname));
const SseStream = require('ssestream');
let sendCount = 1;
app.get('/eventSource',function(req,res){
    const sseStream = new SseStream(req);
    sseStream.pipe(res);
    const pusher = setInterval(() => {
      sseStream.write({
        id: sendCount++,
        event: 'message',
        retry: 20000, // 告诉客户端,如果断开连接后,20秒后再重试连接
        data: {ts: new Date().toTimeString()}
      })
      sseStream.write({
        id: sendCount++,
        event: 'foo',
        retry: 20000, // 告诉客户端,如果断开连接后,20秒后再重试连接
        data: {ts:`gaoxuerong`}
      })
    }, 1000)

    res.on('close', () => {
      clearInterval(pusher);
      sseStream.unpipe(res);
    })
});
app.listen(8888);