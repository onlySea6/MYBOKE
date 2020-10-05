---
title: Markdown
date: 2020-09-24
categories:
 - Markdown
tags:
 - Markdown
---
[[toc]]

## markdomn 语法介绍

### 1. 斜体和粗体

代码展示：
```js
1.*斜体*或_斜体_
2.**粗体**
3.***加粗斜体***
4.~~删除线~~
```
显示效果：

*斜体*
或
_斜体_
**粗体**
***加粗斜体***
~~删除线~~

### 2. 分级标题

代码展示：

第一种
```js
1.这是一个一级标题
============================
3.这是一个二级标题
----------------------------
```
第二种
```js
1.# 一级标题
2.## 二级标题
3.### 三级标题
4.#### 四级标题
5.##### 五级标题
6.###### 六级标题
```


### 3. 有序无序列表
代码展示：
```js
1. XXX
2. XXX
3. XXX

- XXX
- XXX
- XXX

* XXX
* XXX
* XXX

+ xxx
+ xxx
+ xxx

多级嵌套
1. XXX
  - XXX
    - XXX
2. XXX
  - XXX
    - XXX
```
显示效果：
1. XXX
2. XXX
3. XXX

- XXX
- XXX
- XXX

* XXX
* XXX
* XXX

+ xxx
+ xxx
+ xxx

多级嵌套
1. XXX
  - XXX
    - XXX
2. XXX
  - XXX
    - XXX
### 4. 表格
冒号代表对齐格式，分别为居中；右对齐；左对齐

代码展示：
```js
name | age | sex
:-:|:-|-:
tony|20|男
lucy|18|女
```
显示效果：
|name | age | sex|
|:-:|:-|-:|
|tony|20|男|
|lucy|18|女|

### 5. 分割线
在一行中用三个以上的星号(*)、减号(-)、底线(_)来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。
代码展示：
```js
***
---
___
```
显示效果：

***
---
___

### 6. 代码块
一种是利用缩进(tab), 另一种是利用英文“`”符号
代码展示：
```js
1. 行内代码语法高亮

   ``` / `` / `
2. 段落式代码语法高亮

   ```js  /  ```html  ...

3. 禁用语法高亮

   ```nohighlight

4. 每行4个tab

```
显示效果：
```js
代码
```
`代码`

- 支持的语言包括但不限于：
`
1c, abnf, accesslog, actionscript, ada, apache, applescript, arduino, armasm, asciidoc, aspectj, autohotkey, autoit, avrasm, awk, axapta, bash, basic, bnf, brainfuck, cal, capnproto, ceylon, clean, clojure, clojure-repl, cmake, coffeescript, coq, cos, cpp, crmsh, crystal, cs, csp, css, d, dart, delphi, diff, django, dns, dockerfile, dos, dsconfig, dts, dust, ebnf, elixir, elm, erb, erlang, erlang-repl, excel, fix, flix, fortran, fsharp, gams, gauss, gcode, gherkin, glsl, go, golo, gradle, groovy, haml, handlebars, haskell, haxe, hsp, htmlbars, http, hy, inform7, ini, irpf90, java, javascript, json, julia, kotlin, lasso, ldif, leaf, less, lisp, livecodeserver, livescript, llvm, lsl, lua, makefile, markdown, mathematica, matlab, maxima, mel, mercury, mipsasm, mizar, mojolicious, monkey, moonscript, n1ql, nginx, nimrod, nix, nsis, objectivec, ocaml, openscad, oxygene, parser3, perl, pf, php, pony, powershell, processing, profile, prolog, protobuf, puppet, purebasic, python, q, qml, r, rib, roboconf, rsl, ruby, ruleslanguage, rust, scala, scheme, scilab, scss, smali, smalltalk, sml, sqf, sql, stan, stata, step21, stylus, subunit, swift, taggerscript, tap, tcl, tex, thrift, tp, twig, typescript, vala, vbnet, vbscript, vbscript-html, verilog, vhdl, vim, x86asm, xl, xml, xquery, yaml, zephir
`

### 7. 设置字体，字体颜色，字号
代码展示：
```html
<font face="黑体">黑体</font>
<font color="red">红色</font>
<font color="#00ffff">123</font>
<font size="25">字体大小</font>
```
显示效果：

<font face="黑体">黑体</font>
<font color="red">红色</font>
<font color="#00ffff">123</font>
<font size="25">字体大小</font>

### 8. 注脚
代码展示：
```
文本内容[^1]文本内容[^2]

[^1]:注脚1
[^2]:注脚2
```
显示效果：
文本内容[^1]文本内容[^2]

[^1]:注脚1
[^2]:注脚2


### 9. 背景色
代码展示：
```
<table><tr><td bgcolor=orange>背景色是：orange</td></tr></table>
```
显示效果：
<table><tr><td bgcolor=orange>背景色是：orange</td></tr></table>


### 10. 超链接
行内式和参考式两种形式，行内式一般使用较多
- 行内式
语法说明：[]里写链接文字，()里写链接地址, ()中的”“中可以为链接指定title属性，title属性可加可不加。title属性的效果是鼠标悬停在链接上会出现指定的 title文字。[链接文字](链接地址 “链接标题”)’这样的形式。链接地址与链接标题前有一个空格。
代码展示：
```
欢迎[wangjie](http://wj199624.gitee.io/wangjie/)
欢迎[wangjie](http://wj199624.gitee.io/wangjie/ "wangjie")
```
显示效果：

欢迎[wangjie](http://wj199624.gitee.io/wangjie/)
欢迎[wangjie's blog](http://91guangju.com "wangjie's blog")

- 参考式（暂缺）


### 11. 引用
代码展示：
```
普通引用
> 引用文本前使用 [大于号+空格]
> 折行可以不加，新起一行都要加上

引用里嵌套引用
> 最外层引用
> > 多一个 > 嵌套一层引用
> > > 可以嵌套很多层

引用里嵌套列表
> - 这是引用里嵌套的一个列表
> - 还可以有子列表
>     * 子列表需要从 - 之后延后四个空格开始

引用里嵌套代码块
>     同样的，在前面加四个空格形成代码块
>
> ```
> 或者使用 ``` 形成代码块
> ```
```


显示效果：

  - 普通引用
> 引用文本前使用 [大于号+空格]
> 折行可以不加，新起一行都要加上

  - 引用里嵌套引用
> 最外层引用
> > 多一个 > 嵌套一层引用
> > > 可以嵌套很多层

  - 引用里嵌套列表
> - 这是引用里嵌套的一个列表
> - 还可以有子列表
>     * 子列表需要从 - 之后延后四个空格开始

  - 引用里嵌套代码块
>     同样的，在前面加四个空格形成代码块
>
> ```
> 或者使用 ``` 形成代码块
> ```



### 12.图片
- 跟链接的方法区别在于前面加了个感叹号 !
代码展示：
```
![图片名称](http://图片网址)
```
显示效果：

![图片名称](http://图片网址)

也可以像网址那样对图片网址使用变量

代码展示：
```
这个链接用 1 作为网址变量 [Google][1].
然后在文档的结尾位变量赋值（网址）

 [1]: http://www.google.com/logo.png
```

显示效果：

这个链接用 1 作为网址变量 [Google][1].
然后在文档的结尾位变量赋值（网址）

 [1]: http://www.google.com/logo.png


### 13. 高级技巧
行内 HTML 元素
目前只支持部分段内 HTML 元素效果，包括` <kdb> <b> <i> <em> <sup> <sub> <br>` ，如
代码展示：
```
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
使用 <pre></pre> 元素同样可以形成代码块
<b> Markdown 在此处同样适用，如 *加粗倾斜* </b>
```
显示效果：

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

使用 `<pre></pre>`
<pre></pre>

元素同样可以形成代码块

<b> Markdown 在此处同样适用，如 *加粗倾斜* </b>

### 14. toc拓展
[[toc]]

:tada: :100:


这里使用了 markdown 的拓展 `[[toc]]`

#### 这里是guangju博客的示例
#### 这里是guangju博客的示例
#### 这里是guangju博客的示例
#### 这里是guangju博客的示例
#### github

[关于我](/about/)


### 15.自定义容器
```
::: tip 提示
this is a tip
:::

::: warning 注意
this is a tip
:::

::: danger 警告
this is a tip
:::
```
显示效果：

::: tip 提示
this is a tip
:::

::: warning 注意
this is a tip
:::

::: danger 警告
this is a tip
:::