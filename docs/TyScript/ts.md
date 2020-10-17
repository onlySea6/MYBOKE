---
title: TypeScript
date: 2019-10-05
sidebar: auto
categories:
  - TypeScript
tags:
  - TypeScript
---
## TypeScript工具获取方式
```js
//1. 安装
npm install -g typescript

//2. 安装Visual Studio的TypeScript插件
```

## typeScript运行
1. 将 TypeScript 转换为 JavaScript 代码 可以编译多个文件
```js
tsc a.ts
```
2. 这时候再当前目录下（a.ts 同一目录）就会生成一个 a.js 文件，代码如下：

3. 使用 node 命令来执行 test.js 文件：
```js
$ node a.js 
```
## TypeScript 基础语法
TypeScript 程序由以下几个部分组成：
- 模块
- 函数
- 变量
- 语句和表达式
- 注释

## tsc 常用编译参数如下表所示：

序号	编译参数说明
1.	--help

显示帮助信息

2.	--module

载入扩展模块

3.	--target

设置 ECMA 版本

4.	--declaration

额外生成一个 .d.ts 扩展名的文件。

tsc ts-hw.ts --declaration
以上命令会生成 ts-hw.d.ts、ts-hw.js 两个文件。

5.	--removeComments

删除文件的注释

6.	--out

编译多个文件并合并到一个输出的文件

7.	--sourcemap

生成一个 sourcemap (.map) 文件。

sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。

8.	--module noImplicitAny

在表达式和声明上有隐含的 any 类型时报错

9.	--watch

在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。

## TypeScript 保留关键字

-|-|-|-
:-:|:-|:-|-:
break|	as|	catch|	switch
case|	if|	throw|	else
var|	number|	string|	get
module|	type|	instanceof|	typeof
public|	private|	enum|	export
finally|	for|	while|	void
null|	super|	this|	new
in|	return|	true|	false
any	|extends|	static|	let
package|	implements|	interface	|function
new|	try	|yield|	const
continue|	do| |

### 空白和换行
TypeScript 会忽略程序中出现的空格、制表符和换行符。
空格、制表符通常用来缩进代码，使代码易于阅读和理解。

### TypeScript 区分大小写
TypeScript 区分大写和小写字符。

### 分号是可选的
每行指令都是一段语句，你可以使用分号或不使用， 分号在 TypeScript 中是可选的，建议使用。

如果语句写在同一行则一定需要使用分号来分隔，否则会报错

## TypeScript 注释
- 单行注释 ( // ) − 在 // 后面的文字都是注释内容。

- 多行注释 (/* */) − 这种注释可以跨越多行。

## TypeScript 是一种面向对象的编程语言。
```js
class Site { 
   name():void { 
      console.log("Runoob") 
   } 
} 
var obj = new Site(); 
obj.name();
```