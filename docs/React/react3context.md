---
title: React里的context
date: 2019-03-01
categories:
  - React
tags:
  - React
---
## 属性检查 (函数组件和类组件都可以用 只在开发模式使用)
1. 安装
```js
yarn add prop-types
```
2. 引入
```js
import ProtoTypes from 'prop-types'
```
3. 使用
```js
<My n={1} name='wangwu' obj={{color:'red',fontSize:20}} sex='男'> </My>,
接收参数的组件.propTypes={
    //isRequired 表示 必须传值
    n:ProtoTypes.number.isRequired,
    name:ProtoTypes.string,
    //用来定义类型结构
    obj:ProtoTypes.shape({
        m:ProtoTypes.number,
        x:ProtoTypes.string
    }),
    //oneOf表示其中一个值
    sex:ProtoTypes.oneOf(['男','女'])
}
 //可以使用   static defaultProps={}定义默认值
     //ProtoTypes 发生在 static defaultProps之后
     static defaultProps={
         n:0
     }

//  也可以用 static定义类型检查
      static propTypes={
         n:ProtoTypes.number.isRequired,
      }
```