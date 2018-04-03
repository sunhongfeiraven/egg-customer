'use strict';

const { Service } = require('egg');
const { SUCCESS, ERROR } = require('../uitl/uitl');


class CustomerService extends Service {
  async create(request) {
    const { ctx } = this;
    if (!request) { return; }
    const createTime = new Date();
    request.createTime = createTime;
    const result = await ctx.model.Customer.create(request);
    if (result) {
      return SUCCESS;
    }
    return ERROR;
  }
}

module.exports = CustomerService;
