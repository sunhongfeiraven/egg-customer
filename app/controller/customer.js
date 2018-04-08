'use strict';

const { Controller } = require('egg');

class CustomerController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.customer.create(body);
    ctx.response.body = result;
  }
  async fetchList() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.customer.fetchList(body);
    ctx.response.body = result;
  }
}

module.exports = CustomerController;
