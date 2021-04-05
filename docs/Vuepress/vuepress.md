---
title: vuepress
date: 2020-09-24
categories:
 - vuepress
tags:
 - vuepress
---
## vuepress 搭建自己的博客(新版)

1. 创建VuePress 项目最快的方法是使用 create-VuePress-site generator

```js
yarn create vuepress-site [optionalDirectoryName]
```
- 如果您的项目使用 webpack 3.x，您可能会注意到 npm 的一些安装问题。在这种情况下，我们建议使用yarn
然后你就可以配置你的 VuePress 网站的元数据

- Project Name 项目名称
- Description 描述
- Maintainer Email 维护者电子邮件
- Maintainer Name 维护人员名称
- Repository URL 存储库 URL
- repo 没有可留空
![](https://s1.ax1x.com/2020/09/22/wLVf3V.png)
- 创建完成以后，项目目录是这样的:
![](https://s1.ax1x.com/2020/09/22/wLmtAJ.png)

2. 转到/docs文件夹下,在命令行里输入:
```js
cd docs
```
3. 安装相关依赖包
```js
yarn
```
4. 运行项目
```js
yarn dev
```
## 将配置好项目打包上传到gittee或者github 需要配置文件

1. 新建2个文件 build.bat 和deploy.bat 文件
 - 两个文件的内容如下
 ![](https://ftp.bmp.ovh/imgs/2020/09/5748061c1ca223de.png)
 ![](https://ftp.bmp.ovh/imgs/2020/09/c3f7dd02b8843f1c.png)

2. package.json的script中配置"deploy": "deploy.bat"

3. 运行自己打包上传 
```js
yarn deploy
```
