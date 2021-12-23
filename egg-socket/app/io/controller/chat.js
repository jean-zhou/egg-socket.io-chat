'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async testChat() {
    const { ctx } = this;
    const msg = ctx.args[0];
    await ctx.socket.emit('res', `我收到你的消息${msg}`);
  }

  async index() {
    console.log('---进入 chat');
    const message = this.ctx.args[0];
    console.log('chat :', message + ' : ' + process.pid);
    const say = await this.ctx.service.user.say();
    this.ctx.socket.emit('res', say);
  }
}

module.exports = ChatController;
