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
  async fetchList(request) {
    const { ctx } = this;
    if (!request) { return; }
    // const { page } = request;
    // const current = page.current || 1;
    // const pageSize = page.pageSize || 10;
    const result = await ctx.model.Customer.find({}, '-_id -__v').limit(2).skip(1);
    if (result) {
      const list = result.map(item => {
        /* eslint-disable */
        const doc = Object.assign(item, { id: item._id });
        return doc;
      });
      const page = {}
      return Object.assign(SUCCESS, { data: { list } });
    }
    return ERROR;
  }
}

module.exports = CustomerService;
