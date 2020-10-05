---
title: 正则
date: 2018-03-01
categories:
  - js
tags:
  - js
---
## 正则(Regular Expression)简写为regex、regexp或RE
1. 创建正则的方法
 - 直接创建
  ```js
  var nameReg=/正则主体/修饰符
  ```
  - 使用new方式直接创建

  ```js
  var ageReg=new RegExp('正则主体','修饰符')
  ```
2. 定义规则
- ^ 开头 $ 结尾
- g 全局匹配 {n,m}表示n-m位
- i  执行对大小写不敏感的匹配。
- m	执行多行匹配。
- [abc]	查找方括号之间的任何字符。
- [0-9]	查找任何从 0 至 9 的数字。
- (x|y)	查找任何以 | 分隔的选项。
- \d	查找数字。
- \s	查找空白字符。
- \b	匹配单词边界。
- \uxxxx	查找以十六进制数 xxxx 规定的 Unicode 字符。
- n+	匹配任何包含至少一个 n 的字符串。
- n*	匹配任何包含零个或多个 n 的字符串。

- 正则的一些实例
```js
/*是否带有小数*/
function    isDecimal(strValue )  {  
   var  objRegExp= /^\d+\.\d+$/;
   return  objRegExp.test(strValue);  
}  

/*校验是否中文名称组成 */
function ischina(str) {
    var reg=/^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验是否全由8位数字组成 */
function isStudentNo(str) {
    var reg=/^[0-9]{8}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验电话码格式 */
function isTelCode(str) {
    var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}

/*校验邮件地址是否合法 */
function IsEmail(str) {
    var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(str);
}
```
3. 正则应用场景
- 表单输入框规则验证 登录 修改密码等相关操作
- 搜索替换 发表评论 弹幕 有敏感词汇-> *  代替
4. 正则的方法
- ```test()``` 语法:正则.test('检测的目标') 方法返回一个布尔值，成功返回true
- ```search()``` 语法:字符串.search(正则规则)在字符串搜索符合正则的字符，返回的是字符出现的位置，字符串位置出现多次
返回第一次出现的位置，如果匹配不到返回 -1
- ```match()```语法：字符串.match(正则规则)在字符串中匹配符合正则规则的字符，如果匹配成功返回匹配的字符数组，如果匹配不到返回null
- ```replace()``` 语法：字符串.replace(正则规则,要替换的新的字符串)
语法2: 字符串.replace(正则规则,函数)