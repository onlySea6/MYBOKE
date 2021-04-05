---
title: 快速开始
date: 2019-10-30
sidebar: auto
categories:
  - react
tags:
  - react
---

## 快速开始


要在Web应用程序中开始使用React Router，您需要一个React Web应用程序。如果需要创建一个，我们建议您尝试创建React App。这是一个非常流行的工具，可以与React Router一起很好地工作。

首先，安装create-react-app并创建一个新项目。

```js
npx create-react-app demo-app
cd demo-app
```

### 安装

您可以使用或从公共npm注册表中安装React Router 。由于我们正在构建Web应用程序，因此将在本指南中使用。npmyarnreact-router-dom

接下来，将以下任一示例复制/粘贴到中src/App.js。

```js
npm install react-router-dom
```

### 第一个示例：基本路由


在此示例中，路由器处理了3个“页面”：主页，“关于”页面和“用户”页面。在不同的```<Link>```上单击时，路由器将呈现匹配项```<Route>```。

注意：在幕后，```<Link>```会```<a>```使用```real```渲染一个href，因此使用键盘进行导航或屏幕阅读器的人仍然可以使用此应用。
```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}
function About() {
  return <h2>About</h2>;
}
function Users() {
  return <h2>Users</h2>;
}
```

### 第二个示例：嵌套路由

此示例显示了嵌套路由的工作方式。路由/topics加载Topics组件，这会```<Route>```在path:id值上有条件地渲染任何进一步的。

```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
```

### 继续！
希望这些示例使您对使用React Router创建Web应用程序有什么感觉。继续阅读以了解有关React Router中主要组件的更多信息！