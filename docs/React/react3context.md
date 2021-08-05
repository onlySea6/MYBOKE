---
title: React里的属性检查
date: 2019-03-01
sidebar: auto
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

## 组件传值
1. 父子组件 相互通信 使用props
2. 兄弟或者多级通信 使用 context或者redux等
```js
// 使用contex
// 1. 先创建 
React.createContext()
// 2. 在父级 引入 包裹所需要传参的子组件
// value 可以传对象也可以传函数
<Context.Provider value={{name:this.state.page,fn:this.add}}></Context.Provider>
// 3.子组件同样引入
// 如果只使用值  直接
static contextType = Context;
// 如果还调用父组件的方法
<Context.Consumer>
{(value)=>{
    // 这个value 即为父组件value 传过来的所有方法
    return<>
    <div></div>
    </>
}}
</Context.Consumer>
```