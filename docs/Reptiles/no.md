---
title: API
date: 2018-10-30
sidebar: auto
categories:
  - Reptiles
tags:
  - 其他
---

## 1.Reptiles在服务器上的问题 
```js
UnhandledPromiseRejectionWarning: TypeError [ERR_UNESCAPED_CHARACTERS]: 
Request path contains unescaped characters
```
解决:
```js
let int = encodeURI(req.body.int)
var url = `https://www.shuqi.com/search?keyword=${int}page=1`
```
2. Reptiles文档的时候别用 html() 经常使用text()
如果使用text()返回的时候还有乱码的问题
```js
{
    ignoreWhitespace:false,
    xmlMode:false,
    lowerCaseTags:false
}
```
## Reptiles 例子 拿来直接用
```js
// 1. 启动一个后端服务
const express = require("express");
const exApp = express();
const bodyParser = require("body-parser");
// 跨域
const cors = require("cors");
const fs = require('fs')
// reptiles
var https = require('https');
var http = require('http');
let cheerio = require('cheerio');
// 1.2 配置post请求
exApp.use(bodyParser.urlencoded({
	extended: true
}));
exApp.use(bodyParser.json());
// 1.3 开启跨域设置
exApp.use(cors());
// 1.4 开启后端服务端口
exApp.listen(8081, () => console.log("http://localhost:8081"));
exApp.all("*", function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OP0TIONS");
	res.header("X-Powered-By", "3.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// https
function loadPage(url) {
	var pm = new Promise(function(resolve, reject) {
		https.get(url, function(res) {
			var html = '';
			res.on('data', function(d) {
				html += d.toString()
			});
			res.on('end', function() {
				resolve(html);
			});
		}).on('error', function(e) {
			reject(e)
		});
	});
	return pm;
}
// http
function loadPageHttp(url) {
	var pm = new Promise(function(resolve, reject) {
		http.get(url, function(res) {
			var html = '';
			res.on('data', function(d) {
				html += d.toString()
			});
			res.on('end', function() {
				resolve(html);
			});
		}).on('error', function(e) {
			reject(e)
		});
	});
	return pm;
}
// reptiles小说内容 搜索
exApp.post('/getNovel', (req, res) => {
	//novelText 小说名字
	let novelText = encodeURI(req.body.novelText)
	var url = `url=${novelText}`;
	loadPageHttp(url).then(function(d) {
		let novelAll = [];
		$ = cheerio.load(d);
		$(".clearfix").each(function(index) {
			// 小说的详情页链接
			let novelHref = $('.imgbox>a').eq(index).attr('href');
			// 小说的封面
			let novelImg = $('.imgbox>a>img').eq(index).attr('src');
			// 小说的名字
			let novelText = $('.se-result-infos>h2>a').eq(index).text();
			// 小说作者
			let novelAuthor = $('.bookinfo>a').eq(index).text();
			// 小说简介
			let novelMedium = $('.se-result-infos>p').eq(index).text();
			if (novelHref && novelText) {
				novelAll.push({
					id: index,
					novelHref,
					novelImg,
					novelText,
					novelAuthor,
					novelMedium
				});
			}
		})
		res.json({
			code: 'U0001',
			novelAll
		})
	});
})
```
## nightmare --一种爬虫升级形态
1. 安装使用 
- `yarn add nightmare`
```js
// options
openDevTools: { 
      mode: 'bottom',       // 开发者工具位置：right, bottom, undocked, detach
},
show: true,                 // 要不要显示浏览器
dock: true,                 // 要不要在Dock上显示图标
waitTimeout: 60000,         // .wait() 方法超时时长，单位:ms
executionTimeout: 86400000,

import Nightmare from 'nightmare'
const nightmare = new Nightmare(options)
```
1. 简单的API 
- 更多 [API](https://github.com/segmentio/nightmare#apihttps://github.com/segmentio/nightmare#interact-with-the-page)
- .goto(url[, headers]) 跳转到url
- .viewport(width, height) 浏览器窗口大小
- .wait(selector) 等待某个dom元素出现
- .click(selector) 点击某个dom元素
- .type(selector[, text]) 在某个dom元素中输入
- .inject(type, file) 在页面上挂载 js/css 文件内容
- .evaluate(fn[, arg1, arg2,...]) 在客户端注入JS脚本并执行，从而实现electron模型下的C/S互动及数据交换