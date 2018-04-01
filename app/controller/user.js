'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
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
}

module.exports = UserController;
