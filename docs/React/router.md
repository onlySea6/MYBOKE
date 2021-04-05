---
title: React路由
date: 2019-03-01
sidebar: auto
categories:
  - React
tags:
  - React
---
##  React路由的使用
1. 安装
```js
npm i react-router-dom
yarn add react-router-dom
```
2. 使用
```js
import React from 'react'
import Home from './Home'
import About from './About'
import User from './User'
import { BrowserRouter, Route, Switch, NavLink ,Redirect} from 'react-router-dom'
import './rou.css'
import { render } from 'react-dom'
function My() {
	return (
        // basename 基本网址、根目录作用公共的代码不重复写 forceRefresh 跳转页面刷新
        <BrowserRouter basename='wj' forceRefresh>
          {/*
          包裹路由的容器Router 放在路由的最外层
        BrowserRouter history不带#  HashRouter hash模式的路由带#
          */}
			<nav>
				<ul>
                    <li>
                    {/*
                    Link导航组件 渲染到页面为a标签 to属性决定跳转 匹配的是Route的path
                    Link的to属性
                    to:string to='/'
                     to:object to={{pathname:'/',search:"?查询字符串",hash='hash值',state:'用于隐士传参'}} 
                    to:function <Link to={()=>`about`}>到about</Link>
                    */}
						<NavLink to={{pathname:'/'}}>到home</NavLink>
					</li>
					<li>
                        <NavLink activeStyle={{color:"yellow"}} to='/about'>到about</NavLink>
                        {/*
                        <NavLink/> 导航组件
                            1.activeClassName 激活时候class
                            2. activeStyle 激活时候样式
                            3.exact 精确匹配
                            4.strict 严格匹配
                            5.激活的navlink 会自动添加类名 .active  如果设置了activeClassName则不生效
                        */}
					</li>
					<li>
						<NavLink activeClassName="selected" to="/user">到user</NavLink>
					</li>
                    <li>
						<NavLink activeClassName="selected" to="/kk">到kk</NavLink>
					</li>
				</ul>
			</nav>
            
            <Switch>
            {/* Switch里面的路由必须写：exact 不然会出现问题*/}
            {/*
            Switch保证每次只匹配一个路由 匹配到路由就不在往下匹配
            */}
                <Route  exact path="/"  component={Home} />
               {/* Route 是表示路由组件(每一个路由) 
                path:表示路由的路径 /home=>hom组件
                component 该路由对应的是什么组件
            属性
                1.精确匹配:exact  路由的匹配是匹配前缀 
                2.strict 严格匹配  /a/只能匹配/a/ 不能匹配/a
                3.sensitive严格匹配大小写
                4. 路径参数  pathname=/路劲名/:值  /user/1 根据多个用户的id访问用户详情 /user/:id  不固定但是必须传
                    路径参数会传到props里面  
                    props.match.params传递的参数
                    location.pathname当前路径
                    props.history(push() goBack() goForward() go() )组件里路由跳转的方法  
                5.render 替代react组件渲染   render={()=>{return <div> <组件/> 这是个kk</div>}}
*/}
				<Route path="/about" component={About} />
				<Route path="/user/:username" component={User} />
                <Route path="/kk"  render={()=>{
                    return <div>这是个kk</div>
                }} />
               <Redirect to={{
            pathname:'/',
            // state:{from:Location.pathname}  用于传参
        }}/>
                {/*Redirect 路由重定向*/}
			</Switch>
		</BrowserRouter>
	)
}
render(<My> </My>, window.root)
```

##  路由hook 从react-router-dom中引入
使用一下hooks你的react版本需要16.8及以后

1. useHistory 路由跳转
2. useParams 使用路径参数
3. useLocation 获取当前路由
4. useRouteMatch 获取路由匹配信息
5. withRouter  是一个高阶组件返回一个组件  这个组件拥有路由的方法 withRouter(组件)
```js
import React from 'react'
import {useHistory,useParams,useLocation,useRouteMatch,withRouter} from 'react-router-dom'
export default function User(props) {
    let s=useHistory() {/*用于js跳转*/}
    let params=useParams() {/*获取路由跳转传过来的参数*/}
    return (
        <div>
            hook 取到的参数{params.username}
            <button onClick={()=>props.history.push('/地址')}>点击跳转</button>
            <button onClick={()=>s.push('/地址')}>点击跳转</button>
        </div>
    )

```
## 二阶路由
1. 定义路由数组 配置式路由
```js
const routes =[
    {
        path:'/',
        component:Sy
    }
    ,
    {
        path:'/lili',
        component:Lili
    },
    {
        path:'/tang',
        component:Tang,
        routes:[//这里是二级路由
            {
                path:'/tang/cf',
                component:Cf
            },
            {
                path:'/tang/kt',
                component:Kt
            }
        ]
    }
]
export default routes
```
2. 封装路由方法
```js
import {  Route} from 'react-router-dom'
import React from 'react'
 //通过porps传到组件里
function Rio(router){ //值为单个列表router
    //返回路由组件
        return(
            <Route exact path={router.path} render={props => (
        <router.component {...props} routes={router.routes} />)
            }>
            </Route>
        )
}
export default Rio
```
3. 定义的路由遍历使用方法
```js
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import router from '../../Router'
//配置式路由的方法
import Rio from './sumrouter'
export default function My() {
	return (
			<Router>
				<Switch>
				{
                    router.map((route,index)=>{
                      return  <Rio exact key={index} {...route}>
                        </Rio>
                    })
                }
				</Switch>
			</Router>
	)
}
render(<My />, document.getElementById('root'))
```
4. 二级路由的父路由定义也要在遍历一遍(参数即为传过来的子路由---要解构)
```js
import React from 'react'
import {useHistory,NavLink,Switch,BrowserRouter} from 'react-router-dom'
import Rio from './Router/二级路由/sumrouter'
export default function Homechild({routes}) {
    let history=useHistory()
    console.log(history)
    return (
        <BrowserRouter>
            <NavLink to='/tang/cf'>厨房</NavLink>;
            <NavLink  to='/tang/kt'>客厅</NavLink>
          <Switch>
          {
            routes.map((route,index)=>{
                      return ( <Rio  key={index} {...route}>

                        </Rio>)
                    })
                }
          </Switch>
        </BrowserRouter>
    )
}

```
## 路由插件 （能像vue那样集中管理） react-router-config 
- 但是路由拦截不好控制
1. 安装
```js
yarn add  react-router-config 
```
2. 引入
```js
import { matchRoutes, renderRoutes } from "react-router-config";
```
3. 使用
```js
import React from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter, Redirect } from "react-router-dom";

const routes = [
  { path: "/", exact: true, render: () => <Redirect to={"/page1"} /> },
  { path: "/page1", component: Page1 },
  {
    path: "/page2",
    component: Page2,
    routes: [
      {
        path: "/page2/child",
        component: Child
      }
    ]
  }
];

function App() {
  return (
    <HashRouter>
      <div className="App">
        <h1>Hello</h1>
        {renderRoutes(routes)}
      </div>
    </HashRouter>
  );
}
```

## 路由拦截
1. 使用render
```js
const isLgin = false //定义一个登录的状态
// 使用render
	    <Route
	    path="/lili"
	    render={()=>{
	return isLgin?<Lili/>:<div>
	    <button>先登录点击</button>
	</div>
	}}
	    // component={Lili}
	/>
// render 的使用component 必须删除
```
2. 使用高阶组件
```js
//定义一个登录的状态
const fakeAuth = {
    islogin: false,
    login(cb) {
      this.islogin = true;//登录的方法
      setTimeout(cb, 100);
    },
    signout(cb) {
      this.islogin = false;//登出的方法
      setTimeout(cb, 100);
    }
  };
export default  fakeAuth

// 定义路由拦截
<AuthR path='/lili' component={Lili}/>

function AuthR({path,component:Component,...res}){
    return  <Route {...res} render={(props)=>{
        //判断是否登录 没登录跳转登录页 如果登录直接显示此登录页
        return fakeAuth.islogin? <Component {...props}></Component>:<Redirect to={
          {pathname:'/',state:{from:props.location}}//告诉登录页面我从哪里来 登录后跳转回来
        }/>
    }}/>
}

//进行拦截跳转 并返回跳转过来的页面
import React from 'react'
import fakeAuth from './fakeAuth'
import {useLocation,useHistory} from 'react-router-dom'
export default function Login() {
    const location =useLocation()
    const history=useHistory()
     //从哪里来或者没有
    const {from}=location.state||{from:{pathname:'/'}}
    //先确定页面从哪里跳转过阿里的
    return (
        <div>
            <button onClick={()=>{
                fakeAuth.login(()=>{
                    history.push(from.pathname)
                })
            }}>登录</button>
            你必须登录才能访问 {from.pathname}
        </div>
    )
}
```
3. 配置路由
```js
3.1----配置路由
const routes = [
  {
    exact: true,
    auth: true,
    path: "/",
    component: require("../Home").default,
  },
  {
    path: "/reg",
    component: require("../Registy").default,
  },
  {
    path: "/login",
    component: require("../Login").default,
  },
];

export default routes;
3.2----引入使用拦截
import React from "react";
import { BrowserRouter, NavLink, Route, Redirect } from "react-router-dom";
import routes from "./router/index";
import MyPrompt from "./MyPrompt";
const Com = () => {
  // 创建一个全局数据存储
  const userstate = window.sessionStorage.getItem("user");
  if (!userstate) {
    window.sessionStorage.setItem("user", "false");
  }
  return (
    <BrowserRouter>
      <MyPrompt />
      {/* 导航 */}
      <NavLink to="/home">首页</NavLink>
      <NavLink to="/login">登陆</NavLink>
      <NavLink to="/reg">注册</NavLink>
      {/* 线路 */}
      {routes.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            component={(props) => {
              const state = window.sessionStorage.getItem("user");
              // 根据判断做出渲染
              if (!item.auth) {
                if (state === "false") {
                  return <item.component {...props} />;
                } else {
                  return <Redirect to="/home" />;
                }
              } else {
                if (state === "true") {
                  return <item.component {...props} />;
                } else {
                  return <Redirect to="/login" />;
                }
              }
            }}
          />
        );
      })}
    </BrowserRouter>
  );
};

export default Com;
3.3----配合组件 MyPrompt 防止标签跳转内容不跳转地址跳转
// 路由拦截器
import React from "react";

import { Prompt, withRouter } from "react-router-dom";

const MyPrompt = (props) => {
  return (
    // Prompt是在页面离开的时候触发
    // location即将进入的下一个路由信息
    // 在这里做拦截判断
    <>
      <Prompt
        message={(location) => {
          const state = window.sessionStorage.getItem("user");
          if (
            (location.pathname === "/" || location.pathname === "/home") &&
            state === "false"
          ) {
            return false;
          } else if (
            location.pathname !== "/" &&
            location.pathname !== "/home" &&
            state === "true"
          ) {
            return false;
          }
          return true;
        }}
      />
    </>
  );
};

export default withRouter(MyPrompt);

```
## 路由过渡动画（第三方）
1. 先下载安装
```js
yarn add react-transition-group
```
2. 引入
```js
import { TransitionGroup, CSSTransition } from 'react-transition-group'
```
3. 所有的路由用一个Route包裹(主要用来传递location)  用render函数的方式 把所有的路由作为返回值/另一种方式直接使用uselocation

```js
<BrowserRouter>
	<Nav />
		<Route
			render={({ location }) => {
				return (
					<TransitionGroup>
						<CSSTransition
							key={location.key}
							classNames="fade"
							timeout={300}
						>
							<Switch>
								<Route
									exact
									path="/lilei"
									component={Lilei}
								/>
								<ProtecRouter
									path="/lili"
									component={Lili}
								/>
								<Route
									path="/login"
									component={Login}
								/>
								<Route
									path="/blog/:title"
									component={RouterMath}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
			)
			}}
		></Route>
    </BrowserRouter>
{/*第二种*/}
<div>
	<BrowserRouter>
		<Nav />
		<Route>
            <AnimationApp/>
         </Route>
	</BrowserRouter>
</div>

function AnimationApp(){
    let location=useLocation()
return(
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                >
                    <Switch location={location}>
                        <Route
                            exact
                            path="/lilei"
                            component={Lilei}
                        />
                        <ProtecRouter
                            path="/lili"
                            component={Lili}
                        />
                        <Route
                            path="/login"
                            component={Login}
                        />
                        <Route
                            path="/blog/:title"
                            component={RouterMath}
                        />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
    
)
}
	return (
		<div>
			<BrowserRouter>
				<Nav />
				<Route>
                    <AnimationApp/>
                </Route>
			</BrowserRouter>
		</div>
	)
}
```
 
 ## React.lazy  Suspense(支持路由组件)  代码分割 懒加载 

 1. 引入 
 ```js
import React,{lazy,Suspense} from 'react'
```
2.  第二步(组件或者路由的引入方式) 写在import最下面
```js
const Lilei =lazy(()=>import('./Auth/Lilei'))
```
3. 组件未加载完成之前显示的内容 用来包裹需要懒加载的组件或者路由(包在最外层)
```js
<BrowserRouter>
        <Suspense fallback={<div>Loading....</div>}> 
			<Nav />
			<Route>
                <AnimationApp/>
            </Route>
        </Suspense>
</BrowserRouter>
```

## ErrorBoundary  错误边界

1. 定义错误文件
```js
export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      //定义一个状态设置错误状态 默认无错误
      this.state = { hasError: false };
    }
    // 组件报错会调用这个生命周期 参数是error 并且跟新生命周期
    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }
    // componentDidCatch(error, errorInfo) {
    //   // 你同样可以将错误日志上报给服务器
    //   logErrorToMyService(error, errorInfo);
    // }
  
    render() {
        console.log(this.props.children)
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; //开始和结束标签的内容作为这的内容 即下面包裹的内容 很重要
    }
  }
```
2. 使用
```js
import ErrorBoundary from './ErrorBoundary '

render(){
        return <ErrorBoundary>
            {this.state.cout}
            <button onClick={this.add}>点击加一</button>
        </ErrorBoundary>
    }
```

## 建立React里面根root同级的节点
1. 在public/index.html根里面 
```js
<body>
    <div id="root"></div>
    <div id="modal-root"></div>
  </body>
```
2. 新建文件 引入配置
```js
import React, { Component } from 'react'
import ReactDom from 'react-dom'
//2. 引入
const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');
export default class Model extends Component {
    constructor(){
        super()
        this.el=document.createElement('div') //新建一个div
    }
    componentDidMount(){
        //挂载之后把div放到 根同级节点 modalRoot 上
        modalRoot.appendChild(this.el)
    }
   ReactDom.render() {
        //渲染到root同级节点的方法
        return ReactDom.createPortal(this.props.children,this.el)
    }
}

```
3. 使用
```js
import Model from '../Model'
 <Model>
   这是和root同级的元素 自己定义
</Model>
```