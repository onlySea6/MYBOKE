---
title: js 知识 1
date: 2018-02-01
showSponsor: true
categories:
  - js
tags:
  - js
---

```js
/***
 *                    _ooOoo_
 *                   o8888888o
 *                   88" . "88
 *                   (| -_- |)
 *                    O\ = /O
 *                ____/`---'\____
 *              .   ' \\| |// `.
 *               / \\||| : |||// \
 *             / _||||| -:- |||||- \
 *               | | \\\ - /// | |
 *             | \_| ''\---/'' | |
 *              \ .-\__ `-` ___/-. /
 *           ___`. .' /--.--\ `. . __
 *        ."" '< `.___\_<|>_/___.' >'"".
 *       | | : `- \`.;`\ _ /`;.`/ - ` : | |
 *         \ \ `-. \_ __\ /__ _/ .-` / /
 * ======`-.____`-.___\_____/___.-`____.-'======
 *                    `=---='
 *
 * .............................................
 *          佛祖保佑             永无BUG
 */
```

## 语言特点

1.  编译型语言 优点：快 不足：移植性不好
2.  解释性语言 js、php（解释一行读一行） 不足：稍慢 优点：跨平台

## js 的组成部分

1. ECMAScript（语法）
2. BOM 浏览对象模型 BOM 的核心就是 window 对象 --window 是浏览器内置的一个对象，里面包含着操作浏览器的方法
3. DOM 文档浏览类型 
![DOM树](https://img2020.cnblogs.com/blog/1909562/202005/1909562-20200511101703818-1186457208.png)

## 什么是主流浏览器

1. 3%的市场占有率
2. 自己独立的内核

## 五大主流浏览器及其四大内核

1. IE 浏览器 Trident 内核
2. Chrome 浏览器 webkit 内核
3. Opera 浏览器 presto 内核
4. Safari 浏览器 webkit 内核
5. Firefox 浏览器 Gecko 内核

## 浏览器输入地址做的事情

![做的事情](https://z3.ax1x.com/2021/03/30/cPRJrF.png)

## js 数据类型

1. 原始数据类型/值类型/基础数据类型
   - Number 数字
   - Boolean 布尔
   - string 字符串
   - undefined 未定义
   - Null 空
   - symbol(ES6新增)
2. 引用数据类型
    1. 内置对象/原生对象
    * String、Number、Boolean、Array、Date、RegExp、Math、 Error、 Object、Function、 Global
  
    2. 宿主对象
    * BOM对象：Window、Navigator、Screen、History、Location 
    * DOM对象：Document、Body、Button、Canvas等
   
    3. 自定义对象--(指由用户创建的对象，兼容性问题需要由编写者注意)

    * 创建自定义对象几种方式：
    ```js
    （1）对象直接量:
    var obj1 = {}；
    var obj2 = {x:0，y:0}；
    var obj3 = {name：‘Mary’，age：18}

    （2）工厂模式--用函数来封装以特定接口创建对象的细节：
    function createPerson(name,age,job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        return o;
     }
    var person1 = createPerson('zhang',30,'java');

    （3）构造函数模式：
    function Person(name,age,job){
        this.name= name;
        this.age = age;
     this.job = job;
    }
    var person1 = new Person('zhang',30,'java');

    （4）原型模式：
    function Person(){}
        Person.prototype.name = 'zhang';
        Person.prototype.age = '22';
        Person.prototype.job = 'html5';
    var person1 = new Person();
    ```

## 原始数据类型和引用数据类型的区别是存储位置不一样

- 原始类型->栈（stack） 先进后出
栈会自动分配内存空间，它由系统自动释放；存放基本类型，简单的数据段，占据固定大小的空间

- 应用类型->堆（heap）先进先出
动态分配的内存，大小不定也不会自动释放。存放引用类型，那些可能由多个值构成的对象，保存在堆内存中

## 内存垃圾回收算法
- 详细见 [垃圾回收的几种算法](https://juejin.cn/post/6844904160719011848)
1. 引用计数法
2. 标记清除法
3. 复制算法

## js中返回false的只有
- ```flase```、 ```0 ```、 ```'' ```、 ``` undefined```、 ```null```、 ```NaN```
 
## typeof
- typeof 不能正确的判断其类型， typeof 一个函数可以输出 'function',而除此之外，输出的全是 object

## 正确检查类型
Object.prototype.toString.call()

## instanceof
- instanceof 可以准确的判断复杂数据类型，但是不能正确判断基本数据类型
- instanceof 是通过原型链判断的，A instanceof B, 在A的原型链中层层查找，是否有原型等于B.prototype，如果一直找到A的原型链的顶端(null;即Object.prototype.__ proto __),仍然不等于B.prototype，那么返回false，否则返回true.

## for...of
- for...of循环：具有 iterator 接口，就可以用for...of循环遍历它的成员(属性值)。for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象、Generator 对象，以及字符串。for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。可以中断循环。

## Object.keys(obj)
 Object.keys()：返回给定对象所有可枚举属性的字符串数组。 就是 key 作为新数组的参数
```js
var w={name:'12300'}
console.log(Object.keys(w))
// ["name"]
```
## Object方法
- Object.getPrototypeOf
- Object.create
- Object.getOwnPropertyNames
- Object.defineProperty
- Object.getOwnPropertyDescriptor
- Object.defineProperties
- Object.keys
- Object.preventExtensions / Object.isExtensible
- Object.seal / Object.isSealed
- Object.freeze / Object.isFrozen

## Object.entries(object)
- 返回一个给定对象自身可枚举属性的键值对数组。 就是每个key:value 成为一个独立的数组最后成为 一个大数组的对象
```js
let obj = {
        0: 'nihao',
        1: 'haha',
        2: 'gansha',
    }
    let arr = Object.entries(obj)
    console.log(arr); //[Array(2), Array(2), Array(2)]
```
## 逻辑运算符 
1. &&与 返回第一个假值 或者最后一个真值
2. ||或 返回第一个真值 或者最后一个假值

## while 和 do while 的区别
- while 先判断后执行 do while 先执行后判断(并在条件为真时重复代码)
- 当不满足循环条件时 while 一次都不会执行 do while 至少执行一次

## break和continue
- break 语句“跳出”循环。
- continue 语句“跳过”循环中的一个迭代。

## switch
```js
switch(表达式) {
     case n:
        代码块
        break;
     case n:
        代码块
        break;
     default:
        默认代码块
} 
```
- 计算一次 switch 表达式
- 把表达式的值与每个 case 的值进行对比
- 如果存在匹配，则执行关联代码

## js 运行三部曲

1. 语法解析（全局扫描）
2. 预编译/预解析
3. 解释执行（解释一行执行一行）
## Object()  构造函数为给定值创建一个对象包装器
1. 如果给定值是 null 或 undefined，将会创建并返回一个空对象 Object(null)
2. 如果传进去的是一个基本类型的值，则会构造其包装类型的对象
3. 如果传进去的是引用类型的值，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址

## setTimeout倒计时为什么会出现误差？
- setTimeout() 只是将事件插入了“任务队列”，必须等当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码消耗时间很长，也有可能要等很久，所以并没办法保证回调函数一定会在 setTimeout() 指定的时间执行。所以， setTimeout() 的第二个参数表示的是最少时间，并非是确切时间。

- HTML5标准规定了 setTimeout() 的第二个参数的最小值不得小于4毫秒，如果低于这个值，则默认是4毫秒。在此之前。老版本的浏览器都将最短时间设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常是间隔16毫秒执行。这时使用 requestAnimationFrame() 的效果要好于 setTimeout();

## 为什么 0.1 + 0.2 != 0.3 ?
- 0.1 + 0.2 != 0.3 是因为在进制转换和进阶运算的过程中出现精度损失。

## 如何优雅 取整
- var a = ~~2.33
- var b= 2.33 | 0
- var c= 2.33 >> 0

## 何优雅的实现金钱格式化：1234567890 --> 1,234,567,890
```js
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

console.log(format) // 1,234,567,890
```
## 不用Number、parseInt和parseFloat和方法把"1"字符串转换成数字
哈哈，不准用强制类型转换，那么就想到了强大了隐式转换
```js
var a =1 
+a
```
##  计算根html的字体大小
```js
        var computedFont=function(){
            // 公式:窗口宽/设计稿*100
            document.documentElement.style.fontSize=document.documentElement.clientWidth/750/2*100+'px'
        }
        window.onresize=function(){
            computedFont()
        }
```
## 什么是回流？（回流又称为重排）
1. 当render tree 中的一部分（或全部）因为元素的规模尺寸，布局、隐藏等改变而需要重新构建，这就称为回流

2. 当页面布局和几何属性改变时就需要回流

## 什么是重绘？
1. 当render tree 中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就称为重绘。

- 回流必将引起重绘，而重绘不一定会引起回流

## 避免重绘回流的两种方法？
1. 避免使用触发回流、重绘的css属性

2. 将重绘、回流的影响范围限制在单独的图层之内

- 优化点总结：
1. 不要把DOM结点的属性值放在一个循环里面当成循环里面的变量 offsetHeight offsetWidth
2. 不要使用table布局，可能很小的一个小改动都会造成整个table的重新布局
3. 用translate替代top改变（top会触发回流）
4. 用opacity替代visibility（需要配合独立图层 transform:translateZ(0)）
5. 不要一条一条的修改DOM样式，预先定义好class，然后修改DOM的className
6. 把DOM离线后修改，比如：先把DOM给display:none（有一次reflow），然后你修改100次，然后再把他显示出来
7. 动画实现的速度的选择
8. 对应动画新建图层
9. 启用GOU硬件加速(transform:tranlateZ(0)或者transform:tranlate3d(0,0,0))

## new操作符干了以下三步:

1. 先创建了一个新的空对象
2. 然后让这个空对象的__proto__指向函数的原型prototype
3. 将对象作为函数的this传进去，如果return 出来东西是对象的话就直接返回 return 的内容，没有的话就返回创建的这个对象

## 浏览器渲染的过程主要包括以下五步：

1. 浏览器将获取的HTML文档解析成DOM树。
2. 处理CSS标记，构成层叠样式表模型CSSOM(CSS Object Model)。
3. 将DOM和CSSOM合并为渲染树(rendering tree)，代表一系列将被渲染的对象。
4. 渲染树的每个元素包含的内容都是计算过的，它被称之为布局layout。浏览器使用一种流式处理的方法，只需要一次绘制操作就可以布局所有的元素。
5. 将渲染树的各个节点绘制到屏幕上，这一步被称为绘制painting。

## 纯函数
- 函数的返回结果只依赖于它的参数。
- 函数执行过程里面没有副作用。

## 观察者模式
当对象间存在一对多关系时，则使用观察者模式（Observer Pattern）。比如，当一个对象被修改时，则会自动通知依赖它的对象。观察者模式属于行为型模式。

## 浏览器事件流向
DOM事件传播包括三个阶段：
1. 捕获阶段
2. 目标对象调用事件处理程序
3. 冒泡阶段

## 渲染出来的数据 绑定事件 一定要给父级绑定 这样节省性能 
- 当我们删除某一项的时候 给父级绑定事件 用e.target获取某一项
- 给子集绑定一些属性 就能删除 数据的某一项