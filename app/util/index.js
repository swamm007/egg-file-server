'use strict';
const path = require('path');
const fs = require('mz/fs');
/**
 * 格式化时间
 * @param {*} fmt 格式化形式
 */
const format = function(fmt) {
  const nowDate = new Date();
  const o = {
    'M+': nowDate.getMonth() + 1, // 月份
    'd+': nowDate.getDate(), // 日
    'h+': nowDate.getHours(), // 小时
    'm+': nowDate.getMinutes(), // 分
    's+': nowDate.getSeconds(), // 秒
    'q+': Math.floor((nowDate.getMonth() + 3) / 3), // 季度
    S: nowDate.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (nowDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};
/**
 * 异步读取文件
 * @param {*} app 全局配置
 */
const readPublic = async app => {
  const dir = path.resolve(__dirname, '../public/');
  const fileList = await fs.readdir(dir);
  const list = fileList.map(item => ({
    url: `${app.config.url}${item}`,
    title: item,
  }));
  return list;
};

const getFileExt = fileName => {
  const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
  const fileNamePre = fileName.substring(0, fileName.lastIndexOf('.'));
  return {
    fileExtension,
    fileNamePre,
  };
};
module.exports = {
  format,
  readPublic,
  getFileExt,
};
