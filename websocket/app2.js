let net = require('net')
let server = net.createServer((function(socket){

}))
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