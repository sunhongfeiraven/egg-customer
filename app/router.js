'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.all('/api/*', controller.home.proxy);
  router.post('/api/user/create', controller.user.create);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/fetch', controller.user.fetch);
  router.get('/', controller.home.index);
};
