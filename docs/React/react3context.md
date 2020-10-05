---
title: React里的context
date: 2019-03-01
categories:
  - React
tags:
  - React
---
## Context 
- context上下文解决props多层传递 跨层级组件传值
- Context提供了两个组件  Provider(提供者) Consumer(消费者)
### 使用
1. 
```js
import React ,{Component,createContext} from 'react'
 //1. 创建上下文对象
let themContext=createContext()
```
2. 
```js
//传递的方法
    conm=(money)=>{
        this.setState({
            num:this.state.num-money
        })
    }
    render(){
        return (
            //2. 祖先级把传递数据的组件用  定义的上下文对象.Provider包裹 并用value进行值传递
            <themContext.Provider value={{num:this.state.num,conm:this.conm}}>
                 <div>
                 {this.state.num}
            <Child/>
        </div>
            </themContext.Provider>
       )
    }
```
3. 
```js
class Grandc extends Component{
    // 3.定义一个静态属性：  static contextType(固定的) =定义的上下文对象
    //上下文对象会挂载到this.context上面
    static contextType=themContext
    constructor(){
        super()
    }
    render(){
        console.log(this.context)
        return <>
        我是孙子组件
        {this.context.num}
        <button onClick={()=>this.context.conm(10)}>花</button>
        </>
    }
}
```
###  函数组件只有一种接收
```js
function Grand1(){
return <定义的上下文对象.Consumer>
   {
       //value即为上下文传过来的对象
       (value)=>{
           return <div>
           孙子2：
               {value.num}
               <button onClick={()=>value.add(10)}>点击</button>
           </div>
       }
   }
</定义的上下文对象.Consumer>
}
```

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