/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648279267690_8122';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  const viewConfig = {
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
  };

  return {
    ...config,
    ...userConfig,
    view: viewConfig,
    multipart: {
      mode: 'file',
      fileExtensions: [ '.sketch', '.svg' ],
      fileSize: '100mb',
    },
    bodyParser: {
      formLimit: '100mb',
      fileSize: '500mb',
    },
    url: 'http://127.0.0.1:7001/public/',
  };
};
