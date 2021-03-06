'use strict';

// 每一个客户端链接或者退出时的操作，demo 仅打印链接
module.exports = () => {
  return async (ctx, next) => {
    console.log('进入 connection 中间件');
    ctx.socket.emit('res', 'connected!');
    await next();
    // 退出时
    console.log('disconnection');
  };
};
