---
title: reactjsx
date: 2019-09-30
categories:
  - react
tags:
  - react
---
## react中的 JSX 语法 => js+xml(html)
1. JSX的特点
```html
-  只能有一个根元素 
-  <></>代表dom  {}表示js
-  class=>className  clas关键字
-  for=> HtmlFor
-  style要写成对象形式 写双大括号{{}}  第一个大括号表示js 第二个表示style对象
-  innerHtml 防止xss攻击 =>dangerouslySetInnerHTML <p dangerouslySetInnerHTML={{__html:inm}}></p>(固定写法)
  千万不要相信用户数据输入的内容  输入的转成字符串就可以防止xss
- js语法注释 单行注释注意换行 {//这是单行注释}  {/***这是多行注释*/}
-  事件 on加上驼峰命名法
-  {}要有返回值
```
