---
title: API
date: 2018-10-30
sidebar: auto
categories:
  - index.html转译符
tags:
  - index.html转译符
---
## index.html转译符
- 网页上的符号不是自己打上去的 是转译上去的
- 常用的几个
- ![常用转译符](https://ftp.bmp.ovh/imgs/2021/04/dd42eda1b65288a3.png)

- [转译符大全](https://tool.oschina.net/commons?type=2) 

## 针对颜色 简写
- 双数为简写
  1. #cccccc = #ccc

## 针对跳转区域
- 写一个a标签 宽高100% 再来一个定位absolute top:0  left:0

## 网站上 少用img  多用背景图
- 这是一个提议  一个无法理解的伤痛

## 项目要经历考验 各种问题都要想到  要不上线的时候 老改bug
1. 比如一些名字  短的没问题 长的就不行

## input框选中 不会出现黑框 css 加这个属性
```css
 outline: none;
```
## IE条件注释
- 你可以利用条件注释，设置只对IE产生作用的语句：
```
　　<!--[if IE]>
　　　　<link rel="stylesheet" type="text/css" href="ie-stylesheet.css" />
　　< ![endif]-->
```
- 还可以区分各种不同的IE版本：
```
　　<!--[if IE 6]> - targets IE6 only -->
　　<!--[if gt IE 6]> - targets IE7 and above -->
　　<!--[if lt IE 6]> - targets IE5.5 and below -->
　　<!--[if gte IE 6]> - targets IE6 and above -->
　　<!--[if lte IE 6]> - targets IE6 and below -->
```
###  IE6专用语句
1. 由于IE6不把html视为文档的根元素，所以利用这一点，可以写出只有IE6才能读到的语句
```css
/* the following rules apply only to IE6 */
　　* html{
　　}
　　* html body{
　　}
　　* html .foo{
　　}
```
- IE7专用语句则要写成
```
　　/* the following rules apply only to IE7 */

　　*+html .foo{
　　}
```
- 除了IE6以外，所有浏览器都不能识别属性前的下划线。而除了IE7之外，所有浏览器都不能识别属性前的*号，因此可以写出只有这两个浏览器才能读到的语句：
```
　　.element {
　　　　background: red; /* modern browsers */
　　　　*background: green; /* IE 7 and below */
　　　　_background: blue; /* IE6 exclusively */
　　}
```
### IE6的min-height IE6不支持min-height
解决办法
1. 共有三条CSS语句，第一句是针对其他浏览器设置最小高度，第三句是针对IE设置最小高度，第二句则是让其他浏览器覆盖第三句的设置。
```css
　.element {
　　　　min-height: 500px;
　　　　height: auto !important;
　　　　height: 500px;
　　}
```
2. _height只有IE6能读取。
```css
.element {
　　　　min-height: 500px
　　　　_height: 500px
　　}
```
### font-size基准
- 浏览器的缺省字体大小是16px，你可以先将基准字体大小设为10px：
```css
　　body {font-size:62.5%;}
```
- 后面统一采用em作为字体单位，2.4em就表示24px。
```css
　　h1 {font-size: 2.4 em}
```
### 用图片充当列表标志
- 默认情况下，浏览器使用一个黑圆圈作为列表标志，可以用图片取代它：
```css
　　ul {list-style: none}

　　ul li {
　　　　background-image: url("path-to-your-image");
　　　　background-repeat: none;
　　　　background-position: 0 0.5em;
　　}
```
### 透明
- 将一个容器设为透明，可以使用下面的代码：
```css
　　.element {
　　　　filter:alpha(opacity=50); /* IE专用的 */
　　　　-moz-opacity:0.5; /*Firefox*/
　　　　-khtml-opacity: 0.5; /*webkit核心的浏览器*/
　　　　opacity: 0.5;  /*用于Opera*/
　　}
```
### !important规则
- 多条CSS语句互相冲突时，具有!important的语句将覆盖其他语句。由于IE不支持!important，所以也可以利用它区分不同的浏览器。
```css
h1 {
　　　　color: red !important;
　　　　color: blue;
　　}
```
###  在IE6中设置PNG图片的透明效果
```css
.classname {
　　　　background: url(image.png);
　　　　_background: none;
　　　　_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader
　　　　　　　　(src='image.png', sizingMethod='crop');

　　}
```
### 各类浏览器的专用语句
```
　/* IE6 and below */
　　* html #uno { color: red }

　　/* IE7 */
　　*:first-child+html #dos { color: red }

　　/* IE7, FF, Saf, Opera */
　　html>body #tres { color: red }

　　/* IE8, FF, Saf, Opera (Everything but IE 6,7) */
　　html>/**/body #cuatro { color: red }

　　/* Opera 9.27 and below, safari 2 */
　　html:first-child #cinco { color: red }

　　/* Safari 2-3 */
　　html[xmlns*=""] body:last-child #seis { color: red }

　　/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
　　body:nth-of-type(1) #siete { color: red }

　　/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
　　body:first-of-type #ocho { color: red }

　　/* saf3+, chrome1+ */
　　@media screen and (-webkit-min-device-pixel-ratio:0) {
　　　　#diez { color: red }
　　}

　　/* iPhone / mobile webkit */
　　@media screen and (max-device-width: 480px) {
　　　　#veintiseis { color: red }
　　}

　　/* Safari 2 - 3.1 */
　　html[xmlns*=""]:root #trece { color: red }

　　/* Safari 2 - 3.1, Opera 9.25 */
　　*|html[xmlns*=""] #catorce { color: red }

　　/* Everything but IE6-8 */
　　:root *> #quince { color: red }

　　/* IE7 */
　　*+html #dieciocho { color: red }

　　/* Firefox only. 1+ */
　　#veinticuatro, x:-moz-any-link { color: red }

　　/* Firefox 3.0+ */
　　#veinticinco, x:-moz-any-link, x:default { color: red }

　　/***** Attribute Hacks ******/

　　/* IE6 */
　　#once { _color: blue }

　　/* IE6, IE7 */
　　#doce { *color: blue; /* or #color: blue */ }

　　/* Everything but IE6 */
　　#diecisiete { color/**/: blue }

　　/* IE6, IE7, IE8 */
　　#diecinueve { color: blue\9; }

　　/* IE7, IE8 */
　　#veinte { color/*\**/: blue\9; }

　　/* IE6, IE7 -- acts as an !important */
　　#veintesiete { color: blue !ie; } /* string after ! can be anything */
```
### 图片预加载
[图片预加载地址](https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/)

### CSS重置
[Should You Reset Your CSS](https://www.webfx.com/blog/web-design/should-you-reset-your-css/)