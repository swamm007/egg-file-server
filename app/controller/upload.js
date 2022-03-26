'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('mz/fs');
module.exports = class extends Controller {
  async upload() {
    const { ctx } = this;

    try {
      const file = ctx.request.files[0];
      const dir = path.resolve(__dirname, '../public/' + file.filename);
      await fs.copyFileSync(file.filepath, dir);
      await fs.unlinkSync(file.filepath);
      ctx.body = {
        result: '上传成功',
        // 获取所有的字段值
        requestBody: ctx.request.body,
      };
    } catch (error) {
      ctx.body = {
        result: '上传失败，请联系管理员s',
        // 获取所有的字段值
        requestBody: ctx.request.body,
      };
    }

  }
};
