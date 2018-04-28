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
  router.post('/api/customer/update', controller.customer.update);
  router.post('/api/customer/delete', controller.customer.delete);
  // poject
  router.post('/api/project/add', controller.project.create);
  router.post('/api/project/fetch/list', controller.project.fetchList);
  router.post('/api/project/fetch/detail', controller.project.fetchDetail);
  router.post('/api/project/update', controller.project.update);
  router.post('/api/project/delete', controller.project.delete);
  router.post('/api/project/fetch/all', controller.project.fetchAll);

  router.get('/', controller.home.index);
};
