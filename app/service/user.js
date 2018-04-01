'use strict';

const { Service } = require('egg');

class UserService extends Service {

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
