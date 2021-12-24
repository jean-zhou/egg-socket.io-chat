var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: true })

app.get('/', function (req, res) {
  res.send('<h1>Welcome Realtime Server</h1>')
})

var onLineUsers = {}  // 在线用户
var onLineCount = 0  // 在线用户数量

io.on('connection', function (socket) {
  console.log('一个用户链接成功！');

  // 登录事件
  socket.on('login', function (obj) {
    socket.name = obj.userId
    console.log('userId', socket.name)
    // 检查用户是否在在线列表中，如果不在就加入
    if (!onLineUsers.hasOwnProperty(obj.userId)) {
      onLineUsers[obj.userId] = obj.username
      onLineCount++
    }

    // 广播用户加入
    io.emit('login', {
      onLineCount: onLineCount,
      onLineUsers: onLineUsers,
      user: obj
    })
    console.log(`${obj.username}加入了聊天室`)
  })


  // 前端提交聊天内容
  socket.on('message', msg => {
    console.log('msg', msg)
    // 向所有客户端广播收到的消息
    io.emit('message', msg)
  } )

})

http.listen(3001, function () {
  console.log('listening on 3000----')
})