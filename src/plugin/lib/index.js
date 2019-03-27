const fs=require("fs"),sysPath=require("path"),gulp=require("gulp"),str2ab=require("to-buffer"),through2=require("through2"),ab2str=require("arraybuffer-to-string"),extraPluginCom=require("./utils/extra-plugin-com");let pluginInfo;function getPluginInfo(e,r){return pluginInfo?r():extraPluginCom(`${e}/plugins`,e=>{r(pluginInfo=e)})}function convertPlugin(e){const r=e.source||"./src";getPluginInfo(r,e=>{const n=[`${r}/**/*.json`];gulp.src(n).pipe(through2.obj(function(r,n,t){const o=r.history[0].replace(r.base,"").split(sysPath.sep),u=new Array(o.length).fill("..").join("/").replace(/^\.\./,".");let l=ab2str(r.contents);l=l.replace(/plugin:\/\/(\w+)\/(\w+)/,(r,n,t)=>{const o=e.coms[n]||{};return`${u}/plugins/${n}/${o[t]}`}),r.contents=str2ab(l),this.push(r),t()})).pipe(gulp.dest(r))})}function convertCaller(e){const r=e.source||"./src";getPluginInfo(r,e=>{gulp.src(`${r}/**/*.js`).pipe(through2.obj(function(r,n,t){const o=r.history[0].replace(r.base,"").split(sysPath.sep),u=new Array(o.length).fill("..").join("/").replace(/^\.\./,".");let l=ab2str(r.contents);l=l.replace(/requirePlugin\(['"](\w+)['"]\)/,(r,n)=>r.replace("requirePlugin","require").replace(n,`${u}/plugins/${n}/${e.main[n]}`)),r.contents=str2ab(l),this.push(r),t()})).pipe(gulp.dest(r))})}function convert(e={}){convertPlugin(e),convertCaller(e)}module.exports={convert:convert,convertPlugin:convertPlugin,convertCaller:convertCaller};