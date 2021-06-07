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
let mysql = require('mysql')
// 查询的函数
let myMySQL = function(sql) {
	return new Promise(async function(resolve, reject) {
		let connection = await mysql.createConnection({
			host: 'ip',
			user: 'root',
			password: '密码',
			database: '表名',
		})
		// 开启
		connection.connect();
		// 查询
		await connection.query(sql, function(err, result) {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
		// 每次都要关闭
		connection.end()
	})
}
// 写入数据库的函数
let wirteMySQL=(sql,end)=>{
	return new Promise(async function(resolve, reject) {
		let connection = await mysql.createConnection({
			host: '123.56.171.43',
			user: 'root',
			password: '27E9pjTWo2',
			database: 'vuebase',
		})
		// 开启
		connection.connect();
		// 增加
		await connection.query(sql,end,function (err,result) {
		  if (err) {
		  	reject(err)
		  } else {
		  	resolve(result)
		  }
		})
		// 每次都要关闭
		connection.end()
	})
}
// 模糊查询使用 LIKE  但是影响效率
// var sql = 'SELECT * FROM user WHERE `name` LIKE '李%''; //开头为李的 李姓人

//查询数据 的语句查所有的 语句
// var sql = 'SELECT * FROM user';
//查询 单个或者多个数据的语句
// let sql = "Select * from user where username='" + username + "' AND password='" + password + "'"

// 增加数据的语句
// var addsql = 'INSERT INTO user(name,age,sex) VALUES(?,?,?)';
// var addsqlparams = ['汪丹萍','24','女'];

// 以上语句 都作为最上面函数的参数


//修改数据
// var modsql = 'UPDATE user SET name = ?,age = ? WHERE id = ?';
// var modsqlparams = ['吕雪源love','26','1'];
// connection.query(modsql,modsqlparams,function (err,result) {
//   if(err){
//     console.log('err');
//     return;
//   }
//   console.log('--------------------------------');
//   console.log(result);
//   console.log('--------------------------------');
// })
 
//删除数据
// var delsql = 'DELETE FROM user where id = 2';
// connection.query(delsql,function (err,result) {
//   if(err){
//     console.log('err');
//     return;
//   }
//   console.log('----------删除-------------');
//   console.log(result);
// })
module.exports = myMySQL;
module.exports = wirteMySQL;

```