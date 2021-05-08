---
title: node操作mysql
date: 2019-10-05
sidebar: auto
categories:
  - node
tags:
  - node
---

## 针对mysql数据增删查改

### 首先需要安装mysql模块：npm install mysql --save
 
### 然后创建user数据表：
![创建的表格](https://www.hualigs.cn/image/6095eae2a9ad9.jpg)

### 接着使用nodejs对数据库进行增删改查：
 
```js
//引入mysql模块
var mysql = require('mysql');
//链接数据库
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'node',//数据库名字
})
connection.connect();
//查询数据
var sql = 'SELECT * FROM user';
connection.query(sql,function (err,result) {
  if(err){
    console.log('error');
    return;
  }
  console.log('-----------------查询----------------');
  console.log(result);
  console.log('-----------------查询结束----------------');
})
 
//增加数据
var addsql = 'INSERT INTO user(name,age,sex) VALUES(?,?,?)';
var addsqlparams = ['汪丹萍','24','女'];
connection.query(addsql,addsqlparams,function (err,result) {
  if(err){
    console.log('error');
    return;
  }
  console.log('-----------------新增成功----------------');
  console.log(result);
  console.log('-----------------结束----------------');
})
 
//修改数据
var modsql = 'UPDATE user SET name = ?,age = ? WHERE id = ?';
var modsqlparams = ['吕雪源love','26','1'];
connection.query(modsql,modsqlparams,function (err,result) {
  if(err){
    console.log('err');
    return;
  }
  console.log('--------------------------------');
  console.log(result);
  console.log('--------------------------------');
})
 
//删除数据
var delsql = 'DELETE FROM user where id = 2';
connection.query(delsql,function (err,result) {
  if(err){
    console.log('err');
    return;
  }
  console.log('----------删除-------------');
  console.log(result);
})
 
 
connection.end();
```