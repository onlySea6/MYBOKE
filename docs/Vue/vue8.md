---
title: vue3.0更新
date: 2020-09-24
categories:
 - vue3.0
tags:
 - vue3.0
---
# vue3.0进阶

## 路由配置
```js
import { createRouter, createWebHistory } from 'vue-router'
//createWebHistory不带# 路由模式
//src下新建views 创建路由
//引入组件
import Home from '../view/Home.vue'
//注册路由
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
]
let router = createRouter({
	history: createWebHistory(),
	routes,
})
export default router

//挂载
import { createApp } from 'vue'
import App from './App.vue'
// 将路由挂载上
import router from './router/index'
let app = createApp(App)
app.use(router)
import 'vant/lib/index.css'
app.mount('#app')
```
## vue3.0使用vant
1. 安装```yarn add vant@next```
2. 按需引入的插件```yarn add babel-plugin-import ```
3. 在babel.config.js中配置
```js
	plugins: [
		[
		'import',
		{
		libraryName: 'vant',
		libraryDirectory: 'es',
		style: true,
		},
		'vant',
	]
	],
```
4. 在 main.js 内引入一个组件
```js
import { createApp } from 'vue'
import App from './App.vue'
import { Button, NavBar } from 'vant'
import 'vant/lib/index.css'; // 全局引入样式
// 将路由挂载上
import router from './router/index'
let app = createApp(App)
app.use(router)
	.use(Button)
	.use(NavBar)

app.mount('#app')

```
## 移动端适配  ---> 新建一个 postcss.config.js文件
- https://www.jianshu.com/p/eb1705880143
1. 安装postcss-pxtorem
2. 在postcss.config.js中进行配置
```js
module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      rootValue: 37.5, // Vant 官方根字体大小是 37.5
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}
```
## vue3.0 支持原2.0生命周期 
1. beforeCreate -> 使用 setup()
2. created -> 使用 setup()
3. beforeMount -> onBeforeMount
4. mounted -> onMounted
5. beforeUpdate -> onBeforeUpdate
6. updated -> onUpdated
7. beforeDestroy -> onBeforeUnmount
8. destroyed -> onUnmounted
9. errorCaptured -> onErrorCaptured
- 生命周期函数必须写在setup(){}方法里面
- 请求数据 写在onMounted钩子中 而且需要引入
```js
import {onMounted,reactive,toRefs} from 'vue'
```
- 其中自定义state相当于data(){} 以下都必须写在setup中
```js
 const state=reactive({
            Carouse:'',//轮播图
            newShop:'',//新品上市
            hotShop:'',//热门商品
            GoodsesShop:'',//推荐商品
            test:'测试'
        })
```
- 在setup这里 没有this的存在 reactive 用来创建响应数据的 state里面跟新页面才更着刷新
```js
onMounted(async () => {
              const { data } = await HoData()
            	state.Carouse = data.data.carousels
	state.newShop = data.data.newGoodses
	state.GoodsesShop =data.data.recommendGoodses
	state.hotShop = data.data.hotGoodses
	})
```
- 最后setup中所有的数据都要返回出去 这样才能将数据方法挂载到this 上 如果方法也要return出去
return { 
             ...toRefs(state)
//toRefs将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的ref。
       }
## eslint 关闭 声明一个变量只要不用就会报错
- 关闭eslint 新建或者项目中存在vue.config.js文件增添内容
```js
module.exports = {
	lintOnSave: false,
}
//或者 警告错误一起设置
module.exports = {
	devServer: {
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	lintOnSave: false,
}
```
## 使用vuex 报错  针对vue3.0 yarn add vuex 版本不行 要固定以上的版本
- 使用这个版本或者以上vue3.0才识别
```json
"vuex": "^4.0.0-beta.4"
```  
## 组件中使用vuex
1. 按以前的this.$store 还能用
2. 写在setup中
```js
import {useStore} from 'vuex'  
const  store=useStore()

```
## vant 官网不一样 有两个官网 和vue2.0、vue3.0官网配套的官网不一样 注意使用  不然使用的时候 打开的官网组件不能用
- vue2.0的vant-----》```https://youzan.github.io/vant/#/zh-CN/locale```

- vue3.0的vant-----》```https://youzan.github.io/vant/next/#/zh-CN/skeleton```

## 计算属还是能用的 使用时 使用v-model
```js
computed:{
        checkAll:{
            get() {
			},
			set(value) {
			},
        },
        allPrice:{
             get(value) {
			},
        }
    },
```