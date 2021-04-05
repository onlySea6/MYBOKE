---
title: API
date: 2019-12-30
sidebar: auto
categories:
  - mongodb
tags:
  - 数据库
---
## mongodb数据库 （非关系数据库）
- MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。
- MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。
- mongodb[下载地址](https://www.mongodb.com/try/download/community)
## 安装
1. 我们使用社区免费版即可，下载地址,选择 version 版本，默认就好，os 选择我们的操作系统，我这里选 window
2. 双击安装程序，一路 next，需要注意的是左下角有一个“install mongoDB compass” 把勾取消掉，这个是官网给出的一个图像化操作数据库软件，下载非常慢。暂时不要。
3. 安装好后，在浏览器输入127.0.0.1:27017看到一行英文说明安装成功。
4. 手动将 mongodb 添加到环境变量里，方便我们开发和使用。
## 基础使用

环境变量添加好以后关闭所有之前的 cmd 创建，然后重新开启一个 cmd 输入 mongo，就进入了我们的数据库，之所以重新打开 cmd，是因为 cmd 有缓存，它不会跟随系统去更新环境变量。
简单解释一下，mongodb 这个名称，在下面开启服务和关闭服务都会用到，哪儿来的？是我们安装 mongodb 软件的时候，它有一个安装选择目录界面里自带的，实际上我们可以修改成别的名字，这个名字就是它服务的名字。

- mongo 命令启动的是 mongo.exe 这是客户端，用来操作数据库的
- mongod.exe 这个是数据库的服务端

## cmd命令
- cmd 命令输入 mongo 回车 它启动的就是 mongo.exe
- db ：该命令是查看当前所在的数据库，默认第一次都是 test
- show.dbs ：该命令是查看所有数据库
- use.db.name ：选择数据库，就算没有该数据库也可以
- db.users.insert({name: "王杰", age: 20}) ：在数据库里插入一个文档，文档组成得 users 叫数据集合，如果不存在这个集合，当插入数据时会自动生成
- db.users.find() ：查询该集合里所有的文档数据
- show collections 或 show tables ：查看该数据库里有多少集合
- 【数据库 db】> 【集合 users】>【文档数据】
- 删除文档：db.users.remove({'name':"王杰"}) 查询条件
- 删除集合：db.users.drop() 返回 true 就是删除成功，show tables 查看集合
- 删除数据库：db.dropDatabase() 此时，输入 show dbs 发现我们得 dbname 数据库不见了
- 退出数据库：ctrl + c或者输入exit
- 更多 mongo 客户端命令操作可以去[菜鸟教程](https://www.runoob.com/mongodb/mongodb-dropdatabase.html)

## 开启 mongodb
1. win + x 选择 window powerShell(管理员)，输入net start mongodb
2. 必须是管理员模式的命令窗口才可以，否则会报错误。
3. 如果在管理员模式下启动，报错为“``` Error: couldn't connect to server…… connection attempt failed: SocketException: Error connecting to ```”，需要使用 mongod 重绑服务。cmd 中：```mongod --dbpath D:\MongoDB\Server\3.2\data```然后再```net start mongodb```

## 关闭 mongodb
```net stop mongodb```

## 创建用户 (一定要先建立管理员)
管理页创建在 admin 数据库，这个库是管理其他表所有用户的，我们称为管理员

```js
use admin
// 语法固定，user用户名，pwd密码，roles规则权限：[{role:权限，db：属于哪个库，一般写当前库名}]
db.createUser({
  user: "admin",
  pwd: "123456",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
});
// 然后验证一下
db.auth('admin','123456') // => 1 为成功
// 关于密码，即便是数字密码，这里也要放在字符串中。
// 查看用户集合
db.system.users.find()
```
### 进入我们的任意数据库，创建数据库账户
当我们在其他数据库建立了用户，那么这个用户就归我们数据库管理员账户管理了，比如删除账户或赋予其他权限等

```js
use books
db.createUser({
  user:"tokyo",
  pwd: "L-love-HatanoYui",
  roles: [
    { role: "readWrite", db: "books" }
  ]
})
// 然后验证一下
db.auth('tokyo','L-love-HatanoYui') // => 1 为成功
```
### 创建用户注意事项
1. 第一，必须要创建一个 admin 库里的管理员账户，权限最好是 root 超级管理员
2. 第二，数据库的账户，比如use dbName进入该库，进行创建用户
3. 关于权限说明：
```
内置角色
    1. 数据库用户角色：read、readWrite;
    2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
    3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
    4. 备份恢复角色：backup、restore；
    5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
    6. 超级用户角色：root
    // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
    7. 内部角色：__system
具体角色的功能
    read：允许用户读取指定数据库
    readWrite：允许用户读写指定数据库
    dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
    userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
    clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
    readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
    readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
    userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
    dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
    root：只在admin数据库中可用。超级账号，超级权限
```
## 删除用户
删除指定用户```db.dropUser("userName")``
删除当前库所有用户```db.dropAllUser()```

## 修改密码
```db.changeUserPassword("userName","newPass")```

## window服务器上 node.js与mongodb数据库
1. 先初始化状态 配置node.js与mongodb的文件
```js
npm init -y

npm i mongoose
```
2. 新建js文件进行增删改查mongodb数据库
```js
// 数据库mongodb 非关系数据库
const mongoose = require("mongoose");
// 连接数据库  QQUser数据库名字 其他固定
const MongoApp = mongoose.createConnection("mongodb://127.0.0.1:27017/QQUser", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//监听数据库的状态
MongoApp.on("open", () => {
  console.log("数据库连接成功");
});
MongoApp.on("error", () => {
  console.log("数据库连接错误");
});
// 创建规则
// 初始化规则的时候 数据库要先有东西 不然增删改查数据的时候会报错
const Schema = new mongoose.Schema({
	username: {
	  //数据类型
	  type: String,
	  // 最小长度
	  minlength: 2,
	  // 最大长度
    maxlength: 20,
     // 必填项
    required: [true, "用户名不允许为空，长度2-4位"],
	},
	password: {
	  //数据类型
	  type: String,
	  // 最小长度
	  minlength: 6,
	  // 最大长度
    maxlength: 20,
      // 必填项
    required: [true, "用户名不允许为空，长度6-12位"],
	}
});
// 创建在mongodb中的集合 users 数据库下的集合  Schema放规则
var UserModel = MongoApp.model("users", Schema);
//插入数据  -------增
//  UserModel.create({ username: "admin" }).then((res) => {
//    console.log(res);
//  });
// 查 查到返回查到的对象 没查到返回[]
// UserModel.find({username:"admins"}).then((res) => {
//   console.log(res);
// });
// findOne 只返回找到的第一个数据 Model.findOne({age:18}) 查不到返回null
// UserModel.findOne({username:"admins"}).then((res) => {
//   console.log(res);
// });
// 更改数据
// UserModel.updateOne({username:"admin"},{username:'wangjie'}).then((res)=>{console.log(res)})
// 删除数据
// UserModel.deleteOne({username:"wangjie"}).then((doc)=>{console.log(doc)})

```