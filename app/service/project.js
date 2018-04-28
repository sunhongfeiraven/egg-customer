'use strict';

const { Service } = require('egg');
const { SUCCESS, ERROR } = require('../uitl/uitl');

class ProjectService extends Service {
  async create(request) {
    const { ctx } = this;
    if (!request) return;
    const { record } = request;
    request = record.map(item => {
      return Object.assign(item, { key: item.key + '-ADD' });
    });
    const result = await ctx.model.Project.create(request);
    if (result) return SUCCESS;
    return ERROR;
  }

  async fetchDetail(request) {
    const { ctx } = this;
    if (!request) return;
    const { projectId } = request;
    const result = await ctx.model.Project.findOne({ _id: projectId }, '-__v');
    if (result) {
      // !toObject() 新世界的大门
      const data = Object.assign(result.toObject(), { projectId });
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
    const result = await ctx.model.Project.find(filter, '-__v')
      .limit(pageSize)
      .skip((current - 1) * pageSize);
    const total = await ctx.model.Project.find(filter, '-__v').count();
    if (result) {
      const list = result.map(item => {
        return {
          projectId: item._id,
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
    let updates = request;
    const { projectId } = updates;
    if (!projectId) return ERROR;
    delete updates.projectId;
    updates = updates.record.map(item => {
      return Object.assign(item, { key: item.key + '-ADD' });
    });
    const result = await ctx.model.Project.findByIdAndUpdate(projectId, updates);
    if (result) return SUCCESS;
    return ERROR;
  }

  async delete(request) {
    const { ctx } = this;
    if (!request) return;
    const { projectId } = request;
    if (!projectId) return ERROR;
    const result = await ctx.model.Customer.remove({ _id: projectId });
    if (result) return SUCCESS;
    return ERROR;
  }
}

module.exports = ProjectService;
