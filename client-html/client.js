(function () {

  // 挂载全局的对象
  window.Chat = {
    // 内部变量
    userId: null,  // 当前用户id
    username: null,  // 当前用户 username
    msgHtmlObj: document.getElementById('message-box'),
    socket: null,  // socket链接

    genUid() {
      // 时间和随机数生成 uid
      return new Date().getTime() + '_' + Math.floor(Math.random() * 123 + 123)
    },

    scrollToBottom() {
      // 浏览器滚动条在信息html的最底部
      window.scroll(0, this.msgHtmlObj.clientHeight)
    },

    updateSysMsg(o, action) {
      // 更新页面系统信息 - 用户加入
      let onLineCount = o.onLineCount
      let onLineUsers = o.onLineUsers
      let user = o.user

      // 添加在线人数 html
      let userHtml = ''
      for (key in onLineUsers) {
        userHtml += onLineUsers[key] + '、'
      }
      document.getElementById('onLintCount').innerHTML = `当前共有${onLineCount}人，在线列表：${userHtml.slice(0, -1)}`

      // 添加系统消息
      let sysHtml = `
      <div class='msg-system'>${user.username} ${action === 'login' ? '加入了聊天室' : '退出了聊天室'}</div>
      `
      let section = document.createElement('section')
      section.className = 'system'
      section.innerHTML = sysHtml
      this.msgHtmlObj.appendChild(section)
      // 修改滚动条位置
      this.scrollToBottom()
    },

    buildSocket() {
      // 创建 socket 链接
      _this = this
      this.socket = io.connect('http://127.0.0.1:3001')

      this.socket.on('connect', () => {
        console.log('connected!')
      })

      // 告诉服务器用户登录，发送login事件
      // console.log('emit login')
      this.socket.emit('login', {
        username: this.username,
        userId: this.userId
      })
      // console.log('on login')
      // 前端监听新用户登录
      this.socket.on('login', function (o) {
        // console.log('on login ---- ', o)
        _this.updateSysMsg(o, 'login')
      })

      // 收到消息，显示消息
      this.socket.on('message', (msg) => {
        _this.showMassages(msg)
      })

      // 监听用户退出
      this.socket.on('logout', (o) => {
        _this.updateSysMsg(o, 'logout')
      })
    },
    showMassages(msg) {
      _this = this
      console.log('get msg ---', msg)
      let contentDiv = `<div>${msg.content}</div>`
      let usernameDiv = `<span>${msg.username}</span>`

      let isSame = msg.userId === Chat.userId ? true : false
      let section = document.createElement('section')
      if(isSame) {
        section.className = 'user'
        section.innerHTML = contentDiv + usernameDiv
      } else {
        section.className = 'service'
        section.innerHTML = usernameDiv + contentDiv
      }
      _this.msgHtmlObj.appendChild(section)
      _this.scrollToBottom()
    },
    init(username) {
      // 初始化
      /**
       * 客户端根据时间和随机数生成 uid，这样使得聊天室的用户名称可以重复
       * 在实际的项目中，用户登录以后，可以直接使用用户的uid作为标识
       */
      this.userId = this.genUid()
      // console.log('uid', this.userId)
      this.username = username
      // 添加用户名信息
      document.getElementById('showUsername').innerHTML = this.username
      // socket 链接
      this.buildSocket()

    },

    logout() {
      // 退出
      console.log('退出 --- ')
      // this.socket.emit('disconnect') // 退出的 disconnect 是系统自带的
      // 退出只是简单的刷新
      location.reload()
    },

    submitUsername() {
      // 用户登录
      let username = document.getElementById('username').value
      console.log('submitUsername username', username)
      if (username !== '') {
        // 清空 username的值
        document.getElementById('username').value = ''
        // 隐藏 login框 显示聊天室
        document.getElementById('loginbox').style.display = 'none'
        document.getElementById('chatbox').style.display = 'block'
        // 初始化聊天室
        this.init(username)
      }
    },

    submitContent() {
      console.log('提交聊天内容')
      let content = document.getElementById('content-words').value
      console.log('content', content)
      if (content !== '') {
        let obj = {
          userId: this.userId,
          username: this.username,
          content: content
        }
        this.socket.emit('message', obj)
      }
      // 清空输入框
      document.getElementById('content-words').value = ''
    },
  }
  // 本地调试
  // let username = 'jean'
  // Chat.init(username)
})()