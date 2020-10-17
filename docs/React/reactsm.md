---
title: React生命周期(class组件)
date: 2019-03-01
categories:
  - React
tags:
  - React
---
## 类组件的生命周期钩子
- 常用生命周期
![常用生命周期](https://s1.ax1x.com/2020/10/02/0QDVxK.md.png)
- 不常用生命周期
![不常用生命周期](https://s1.ax1x.com/2020/10/02/0lZS6U.md.png)
-
[生命周期地址](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
### 
一、挂载（当组件实例被创建并插入 DOM 中时）  生命周期调用顺序 
1. ```构造函数constructor```(初始化状态)
--- 
1.1 用在子组件：```static getDerivedStateFromProps(nextprops,prevstate)``` 根据新的属性(props)生成新的状态
不常用的生命周期方法--参数是新的props属性和 自己老的state状态  
返回null 不更新任何状态
---
2. ```render()``` 把虚拟dom变成d真实dom 并插入到dom元素中
3. ```componentDidMount()``` dom挂载完成
- 父子组件的渲染顺序 父组件先渲染(父组件render之后) 子组件开始渲染  子组件挂载完成之后componentDidMount() 父组件最后挂载完成componentDidMount()


二、更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
1. ```static getDerivedStateFromProps()```子组件

2. ```shouldComponentUpdate(nextprops,nextstate)``` //询问组件是否更新如果返回true就更新 false就不更新
-  nextprops 新的props值
-  nextstate  参数新的属性和新的状态

3. ```render()```父组件
4. ```getSnapshotBeforeUpdate()``` 获取dom更新前的快照
5. ```componentDidUpdate()```更新会被调用 首次渲染不会调用

三、卸载
1. componentWillUnmount 组件移除从dom时调用

## 生命周期流程
- constructor->getDerivedStateFromProps（静态方法必须用static调用）->询问是否跟新->不需要（直接中断）
- constructor->getDerivedStateFromProps（静态方法必须用static调用）->询问是否跟新->shouldComponentUpdate()需要->render()->getSnapshotBeforeUpdate(获取跟新前的dom、只能读取dom)->/ componentDidUpdate()


## React请求
1. 在类组件中的请求 axios
```js
import axios from 'axios'
<button onClick={this.login}>登录</button>

login=()=>{
  //获取输入框的值传入接口
        let user=this.user.current.value
        let password=this.password.current.value
        axios.get('http://hn.algolia.com/api/v1/search?query=redux ',{user,password}).then((res)=>{
            console.log(res)
            this.setState({
                hits:res.data.hits
            })
        })
    }
```
2. 在函数中的请求
```js
import React ,{useEffect,useState}from 'react'
//hook实现异步
import axios from 'axios'
export default function HookApi() {
    //初始化 数据
    const [data,setData]=useState({hits:[]})
    //初始化 请求url
    const [url,setUrl]=useState('http://hn.algolia.com/api/v1/search?query=redux ')
    //初始化查询参数
    const [query,setQuery]=useState('redux')
    //初始化查询数据
    useEffect(() => {
        //async 表示函数有异步操作和await一起使用   返回值是个promise
      const fetchD=async()=>{
          const r= await axios.get(url)
          //设置数据
          setData(r.data)
      }
      fetchD()
    }, [url])
        // console.log(data.hits)
    return (
        <div>
        {/* input放的是查询参数的值 */}
        <input value={query} onChange={(e)=>{
            setQuery(e.target.value)
        }}/>
        <button onClick={()=>{
            setUrl(`http://hn.algolia.com/api/v1/search?query=${query} `)
        }}>查询</button>
            {
                data.hits&&data.hits.length?data.hits.map((item,index)=>{
                    return <div key={index}>{item.author}</div>
                }):<div>loading...</div>
            }
        </div>
    )
}
```

## async await

```js
//async 表示函数有异步操作和await一起使用   返回值是个promise
      const fetchD=async()=>{
          const r= await axios.get(url)
          //设置数据
          setData(r.data)}
        fetchD()
//相当于 
      axios.get(url).then(data=>{console.log(data)})
```