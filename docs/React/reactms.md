---
title: react官网题
date: 2019-10-15
sidebar: auto
categories:
  - react
tags:
  - react
---
## [官方地址](https://react.docschina.org/docs/hooks-faq.html)
## 哪个版本的 React 包含了 Hook？
### 从 16.8.0 开始，React 在以下模块中包含了 React Hook 的稳定实现：

- React DOM
- React Native
- React DOM Server
- React Test Renderer
- React Shallow Renderer
* 请注意，要启用 Hook，所有 React 相关的 package 都必须升级到 16.8.0 或更高版本。

## 我需要重写所有的 class 组件吗？
不。我们并 没有计划 从 React 中移除 class —— 我们也需要不断地发布产品，重写成本较高。我们推荐在新代码中尝试 Hook。

## 有什么是 Hook 能做而 class 做不到的？

Hook 提供了强大而富有表现力的方式来在组件间复用功能。通过 「自定义 Hook」 可以将组件逻辑提取到可重用的函数中。

## 我的 React 知识还有多少是仍然有用的？

Hook 是使用你已经知道的 React 特性的一种更直接的方式 —— 比如 state，生命周期，context，以及 refs。
它们并没有从根本上改变 React 的工作方式，你对组件，props, 以及自顶向下的数据流的知识并没有改变。

## 我应该使用 Hook，class，还是两者混用？
当你准备好了，我们鼓励你在写新组件的时候开始尝试 Hook。请确保你团队中的每个人都愿意使用它们并且熟知这份文档中的内容。我们不推荐用 Hook 重写你已有的 class，除非你本就打算重写它们。（例如：为了修复bug）。

你不能在 class 组件内部使用 Hook，但毫无疑问你可以在组件树里混合使用 class 组件和使用了 
Hook 的函数组件。不论一个组件是 class 还是一个使用了 Hook 的函数，都只是这个组件的实现细节而已。长远来看，我们期望 Hook 能够成为人们编写 React 组件的主要方式。

## Hook 能否覆盖 class 的所有使用场景？
我们给 Hook 设定的目标是尽早覆盖 class 的所有使用场景。目前暂时还没有对应不常用的 getSnapshotBeforeUpdate，getDerivedStateFromError 和 componentDidCatch 生命周期的 Hook 等价写法，但我们计划尽早把它们加进来。

目前 Hook 还处于早期阶段，一些第三方的库可能还暂时无法兼容 Hook。

## Hook 会替代 render props 和高阶组件吗？
通常，render props 和高阶组件只渲染一个子节点。我们认为让 Hook 来服务这个使用场景更加简单。这两种模式仍有用武之地，（例如，一个虚拟滚动条组件或许会有一个 renderItem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但在大部分场景下，Hook 足够了，并且能够帮助减少嵌套。

## Hook 对于 Redux connect() 和 React Router 等流行的 API 来说，意味着什么？
你可以继续使用之前使用的 API；它们仍会继续有效。

React Redux 从 v7.1.0 开始支持 Hook API 并暴露了 useDispatch 和 useSelector 等 hook。

React Router 从 v5.1 开始支持 hook。

其它第三库也将即将支持 hook

## Hook 能和静态类型一起用吗？
Hook 在设计阶段就考虑了静态类型的问题。因为它们是函数，所以它们比像高阶组件这样的模式更易于设定正确的类型。最新版的 Flow 和 TypeScript React 定义已经包含了对 React Hook 的支持。

重要的是，在你需要严格限制类型的时候，自定义 Hook 能够帮你限制 React 的 API。React 只是给你提供了基础功能，具体怎么用就是你自己的事了。

## 如何测试使用了 Hook 的组件？
在 React 看来，一个使用了 Hook 的组件只不过是一个常规组件。
如果你的测试方案不依赖于 React 的内部实现，测试带 Hook 的组件应该和你通常测试组件的方式没什么差别
在你的测试代码中创建一个组件并在其中使用你的 Hook。然后你就可以测试你刚写的组件了

## lint 规则具体强制了哪些内容？
我们提供了一个 ESLint 插件 来强制 Hook 规范 以避免 Bug。它假设任何以 「use」 开头并紧跟着一个大写字母的函数就是一个 Hook。我们知道这种启发方式并不完美，甚至存在一些伪真理，但如果没有一个全生态范围的约定就没法让 Hook 很好的工作 —— 而名字太长会让人要么不愿意采用 Hook，要么不愿意遵守约定。

规范尤其强制了以下内容：

- 对 Hook 的调用要么在一个大驼峰法命名的函数（视作一个组件）内部，要么在另一个 useSomething 函数（视作一个自定义 Hook）中。
- Hook 在每次渲染时都按照相同的顺序被调用。

## 生命周期方法要如何对应到 Hook？
- constructor：函数组件不需要构造函数。你可以通过调用 useState 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 useState。
- getDerivedStateFromProps：改为 在渲染时 安排一次更新。
- shouldComponentUpdate：React.memo 包裹一个组件来对它的 props 进行浅比较。这不是一个 Hook 因为它的写法和 Hook 不同。React.memo 等效于 PureComponent，但它只比较 props。
- render：这是函数组件体本身。
- componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。
- getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会被添加。

## 我该如何使用 Hook 进行数据获取？
使用响应钩子获取数据 ---使用 Render Prop 组件和 high-order 组件进行可重用，以及如何处理错误处理和加载调整器
状态和状态更新函数来自名为 useState 的状态挂钩，该挂钩负责管理我们要为 App 组件提取的数据的本地状态。初始状态是表示数据的对象中的空命中列表
效果钩子叫做 useEffect，它用 axios 从 API 中获取数据，并用状态钩子的 update 函数设置组件的本地状态中的数据。允诺解析是使用 async/await 进行的。
[详细的数据获取文章](https://www.robinwieruch.de/react-hooks-fetch-data)

## 有类似实例变量的东西吗？
有！useRef() Hook 不仅可以用于 DOM refs。「ref」 对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。

## 我应该使用单个还是多个 state 变量？
我们推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化。

## 我可以只在更新时运行 effect 吗？
这是个比较罕见的使用场景。如果你需要的话，你可以 使用一个可变的 ref 手动存储一个布尔值来表示是首次渲染还是后续渲染，然后在你的 effect 中检查这个标识。
（如果你发现自己经常在这么做，你可以为之创建一个自定义 Hook。）

## 如何获取上一轮的 props 或 state？
通过 ref 来手动实现：
```js
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;
  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```
## 为什么我会在我的函数中看到陈旧的 props 和 state ？
组件内部的任何函数，包括事件处理函数和 effect，都是从它被创建的那次渲染中被「看到」的。

## 我该如何实现 getDerivedStateFromProps？
尽管你可能 不需要它，但在一些罕见的你需要用到的场景下（比如实现一个 < Transition > 组件），你可以在渲染过程中更新 state 。React 会立即退出第一次渲染并用更新后的 state 重新运行组件以避免耗费太多性能。

## 有类似 forceUpdate 的东西吗？
如果前后两次的值相同，useState 和 useReducer Hook 都会放弃更新。原地修改 state 并调用 setState 不会引起重新渲染。
通常，你不应该在 React 中修改本地 state。可能的话尽量避免这种模式。

## 我可以引用一个函数组件吗？

尽管你不应该经常需要这么做，但你可以通过 useImperativeHandle  Hook 暴露一些命令式的方法给父组件。

## 我该如何测量 DOM 节点？
获取 DOM 节点的位置或是大小的基本方式是使用 callback ref。每当 ref 被附加到一个另一个节点，React 就会调用 callback
当 ref 是一个对象时它并不会把当前 ref 的值的 变化 通知到我们。使用 callback ref 可以确保 即便子组件延迟显示被测量的节点 (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果

## 我可以在更新时跳过 effect 吗？
可以的。默认情况下，effect 会在每轮组件渲染完成后执行。这样的话，一旦 effect 的依赖发生变化，它就会被重新创建。注意，忘记处理更新常会 导致 bug，这也正是我们没有默认使用条件式 effect 的原因。

## 在依赖列表中省略函数是否安全？
一般来说，不安全。 通常你会想要在 effect 内部 去声明它所需要的函数。

只有 当函数（以及它所调用的函数）不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略

推荐的修复方案是把那个函数移动到你的 effect 内部
* 如果处于某些原因你 无法 把一个函数移动到 effect 内部，还有一些其他办法：

- 你可以尝试把那个函数移动到你的组件之外。那样一来，这个函数就肯定不会依赖任何 props 或 state，并且也不用出现在依赖列表中了。
- 如果你所调用的方法是一个纯计算，并且可以在渲染时调用，你可以 转而在 effect 之外调用它， 并让 effect 依赖于它的返回值。
- 万不得已的情况下，你可以 把函数加入 effect 的依赖但 把它的定义包裹 进 useCallback Hook。这就确保了它不随渲染而改变，除非 它自身 的依赖发生了改变：

## 如果我的 effect 的依赖频繁变化，我该怎么办？
有时候，你的 effect 可能会使用一些频繁变化的值。你可能会忽略依赖列表中 state，但这通常会引起 Bug

## 我该如何实现 shouldComponentUpdate?
你可以用 React.memo 包裹一个组件来对它的 props 进行浅比较：
React.memo 不比较 state，因为没有单一的 state 对象可供比较。但你也可以让子节点变为纯组件，或者 用 useMemo 优化每一个具体的子节点。

## 如何记忆计算结果？
useMemo Hook 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果
你可以把 useMemo 作为一种性能优化的手段，但不要把它当做一种语义上的保证

## 如何惰性创建昂贵的对象？
如果依赖数组的值相同，useMemo 允许你 记住一次昂贵的计算。但是，这仅作为一种提示，并不 保证 计算不会重新运行。但有时候需要确保一个对象仅被创建一次。

## Hook 会因为在渲染时创建函数而变慢吗？

不会。在现代浏览器中，闭包和类的原始性能只有在极端场景下才会有明显的差别

除此之外，可以认为 Hook 的设计在某些方面更加高效：
- Hook 避免了 class 需要的额外开支，像是创建类实例和在构造函数中绑定事件处理器的成本。
- 符合语言习惯的代码在使用 Hook 时不需要很深的组件树嵌套。这个现象在使用高阶组件、render props、和 context 的代码库中非常普遍。组件树小了，React 的工作量也随之减少。
- useCallback Hook 允许你在重新渲染之间保持对相同的回调引用以使得 shouldComponentUpdate 继续工作：
- useMemo Hook 使得控制具体子节点何时更新变得更容易，减少了对纯组件的需要。
- 最后，useReducer Hook 减少了对深层传递回调的依赖，正如下面解释的那样。

## 如何避免向下传递回调？
在大型的组件树中，我们推荐的替代方案是通过 context 用 useReducer 往下传一个 dispatch
函数父组件内部组件树里的任何子节点都可以使用 dispatch 函数来向上传递 actions 到
```js
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```
## 如何从 useCallback 读取一个经常变化的值？
在某些罕见场景中，你可能会需要用 useCallback 记住一个回调，但由于内部函数必须经常重新创建，记忆效果不是很好。如果你想要记住的函数是一个事件处理器并且在渲染期间没有被用到，你可以 把 ref 当做实例变量 来用，并手动把最后提交的值保存在它当中：

## React 是如何把对 Hook 的调用和组件联系起来的？
每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 useState() 调用一个 Hook 的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。

## Hook 使用了哪些现有技术？
Hook 由不同的来源的多个想法构成：
- react-future 这个仓库中包含我们对函数式 API 的老旧实验。
- React 社区对 render prop API 的实验，其中包括 Ryan Florence 的 Reactions Component 。
- Dominic Gannaway 的用 adopt 关键字 作为 render props 的语法糖的提案。
- DisplayScript 中的 state 变量和 state 单元格。
- ReasonReact 中的 Reducer components。
- Rx 中的 Subscriptions。
- Multicore OCaml 提到的 Algebraic effects。

## 如何在 React 中发起 AJAX 请求？
我们推荐你在 componentDidMount 这个生命周期函数中发起 AJAX 请求。这样做你可以拿到 AJAX 请求返回的数据并通过 setState 来更新组件。

## 必须在 React 中使用 JSX 吗？
React 并不强制要求使用 JSX。当你不想在构建环境中配置有关 JSX 编译时，不在 React 中使用 JSX 会更加方便。
```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

## 必须在 React 中使用 ES6 (+) 吗？
不是必须的！ 如果你还未使用过 ES6，你可以使用 create-react-class 模块：但是注意的很多
[详细注意的](https://react.docschina.org/docs/react-without-es6.html)

## 怎样才能在 JSX 中编写注释？
```js
<div>
  {/* 注释写在这里 */}
  {/* 多行注释 
  也同样有效。 */}
  Hello, {name}!
</div>
```
## 如何将事件处理器（比如 onClick）传递给组件？
可以将事件处理器和其他函数作为 props 传递给子组件

## 如何为函数绑定组件实例？
有以下几种方式可以确保函数可以访问组件属性，比如 this.props 和 this.state，这取决于使用的语法和构建步骤。
[详情](https://react.docschina.org/docs/faq-functions.html)

## 可以在 render 方法中使用箭头函数吗？
一般来说是可以的，并且使用箭头函数是向回调函数传递参数的最简单的办法。

但是如果遇到了性能问题，一定要进行优化！

## 为什么绑定是必要的？
使用 React，通常只需要绑定传递给其他组件的方法。例如，< button onClick={this.handleClick}> 是在传递 this.handleClick ，所以需要绑定它。但是，没有必要绑定 render 方法或生命周期方法：我们并没有将它们传递给其他的组件。

## 为什么我的函数每次组件渲染时都会被调用？
确保你在传递一个函数给组件时，没有调用这个函数

## 如何传递参数给事件处理器或回调？
可以使用箭头函数包裹事件处理器，并传递参数:
```js
<button onClick={() => this.handleClick(id)} />
//等价于
<button onClick={this.handleClick.bind(this, id)} />
```

## 怎样阻止函数被调用太快或者太多次？
可以限制执行回调的速度
- 节流：基于时间的频率来进行抽样更改 (例如 _.throttle)
* 节流阻止函数在给定时间窗口内被调不能超过一次。
* 节流 “click” 事件处理器，使其每秒钟的只能调用一次。
```js
import throttle from 'lodash.throttle';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 1000);
  }
  componentWillUnmount() {
    this.handleClickThrottled.cancel();
  }
  render() {
    return <button onClick={this.handleClickThrottled}>Load More</button>;
  }
  handleClick() {
    this.props.loadMore();
  }
}

```
- 防抖：一段时间的不活动之后发布更改 (例如 _.debounce)
* 防抖确保函数不会在上一次被调用之后一定量的时间内被执行。
* 当必须进行一些费时的计算来响应快速派发的事件时（比如鼠标滚动或键盘事件时），防抖是非常有用的。
```js
import debounce from 'lodash.debounce';
class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }
  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }
  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Search..."
        defaultValue={this.props.value}
      />
    );
  }
  handleChange(e) {
    // React pools events, so we read the value before debounce.
    // Alternately we could call `event.persist()` and pass the entire event.
    // For more info see reactjs.org/docs/events.html#event-pooling
    this.emitChangeDebounced(e.target.value);
  }
  emitChange(value) {
    this.props.onChange(value);
  }
}
```
- requestAnimationFrame 节流：基于 requestAnimationFrame 的抽样更改 (例如 raf-schd)
* requestAnimationFrame 是在浏览器中排队等待执行的一种方法，它可以在呈现性能的最佳时间执行。
* 一个函数被 requestAnimationFrame 放入队列后将会在下一帧触发。
* 浏览器会努力确保每秒 60 帧（60fps）。然而，如果浏览器无法确保，那么自然会限制每秒的帧数。
* 例如，某个设备可能只能处理每秒 30 帧，所以每秒只能得到 30 帧。
* 使用 requestAnimationFrame 来节流是一种有用的技术，它可以防止在一秒中进行 60 帧以上的更新。
* 如果一秒钟内完成 100 次更新，则会为浏览器带来额外的负担，而用却户无法感知到这些工作。

注意：

使用这个方法时只能获取某一帧中最后发布的值。也可以在 MDN 中看优化的示例。
```js
import rafSchedule from 'raf-schd';
class ScrollListener extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    // Create a new function to schedule updates.
    this.scheduleUpdate = rafSchedule(
      point => this.props.onScroll(point)
    );
  }
  handleScroll(e) {
    // When we receive a scroll event, schedule an update.
    // If we receive many updates within a frame, we'll only publish the latest value.
    this.scheduleUpdate({ x: e.clientX, y: e.clientY });
  }
  componentWillUnmount() {
    // Cancel any pending updates since we're unmounting.
    this.scheduleUpdate.cancel();
  }
  render() {
    return (
      <div
        style={{ overflow: 'scroll' }}
        onScroll={this.handleScroll}
      >
        <img src="/my-huge-image.jpg" />
      </div>
    );
  }
}
```
- 测试速率限制
在测试速率限制的代码是否正确工作的时候，如果可以（对动画或操作）进行快进将会很有帮助。如果正在使用 jest ，那么可以使用 mock timers 来快进。如果正在使用 requestAnimationFrame 节流，那么就会发现 raf-stub 是一个控制动画帧的十分有用的工具。

## setState 实际做了什么？
setState() 会对一个组件的 state 对象安排一次更新。当 state 改变了，该组件就会重新渲染。

## state 和 props 之间的区别是什么？
props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）。

## 为什么 setState 给了我一个错误的值？
调用 setState 其实是异步的 —— 不要指望在调用 setState 之后，this.state 会立即映射为新的值。如果你需要基于当前的 state 来计算出新的值，那你应该传递一个函数，而不是一个对象

## 我应该如何更新那些依赖于当前的 state 的 state 呢？
给 setState 传递一个函数，而不是一个对象，就可以确保每次的调用都是使用最新版的 state

## 给 setState 传递一个对象与传递一个函数的区别是什么？
传递一个函数可以让你在函数内访问到当前的 state 的值。因为 setState 的调用是分批的，所以你可以链式地进行更新，并确保它们是一个建立在另一个之上的，这样才不会发生冲突：
```js
incrementCount() {
  this.setState((state) => {
    // 重要：在更新的时候读取 `state`，而不是 `this.state`。
    return {count: state.count + 1}
  });
}
handleSomething() {
  // 假设 `this.state.count` 从 0 开始。
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // 如果你现在在这里读取 `this.state.count`，它还是会为 0。
  // 但是，当 React 重新渲染该组件时，它会变为 3。
}
```
## setState 什么时候是异步的？
目前，在事件处理函数内部的 setState 是异步的。

## 为什么 React 不同步地更新 this.state？
- 这样会破坏掉 props 和 state 之间的一致性，造成一些难以 debug 的问题。
- 这样会让一些我们正在实现的新功能变得无法实现。

## 我应该使用一个像 Redux 或 MobX 那样的 state 管理库吗？
或许需要。
在添加额外的库之前，最好先了解清楚 React 能干什么。你也可以只使用 React 来构建出一个比较复杂的应用。

## 如何为组件添加 CSS 的 class？
传递一个字符串作为 className 属性：
```js
render() {
  return <span className="menu navigation-menu">Menu</span>
}
```

## 可以使用行内样式吗？
可以
```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

## 行内样式不好 (bad) 吗？
从性能角度来说，CSS 的 class 通常比行内样式更好。

## 什么是 CSS-in-JS?(由第三方库提供)
“CSS-in-JS” 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义。

## 可以在 React 中实现动画效果吗？
React 可以被用来实现强大的动画效果。参见[React Transition Group](https://reactcommunity.org/react-transition-group/) 、React Motion 以及 React Spring 等示例。

## 是否有一种推荐的方式来组织 React 的项目文件结构呢？
React 对如何将文件放入文件夹中没有意见。也就是说，你可以参考使用生态系统中一些常见的组织项目文件结构的方式。
- 按功能或路由组织
- 按文件类型组织
- 避免多层嵌套
- 不要过度思考

## 什么是 Virtual DOM？
Virtual DOM 是一种编程概念。在这个概念里， UI 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中，
并通过如 ReactDOM 等类库使之与“真实的” DOM 同步。这一过程叫做协调。

## Shadow DOM 和 Virtual DOM 是一回事吗？
不，他们不一样。
- Shadow DOM 是一种浏览器技术，主要用于在 web 组件中封装变量和 CSS。
- Virtual DOM 则是一种由 Javascript 类库基于浏览器 API 实现的概念。

## 什么是 “React Fiber”？
Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染。[更多](https://github.com/acdlite/react-fiber-architecture)

## React 项目中有哪些细节可以优化？实际开发中都做过哪些性能优化
- 结合React的PureComponent以及React.memo等做浅比较处理，这中间有涉及到不可变数据的处理，当然也可以结合使用ShouldComponentUpdate做深比较处理；
- 不管对于CSR或者SSR，都建议配合使用Service worker，来控制资源的调配及骨架屏秒开的体验
- 所有的运行状态优化，都是减少不必要的render，React.useMemo与React.useCallback也是可以做很多优化的地方；
- 在很多应用中，都会涉及到使用redux以及使用context，这两个都可能造成许多不必要的render，所以在使用的时候，也需要谨慎的处理一些数据；
* 实际项目中开发过程中还有很多其他的优化点
1. 保证数据的不可变性
2. 使用唯一的键值迭代
3. 使用web worker做密集型的任务处理
4. 不在render中处理数据
5. 不必要的标签，使用React.Fragments