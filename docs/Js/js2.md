---
showSponsor: true
title: js 知识 2
date: 2018-02-15
categories:
  - js
tags:
  - js
---

## 预编译预解析（全局）

1. 函数声明整体提升
2. 函数声明提升
3. 先提升变量声明，后提升函数声明

## 函数预编译四部

1.  创建 AO 对象
2.  找形参和变量声明，将变量和形参作为 AO 对象的属性名值为 undefined
3.  将实参和形参统一
4.  在函数内部找函数声明，值赋予函数体

## 函数作用域

- 作用域属于函数，函数产生作用域，其中存储着运行期上下文的集合
- 函数的有效作用范围

### 作用域链

- scope 中所存储的执行期上下文对象的集合。这个集合呈链式链接，这种链式链接就叫作用域链

## 立即执行函数(IIFE)

1. (function(){})()
2. (function(){}())
3. [ function() {}() ];

4. ~ function() {}();
5. ! function() {}();
6. + function() {}();
7. - function() {}();

8. delete function() {}();
9. typeof function() {}();
10. void function() {}();
11. new function() {}();
12. new function() {};

13. var f = function() {}();

14. 1, function() {}();
15. 1 ^ function() {}();
16. 1 > function() {}();

- 优点:防止污染全局变量模块化开发、适合做一些初始化的工作
### call和apply都是函数的方法统称为立即执行函数 当一个函数调用他们会立即执行
- fn.call(要改变的this指向, 原函数需要的实参)
- fn.apply(要改变的this指向, [原函数需要的实参]) 实参是个数组
- 以上两个方法第一个参数为 null/undefined/不传 都指向window

apply的执行机制：将第二个数组实参隐式循环，并将数组逐一取出传入原函数中

1. apply实现数组降维
```js
var arr=[1,2,3]
var newArr=[]
newArr=newArr.concat.apply(newArr,arr)
```
2. apply实现数组中最大的值
```js
var numArr=[1,2,3,4]
var obj={}
var max=Math.max.apply(obj,numArr)
```

### bind延迟执行函数
- 函数.bind(要改变的this指向, 原函数需要的实参)

原理：
1. 将调用bind方法的函数克隆
2. 把克隆的函数this指向第一个参数
3. 把后续的实参逐一传入克隆的函数中
4. 把克隆的函数返回

## call 、apply、bind的优先级(this的归属问题) 
- new > bind > call/apply >默认this指向

## 内存泄漏的几种场景
1. 意外的全局变量
2. 遗忘的定时器
3. 使用不当的闭包
4. 遗漏的 DOM 元素 -dom移除了 但是js还持有对它的引用 解决：把事件清除了，即可从内存中移除
5. 网络回调--- 某些场景中，在某个页面发起网络请求，并注册一个回调，且回调函数内持有该页面某些内容，那么，当该页面销毁时，应该注销网络的回调，否则，因为网络持有页面部分内容，也会导致页面部分内容无法被回收
## 闭包
- [阮大神的闭包详解](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

- 当内部函数保存到外部时，将会产生闭包，闭包会导致原有作用域链不释放造成内存泄漏
  -- 内存泄漏：可以使用的空间越来越少
- 闭包的作用：
1.  实现共有变量 函数累加器
2.  可以做缓存
3.  可以实现封装 属性私有化
4.  模块化开发，防止污染全局变量

## 字符串的常用方法

- Chart()返回指定下标的字符
- ChartcodeAt() 返回指定位置字符的 unicode 编码
- concat() 拼接字符串
- fromcharcode()将 unicode 码转成字符串
- idnexof()返回字符串中检索指定字符串第一次出现的位置
- lastindexof()返回最后一次的位置
- match() 找到一个或多个正则表达式的匹配
- slice() 提取字符串片段
- split()字符串转数组
- substr()提取索引号指定的字符
- tostring()返回字符串对象值
- substring()字符串两个索引之间的字符
- trim() 移除首尾空白
- toLowercase()字符串转小写
- toUppercase()字符串转大写
- valueof()返回字符串对象的原始值

## 数组的常用方法

- isArray() 判断是不是数组
- concat()合并两个数组
- reverse()数组反转
- join()数组转字符串
- pop()删除数组最后一个元素
- push()数组末尾添加一个元素
- shift()删除数组首位元素
- unshift()数组首位添加元素
- slice()数组截取
- includes()判断数组中包含某一元素
- filter(function(item:数组每一项,index 数组索引,arr 原数组){})返回新数组过滤数组中不满足条件的值，满足条件的值作为新数组
- of()将一组值转化数组
- find(function(){}) 用于找出第一个符合条件的数组成员
- map()映射把数组映射成一个新数组返回，不改变原数组
- Array.from()类似数组的对象或者可遍历的对象转化成真正的数组
- fill()使用给定制填充一个数组
- every()最终返回布尔值，一假即假，全真则真
- some()一真即真返回布尔值

## 数组降维
1. flat方法
```js
  let arr = [1,2,[3,4],[5[6,7]]]
  let arr1 = arr.flat(Infinity)//[1,2,3,4,5,6,7]
```
2. join,split
```js
  let arr1 = arr.join().split(",")
```

3. toString,split
```js
   let arr1 = arr.toString().split(",")
```
## 数组去重

1. Array.from(new Set(arr 数组))有兼容
2. 双层循环，外层循环元素，内层循环比较值

```js
for(var i = 0;i < arr.length;i++){
   for(var j=i+1;j< arr.length;j++>){
     if(arr[i]==arr[j]){
       arr.splice(j,1)
       j--
     }
  }
}
```

3. 字符串数组查找下标索引

```js
var newArr=[]
for(var i=0;i< arr.length;i++){
  if(newArr.indexof(arr[i])===-1){
    newArr.push(arr[i]) //但这个去不了NaN
  }
}
if(!newArr.includes(arr[i])){
  newArr.push(arr[i])//这个能去掉NaN
}
```

4. 冒泡排序

```js
arr.sort(function(a-b)){return a-b}
for(var i=0;i< arr.length;i++){
  if(arr[i]===arr[i+1]){
    arr.splice(i,1)
  }
}
```

5.利用对象的属性不能重复

```js
var obj={} var array=[]
for(var i=0;i< arr.length;i++){
  if(!obj[arr[i]]){
    obj[arr[i]]=1;
    array.push(arr[i])
  }else{
    obj[arr[i]]++
  }
}
```
## 数组排序

1. 冒泡排序
```js
let arr=[1,5,6,8,22,44,1,0,65,45,88,7,6,4]
arr.sort(function(a,b){return b-a}) 
// a-b 从小到大     b-a从大到小
```
2. 快速排序(一分为二)
```js
let arr=[1,5,6,8,22,44,1,0,65,45,88,7,6,4]
function quieck(arr){
  if(arr.length<=1){
    return arr
  }
  let left=[]
  let right=[]
  let indexs=parseInt(arr.length/2)
  let contentVal=arr[indexs]
  for(let i=0;i<arr.length;i++){
    if(i===indexs) continue 
    if(arr[i]<contentVal){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quieck(left).concat(contentVal,quieck(right))
}
console.log(quieck(arr))
```
3. 希尔排序（性能最好的排序）
```js
function xier(arr){
    var interval = parseInt(arr.length / 2);  //分组间隔设置
    while(interval > 0){
        for(var i = 0 ; i < arr.length ; i ++){
            var n = i;
            while(arr[n] < arr[n - interval] && n > 0){
                var temp = arr[n];
                arr[n] = arr[n - interval];
                arr[n - interval] = temp;
                n = n - interval;
            }
        }
        interval = parseInt(interval / 2);
    }
    return arr;
}
```
## 数组查找 是否有某个元素
1. $.isArray(value,array,[ fromIndex ])
对参数的说明：value：要查找的值，array：数组值 ，fromIndex：开始的位置
```js
var arr = [ 4, "Pete", 8, "John" ];
$.isArray("John", arr);  //3
$.isArray(4, arr);  //0
$.isArray("David", arr);  //-1
$.isArray("Pete", arr, 2);  //-1
```
2. arr.find(条件函数)
官方定义：返回数组中满足条件的第一个元素的值，不存在则返回undefined
```js
var array1 = [5, 12, 8, 130, 44];
var found = array1.find(function(element) {
  return element > 10;
});
console.log(found);
// expected output: 12
```
3. arr.findIndex
官方定义：返回数组中满足条件的第一个元素的索引值，不存在返回-1
```js
var array1 = [5, 12, 8, 130, 44];
function isLargeNumber(element) {
  return element > 13;
}
console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```
4. indexOf(searchElement,[ fromIndex ])
方法返回可在数组中找到给定元素的第一个索引，如果不存在则返回-1
```js
// 使用indexOf查找所有的匹配项
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]
```
5. includes
includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false
```js
[1,2,3].includes(2)//true
```
6. filter
filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。filter() 不会对空数组进行检测。 filter() 不会改变原始数组
返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组。
```js
[1,2,3].filter((item)=>item===2)//[2]
```
7. map()
array.map(function(currentValue, index, arr), thisValue)
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
map() 方法按照原始数组元素顺序依次处理元素。
注意： map() 不会对空数组进行检测。
注意： map() 不会改变原始数组。
8. forEacah()
array.forEach(function(currentValue, index, arr), thisValue)

## 数组合并
1. concat
2. ES6
```js
 let arr1 = [1,2]
  let arr2 = [3,4]
  let arr = [...arr1,...arr2]//[1,2,3,4]
```
```js
var arr1=['a','b','c'];
var arr2=['d','e'];
arr1.push(...arr2); //['a','b','c','d','e']
```

## 二分查找
```js
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      if (nums[left] === target) return left;
      if (nums[right] === target) return right;
  
      const index = parseInt(left + right, 10);
      
      if (nums[index] < target) {
        left = index + 1;
      } else {
        right = index - 1;
      }
  
    }
    return -1;
  };
```
## 数组求和 最简单的
```js
eval(arr.join("+")) //这种是将字符串解析成js代码运行 非常的消耗性能
```
## Math()方法

- abs()取绝对值
- ceil()向上取整
- floor()向下取整
- round()四舍五入
- max()最大值
- min()最小值
- pow(x,y)返回 x 的 y 次幂
- sqrt()返回数的平方根
- random()返回 0-1 之间的随机数 [0,1)
## 构造函数

```js
function py() {
  this.key = value;
}
var py = new Py();
```

## 工厂函数

```js
var a = function() {
  var obj = { key: value };
  return obj;
};
```
## 异步代码 宏任务和微任务
- 异步代码分为微任务和宏任务
- 宏任务->setTimeout/setInterval 正常的js代码
- 微任务->promise  以及线程中的process.nextTick
- 微任务永远比宏任务先执行 
- 宏任务先进先出 进行排序
- 当运行到宏任务有微任务时，先执行微任务

## Service workers 
- Service workers 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。
这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用采取来适当的动作、更新来自服务器的的资源。
它还提供入口以推送通知和访问后台同步 API。