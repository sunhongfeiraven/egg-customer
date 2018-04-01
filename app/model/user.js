'use strict';

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    userName: { type: String }, // 账号
    password: { type: String }, // 密码
  });

  return mongoose.model('User', UserSchema);
};
