---
title: redux
date: 2019-10-15
sidebar: auto
categories:
  - react
tags:
  - react
---

## redux
- Redux 是 JavaScript 状态容器，提供可预测化的状态管理。
- Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）
1. 下载
```js
// 下载
yarn add redux

// 搭配redux
yarn add react-redux  
```
2. createStore 创建状态仓库 参数 是reducer 和 初始化状态 
```js
import { createStore } from 'redux'
let store =  createStore(reducer,state) //返回一个仓库
```
3. 参数reducer,state 和userender 写法一样
```js
let state={
    count:1
}
function reducer(state={},action){
    switch (action.type){
        case 'add': return {...state,count:state.count+1}
        case 'del': return {...state,count:state.count-1}
        default:return state
    }
}
```
4. 使用订阅里面的事件 使用dispatch
```js
import store from './store/index'
 <button onClick={()=>store.dispatch({type:'add'})}>点击加1</button>
```
5. 订阅事件 store.subscribe
```js
let [data,setState]=useState(()=>{
        return store.getState().count
    })
 useEffect(()=>{
        //事件订阅
      let unsubscribe=  store.subscribe(() =>
        setState(data=>store.getState().count));
        return  unsubscribe //取消订阅的函数
    },[])
```
## 自动订阅事件 ---connect---

- 在单个组件里面使用 只能作为组件导出

1. 定义仓库

2. 在根组件使用
```js
import App from './App'
//引入仓库
import store  from './store/index'
//使用 Provider 将子组件包裹
import {Provider} from 'react-redux'
//包裹的同时 把仓库的传入
ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App ></App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
3. 在组件里面
```js
import { connect } from 'react-redux';

// mapStateToProps 是一个函数  映射状态到props上
// mapDispatchToProps 是一个函数 映射方法到props上
// const mapStateToProps = state=>({
// 		 name:state.name,
// 		 Wj:state.name1
// })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     DW: () => dispatch({ type: 'daH' }),
//     DJ: () => dispatch({ type: 'daJ', payload: '哭了' }),
//   };
// };
//简写 
 const mapDispatchToProps={
    cp(){
        return { type: 'cs' }
    }
  }
export default connect(
    (state) => ({
        count: state.reducerone.count,
        base:state.reducerone.base
    }),
    mapDispatchToProps
  )(App);
  //App 这是组件


class App extends React.Component{
  constructor(){
    super()
  }
  //传过来的值 以及方法都在props 里面
  // 直接使用即可
  render(){
    retrun <>
     {this.props.count}
        {/* {this.props.Wj} */}
        <button onClick={this.props.cs}>加</button>
    </>
  }
}
```
## 仓库合并(combineReducers()) 因为只能有个超级的管理员 一个页面一个reducer一个state
1. 使用 先引入
```js
import {createStore,combineReducers} from 'redux'
```
2. 将两个仓库进行合并导出
- state进行赋值各个仓库的状态值
```js
//两个仓库的初始化数据 
const state0={
    num:2,
}
const state1={
    count:2,
    base:6
}
//两个管理员
function reducerone(state= state1,action){
    switch(action.type){
        case 'cs' :return {...state,count:state.count +10}
        case 'add' :return {...state,base:state.base *10}
        default:return state
    }
}
function reducertwo(state=state0,action){
    switch(action.type){
        case 'del' :return {...state,num:state.num +1}
        case 'cheng' :return {...state,num:state.num*2}
        default:return state
    }
}
//合并
let reducer=combineReducers({
    reducerone,
    reducertwo
})
//导出
let store=createStore(reducer)
export default store 
```
3. 组件使用的时候
-  合并之后取值需要state.当前状态的reducer.key
-  去type值这不用了
```js
export default connect(
    (state) => ({
        count: state.reducerone.count,
        base:state.reducerone.base
    }),
    {
      DW(){
        return { type: 'del' }
    },
    }
  )(Appone);
```

## applyMiddleware 使用中间件(插件) 中间件的功能不一，使用方法不一 react常用thunk,logger
### 以thunk 为例进行axios请求并渲染页面

1. 声明引入使用中间件 applyMiddleware 在仓库里面
```js
import {createStore,combineReducers,applyMiddleware} from 'redux'
```
2. 下载需要的中间件 以及引入注册
```js
//下载
yarn add  redux-thunk
//引入
import thunk from 'redux-thunk'
//注册
let store=createStore(reducer,applyMiddleware(thunk))
export default store 
```
3. 功能不一使用不一 thunk进行异步请求数据 ->并渲染到页面
```js
// 1. 在仓库定义一个状态用来接收 axios请求的参数
const state2 = {
	list: []  //通过请求回来的数组 
}

//2. 并且能接收请求回来的参数
function Apponereducer(state=state2,action){
	   switch(action.type){
				case 'getlist':
					return {...state,list:action.payload}
 			 default:
			  return state
		 }
}

//3. redux-thunk中间让我们可以用dispatch派发函数  在组件内
const mapDispathchToProps=(dispatch)=>{
  return {
    //获取list 
    // 让dispatch可以派发函数 并且函数的参数是dispach dispath({})
    GT:()=>dispatch(async function(dispatch){
        let res =  await axios.get('http://localhost:8081/list')
        dispatch({type:'getlist',payload:res.data.carlist})
    })
  }
} 

export default connect(state=>({
  list:state.Apponereducer.list
}),
mapDispathchToProps
),(Appone);
// ADD(){
//     // redux-thunk中间让我们可以用dispatch派发函数 
//      return function(dispatch){
//         setTimeout(()=>{
//            dispatch({type:'add'}) 
//          },2000)  
//      }
//   },


//4. 组件内就可以拿到使用循环遍历
 render() {
    return (
      <div>
        {this.props.list.map((item,index)=>{
          return <li key={index}>{item.name}</li>
        })}
       </div>
    );
  }
```

