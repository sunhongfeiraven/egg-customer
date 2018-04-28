'use strict';

const { Service } = require('egg');
const { SUCCESS, ERROR } = require('../uitl/uitl');

class CustomerService extends Service {
  async create(request) {
    const { ctx } = this;
    if (!request) return;
    const { targetKeys } = request;
    const result = await ctx.model.Customer.create(request);
    const customerId = result._id;
    const linkIdList = await this.setLink({ customerId, targetKeys });
    if (linkIdList) return SUCCESS;
    return ERROR;
  }

  async setLink({ customerId, targetKeys }) {
    const { ctx } = this;
    if (!targetKeys || targetKeys.length === 0) return;
    // 全删全增
    await ctx.model.LinkCustomerProject.remove({ customerId });
    const linkIdList = await targetKeys.map(async projectId => {
      const res = await ctx.model.LinkCustomerProject.create({ customerId, projectId });
      return res._id;
    });
    return linkIdList;
  }

  async getLinkProjects({ customerId }) {
    const { ctx } = this;
    if (!customerId) return;
    const linkResult = await ctx.model.LinkCustomerProject.find({ customerId });
    const projects = await linkResult.map(async item => {
      let project = await ctx.model.Project.findOne({ _id: item.projectId }, { name: 1, _id: 1 });
      project = Object.assign(project.toObject(), { key: project._id });
      delete project._id;
      return project;
    });

    return projects;
  }

  async fetchDetail(request) {
    const { ctx } = this;
    if (!request) return;
    const { customerId } = request;
    const result = await ctx.model.Customer.findOne({ _id: customerId }, '-__v');
    const projects = await this.getLinkProjects({ customerId });
    console.log(projects);
    if (result && projects) {
      // !toObject() 新世界的大门
      const data = Object.assign(result.toObject(), { customerId, projects });
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

  async delete(request) {
    const { ctx } = this;
    if (!request) return;
    const { customerId } = request;
    if (!customerId) return ERROR;
    const result = await ctx.model.Customer.remove({ _id: customerId });
    if (result) return SUCCESS;
    return ERROR;
  }
}

module.exports = CustomerService;
