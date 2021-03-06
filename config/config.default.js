'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513765449219_5858';

  config.view = {
    root: path.join(appInfo.baseDir, 'app/assets'),
    mapping: {
      '.js': 'assets',
    },
  };

  config.assets = {
    publicPath: '/public',
    devServer: {
      command: 'roadhog dev',
      port: 8000,
      env: {
        BROWSER: 'none',
        DISABLE_ESLINT: true,
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000',
      },
      debug: true,
    },
  };

  config.security = {
    csrf: false,
  };

  config.middleware = [ 'errorHandler' ];

  config.errorHandler = {
    match: '/api',
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/customer',
    options: {},
  };

  return config;
};
