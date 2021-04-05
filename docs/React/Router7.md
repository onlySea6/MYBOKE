---
title: 测试
date: 2019-10-01
categories:
  - react
tags:
  - react
---

## 测试中
React Router依靠React上下文来工作。这会影响您如何测试使用我们的组件的组件。

### 语境

如果尝试对呈现a`<Link>`或a`<Route>`等的组件之一进行单元测试，则会收到一些有关上下文的错误和警告。虽然你可能受到诱惑，自己存根出路由器背景下，我们建议你换你的单元测试中的一个Router组成部分：基础Router与history支柱，或者`<StaticRouter>`，`<MemoryRouter>`或者`<BrowserRouter>`（如果window.history是作为测试环境全球）。

建议使用MemoryRouter或自定义history，以便能够在两次测试之间重置路由器。

```js
class Sidebar extends Component {
  // ...
  render() {
    return (
      <div>
        <button onClick={this.toggleExpand}>expand</button>
        <ul>
          {users.map(user => (
            <li>
              <Link to={user.path}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// broken
test("it expands when the button is clicked", () => {
  render(<Sidebar />);
  click(theButton);
  expect(theThingToBeOpen);
});

// fixed!
test("it expands when the button is clicked", () => {
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  click(theButton);
  expect(theThingToBeOpen);
});
```
### 从特定路线开始
`<MemoryRouter>`支持initialEntries和initialIndex道具，因此您可以在特定位置启动应用程序（或应用程序的任何较小部分）。

```js
test("current user is active in sidebar", () => {
  render(
    <MemoryRouter initialEntries={["/users/2"]}>
      <Sidebar />
    </MemoryRouter>
  );
  expectUserToBeActive(2);
});
```

### 导航

我们进行了很多测试，这些测试可以在位置更改时使路由正常工作，因此您可能不需要测试这些东西。但是，如果您需要在应用程序中测试导航，则可以这样进行：

```js
// app.js (a component file)
import React from "react";
import { Route, Link } from "react-router-dom";

// our Subject, the App, but you can test any sub
// section of your app too
const App = () => (
  <div>
    <Route
      exact
      path="/"
      render={() => (
        <div>
          <h1>Welcome</h1>
        </div>
      )}
    />
    <Route
      path="/dashboard"
      render={() => (
        <div>
          <h1>Dashboard</h1>
          <Link to="/" id="click-me">
            Home
          </Link>
        </div>
      )}
    />
  </div>
);
// you can also use a renderer like "@testing-library/react" or "enzyme/mount" here
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from "react-router-dom";

// app.test.js
it("navigates home when you click the logo", async => {
  // in a real test a renderer like "@testing-library/react"
  // would take care of setting up the DOM elements
  const root = document.createElement('div');
  document.body.appendChild(root);

  // Render app
  render(
    <MemoryRouter initialEntries={['/my/initial/route']}>
      <App />
    </MemoryRouter>,
    root
  );

  // Interact with page
  act(() => {
    // Find the link (perhaps using the text content)
    const goHomeLink = document.querySelector('#nav-logo-home');
    // Click it
    goHomeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Check correct page content showed up
  expect(document.body.textContent).toBe('Home');
});
```

### 检查测试中的位置

您不必在测试中经常访问location或history对象，但是如果这样做（例如，验证是否在url栏中设置了新的查询参数），则可以添加一条路由来更新测试中的变量：

```js
// app.test.js
test("clicking filter links updates product query params", () => {
  let history, location;
  render(
    <MemoryRouter initialEntries={["/my/initial/route"]}>
      <App />
      <Route
        path="*"
        render={({ history, location }) => {
          history = history;
          location = location;
          return null;
        }}
      />
    </MemoryRouter>,
    node
  );

  act(() => {
    // example: click a <Link> to /products?id=1234
  });

  // assert about url
  expect(location.pathname).toBe("/products");
  const searchParams = new URLSearchParams(location.search);
  expect(searchParams.has("id")).toBe(true);
  expect(searchParams.get("id")).toEqual("1234");
});
```
备择方案

BrowserRouter如果您的测试环境具有浏览器全局变量，window.location并且也可以使用window.history（这是Jest通过JSDOM的默认设置，但是您不能重置测试之间的历史记录）。

除了将自定义路由传递给MemoryRouter之外，您还可以将基数Router与包中的historyprop一起使用history：
```js
// app.test.js
import { createMemoryHistory } from "history";
import { Router } from "react-router";

test("redirects to login page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App signedInUser={null} />
    </Router>,
    node
  );
  expect(history.location.pathname).toBe("/login");
});
```
反应测试库

请参阅官方文档中的示例：使用[React Testing Library测试React Router](https://testing-library.com/docs/example-react-router)