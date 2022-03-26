'use strict';

const Controller = require('egg').Controller;
const { readPublic } = require('../util');
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const app = this.app;
    const list = await readPublic(app);
    await ctx.render('home.nj', { list }, {
      path: '***',
    });
  }
}

module.exports = HomeController;
