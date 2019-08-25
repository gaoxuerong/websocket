# 1.http特点
> http是半双工协议，同一时刻只能客户端向服务器发消息，或者服务器向客户端发消息，不能同时进行，而且服务端不能主动推送消息给客户端
# 2.双向通信
> Comet是一种用于web推送的技术，不需要客户端请求，服务端也可以向客户端发消息，目前有三种：轮询，长轮询，ifranme流
## 2.1 轮询
 > 这种方式下客户端服务器会一直连接，每过一段时间就询问一次，这种情况下连接数会很多，一个请求，一个相应。每次请求都会有http的header，会很消耗流量；也会消耗cpu使用率；
## 2.2 长轮询
> 长轮询是对轮询的改进，客户端给服务器发消息，服务端没有新的消息就一直等待，直到有新的数据才会返回客户端，这在某种程度上减少了带宽和cpu使用率，还是挺不错的方法，但是有个问题是http的头部携带大量数据（有400字节左右），但是服务端用到的也就10个字节，这太浪费了；
## 2.3 iframe流
> 通常是在html中放一个隐形的iframe，然后iframe的src指向一个长链接的请求，这样服务端就能源源不断的向客户端推送数据了；
## 2.4 EventSource流
> html5规范中提供了EventSource流，对于客户端很简单，只需监听就行了；SSE也叫做“server-send-event”,就是客户端订阅了服务端的一条流，除非双方一方关闭，不然服务端可以一直推送消息给客户端；EventSource不能跨域，
# 3.websocket（重点来了）
> websocket-API在浏览器端定义了规范，也就是客户端-服务器建立一个socket连接；也就是双方建立了一个持久的连接，可以在任何时候发送数据；此时HTML5在浏览器-服务器支持了全双工通信；websocket属于应用层协议，基于TCP传输协议，复用了http通道；支持跨域；

> 优势：
> - 更好的支持二进制；
> - 双向通信，实时性更好；
> - 控制开销比较小，相比于http协议来说websocket控制头部的数据包比较小
# 4. socket.io(优秀)
> Socket.IO是一个WebSocket库,包括了客户端的js和服务器端的nodejs，它的目标是构建可以在不同浏览器和移动设备上使用的实时应用。特点：`跨平台`，`自适应`，`易用性`