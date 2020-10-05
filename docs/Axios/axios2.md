---
title: Axios全局配置/新建实例and拦截器
date: 2019-02-15
categories:
  -  Axios
tags:
  -  Axios
---
## Axios全局配置
- baseURL、timeout
```js
// 配置全局属性
axios.default.baseURL ='https://localhost.com';
axios.default.timeout ='5000';
// 在全局配置基础上从/login请求
axios.get('/login').then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
axios.post('/user').then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
```
## Axios 实例
```js
<script src="//axios"></script>
<script>
let NewAxios = axios.create({
    baseURL:'http://localhost.com',
    timeout:5000
    });
let NewAxios1 = axios.create({
    baseURL:'http://localhost.com',
    timeout:50
    })
NewAxios({
    url:'/getlist'
    }).then(res=>{
        console.log(res)
    })
NewAxios1({
    url:'/getlist'
    }).then(res=>{
        console.log(res)
    })
</script>
```
## Axios 拦截器
* 拦截器作用
- 发起请求时可以添加网页的加载动画，token认证时，强制登录等
- 响应请求时可以进行相应的数据处理
1. 请求拦截
- 成功的
- 失败的
```js
axios.interceptors.request.use(config=>{
    console.log('进入请求拦截器');
    console.log(config)
    return config  //放行拦截器才能往下走
},err=>{
    console.log('请求方向失败')
    console.log(err)
})
axios.get('/login').then(res=>{
    console.log(res)
})
//use(fn1,fn2)：参数是两个函数 拦截以后必须return 放行拦截才能往下
```
2. 响应拦截
- 成功的
- 失败的
```js
axios.interceptors.response.use(config=>{
    console.log('进入响应拦截器');
    // return config  //放行拦截器才能往下走
    return config.data
},err=>{
    console.log('响应方向失败')
    console.log(err)
})
axios.get('/login').then(res=>{
    console.log(res)
})
```
