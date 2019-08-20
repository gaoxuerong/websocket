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
        socket.on('data', function() {

        })
      }
    }
  })
}))

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