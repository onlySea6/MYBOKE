---
title: vue路由守卫
date: 2019-09-30
categories:
  - vue
tags:
  - vue
---

# 全局前置守卫 在 export default 之前守卫

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // to：要进入的目标路由对象
  // from：当前导航正要离开的路由对象
  // next：这个函数必须调用，否则导航会报错，并阻塞在这里
})
```

- next(false): 中断当前的导航。
- next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
- next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，
  则导航会被终止且该错误会被传递给 router.onError() 注册过的回调

## 组件内的守卫

- beforeRouteEnter
- beforeRouteUpdate (2.2 新增)
- beforeRouteLeave

```js
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
};
```
