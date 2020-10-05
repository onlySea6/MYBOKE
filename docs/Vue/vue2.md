---
title: vue组件通信
date: 2019-09-5
categories:
  - vue
tags:
  - vue
---

## props/\$emit[传统的父子通信]

```html
父组件使用props向子组件传递数据，子组件用$emit发送给父组件修改后的数据。 父组件需要给子组件一个约定的事件名称用于接收子组件$emit传递过来的数据。 子组件$emit的方法名就是父组件约定的事件名
```

```html
父组件：
<Son :data="data" @getChangeData="getChange" />
子组件 this.$emit('getChangeData', newData)
```

## $emit/$on[自定义中央事件池]

```html
场景：有三个子组件互相公用同一个数据，或一个组件做出改变其他组件也要变化。 这时候我们可以定义一个公共的bus去响应这三个子组件。
这种方法通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件。 巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。 缺点是：不好控制，尤其是当组件多的时候。
```

```js
// bus.js定义一个空的Vue实例
var Event = new Vue();//一般情况下我们将它抽离成一个公共的bus.js，然后分别引入到其他组件里去
exprot default Event
// 组件A
<div>
    <h3>A组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
  </div>
export default {
  data() {
      return {
        name: 'tom'
      }
    },
    methods: {
      send() {
        Event.$emit('data-a', this.name);
      }
    }
}
// 组件B
<div>
    <h3>B组件：{{age}}</h3>
    <button @click="send">将数组发送给C组件</button>
  </div>
  export default {
    data() {
      return {
        age: 20
      }
    },
    methods: {
      send() {
        Event.$emit('data-b', this.age);
      }
    }
  }
  // 组件C
  <div>
    <h3>C组件：{{name}}，{{age}}</h3>
  </div>
  export default {
    data() {
      return {
        name: '',
        age: ""
      }
    },
    mounted() {//在模板编译完成后执行
     Event.$on('data-a',name => {
         this.name = name;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
     })
     Event.$on('data-b',age => {
         this.age = age;
     })
    }
  }
```

## $attrs/$listeners[跨级通信]

```html
$attrs：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。 当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)， 并且可以通过 v-bind="$attrs"
传入内部组件。通常配合 interitAttrs 选项一起使用。 $listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。 它可以通过 v-on="$listeners" 传入内部组件
```

```js
// 根组件中使用父组件
<Father :name="name" :age="age" @getText="getText" job="123" />
// 父组件中使用子组件
<Son v-bind="$attrs" v-on="$listeners" />
// 子组件中就可以用$attrs来使用根组件传递的属性值，
// $listeners是传递的方法
// 但是Father组件中如果用props显示接收了根组件传递的任意属性后，那么$attrs里就会失去对应的
```

## provide/inject

```html
依赖注入和强制注入，扩展更深层的数据传递，在任何后代组件中都可以使用数据
```

```js
// provide 在父级组件里提供数据
provide() {
		return {
			name: this.name || '杰'
		}
  }
```

```js
// inject 在子级组件里获取数据
inject: ['name'];
```

## $parent / $children 与 ref

```html
$parent：当前组件的直接父组件 $children：组件的直接子组件，如果没子组件那么是空数组 ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
```

- 在 vue 中出了 ref 获取元素，还可以用事件 event.currentTarget 获取

## EventBus

```html
原理：创建一个vue实例，调用实例上的方法 vue.prototype.$bus=new Vue() 发送：$bus.$emit('自定义事件名称',值) 监听：$bus.$on('自定义事件名称',function(值){函数的参数是发送过来的值})
这个能实现各个组件之间的通信
```

## vuex 状态管理

### 使用流程

1. vue 的插件，所以需要安装 npm i vuex -S
2. 在 src 中创建 store 文件夹，在 store 文件中创建 store.js/index.js
3. 在 main.js 引入 store.js 并且作为 Vue 实例的选项
   在 store.js 导入 vuex 实例，调用 vuex 的 store 方法：
   export default new Vuex.store({state,getters,actions,mutations})

```js
// store.js
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
// main.js
import store from './store';
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
```

```html
state:管理数据的对象相当于data；getters：管理计算属性的对象 actions：包含多个间接更新数据的函数的对象；mutations：包含多个直接更新数据的函数的对象
```

#### actions 和 mutations 的区别

- actions 不能直接更新数据，能处理同步或异步代码
- mutations 直接更新数据只能处理同步代码

## vuex 流程图

![vuex流程图](https://s1.ax1x.com/2020/09/22/wOEmcT.md.jpg)

## vuex 里辅助函数

- ...mapState(['state 中的数据属性])
- ...mapGetters(['getter 中的数据属性])
- ...mapActions(['action 中的函数名])
- ...mapMutations(['mutation 的函数名'])

## vuex 数据存在内存中，解决丢失的问题 用插件或者本地存储

1. import vuexPersitence from 'vuex-persist'
2. store 中:

```js
export default new Vuex.store({
  Plugins: [new vuexPersitence().plugin]
});
```
