

# egg-socket.io-chat

### socket 使用情况

使用 express 和 socket.io 搭建多人聊天室

使用 express 搭建后台和html搭建前端 —— 可以链接socket

前端使用 socket.io 链接 socket 后台

项目文件：client-html
1，直接使用html即可
2，引入 socket.io 库
3，链接后端端口 io.connect('http://127.0.0.1:3000')

使用 express+ socket.io 搭建socket后台

项目文件：express-socket
1，安装 express + socket.io
2，创建index.js 链接 socket

使用 egg-socket.io搭建后台 egg-socket-client 搭建前端 —— 不能链接socket

# 代码开发笔记

### 1，前端 - div居中

如果需要div水平居中，设置 margin，并且需要给div 一个宽度

```css
    <div style="width: 260px; margin: 200px auto">
      <h3>请输入昵称</h3>
      <input type="text" placeholder="请输入用户名">
      <input type="button" value="提交">
    </div>
```

### 2，前端 - 挂载全局Chat对象

```js
  window.Chat = {
    submitUsername: function() {
      let username = document.getElementById('username').value
      console.log('username', username)
    }
  }
```

### 3，前端 - a 链接 href 

href="javascript:;" ：表示执行js脚本

href="" ： 表示跳转到对应的页面，如果没有跳转链接，则刷新当前页面

```html
<a href="javascript:;" id='logout' onclick="Chat.logout()">退出</a>
<a href="" id='logout' onclick="Chat.logout()">退出</a>
```

### 4，BUG: 两个输入框和提交框重叠

没有找到不重叠的方法 —— css比较差，需要补充

模仿项目的css —— 达到效果

```css
*, *:before, *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;  // 让所有的box 使用的 border-box
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}  

.input-box {
  display: -webkit-box;  // 让 fixed 的两个元素使用 box 
  position: fixed;
  bottom: 0;
  padding: 8px 10px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 1px #000;
}

.input-box .input{
  line-height: 25px;
  -webkit-box-flex: 1;  // 让左边的元素占 flex 1
}

.input input {
  margin:0;
  float: left;
	padding:0 6px;
	height:28px;
	width:93%;   // 左边元素的里面 input 占该父元素的93%
	font-size:14px;
	background-color: #fbfbfb;
	border:none;
	-webkit-border-radius:15px;
	border-radius:15px;
	color:#000;
	box-shadow:0 0 1px #000;
}

.action button {
    border: none;
    border-radius: 30px;
    color: #8c8c8c;
    height: 28px;
    width: 68px;
    text-align: center;
    background: #fbfbfb;
    box-shadow: 0 0 1px #000, 0 2px 2px #eee;
    font-size: 15px;
    float: right;  // 右边的元素右浮动
}

```

### 5，内容区滚动条

```css
body {
  overflow: scroll;
  overflow-x: hidden;
}

#message-box {
  background-color: #efeff4;
  padding-bottom: 100px;
}
```

但是参考项目是内容超过视口才开始有滚动条 —— 不知道是如何做的

### 6，div.robot 是什么语法

给 div.robot  清除浮动

```js
section,div.robot {
  padding:10px;
  clear:both;
}
```

### 7，不同的html更新不一样

如果是页面一开始就有的信息，就需要使用innerHtml 去更新它的html文字

但是如果不是页面已有的信息，而是新加的信息，就需要使用createElement 去添加页面的html元素

—— 所以注意页面的html设计

