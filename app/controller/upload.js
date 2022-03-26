'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('mz/fs');
const { format, getFileExt } = require('../util');
module.exports = class extends Controller {
  async upload() {
    const { ctx } = this;

    try {
      const { filename, filepath } = ctx.request.files[0];
      let formatDate = 'new';
      try {
        formatDate = format('yyyy-MM-dd hh:mm:ss');
      } catch (error) {
        formatDate = 'new';
      }
      const { fileNamePre, fileExtension } = getFileExt(filename);
      const dir = path.resolve(__dirname, '../public/' + fileNamePre + ' ' + formatDate + '.' + fileExtension);
      await fs.copyFileSync(filepath, dir);
      await fs.unlinkSync(filepath);
      ctx.redirect('back');
    } catch (error) {
      ctx.body = {
        result: '上传失败，请联系管理员',
      };
    }

  }
};
