'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);

  // socket.io 的路由
  io.route('chat', io.controller.chat.testChat);
  io.of('/chat').route('chat', io.controller.chat.testChat);
};
