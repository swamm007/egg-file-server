'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const app = this.app;
    const dir = path.resolve(__dirname, '../public/');
    const fileList = await fs.readdir(dir);
    const list = fileList.map(item => ({
      url: `${app.config.url}${item}`,
      title: item,
    }));
    await ctx.render('home.nj', { list }, {
      path: '***',
    });
  }
}

module.exports = HomeController;
