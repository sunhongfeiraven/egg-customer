'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // user
  router.post('/api/user/create', controller.user.create);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/fetch', controller.user.fetch);
  // customer
  router.post('/api/customer/add', controller.customer.create);
  router.post('/api/customer/fetch/list', controller.customer.fetchList);
  router.post('/api/customer/fetch/detail', controller.customer.fetchDetail);
  router.post('/api/customer/fetch/update', controller.customer.update);

  router.get('/', controller.home.index);
};
