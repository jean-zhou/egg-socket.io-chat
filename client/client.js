(function () {
  console.log('asdasd')

  const socket = io.connect('http://127.0.0.1:7001/chat')
  console.log('socket ----', socket)
  // 前端没有链接成功
  socket.on('res', msg => {
    console.log(`res from server${msg}`)
  })
})()