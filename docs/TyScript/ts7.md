---
title: String
date: 2019-10-05
sidebar: auto
categories:
  - TypeScript
tags:
  - TypeScript
---

## String
- String 对象用于处理文本（字符串）。
```ts
var txt = new String("string");
// 或者更简单方式：
var txt = "string";
```
## String 对象属性
1. 	constructor  对创建该对象的函数的引用。
```ts
var str = new String( "This is string" ); 
console.log("str.constructor is:" + str.constructor)
// 输出结果：
str.constructor is:function String() { [native code] }
```
2. length  返回字符串的长度。
```ts
var uname = new String("Hello World") 
console.log("Length "+uname.length)  // 输出 11
```
3. prototype  允许您向对象添加属性和方法。
```ts
function employee(id:number,name:string) { 
    this.id = id 
    this.name = name 
 } 
 var emp = new employee(123,"admin") 
 employee.prototype.email="admin@runoob.com" // 添加属性 email
 console.log("员工号: "+emp.id) 
 console.log("员工姓名: "+emp.name) 
 console.log("员工邮箱: "+emp.email)
```
## String 方法
1. 	charAt()  返回在指定位置的字符。
```ts
var str = new String("RUNOOB"); 
console.log("str.charAt(0) 为:" + str.charAt(0)); // R
console.log("str.charAt(1) 为:" + str.charAt(1)); // U 
```
2. charCodeAt() 返回在指定的位置的字符的 Unicode 编码。
```ts
var str = new String("RUNOOB"); 
console.log("str.charCodeAt(0) 为:" + str.charCodeAt(0)); // 82
console.log("str.charCodeAt(1) 为:" + str.charCodeAt(1)); // 85
```
3. concat()  连接两个或更多字符串，并返回新的字符串。
```ts
var str1 = new String( "RUNOOB" ); 
var str2 = new String( "GOOGLE" ); 
var str3 = str1.concat( str2 ); 
console.log("str1 + str2 : "+str3) // RUNOOBGOOGLE
```
4. indexOf()  返回某个指定的字符串值在字符串中首次出现的位置。
```ts
var str1 = new String( "RUNOOB" ); 
var index = str1.indexOf( "OO" ); 
console.log("查找的字符串位置 :" + index );  // 3
```
5. lastIndexOf()  从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。
```ts
var str1 = new String( "This is string one and again string" ); 
var index = str1.lastIndexOf( "string" );
console.log("lastIndexOf 查找到的最后字符串位置 :" + index ); // 29
```
6. localeCompare()  用本地特定的顺序来比较两个字符串。
```ts
var str1 = new String( "This is beautiful string" );
var index = str1.localeCompare( "This is beautiful string");  
console.log("localeCompare first :" + index );  // 0
```
7. match()  查找找到一个或多个正则表达式的匹配。
```ts
var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/g);  // ain,ain,ain
```
8. replace()  替换与正则表达式匹配的子串
```ts
var re = /(\w+)\s(\w+)/; 
var str = "zara ali"; 
var newstr = str.replace(re, "$2, $1"); 
console.log(newstr); // ali, zara
```
9. 	search()  检索与正则表达式相匹配的值
```ts
var re = /apples/gi; 
var str = "Apples are round, and apples are juicy.";
if (str.search(re) == -1 ) { 
   console.log("Does not contain Apples" ); 
} else { 
   console.log("Contains Apples" ); 
} 
```
10. 	slice()  提取字符串的片断，并在新的字符串中返回被提取的部分。
11. 	split()  把字符串分割为子字符串数组。
```ts
var str = "Apples are round, and apples are juicy."; 
var splitted = str.split(" ", 3); 
console.log(splitted)  // [ 'Apples', 'are', 'round,' ]
```
12. 	substr() 从起始索引号提取字符串中指定数目的字符。
13. substring()  提取字符串中两个指定的索引号之间的字符。
```ts
var str = "RUNOOB GOOGLE TAOBAO FACEBOOK"; 
console.log("(1,2): "    + str.substring(1,2));   // U
```
14. toLocaleLowerCase()  根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射。
```ts
var str = "Runoob Google"; 
console.log(str.toLocaleLowerCase( ));  // runoob google
```
15. toLocaleUpperCase()  据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射。
```ts
var str = "Runoob Google"; 
console.log(str.toLocaleUpperCase( ));  // RUNOOB GOOGLE
```
16. toLowerCase()  把字符串转换为小写。
```ts
var str = "Runoob Google"; 
console.log(str.toLowerCase( ));  // runoob google
```
17.	toString() 返回字符串。
```ts
var str = "Runoob"; 
console.log(str.toString( )); // Runoob
```
18.	toUpperCase()  把字符串转换为大写。
```ts
var str = "Runoob Google"; 
console.log(str.toUpperCase( ));  // RUNOOB GOOGLE
```
19.	valueOf()  返回指定字符串对象的原始值。
```ts
var str = new String("Runoob"); 
console.log(str.valueOf( ));  // Runoob
```