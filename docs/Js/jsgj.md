---
title: js 高阶
date: 2018-02-01
showSponsor: true
categories:
  - js
tags:
  - js
---
## js高阶

### 代码嵌入网页的方法
1. script的type属性
- ```<script>```标签有一个type属性，用来指定脚本类型。对JavaScript脚本来说，type属性可以设为两种值。
```
text/javascript：这是默认值，也是历史上一贯设定的值。如果你省略type属性，默认就是这个值。对于老式浏览器，设为这个值比较好。
application/javascript：对于较新的浏览器，建议设为这个值。
```
- 如果type属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在```<script>```标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的type属性即可。
- 浏览器不会执行，也不会显示它的内容，因为不认识它的type属性。但是，这个```<script>```节点依然存在于 DOM 之中，可以使用```<script>```节点的text属性读出它的内容。
2. script 元素加载外部脚本 src属性
```
<script src="https://www.example.com/script.js"></script>
```
- 如果脚本文件使用了非英语字符，还应该注明字符的编码。
```
<script charset="utf-8" src="https://www.example.com/script.js"></script>
```
- 加载外部脚本和直接添加代码块，这两种方法不能混用。下面代码的console.log语句直接被忽略
```js
<script charset="utf-8" src="example.js">
  console.log('Hello World!');
</script>
```
- integrity
* 为了防止攻击者篡改外部脚本，script标签允许设置一个integrity属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性。
```js
<script src="/assets/application.js"
  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
</script>
```
上面代码中，script标签有一个integrity属性，指定了外部脚本/assets/application.js的 SHA256 签名。一旦有人改了这个脚本，导致 SHA256 签名不匹配，浏览器就会拒绝加载。

#### URL 协议
1. URL 支持javascript:协议，即在 URL 的位置写入代码，使用这个 URL 的时候就会执行 JavaScript 代码。
```js
<a href="javascript:console.log('Hello')">点击</a>
```
2. 如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。
```js
<a href="javascript: new Date().toLocaleTimeString();">点击</a>
```
- 返回的不是字符串，那么浏览器不会新建文档，也不会跳转。
* javascript:协议的常见用途是书签脚本 Bookmarklet。
* 由于浏览器的书签保存的是一个网址，所以javascript:网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。
* 为了防止书签替换掉当前文档，可以在脚本前加上void，或者在脚本最后加上void 0。
```js
<a href="javascript: void new Date().toLocaleTimeString();">点击</a>
<a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
```
上面这两种写法，点击链接后，执行代码都不会网页跳转。

### script 元素
#### 浏览器加载 JavaScript 脚本，主要通过<script>元素完成。正常的网页加载流程是这样的
```
1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
2. 解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
3. 如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
4. JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
```
* 加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染?
 - 原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。
* 如果外部脚本加载时间很长（一直无法完成下载）
 - 那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。
##### 如何避免 阻塞效应
1. 第一种 script放在底部
- 为了避免这种情况，较好的做法是将```<script>```标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。
- 脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。
```html
<head>
  <script>
    console.log(document.body.innerHTML);
  </script>
</head>
<body>
</body>
```
上面代码执行时会报错，因为此时document.body元素还未生成。
一种解决方法是设定DOMContentLoaded事件的回调函数。
```html
<head>
  <script>
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        console.log(document.body.innerHTML);
      }
    );
  </script>
</head>
```
上面代码中，指定DOMContentLoaded事件发生后，才开始执行相关代码。DOMContentLoaded事件只有在 DOM 结构生成之后才会触发。
- 另一种解决方法是，使用`<script>`标签的onload属性。当`<script>`标签指定的外部脚本文件下载和解析完成，会触发一个load事件，可以把所需执行的代码，放在这个事件的回调函数里面。
- Firefox 浏览器会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；
- Webkit则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行。
2. 第二种 defer属性
- 为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对```<script>```元素加入defer属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。
```js
<script src="a.js" defer></script>
```
- defer属性的运行流程如下。
```
1. 浏览器开始解析 HTML 网页。
2. 解析过程中，发现带有defer属性的<script>元素。
3. 浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本。
4. 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。
```
3. 第三种async 属性
- 解决“阻塞效应”的另一个方法是对<script>元素加入async属性。
```js
<script src="a.js" async></script>
```
- async属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。
```
1. 浏览器开始解析 HTML 网页。
2. 解析过程中，发现带有async属性的script标签。
3. 浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本。
4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
5. 脚本执行完毕，浏览器恢复解析 HTML 网页。
```