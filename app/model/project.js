'use strict';

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const ProjectSchema = new Schema({
    name: { type: String, default: '' }, // 项目民成
    scope: { type: String, default: '' }, // 规模
    type: { type: String, default: '' }, // 类型
    fee: { type: String, default: '' }, // 金额
    address: { type: String, default: '' }, // 地址
    record: { type: Array, default: [] }, // 接洽记录
    time: { type: Date }, // 时间
    createAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() },
  });
  return mongoose.model('Project', ProjectSchema);
};
