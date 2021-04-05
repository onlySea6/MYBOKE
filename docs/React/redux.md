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
let store =  createStore(reducer) //返回一个仓库
```
3. 参数reducer,state 和userender 写法一样
```js
let initState={
    count:1
}
function reducer(state=initState,action){
    // 不能改变原数据 但可以改变克隆之后的数据
    // 深克隆
    let data=JSON.parse(JSON.stringify(state))
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
## redux流程图
![redux流程图](https://s3.ax1x.com/2020/12/02/DIwMMn.md.png)
## 自动订阅事件 ---connect---
- 当 `Provider`和路由`BrowserRouter`同时存在时 用`Provider`包裹`BrowserRouter`
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
3. 在子组件里面使用
```js
// react-redux为了方便
import React from 'react'
import { connect } from 'react-redux';
import {CHANG_IDY,DEIDY} from './store/actions'
// connect高阶函数，接受一个组件返回一个组件
 function Son(props) {
    return (
        <>
        <h1>{props.state.idy}</h1>
           <button onClick={props.add}>修改</button>
           <button onClick={props.removeidy}>删除</button>
        </>
    )
}

// 把state传入props里
const mapStateToProps=(state)=>{
return {
    // 业务场景
    state
}
}
// 把dispatch派发动作 放到props里
const mapDispatchToProps=(dispatch)=>{
    return{
        // 派发动作
        add(){
            dispatch(CHANG_IDY('曾经的那个少年'))
        },
        removeidy(){
            dispatch(DEIDY())
        }
    }
}
//  connect 参数为两个函数  并且执行包裹要穿的组件
export default connect(mapStateToProps,mapDispatchToProps)(Son)

// actions.js
// 修改idy
export const CHANG_IDY=(value)=>{
    return {
        type:'CHANG_IDY',
        value
    }
}
export const DEIDY=()=>{
    return{
        type:'DEIDY'
    }
}

```
## reducer合并(combineReducers())
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
### 以thunk 为例 可以在action里面进行axios或者一些异步的操作

### composer()包裹多个中间件
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
//     // redux-thunk中间让我们可以actions 写异步 
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
## 如果同时存在 react-redux 和 路由 router的时候  一定要数据包裹路由
```js
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter ,Route} from 'react-router-dom'
import Store from './store/index'
// redux包裹router
export default function App() {
	return (
		<Provider store={Store}>
			<BrowserRouter>
                <Route component={require('./views/Registry').default}/>
            </BrowserRouter>
		</Provider>
	)
}
```
## 状态本地持久化 登录的状态存到本地
1. 
```js
// initState状态值
let initState={}
// 状态本地持久化
if(process.env.NODE_ENV==='development'){
    initState=JSON.parse(window.sessionStorage.getItem('user'))|| {
        userInfo:{
            username:'',
            state:false
        }
    }
}else{
    initState= {userInfo:{
            username:'',
            state:false
        }}
}
export default (state=initState,action)=>{
    let data=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case 'SUBMIT':
            data.userInfo=action.data
            break;
        default :return state
    }
    // 开发环境需要缓存数据，生产环境里不要
    // console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV==='development'){
        window.sessionStorage.setItem('user',JSON.stringify(data))
    }
    return data
}
```
2. 使用redux-persist 插件
```js
// 1. 安装 yarn add redux-persist
// 2. store.js
import { createStore } from 'redux'
// 这是插件固定
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

let initState = {
    state: {
        islogin:false
    }
}
const reducers = (state = initState, action) => {
    let data = JSON.parse(JSON.stringify(state))
    switch (action.type) {
		case 'LOGIN':
			data.state.islogin = true
			return data
		case 'LOGINOUT':
			data.state.islogin = false
			return data
		default:
			return state
	}
}
// 这也是固定的
const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
}
const myPersistReducer = persistReducer(persistConfig, reducers)
const store = createStore(myPersistReducer)
export const persistor = persistStore(store)
export default store


// 3. 在index.js 根文件中
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' //react-redux
import store from './store/index' //store仓库
import { persistor } from './store/index' //store仓库
import { PersistGate } from 'redux-persist/lib/integration/react'  //插件固定
import App from './App'
import 'antd/dist/antd.css'
ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			{/*网页内容*/}
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)

//4. 存储的数据都在localstorage中
```