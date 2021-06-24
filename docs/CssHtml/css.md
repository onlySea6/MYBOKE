---
title: API
date: 2018-10-30
sidebar: auto
categories:
  - css
tags:
  - css
---
## flex实现九宫格
- 关键属性 `flex-warp:warp`
## css属性 继承 和不可继承
```html
不可继承的：display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。
所有元素可继承：visibility和cursor。
内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
终端块状元素可继承：text-indent和text-align。
列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
表格元素可继承：border-collapse。
```
## (ಥ_ಥ) canvas 画布
- HTML5 `<canvas>` 元素用于图形的绘制 (通常是JavaScript)来完成.
- `<canvas>` 标签只是图形容器，您必须使用脚本来绘制图形。
- 你可以通过多种方法使用 canvas 绘制路径,盒、圆、字符以及添加图像。
-  [详细地址](https://www.runoob.com/html/html5-canvas.html)

## overflow:hidden:当内容溢出元素框时，内容会被修剪，并且其余内容是不可见的
```css
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp:1;
display: block;
white-space: nowrap;
width: 500rpx;
```
## css样式控制文字强制换行
```css
 word-wrap:break-all /*中文和英文都强制换行 */
word-wrap:break-word/*针对中文换行*/
```

## text-overflow:ellipsis:当文本溢出包含元素时，显示省略符号来代表被修剪的文本

## white-space:nowrap: 文本不会换行，文本会在同一行上继续，知道遇到< br> 标签为止

## 媒体查询
meta标签name="viewport"属性，是专门用来针对手机移动端的网页进行优化而设置的，通过学习viewport的写法和用法，能让我们更加清楚了解，那些在PC端浏览器中设计的网站是如何在手机移动设备上正常显示的？
- viewport定义

viewport有视窗、视区等含义，是专门为手机移动设备设计的，当在手机移动设备打开网页时，就会检测网页meta标签是否设置了viewport，如果设置了，就会按照设置viewport的要求在手机移动设备中显示网页。

- viewport有以下三种类型：    

1. 布局视区（layout viewport）是指整个网页在手机移动浏览器中显示的区域，由于这个布局视区在大多数手机移动浏览器中默认显示的宽度是980px（也有1024px，或其他宽度的），只要整个网页宽度不超过980px，就能正常显示在手机浏览器中，而不会因为太窄被挤得错位；
2. 可见视区（visual viewport），就是手机移动设备本身的屏幕显示区域，不同的移动设备，可见视区尺寸也是不同的；
3. 理想视区（ideal viewport）是指布局视区能完美适配手机移动设备的可见视区，也就是布局视区的宽度=可见视区的宽度，这样就不需要缩放和横向滚动条就能正常查看整个网页内容了；
  
- viewport在手机移动设备中默认的是布局视区（layout viewport），由于手机移动设备的可见视区宽度小于布局视区的宽度，网页在没有响应式自适应的话，那么，用户在手机移动设备的屏幕可见视区就只能看见整个网页的一部分内容，需要进行平移或缩放才可以查看网页其他部分的内容！
  
- viewport用法
  
1. 在html头部的< head >和< />之间加入以下meta标签viewport属性的写法：
Markup
```html <meta name="viewport"  content="属性名=属性值">```
2. 如果content后面有多个属性，则属性与属性之间用英文逗号隔开，示范代码如下：
Markup
```html <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">```
以上代码表示当前viewport的宽度是理想视区的宽度，也就是布局视区宽度等于设备的可见视区的宽度，同时不允许用户手动缩放。
- viewport属性
viewport属性列表如下：

属性名|	属性值说明
:-:|-:
width|	控制视区的宽度，可以指定固定宽度值；或设置为device-width；
height|	控制视区的高度，这个属性一般不设置，很少使用
initial-scale|	设置页面初始化缩放值，通常设为1，可以是小数
maximum-scale|	允许用户缩放的最大比例值，为一个数字，可以带小数
minimum-scale|	允许用户缩放的最小比例值，为一个数字，可以带小数
user-scalable|	是否允许用户进行缩放, no 代表不允许，yes代表允许
target-densitydpi| 	只有安卓手机支持，且已开始弃用，因此，不做介绍！

1. width属性：表示在手机移动设备下显示的布局视区的宽度，有以下几种情况：
- 如果width不设置或留空，则使用默认宽度，一般大多数手机移动浏览器默认的布局视区宽度为980px，少数也有1024px，也可以是其他值；
- 如果width设置宽度为device-width，则表示设置成为理想视区宽度，即布局视区宽度=可见视区宽度；
- 如果width设置固定宽度，单位是px，也可以不带单位，比如width=640，因为默认单位也是px；
2. height属性：这个属性一般不设置，很少使用；
3. initial-scale属性：设置布局视区初始化缩放比例，即每一次加载时页面缩放的比例
如果设置initial-scale=1，则和width=device-width是一样的，都表示设置成理想视区（ideal viewport），但两者都有一个小缺陷，就是width=device-width会导致iphone、ipad横竖屏不分，initial-scale=1会导致IE横竖屏不分，最完美的写法两者都写上去， initial-scale=1 解决 iphone、ipad的缺陷，width=device-width解决IE的缺陷，这样就可以相互弥补缺陷。
4. maximum-scale属性值必须大于minimum-scale属性值；
5. user-scalable属性：设置是否允许用户手动缩放布局视区，不是必须设置的属性；
如果设置user-scalable=0，不是必需的，是否允许用户手动播放根据网站的需求来定，但把width设为width-device基本是必须的，这样能保证不会出现横向滚动条。
* viewport扩展
当设置了width和initial-scale时，浏览器会自动选择数值最大的进行适配。如设置：
Markup
```html <meta name="viewport" content="width=500, initial-scale=1">```
浏览器会选择数值大的进行适配，如果当前窗口ideal viewport宽度为300，initial-scale值为1，取得是width为500的值；如果当前窗口的ideal viewport为640，则取640。

* 设置initial-scale=1，则和width=device-width是一样的，都表示设置成理想视区（ideal viewport），但两者都有一个小缺陷，就是width=device-width会导致iphone、ipad横竖屏不分，initial-scale=1会导致IE横竖屏不分，最完美的写法两者都写上去， initial-scale=1 

* 解决 iphone、ipad的缺陷，width=device-width解决IE的缺陷，这样就可以相互弥补缺陷。
Markup
```html <meta name="viewport" content="width=device-width, initial-scale=1">```
这段代码是手机移动网页自适应常用的方法，如果不想要用户可以手动缩小和放大，就加上user-scalable=no属性，代码如下：
Markup
```html <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no ">```

* android与viewport
target-densitydpi属性只支持android手机，但安卓已经决定废弃这个属性，所以不做介绍。
而initial-scale属性，对于android来讲，在大部分安卓手机机型上是无效的，无论是0.5或2都不会变化，但这不影响我们使用viewport。

## 文字渐变
```css
p{
    background-image:-webkit-linear-gradient(bottom, red, #fd8403, yellow);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}
```
## 背景图片自适应
```css
background: url(../static/os.jpg);
     background-repeat: no-repeat;
     background-size: cover;
     -webkit-background-size: cover;
     -o-background-size: cover;
     background-position: center 0;
```

## css 布局的几种方式

1. table 布局

2. flex 布局
- 盒模型
- display / poistion
- flexbox 布局

1. float 布局
- 高度塌陷
- 两栏布局
- 三栏布局
4. 响应式布局
- meta 标签
- 使用 rem
- media query

## 盒子的大小跟随浏览器大小变化
- window.onresize= 盒子

## 手机的背景图必须用
- background-size

## em和rem的区别
- em 如果没有设置即参照父容器的字号大小或浏览器默认字号大小
```
<div>
    我是父元素div
    <p>
        我是子元素p
        <span>我是孙元素span</span>
    </p>
</div>
<!--  -->
div {
  font-size: 40px;
  width: 10em; /* 400px */
  height: 10em;
  border: solid 1px black;
}
p {
  font-size: 0.5em; /* 20px */ 
  width: 10em; /* 200px */
  height: 10em;
  border: solid 1px red;
}
```
- rem 根据根`<html>`元素。通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem
```css
html {
    font-size: 10px;
    }
div {
    font-size: 4rem; /* 40px */
    width: 30rem;  /* 300px */
    height: 30rem;
    border: solid 1px black;
}
```
