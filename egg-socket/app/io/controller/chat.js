'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async testChat() {
    const { ctx } = this;
    const msg = ctx.args[0];
    await ctx.socket.emit('res', `我收到你的消息${msg}`);
  }
}

module.exports = ChatController;
