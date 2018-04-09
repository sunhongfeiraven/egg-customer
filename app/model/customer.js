'use strict';

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const CustomerSchema = new Schema({
    name: { type: String, default: '' }, // 姓名
    marital: { type: String, default: '' }, // 婚姻状况
    age: { type: String, default: '' }, // 年龄
    sex: { type: String, default: '' }, // 性别
    education: { type: String, default: '' }, // 学历
    company: { type: String, default: '' }, // 单位
    placeOfOrigin: { type: String, default: '' }, // 籍贯
    hobby: { type: String, default: '' }, // 爱好
    character: { type: String, default: '' }, // 性格
    social: { type: String, default: '' }, // 社会背景
    experience: { type: String, default: '' }, // 经历
    remark: { type: String, default: '' }, // 备注
    address: { type: String, default: '' }, // 地址
    type: { type: String, default: '' },
    createAt: { type: Date },
    updateAt: { type: Date },
  });

  return mongoose.model('Customer', CustomerSchema);
};
