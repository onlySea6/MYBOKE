---
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

### 作用域链

- scope 中所存储的执行期上下文对象的集合。这个集合呈链式链接，这种链式链接就叫作用域链

## 立即执行函数(IIFE)

1. (function(){})()
2. (function(){}())

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


## 闭包

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

## 数组的去重

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
for(var i=0;i< arr.length;i++>){
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
for(var i=0;i< arr.length;i++>){
  if(!obj[arr[i]]){
    obj[arr[i]]=1;
    array.push(arr[i])
  }else{
    obj[arr[i]]++
  }
}
```
## 数组求和最简单的
```js
eval(arr.join("+"))
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
