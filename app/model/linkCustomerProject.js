'use strict';

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const LinkCustomerProjectSchema = new Schema({
    customerId: { type: String },
    projectId: { type: String },
  });
  return mongoose.model('LinkCustomerProject', LinkCustomerProjectSchema);
};
