---
title: vue跨域
date: 2019-09-01
categories:
 - vue
tags:
 - vue
---

```js
// 第一步
module.exports = {
 devServer: {
     proxy: { //配置跨域
         '/api': {
             target: 'http://xx.xx.xx.xx:5000/', //这里后台的地址模拟的;应该填写你们真实的后台接口
             changOrigin: true, //允许跨域
             pathRewrite: {
                 '^/api': ''
             }
         },
     }
 },
}
// 第二步
import axios from "axios";
export default axios.create({
    baseURL: '/api',
    timeout:5000
})
// 第三步

// Test 为后端的接口
import {Test} from '../api/test'
   export default {
  name: 'App',
    mounted(){
     Test().then((res)=>{console.log(res)})
    }
}
```