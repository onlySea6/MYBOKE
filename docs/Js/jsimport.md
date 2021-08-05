---
title: 数组方法解析
date: 2019-03-01
categories:
  - Array
tags:
  - Array
---
## js remember
1. JavaScript的执行上下文
  当代码运行时，会产生一个对应的执行环境，在这个环境中，所有变量会被事先提出来（变量提升），有的直接赋值，有的为默认值 undefined，代码从上往下开始执行，就叫做执行上下文
  「执行环境有三种」：
    1.全局环境：代码首先进入的环境
    2.函数环境：函数被调用时执行的环境
    3.eval函数
2. JavaScript的作用域链
作用域所存储的执行上下文对象的结合，这个集合成链式调用
3. JavaScript的闭包是什么？应用的场景？
闭包：能够读取函数内部变量的函数
场景：实现共有变量 函数累加器 可以做缓存，实现封装，属性私有化，模块化开发，防止全局变量污染
4. 介绍JavaScript的this
this存在于函数中，表示当前函数的执行上下文 
- 对象方法中，this指向调用它所在方法的对象
- 单独使用this，指向window
- 严格模式下函数没有绑定this上，this是undefined
- apply和call 允许切换幻术执行的上下文环境
- 事件处理函数  this->事件原
- 回调函数 this指向window
5. 如何改变this指向
- 箭头函数
- new
- call/apply bind
- 局部变量
1. call和apply的区别
区别在于接收参数的方式不同
fn.call(this,arg) 传递给函数的参数必须逐个列举出来
fn.apply(this,[ arg ]) 传递给函数的参数是数组
7. 实现call和apply
```js
var name = '时间跳跃';
var obj = {
    name: '听风是风'
};
// call和apply和原理将函数放到目标对象的内部
// ES6 call
Function.prototype.call_ = function (obj) {
    obj == obj ? Object(obj) : window;
    obj.fn = this;
    // 利用拓展运算符直接将arguments转为数组
    let args = [...arguments].slice(1);
    let result = obj.fn(...args);

    delete obj.fn
    return result;
};
fn.call_(obj, "我的", "名字", "是")
// ES6 apply
Function.prototype.apply_ = function (obj, arr) {
    obj == obj ? Object(obj) : window;
    obj.fn = this;
    let result;
    if (!arr) {
        result = obj.fn();
    } else {
        result = obj.fn(...arr);
    };

    delete obj.fn
    return result;
};
fn.apply_(obj, ["我的", "名字", "是"])
```
8. 实现bind
```js
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('Error')
    }
    var _this = this
    var args = [...arguments].slice(1)
    // 返回一个函数
    return function F() {
      // 因为返回了一个函数，我们可以 new F()，所以需要判断
      if (this instanceof F) {
        return new _this(...args, ...arguments)
      }
      return _this.apply(context, args.concat(...arguments))
    }
  }
```
9. 介绍JavaScript原型
js特有的一种对象，每一个对象都有其对应的原型，对象可以通过一个非标准属性__proto__来查找对应的原型
标准属性：Object.getprototypeof(对象)
10. 原型链
对象和原型之间由__proto__属性连接起的链式结构
11. 原型继承的方式
[网站](https://wj199624.gitee.io/wangjie/Js/js5yx.html#js%E7%BB%A7%E6%89%BF%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F)
12. Promise是什么，封装promise
Promise 是异步编程的一种解决方案：从语法上讲，promise是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。promise有三种状态： pending(等待态)，fulfiled(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造promise实例后，它会立即执行
```js
function MyPromise(fn) {
    var res = null,
　　　callback = null;
    function resolve(val) {
        if(typeof(callback) === 'function'){
            res = callback(val);
        }
    }
    function reject(val){
        if(typeof(callback) === 'function'){
            res = callback(val);
        }
    }
    this.then = function (cb) {
        callback = cb;
            return new MyPromise(function(resolve,reject){
                 setTimeout(() => {
                     resolve(res);
                }, 3000);
            })
    };
 
    fn(resolve,reject);
}
```
13. async await
14. 深浅拷贝 存在引用数据类型
浅拷贝只复制指向某个对象的指针而不复制对象本身，新旧对象还是共享同一块内存。数组对象 赋值 =
深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。
  JSON.parse(JSON.string())
  ```js
var china = {
	  	nation : '中国',
	  	birthplaces:['北京','上海','广州'],
	  	skincolr :'yellow',
	  	friends:['sk','ls']
	  }
	  //深复制，要想达到深复制就需要用递归
	  function deepCopy(o,c){
	    var c = c || {}
	    for(var i in o){
	    if(typeof o[i] === 'object'){
	  	   	   	  //要考虑深复制问题了
                      if(o[i].constructor === Array){
                    	//这是数组
                    	c[i] =[]
                    }else{
                    	//这是对象
                    	c[i] = {}
                    }
                    deepCopy(o[i],c[i])
	  	   	   }else{
	  	   	   	 c[i] = o[i]
	  	   	   }
	  	   }
	  	   return c
	  }
	  var result = {name:'result'}
	  result = deepCopy(china,result)
	  console.dir(result)
  ```
15. 深浅拷贝解决循环引用
对象A中包含指向对象B的指针，对象B中包含指向对象A的指针，会引发内存泄漏现象
- 父级引用：对象属性是对象本身，导致：子->父->子....循环，栈溢出
解决：while循环判断一个对象的字段是否引用了这个对象或这个对象的任意父级
- 同级引用：对象中的子对象引用了其他的子对象
解决：用 WeakMap() 记录下对象中的所有对象，并与新创建的对象一一对应，即记录引用关系
16. 宏任务和微任务
宏任务：定时器
微任务：promise
微任务永远比宏任务先执行
17. 函数式编程
18. 数组的常用方法 以及es6新增方法
19.  如何判断一个变量是不是数组？
- 使用 Array.isArray 判断，如果返回 true, 说明是数组
- 使用 instanceof Array 判断，如果返回true, 说明是数组
- 使用 Object.prototype.toString.call 判断，如果值是 [object Array], 说明是数组
- 通过 constructor 来判断，如果是数组，那么 arr.constructor === Array. (不准确，因为我们可以指定 obj.constructor = Array)

## ES6中的class和ES5的类有什么区别？
- ES6 class 内部所有定义的方法都是不可枚举的;
- ES6 class 必须使用 new 调用;
- ES6 class 不存在变量提升;
- ES6 class 默认即是严格模式;
- ES6 class 子类必须在父类的构造函数中调用super()，这样才有this对象;ES5中类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。
## 数组的哪些API会改变原数组？
- 修改原数组的API有:

splice/reverse/fill/copyWithin/sort/push/pop/unshift/shift

- 不修改原数组的API有:

slice/map/forEach/every/filter/reduce/entries/find

## 在JS中什么是变量提升？什么是暂时性死区？
- 变量提升就是变量在声明之前就可以使用，值为undefined。

- 在代码块内，使用 let/const 命令声明变量之前，该变量都是不可用的(会抛出错误)。这在语法上，称为“暂时性死区”。暂时性死区也意味着 typeof 不再是一个百分百安全的操作。

## obj[key] 思想 即后端给的数据不是固定的，自己可以定判断方便编写
```js
const json = {
  key:1
  }
  const objJspn={
      0:'未完成',
      1:'完成'
  }
  objJspn[json.key]
```

## 防抖和节流的区别是什么？防抖和节流的实现。
- 防抖(debounce):在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
- 防抖的应用场景:
  1. 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
  2. 搜索框联想场景：防止联想发送请求，只发送最后一次输入

- 节流(throttle): 用户进行高频事件触发(滚动)，但在限制在n秒内只会执行一次
- 函数节流的应用场景有:

  1. DOM 元素的拖拽功能实现（mousemove）
  2. 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
  3. 计算鼠标移动的距离（mousemove）
  4. Canvas 模拟画板功能（mousemove）
  5. 搜索联想（keyup）
  6. 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次
## 取数组的最大值（ES5、ES6）
```js
// ES5 的写法
Math.max.apply(null, [14, 3, 77, 30]);

// ES6 的写法
Math.max(...[14, 3, 77, 30]);

// reduce
[14,3,77,30].reduce((accumulator, currentValue)=>{
    return accumulator = accumulator > currentValue ? accumulator : currentValue
});
```
## promise 和async await的区别
### 首先说说两者的概念
- Promise
- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大，简单地说，Promise好比容器，里面存放着一些未来才会执行完毕（异步）的事件的结果，而这些结果一旦生成是无法改变的

- async await
async await也是异步编程的一种解决方案，他遵循的是Generator 函数的语法糖，他拥有内置执行器，不需要额外的调用直接会自动执行并输出结果，它返回的是一个Promise对象。

###  两者的区别：
- Promise的出现解决了传统callback函数导致的“地域回调”问题，但它的语法导致了它向纵向发展行成了一个回调链，遇到复杂的业务场景，这样的语法显然也是不美观的。而async await代码看起来会简洁些，使得异步代码看起来像同步代码，await的本质是可以提供等同于”同步效果“的等待异步返回能力的语法糖，只有这一句代码执行完，才会执行下一句。

- async await与Promise一样，是非阻塞的。

- async await是基于Promise实现的，可以说是改良版的Promise，它不能用于普通的回调函数。 

## delete(arr[i])方法直接删除数组的i项 但是会保留i项的键值

##  vue框架中的 vue.delete(arr[i])方法直接删除数组的i项 i项什么都不会保留

## 数组方法
1. filter
```js
arr =[1,2,3,4]
Array.prototype.myFilter=function(cb){
let newArr=[]
for(let i=0;i<this.length;i++>){
    if(cb(this[i],i)){
        newArr.push(this[i])
    }
}
}
let a=arr.filter(item=>item!=2)
console.log(a)
```
2. map
```js
arr=[1,2,3,4]
Array.prototype.myMap=function(cb){
let newArr=[]
for(let i=0;i<this.length;i++>){
    newArr.push(cb(this[i]))
}
return newArr
}
let b=arr.map(item=>item*2)
console.log(b)
```
3. reduce
```js
arr=[1,2,3,4,5]
Array.prototype.fakeReduce = function (fn, base) {

    let newArr = this;//原数组
    let arr = newArr.concat(); //数组合并

    if (base) arr.unshift(base);
    let index, newValue;
  
    while (arr.length > 1) {
      index = newArr.length - arr.length + 1;
      newValue = fn.call(null, arr[0], arr[1], index, newArr);
  
      arr.splice(0, 2, newValue); // 直接用 splice 实现替换
    }
  
    return newValue;
  };
  console.log(arr.fakeReduce((item,next,index)=>{
      return item*next
  },0))
```
## 三级联动 （原生写的）
```html
  省：
     <select style="width: 100px;" id="pre" onchange="chg(this)">
         <option value="-1">请选择</option>
     </select>
     市：
     <select style="width: 100px;" id="city" onchange="chg2(this)"></select>
     区：
     <select style="width: 100px;" id="area"></select>
```
```js
 // 省
     var pres = ["北京", "上海", "山东"];
    //声明市
    var cities = [
        ["东城", "昌平", "海淀"],
        ["浦东", "高区"],
        ["济南", "青岛"]
    ];
    var areas = [
        [
            ["东城1", "东城2", "东城3"],
            ["昌平1", "昌平2", "昌平3"],
            ["海淀1", "海淀2", "海淀3"]
        ],
        [
            ["浦东1", "浦东2", "浦东3"],
            ["高区1", "高区2", "高区3"]
        ],
        [
            ["济南1", "济南2"],
            ["青岛1", "青岛2"]
        ]
    ];
    // 获取元素
    var sheng=document.getElementById('pre')
    var shi=document.getElementById('city')
    var qu=document.getElementById('area')
    for (var i = 0; i < pres.length; i++) {
    //先把省放到页面上
    var op = document.createElement('option')
    op.value=i
    op.innerText=pres[i]
    //添加
    sheng.append(op)
}
// 市
   function chg(){
    // 省的下标
   var index=Number(sheng.value)
   if(index!==-1){//防止省=-1报错
//    清空市的内容
    shi.innerHTML=''
    var shiVal=cities[index]//根据省的下标拿到对应的市
    for(var i=0;i<shiVal.length;i++){
        var ops = document.createElement('option')
        ops.value=i
        ops.innerText=shiVal[i]
        shi.append(ops)
    }
   }else{
    shi.innerHTML=''
   }

    chg2()
   }
//    区
function chg2(){
 var indexs=Number(sheng.value)
 if(indexs!==-1){//防止省=-1报错
var quVal=areas[indexs]
var ind=Number(shi.value)
var val=quVal[ind]
// console.log(val)
//  清空区的内容
    qu.innerHTML=''
    for(var i=0;i<val.length;i++){
        var ops = document.createElement('option')
        ops.value=i
        ops.innerText=val[i]
        qu.append(ops)
    }
 }else{
    qu.innerHTML=''
 }
}
```