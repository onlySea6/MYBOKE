---
title: Axios与Vue
date: 2019-02-05
categories:
  -  Axios
tags:
  -  Axios
---
## vue封装axios
 1.基础封装
```js
 // axios模块(封装位置)
import axios from 'axios'
export function request(config){
    axios({
        url:config
    }).then(res=>{
        console.log(res)
    })
}
```
```js
// 模块使用(调用位置)
import {request} from 'request/request'

request('http://localhost.com')
```
2. 第一种
```js
// axios模块(封装位置)
import axios from 'axios'
export function request(config,success,fail){
    axios({
        url:config
    }).then(res=>{
        success(res)
    }).catch(err=>{
        fail(err)
    })
}
```
```js
// 模块使用(调用位置)
import {request} from 'request/request'
request('http://localhost.com',res=>{
    console.log(res)
},err=>{
    console.log(err)
})
```
3. 第二种
```js
// axios模块(封装位置)
import axios from 'axios'
export function request(config){
    axios.default.baseURL='http://localhost.com'
    axios(config.url).then(res => {
        config.success(res)
    }).catch(err=>{
        config.fail(err)
    })
}
```
```js
// 模块使用(调用位置)
import {request} from 'request/request'
request({
    url:'login',
    success:res=>{
        console.log(res)
    },
    fail:err=>{
        console.log(err)
    }

})
```
4. 第三种
```js
// axios模块(封装位置)
import axios from 'axios'
export function request(config){

    return new Promise((resolve,reject)=>{
    let NewAxios = axios.create({
        baseURL:'http://localhost.com',
        timeout:5000
        });
        NewAxios(config).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
```
```js
// 模块使用(调用位置)
import {request} from 'request/request'
request({
    url:'login'
}).then(res=>{
    console.log(res)
}).catch(err => {
    console.log(err)
}
)
```
5. 第四种
```js
// axios模块(封装位置)
import axios from 'axios'
export function request(config){

   let NewAxios = axios.create({
        baseURL:'http://localhost.com',
        timeout:5000
        });
        return NewAxios1(config)
}
```
```js
// 模块使用(调用位置) 同上
import {request} from 'request/request'
request({
    url:'login'
}).then(res=>{
    console.log(res)
}).catch(err => {
    console.log(err)
})
```