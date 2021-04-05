---
title: API
date: 2019-12-30
sidebar: auto
categories:
  - 服务器
tags:
  - 服务器
---

# Linuk服务器上 部署接口
1. 当我们在服务器上安装上 Centos7.0稳定版时 登录服务器先安装---->宝塔面板
- 命令
```js
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```
2. 安装好宝塔面板 安装环境 因为我是用node.js 所以用宝塔面板安装了PM2（在这装node） 在安装自己需要的数据库MongoDB 
别的软件根据自己需要安装

3. 装好node 将自己的接口文档(node写的)传到服务器 并用PM2运行起来 

4. 问题来了如果请求不到 先看自己买的服务器的地方(如腾讯云) 将安全端口放开

5. 在请求不到，关闭项目 用命令看看你的项目端口是否占用 占用直接xs
```js
// 查看8081端口是否被占用
netstat -anp | grep 8081

// 查看占用8081端口的进程
fuser -v -n tcp 8081

// 杀死占用8081端口的进程
kill -s 9 1154(自己的进程号)
```
6. 上述内容之后还不能访问 最后就看防火墙了 系统自带防火墙
```js
// centos的防火墙的状态，查看的命令为
sudo systemctl status firewalld。

// 如果想关闭防火墙，命令为：
sudo systemctl stop firewalld。

// 打开防火墙的命令为：
sudo systemctl start firewalld。

// 如果是想重启后防火墙还是处于关闭的状态，得使用命令：
sudo systemctl disable firewalld
```
- 以上就能访问你的接口了