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

  async fetchDetail() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.customer.fetchDetail(body);
    ctx.response.body = result;
  }

  async update() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.customer.update(body);
    ctx.response.body = result;
  }

  async delete() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.customer.delete(body);
    ctx.response.body = result;
  }
}

module.exports = CustomerController;
