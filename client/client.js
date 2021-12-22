(function () {
  console.log('asdasd')

  const socket = io.connect('http://127.0.0.1:3000')
  console.log('socket ----', socket)
  socket.on('connect', () => {
    console.log('如果链接成功则打印 ----')
    socket.emit('chat', 'hello connected')
  })
  // 前端没有链接成功
  socket.on('res', msg => {
    console.log(`res from server${msg}`)
  })
})()