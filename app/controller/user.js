'use strict';

const { Controller } = require('egg');
const { SUCCESS } = require('../uitl/uitl');

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.user.login(body);
    ctx.response.body = result;
  }

  async create() {
    const { ctx } = this;
    const { body } = ctx.request;
    ctx.validate({
      userName: { type: 'string', required: true },
      password: { type: 'string', required: false },
    });
    const result = await ctx.service.user.create(body);
    ctx.response.body = result;
  }

  async fetch() {
    const { ctx } = this;
    ctx.response.body = Object.assign(SUCCESS, {
      data: {
        name: '孙晓玲',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        notifyCount: 12,
      },
    });
  }
}

module.exports = UserController;
