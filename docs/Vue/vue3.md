---
title: vue开发插件
date: 2019-09-15
categories:
 - vue
tags:
 - vue
---
1. 自定义  .vue插件
2. 新建.js 文件
```js
import LB from './Lunbo.vue'; //引入自定义的插件
//声明空对象
let lunbo = {};
lunbo.install = (Vue, option = {}) => {
    console.log(option);
    //全局注册
    Vue.component('插件名称用于使用', LB);
Vue.search = function(val) {
    return val + "全局方法，挂载在Vue上所以只能用Vue调出来";
  };
  Vue.prototype.$myMethod = function(val) {
    return val + "原型上添加方法，可以使用this找到该方法";
  };
};
export default lunbo;
```
3. main.js 注册
```js
import LB from './components/index';
Vue.use(LB, { name: 'wo' });
```
4. 全局使用
《插件名称/》

## 做出的插件上传到npm的网站上

![](https://ftp.bmp.ovh/imgs/2020/09/e3d4da0ddddd562f.png)

## npm遇到的一些问题
```js
// 邮箱未验证
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! you must verify your email before publishing a new package: https://www.npmjs.com/email-ed

// 没有权限发布
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! You do not have permission to publish "your-package". Are you logged in

// 需要登录
npm ERR! code ENEEDAUTH
npm ERR! need auth auth required for publishing
npm ERR! need auth You need to authorize this machine using `npm adduser`

// 只有管理员才有权限发布
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! [no_perms] Private mode enable, only admin can publish this module [no_perms] Private mode enable, only admin can publish this module: your-package
这个是你的源设置成第三方源的时候才有可能发生，比如设置了淘宝源就可能会导致该问题。只要把源改回默认的就可以了，如下：
npm config set registry http://registry.npmjs.org


// 包名过于类似
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! Package name too similar to existing packages; try renaming your package to '@hopgoldy/a


// 无法发布到私有包
npm ERR! publish Failed PUT 402
npm ERR! code E402
npm ERR! You must sign up for private packages :
这个当你的包名为@your-name/your-package时才会出现，原因是当包名以@your-name开头时，npm publish会默认发布为私有包，但是 npm 的私有包需要付费，所以需要添加如下参数进行发布:
npm publish --access public
```
