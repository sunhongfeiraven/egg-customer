'use strict';

const { Service } = require('egg');
const { SUCCESS, ERROR } = require('../uitl/uitl');

class CustomerService extends Service {
  async create(request) {
    const { ctx } = this;
    if (!request) return;
    const result = await ctx.model.Customer.create(request);
    if (result) return SUCCESS;
    return ERROR;
  }

  async fetchDetail(request) {
    const { ctx } = this;
    if (!request) return;
    const { customerId } = request;
    const result = await ctx.model.Customer.findOne({ _id: customerId }, '-__v');
    if (result) {
      // !toObject() 新世界的大门
      const data = Object.assign(result.toObject(), { customerId });
      delete data._id;
      return Object.assign(SUCCESS, { data });
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
    const result = await ctx.model.Customer.find(filter, '-__v')
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    const total = await ctx.model.Customer.find(filter, '-__v').count();
    if (result) {
      const list = result.map(item => {
        return {
          customerId: item._id,
          name: item.name,
          createAt: item.createAt,
        };
      });
      const page = { current, total, pageSize };
      return Object.assign(SUCCESS, { data: { list, page } });
    }
    return ERROR;
  }

  async update(request) {
    const { ctx } = this;
    if (!request) return;
    const updates = request;
    const { customerId } = updates;
    if (!customerId) return ERROR;
    delete updates.customerId;
    const result = await ctx.model.Customer.findByIdAndUpdate(customerId, updates);
    if (result) return SUCCESS;
    return ERROR;
  }
}

module.exports = CustomerService;
