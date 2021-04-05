---
title: ES6声明变量的方式
date: 2018-12-05
categories:
  -  ES6
tags:
  -  ES6
---
## ES6 新增
1. 新增了块级作用域(let,const)
2. 提供了定义类的语法糖(class)
3. 新增了一种基本数据类型(Symbol)
4. 新增了变量的解构赋值
5. 函数参数允许设置默认值，引入了rest参数，新增了箭头函数
6. 数组新增了一些API，如 isArray / from / of 方法;数组实例新增了 entries()，keys() 和 values() 等方法
7. 对象和数组新增了扩展运算符
8. ES6 新增了模块化(import/export)
9. ES6 新增了 Set 和 Map 数据结构
10. ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例
11. ES6 新增了生成器(Generator)和遍历器(Iterator)

## ES6声明变量的方式
- let和作用域 ES6引入了let,用let声明变量，解决了JavaScript没有块级作用域的问题 作用域简单的来说，就是一套寻找变量的规则，用于确定在何处以及如何查找变量。说直白点：这些变量在哪里？它们存储在哪里？编译器如何找到它们？ES6代码之前，只有全局作用域或函数作用域。

1. var声明 
- 变量提升
- 可以重复声明
- 只在全局作用域和函数作用域 
** 针对以上的问题es6做了更新 **
2. let
- 没有变量提升 
- 不可以重复声明
- 块级作用域 ->表现形式{} if(){}  for(){}
3. const
- 不存在变量提升
- 不可以重复声明，一旦声明必须马上赋值，声明就是一个常量不能被修改
- 块级作用域

## var 与 let\const  的区别
1. var声明的变量会挂载在window上，而let和const声明的变量不会
2. var声明变量存在变量提升，let和const不存在变量提升
3. let和const声明形成块作用域
4. 同一作用域下let和const不能重复声明，而var可以
5. 暂存死区
```js
var a = 100;
if(1){
    a = 10;
    let a = 1;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域查找变量a，
    // 而这时，还未到声明时候，所以控制台Error:a is not defined
    // 即let 和 const 不会声明提前
}
```
6. const
- 一旦声明必须赋值,不能使用null占位。
- 声明后不能再修改
- 如果声明的是引用类型数据，可以修改其属性

## 类 的使用
1. 类 实例化是一个函数
```js
class Person{
}
console.log(new Person());//Person {}
console.log(typeof Person);//function
```
2. 构造函数
```js
function Person(name,age) {
    this.name = name;
    this.age=age;
}
Person.prototype.say = function(){
    return "我的名字叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new Person("laotie",88);
//通过构造函数创建对象，必须使用new 运算符
console.log(obj.say());//我的名字叫laotie今年88岁了
```
3. 原型上的函数 获取先实例化再Person.prototype
```js
class Person{
      constructor(name='zhangsan'){
          this.name = name;
      }
      add(a,b){
          return a + b;
      }
}
console.log(new Person());
//Person {name: "zhangsan"}
console.log(Person.prototype.add);
//ƒ add(a,b){return a + b;}
```
4. 另外一种往实例上挂载非函数属性的写法
- 在构造函数外写`key = value`
```js
class Person{
      constructor(name='zhangsan'){
          this.name = name;
      }
      age=18;
}
console.log(new Person());
//Person {age: 18, name: "zhangsan"}
```
- 这种写法不能接受构造函数的初始化参数，只能通过实例.操作符进行访问和设置
5. 访问器get和set
```js
class Day{
      constructor(day=1){
          this.day= day;
      }
      get proxyDay(){
          if(day < 10){
                return '0'+this.day;
          }
          return this.day;
      }
      set proxyDay(value){
          if(value < 31 && value >0){
              this.day = value;
          }
      }
}
var day = new Day();
console.log(day.proxyDay);//1
day.proxyDay = -1;
console.log(day.proxyDay);//1
day.proxyDay = 15;
console.log(day.proxyDay);//15
```
6. extends关键字 继承
```js
class Day{
      constructor(day=1){
          this.day= day;
      }
}
class Holiday extends Day{
      /*
       constructor(){
          super();
      }
     */
}
var holiday = new Holiday();
console.log(holiday);//{day:1}
```
- 子类构造器中可以新增挂载实例属性，且可覆盖继承自父类属性
```js
class Day{
      constructor(day=1){
          this.day= day;
      }
}
class Holiday extends Day{
       constructor(){
          super();
          this.day = 5;
          this.hour = 12;
      }
}
var holiday = new Holiday();
console.log(holiday);//{day:5,hour:12}
```
7. static关键字 静态函数
```js
class Day{
      constructor(day=1){
          this.day= day;
      }
      static add(a,b){
            return a + b;
      }
}
var day = new Day();
console.log(day.add);//undefined
console.log(Day.add);//ƒ add(a,b){return a + b;}
```
- 静态函数只可以通过类Day调用，实例不可调用。
- 需要注意的是，static只针对函数其作用。

8. 静态属性（只能通过类调用的数据类型属性）
```js
class Day{
      constructor(day=1){
          this.day= day;
      }
      static add(a,b){
            return a + b;
      }
}
Day.dayType = '日子';
var day = new Day();
console.log(day.dayType);//undefined
console.log(Day.dayType);//日子
```