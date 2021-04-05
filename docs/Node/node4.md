---
title: 前端接口
date: 2019-10-05
sidebar: auto
categories:
  - node
tags:
  - node
---
## 如何使用nodejs写一个接口
1. 新建一个文件夹 初始化page.json
```js
npm init -y
```
2. 安装以下安装包 yarn add --
```json
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "nodemon": "^2.0.6"
```
3. 配置启动命令
```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js"
  }
```
4. 新建index.js文件夹 这里的都是固定的
```js
// 1. 启动一个后端服务
const express = require("express");
const exApp = express();
const bodyParser = require("body-parser");
// 跨域
const cors = require("cors");
// 1.2 配置post请求
exApp.use(bodyParser.urlencoded({ extended: true }));
exApp.use(bodyParser.json());
// 1.3 开启跨域设置
exApp.use(cors());
// 1.4 开启后端服务端口
exApp.listen(3000, () => console.log("http://localhost:3000"));
```
5. 可以在本地新建JSON文件 进行增删改查数据，判断登录的账号密码
```js
const fs = require('fs')
//这是JSON的数据 获取数据
let jsonData= fs.readFileSync('./user.json','utf-8', (err, data) => {
    return data
  })
exApp.post("/login", (req, res) => {
    let List=JSON.parse(jsonData).data
  let sucess=  List.some((item)=>{
      //判断账号和密码都成立才登录成功
        return item.username==req.body.username&&item.password==req.body.password
    })
    if(sucess){
        res.json({code:20000,message:"登录成功",token:1000})
    }else{
         res.json({code:0,message:"登录失败"})
    }
});
exApp.post("/register", (req, res) => {
        let dataList=JSON.parse(jsonData).data
       let bl= dataList.some((item,index)=>{
          return  item.username==req.body.username
        })
        if(bl){
            res.json({code:100,message:"该用户已经注册"})
        }else{
            let data=dataList.concat(req.body)
            let a=JSON.stringify(data={data})
            // 更改数据
            fs.writeFile('./user.json',a,err => {})
            res.json({code:200,message:"注册成功"})
        }
});
```
6. 启动一个后端服务 前端传账号密码 与这里进行比较 并返回响应的code值
```json
{"data":[{"username":"admin","password":111111},{"username":"admi","password":"123456"}]}
```
