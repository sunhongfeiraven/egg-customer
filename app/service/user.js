'use strict';

const { Service } = require('egg');
const { SUCCESS, ERROR } = require('../uitl/uitl');

class UserService extends Service {
  async login(request) {
    const { ctx } = this;
    const { userName, password } = request;
    const result = await ctx.model.User.find({ userName, password });
    if (result && result.length > 0) {
      return SUCCESS;
    }
    return ERROR;
  }

  async create(request) {
    const { ctx } = this;
    if (!request) {
      return;
    }
    const result = await ctx.model.User.create(request);
    return result;
  }
}

module.exports = UserService;
