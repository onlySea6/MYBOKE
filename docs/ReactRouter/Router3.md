---
title: 服务器渲染
date: 2019-10-01
categories:
  - react
tags:
  - react
---

## 服务器渲染

服务器上的渲染都是无状态的，因此有点不同。基本思想是，我们将应用包装在无状态`<StaticRouter>`而不是的状态`<BrowserRouter>`。我们从服务器传入请求的url，以便路由可以匹配，然后context我们将讨论一个prop。
```js
// client
<BrowserRouter>
  <App/>
</BrowserRouter>

// server (not the complete story)
<StaticRouter
  location={req.url}
  context={context}
>
  <App/>
</StaticRouter>
const context = {};
const markup = ReactDOMServer.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // Somewhere a `<Redirect>` was rendered
  redirect(301, context.url);
} else {
  // we're good, send the response
}
```
当您`<Redirect>`在客户端上呈现时，浏览器历史记录会更改状态，我们将获得新屏幕。在静态服务器环境中，我们无法更改应用程序状态。相反，我们使用context道具来找出渲染的结果。如果找到context.url，则说明该应用已重定向。这使我们能够从服务器发送适当的重定向。

### 添加特定于应用程序的上下文信息

路由器只会添加context.url。但是您可能希望将某些重定向重定向为301，将其他重定向重定向为302。或者，如果要呈现UI的某些特定分支，则可能要发送404响应，如果未授权它们，则可能要发送401。上下文道具是您的，因此您可以对其进行突变。这是区分301和302重定向的一种方法：
```js
function RedirectWithStatus({ from, to, status }) {
  return (
    <Route
      render={({ staticContext }) => {
        // there is no `staticContext` on the client, so
        // we need to guard against that here
        if (staticContext) staticContext.status = status;
        return <Redirect from={from} to={to} />;
      }}
    />
  );
}

// somewhere in your app
function App() {
  return (
    <Switch>
      {/* some other routes */}
      <RedirectWithStatus status={301} from="/users" to="/profiles" />
      <RedirectWithStatus
        status={302}
        from="/courses"
        to="/dashboard"
      />
    </Switch>
  );
}

// on the server
const context = {};

const markup = ReactDOMServer.renderToString(
  <StaticRouter context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // can use the `context.status` that
  // we added in RedirectWithStatus
  redirect(context.status, context.url);
}
```
### 404、401或其他任何状态

我们可以做与上述相同的事情。创建一个添加一些上下文的组件，并将其呈现在应用程序中的任何位置以获取不同的状态代码。
```js
function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}
function NotFound() {
  return (
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}
```
现在，您可以Status在应用程序中要将代码添加到的任何地方进行渲染staticContext。

### 放在一起
这不是一个真正的应用程序，但是它显示了将它们放在一起所需的所有常规部分。

```js
import http from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./App.js";

http
  .createServer((req, res) => {
    const context = {};

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      });
      res.end();
    } else {
      res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `);
      res.end();
    }
  })
  .listen(3000);
// 然后客户：
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App.js";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
```
### 资料载入
有许多不同的方法可以解决此问题，并且尚无明确的最佳实践，因此我们力求与任何一种方法融为一体，而不规定或倾向于任何一种方法。我们相信路由器可以放入您的应用程序约束之内。主要约束是您要在渲染之前加载数据。React Router导出matchPath其内部使用的静态功能，以将位置与路线匹配。您可以在服务器上使用此功能来帮助确定呈现之前的数据依存关系。该方法的要旨是依赖于静态路由配置，该配置既可以呈现您的路由，也可以在呈现之前进行匹配以确定数据依赖性。

```js
const routes = [
  {
    path: "/",
    component: Root,
    loadData: () => getSomeData()
  }
  // etc.
];
```
然后使用此配置在应用中呈现您的路线：import { routes } from "./routes.js";
```js
function App() {
  return (
    <Switch>
      {routes.map(route => (
        <Route {...route} />
      ))}
    </Switch>
  );
}
```
然后，在服务器上，您将看到以下内容：import { matchPath } from "react-router-dom";
```js
// inside a request
const promises = [];
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
routes.some(route => {
  // use `matchPath` here
  const match = matchPath(req.path, route);
  if (match) promises.push(route.loadData(match));
  return match;
});

Promise.all(promises).then(data => {
  // do something w/ the data so the client
  // can access it then render the app
});
```
最后，客户将需要提取数据。同样，我们不为您的应用程序规定数据加载模式，但是这些是您需要实现的接触点。您可能对我们的React Router Config软件包感兴趣，以通过静态路由配置协助数据加载和服务器渲染。