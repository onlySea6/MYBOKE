---
title: python
date: 2019-10-05
sidebar: auto
showSponsor: true
categories:
  - python
tags:
  - python
---

## python3 准备

1. 先下载python安装包

2. 安装安装包 windows一路回车下去

3. 在windows搜索中输入IDLE  打开使用python面板

## print 第一个内置函数
```python
print("------------------我爱鱼c工忙室------------")
temp = input("不妨猜一小甲鱼现在心里想的是哪个数字:")
guess = int(temp)

if guess == 8:
    print("我草,你是小甲鱼心里的蛔虫吗?!-")
    print("哼,猜中了也没有奖励!")
else:
    print("猜错拉,小甲鱼现在心里想的是8!")
print("游戏结来,不玩啦_^")
```

## 变量和字符串
```python
## teacher 变量 
## 使用变量之前必须赋值
## 变量名可以是 字母、数字、下划线 不能以数字开头
## = 即为赋值
teacher="小甲鱼"
print(teacher)
teacher="老甲鱼"
print(teacher)
## 字符串 用双或者单
## 如果字符串想使用 ' 可以使用转移符号\
'let\'s go!'  
## 如果字符串有 \ 必须转义使用\\ 自己转义自己
'C:\\now'
## 如果使用到地址有多个\\ 可以在字符串前面加上r
r'C:\now'
## 三重引号字符串 打印多行字符串
str = """
床前明月光，
疑是地上霜，
....
"""
str
print(str)
```

## 条件分支
```python
if 条件:
    条件为真执行的操作
else 条件:
    条件为假
```
## and逻辑操作 左右两边都为true才为true

## while 循环 
```python
while 条件:
    为真执行
```
## 引入random模块 有个randint()函数返回一个随机
```python 
import random
srcet=random.randint(1,10)
# srcet 随机[1-10]
```
## python的数值类型 (e记法) 
- 15e10 代表15的10的10次方
- 整型、布尔类型、浮点型、
## 类型转换
- 字符串 str()
- 整数 int() 浮点型用的话直接转化为整数 如5.9 转 成5
- 浮点数 float() 整数520 转换问520.0

## 字符的长度len()

## 列表 list() 生成一个数组

## 获取数据类型信息 
- type() 返回数据类型
- isinstance(a,str) 检查数据类型返回布尔

## 操作符 ** 幂运算

## 三元操作符
- samll=x if x < y else y

## assert 断言当 后面的程序为false 就会抛出错误

## 分支和循环
```python
- for 目标 in 表达式:
   循环体
```
## range(a,b,c)配合 for使用 有三个参数
- a表示初始值
- b表示范围 (a,b]
- c表示a每次加或者操作的值

## 往数组后面添加数据 append() 只能添加一个元素

## 往数组后面添加数据 extend() 参数是一个列表

## insert(1,'') 两个参数 第一个参数为下标 第二参数为内容