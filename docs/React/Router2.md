---
title: 主要成分
date: 2019-09-30
categories:
  - react
tags:
  - react
---

## 主要成分

React Router中的组件主要分为三类：

- 路由器，像`<BrowserRouter>`和`<HashRouter>`
- 路线匹配器，例如`<Route>`和`<Switch>`
- 和导航，喜欢`<Link>`，`<NavLink>`和`<Redirect>`

我们还喜欢将导航组件视为“路线更改者”。您应该从中导入Web应用程序中使用的所有组件react-router-dom。
```js
import { BrowserRouter, Route, Link } from "react-router-dom";
```
### 路由器

每个React Router应用程序的核心应该是路由器组件。对于Web项目，react-router-dom提供`<BrowserRouter>`和`<HashRouter>`路由器。两者之间的主要区别是它们存储URL和与Web服务器通信的方式。

- A`<BrowserRouter>`使用常规的URL路径。这些通常是外观最好的URL，但是它们要求正确配置服务器。具体来说，您的Web服务器需要在所有由React Router客户端管理的URL上提供相同的页面。Create React App在开发中即开即用地支持此功能，并附带有关如何配置生产服务器的说明。
- A`<HashRouter>`将当前位置存储在URL的hash一部分中，因此URL看起来像http://example.com/#/your/page。由于哈希从不发送到服务器，因此这意味着不需要特殊的服务器配置。
要使用路由器，只需确保将其呈现在元素层次结构的根目录下即可。通常，您会将顶级`<App>`元素包装在路由器中，如下所示：

```js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return <h1>Hello React Router</h1>;
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

### 路线匹配器

有两个路由匹配组件：Switch和Route。当`<Switch>`被渲染，它会搜索其children `<Route>`内容找到一个其path当前的URL匹配。当找到一个对象时，它将渲染该对象，`<Route>`而忽略所有其他对象。这意味着您应将`<Route>`s的特定性更高（通常更长）放在不那么特定的paths之前。

如果没有`<Route>`匹配项，则`<Switch>`呈现器不呈现任何内容（null）。
```js
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
        <Route path="/about">
          <About />
        </Route>

        {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
        <Route path="/contact/:id">
          <Contact />
        </Route>
        <Route path="/contact">
          <AllContacts />
        </Route>

        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```
需要注意的重要一件事是a`<Route path>`匹配URL的开头，而不是整个开头。因此，a`<Route path="/">`将始终与网址匹配。因此，我们通常将这放在`<Route>`最后`<Switch>`。另一种可能的解决方案是使用`<Route exact path="/">`它不符合整个URL。

注：虽然阵营路由器不支持渲染`<Route>`元素外`<Switch>`，作为5.1版本，我们推荐您使用的useRouteMatch钩来代替。此外，我们不建议您渲染`<Route>`不带的path，而建议您使用钩子来访问所需的任何变量。

### 导航（或路线更改器）

React Router提供了一个`<Link>`在您的应用程序中创建链接的组件。无论您在何处呈现`<Link>`，`<a>`都会在HTML文档中呈现锚点（）。

该`<NavLink>`是一种特殊类型的`<Link>`，当它是可以的风格自己是“主动”to的道具当前位置相匹配。

```js
<Link to="/">Home</Link>
// <a href="/">Home</a>
  React
</NavLink>

// When the URL is /react, this renders:
// <a href="/react" className="hurray">React</a>

// When it's something else:
// <a href="/react">React</a>
```
每当您要强制导航时，都可以呈现`<Redirect>`。当`<Redirect>`呈现，它将