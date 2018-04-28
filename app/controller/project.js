'use strict';

const { Controller } = require('egg');

class ProjectController extends Controller {

  async create() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.project.create(body);
    ctx.response.body = result;
  }

  async fetchList() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.project.fetchList(body);
    ctx.response.body = result;
  }

  async fetchDetail() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.project.fetchDetail(body);
    ctx.response.body = result;
  }

  async update() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.project.update(body);
    ctx.response.body = result;
  }

  async delete() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service.project.delete(body);
    ctx.response.body = result;
  }
}

module.exports = ProjectController;
