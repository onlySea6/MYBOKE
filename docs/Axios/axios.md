---
title: Axios介绍
date: 2019-02-05
categories:
  -  Axios
tags:
  -  Axios
---
## Axios
### 什么是Axios
- axios 是基于 promise 对 Ajax 的封装
- axios 必须在项目里进行一个封装
### Axios的用途
- 拦截
- 加验证信息token
- 容错，格式化数据
### Axios的请求
- 请求方式是一般是后端定义的

方式|	作用|	特点|	其他
:-:|:-|:-|-:
get|	获取数据|		|两个参数
post|	提交数据|	（用于新建）	|三个参数
put	|更新数据|	（所有数据推送到后端）	|三个参数
patch|	更新数据|	（只推送修改的数据）	|三个参数
delete|	删除数据|		|两个参数

### Axios的基本使用
1. CDN 方式
```js
<!-- 标签引入方式引入axios -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
2. 依赖安装
```js
npm i axios  /  yarn add axios  /  bower i axios
```
### Axios请求方式介绍
1. GET
- 默认是get请求方式
```js
axios({
      //请求方式
      method: 'get',
      //路径
      url: '/data.json',
      //参数
      params: {
        id: 12
      }
    }).then((res) => {
      console.log(res);
    })
    //简写//
    // 用 get 无参请求
    axios.get('/data.json').then((res) => {
      console.log(res);
    }).catch((err) => {
        // 不成功 / 错误
        console.log(err)
    })
    // 用 get 有参请求
    axios.get('/data.json', {
      // 传参
      params: {
        id: 12,
        name:"zhangsan"
      }
    }).then((res) => {
      console.log(res);
    })
```
2. POST
```js
// 用post方式发送有参请求
    axios({
        method: 'post',
        url: "/post",
        // 使用data 传递参数，后台返回的数据是json格式，接收的值为null （前提是没有@requestBody）
        // 解决方式在下方
        data: {
            name:'张三'
        }
      }).then(res => {
          console.log(res);
      })
// axios.post 简写方式（别名写法）
// 用 post 请求
    axios.post('/post', "name=张三&age=10").then(res => {
       console.log(res);
    }).catch(err =>{
    console.log(err)
    }),
```
* 使用data传递，后台控制器接收到的name是null，axios使用post携带参数请求默认使用application/json。
   1. 解决方式一：（前端） 不建议使用
    - 请求返回的数据是json格式，用data传递会接收不到，就要用params属性进行数据的传递。
    - 虽然可以传递数据了，但是也是通过url拼接的方式传递到后台的，不安全，不建议使用
    ```js
  axios({
        method: 'post',
        url: "/post",
       //参数
        params: {
        name:'张三'
      }
      }).then(res => {
        console.log(res);
      })
    ```
    2. 解决方式二（前端）：在简写方式时,参数以这个格式传递 "name=张三"，多参数"name=张三&age=10"，推荐使用这种方式.
    3. 解决方式三（服务器端)：服务器端给接收的参数加上 @requestBody ？？
    - form-data 表单提交（图片上传，文件上传）
    ```js
     // 创建一个变量
    let data = {
      id: 12
    }
    let formData = new FormData()
    for (let key in data) {
      formData.append(key, data[key])
    }
    // axios发送请求
    axios.post('/post', formData).then(res => {
      console.log(res);
    })
    ```
    - applicition/josn
    ```js
   axios.post('/post', data).then(res => {
      console.log(res);
    }),
    ```
3. PUT
```js
  // put
    axios.put('/put', data).then(res => {
      console.log(res);
    })
```
4. PATCH
```js
 // patch
    axios.patch('/patch', data).then(res => {
      console.log(res);
    })
```
5. DELETE
 - delete（别名）
  1. 在请求体上用data
  ```js
    axios.delete('/delete', {
      // 参数在请求体上用data
      data: {
        id: 12
      }
    }).then(res => {
      console.log(res);
    })
  ```
  2. 参数在url上用params
  ```js
  axios.delete('/delete', {
      // 参数在url上用params
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res);
    })
  ```
 - delete（其他方式)
 ```js
axios({
      method: "delete",
      url: "/delete",
      // 参数在请求体上用data
      data: {
        id: 12
      }
    }).then(res => {
      console.log(res);
    })
```
```js
axios({
      method: "delete",
      url: "/delete",
    //   参数在url上用params
        params:{
            id:12
        },
    }).then(res => {
      console.log(res);
    })
 ```
 * 每个请求中console.log()，是为了调用一下，不调用会报错

## Axios 并发请求
- 使用 axios.all
```js
axios.all([
    axios.get('/login'),
    axios.get('/user')
]).then(res=>{
    console.log(res[0])
    console.log('-----')
    console.log(res[1])
}).catch(err => {
    console.log(err)
})
```
- 使用 axios.spread()处理响应结果
```js
axios.all([
    axios.get('/login'),
    axios.get('/user')
]).then(axios.spread((res1,res2)=>{
    console.log(res1);
    console.log(res2)
})).catch(err => {
    console.log(err)
})
```
