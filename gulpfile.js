'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const wto = require('./src/index');

gulp.task('baidu', function() {
  return wto.toBaidu({
    src: './demo/miniprogram-demo',
    dest: './demo/dist/baidu-miniprogram-demo'
  });
});

gulp.task('alibaba', function() {
  return wto.toAlibaba({
    src: './demo/miniprogram-demo',
    dest: './demo/dist/alibaba-miniprogram-demo'
  });
});

gulp.task('toutiao', function() {
  return wto.toToutiao({
    src: './demo/miniprogram-demo',
    dest: './demo/dist/toutiao-miniprogram-demo'
  });
});

gulp.task('test', function(cb) {
  sequence(
    'baidu',
    'alibaba',
    'toutiao',
    () => {
      console.log('转换完毕！');
    }
  )
});