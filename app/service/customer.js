'use strict';

const { Service } = require('egg');
const { SUCCESS, ERROR } = require('../uitl/uitl');


class CustomerService extends Service {
  async create(request) {
    const { ctx } = this;
    if (!request) return;
    const createAt = new Date();
    request.createAt = createAt;
    const result = await ctx.model.Customer.create(request);
    if (result) {
      return SUCCESS;
    }
    return ERROR;
  }
  async fetchList(request) {
    const { ctx } = this;
    if (!request) return;
    const { page, name } = request;
    const current = page.current || 1;
    const pageSize = page.pageSize || 10;
    // 查询条件
    const filter = {
      name: { $regex: name || '' },
    };
    const result = await ctx.model.Customer.find(filter, '-__v').limit(pageSize).skip((current - 1) * pageSize);
    const total = await ctx.model.Customer.find(filter, '-__v').count();
    if (result) {
      const page = { current, total, pageSize };
      return Object.assign(SUCCESS, { data: { list: result, page } });
    }
    return ERROR;
  }
}

module.exports = CustomerService;
