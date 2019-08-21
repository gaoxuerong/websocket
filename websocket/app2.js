let net = require('net')
let crypto = require('crypto')
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
let server = net.createServer((function(socket){
  socket.once('data',function(data){
    data = data.toString()
    console.log(data)
    if(data.match(/Connection: Upgrade/)){
      let rows = data.split('\r\n')
      rows = rows.slice(1,-2)
      let headers = {}
      headers = rows.reduce((pre,item) => {
        let [key, value] = item.split(': ')
        pre[key] = value
        return pre;
      },headers)
      if(headers['Sec-WebSocket-Version'] == 13) {
        let setSecWebSocketKey = headers['Sec-WebSocket-Key']
        let SecWebSocketAccept = crypto.createHash('sha1').update(setSecWebSocketKey+CODE).digest('base64')
        let response = [
          'HTTP/1.1 101 Switching Protocols',
          'Upgrade: websocket',
          'Connection: Upgrade',
          `Sec-WebSocket-Accept: ${SecWebSocketAccept}`,
          '\r\n'
        ].join('\r\n')
        socket.write(response)
        socket.on('data', function(buffers) {
          //<Buffer 81 87 9d af 63 f7 ae 81 0b 92 f1 c3 0c>
          let _fin = buffers[0]&0b10000000 == 0b10000000 // 结束位是false还是true
          let _opcode = buffers[0]&0b00001111 // 操作码
          let _isMask = buffers[1]&0b10000000 == 0b10000000 // 是否进行了掩码
          let _PayloadLen = buffers[1]&0b01111111
          let _mask = buffers.slice(2,6)
          let _Payload = buffers.slice(6)
          unmask(_Payload, _mask);
          //向客户端响应数据
          let response = Buffer.alloc(2 + _PayloadLen);
          response[0] = _opcode | 0b10000000;//1表示发送结束
          response[1] = _PayloadLen;//负载的长度
          _Payload.copy(response, 2);
          socket.write(response);
        })
      }
    }
  })
}))
function unmask(buffer, mask) {
  const length = buffer.length;
  for (let i = 0; i < length; i++) {
      buffer[i] ^= mask[i%4];
  }
}
server.listen(9999);






/** 请求头
 * GET ws://localhost:8888/ HTTP/1.1
Host: localhost:8888
Connection: Upgrade
Upgrade: websocket
Origin: http://localhost:3000
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: ysgmOgOncEPMkvoXaWMBVQ==
 */

/** 响应头
  * HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: c2eo69gcW5EUVI98zvzPCKNilYE=
  */