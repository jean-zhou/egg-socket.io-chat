var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: true })

app.get('/', function (req, res) {
  res.send('<h1>Welcome Realtime Server</h1>')
})

io.on('connection', function(socket) {
  console.log('一个用户链接---')

  socket.on('chat', function(msg) {
    console.log('msg', msg)
    socket.emit('res', 'hello')
  })
})

http.listen(3000, function() {
  console.log('listening on 3000----')
})