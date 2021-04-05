---
title: 哲学
date: 2019-10-01
categories:
  - react
tags:
  - react
---

## 哲学

本指南的目的是解释使用React Router时要具有的思维模型。我们称之为“动态路由”，它与您可能更熟悉的“静态路由”完全不同。

### 静态路由

如果您使用过Rails，Express，Ember，Angular等，则使用了静态路由。在这些框架中，您将在进行任何渲染之前将路由声明为应用程序初始化的一部分。React Router pre-v4也是静态的（主要是）。让我们看一下如何在express中配置路由
```js
// Express Style routing:
app.get("/", handleIndex);
app.get("/invoices", handleInvoices);
app.get("/invoices/:id", handleInvoice);
app.get("/invoices/:id/edit", handleInvoiceEdit);

app.listen();
```

请注意在应用监听之前如何声明路由。我们使用的客户端路由器是相似的。在Angular中，您先声明路线，然后AppModule在渲染之前将其导入顶层：

```js
// Angular Style routing:
const appRoutes: Routes = [
  {
    path: "crisis-center",
    component: CrisisListComponent
  },
  {
    path: "hero/:id",
    component: HeroDetailComponent
  },
  {
    path: "heroes",
    component: HeroListComponent,
    data: { title: "Heroes List" }
  },
  {
    path: "",
    redirectTo: "/heroes",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppModule {}
```

Ember有一个常规routes.js文件，该文件会为您读取并导入到应用程序中。同样，这是在您的应用渲染之前发生的。

```js
// Ember Style Router:
Router.map(function() {
  this.route("about");
  this.route("contact");
  this.route("rentals", function() {
    this.route("show", { path: "/:rental_id" });
  });
});

export default Router;
```
尽管API不同，但它们都共享“静态路由”模型。React Router也跟进了直到v4。

为了成功使用React Router，您需要忘记所有这些！：O

### 背景故事
坦率地说，我们对v2采取React Router的方向感到非常沮丧。我们（Michael和Ryan）感到受到API的限制，认识到我们正在重新实现React的各个部分（生命周期等），而这与React为构建UI提供的思维模型不匹配。

我们正要在讨论讨论该怎么做的研讨会之前穿过酒店的走廊。我们互相问：“如果使用我们在讲习班中教授的模式建造路由器，那会是什么样？”

仅仅几个小时的开发时间，我们就获得了概念证明，我们知道这是我们希望进行布线的未来。我们最终得到的API并不是React之外的“ API”，它是由React的其余部分组成或自然地融入其中的。我们认为您会喜欢的。

### 动态路由
当我们说动态路由时，是指在您的应用渲染时发生的路由，而不是在运行的应用之外的配置或约定中进行。这意味着几乎所有内容都是React Router中的一个组件。这是对该API的60秒回顾，以了解其工作原理：

首先，Router为您要定位的环境获取一个组件，并将其呈现在应用程序的顶部。
```js
// react-native
import { NativeRouter } from "react-router-native";

// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
```
接下来，获取链接组件以链接到新位置：
```js
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);
```
最后，渲染一个Route以在用户访问时显示一些UI /dashboard。
```js
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </div>
);
```
该Route将使```<Dashboard {...props}/>```其中props一些路由器具体的东西，看起来像{ match, location, history }。如果用户没有在/dashboard那么Route将呈现null。这几乎就是它的全部。

### 嵌套路线

许多路由器都有“嵌套路由”的概念。如果您使用过v4之前的React Router版本，您也会知道它也是如此！当您从静态路由配置转换为动态渲染的路由时，如何“嵌套路由”？好吧，您如何嵌套一个div？
```js
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos} />
    </div>
  </BrowserRouter>
);

// when the url matches `/tacos` this component renders
const Tacos = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route path={match.url + "/carnitas"} component={Carnitas} />
  </div>
);
```
看看路由器如何没有“嵌套” API？Route只是一个组件，就像div。因此，要嵌套aRoute或a div，您只需…做就可以了。

让我们变得更加棘手

### 响应路线
考虑到用户导航到/invoices。您的应用程序适应不同的屏幕尺寸，它们的视口狭窄，因此您只向他们显示发票清单和发票仪表板的链接。他们可以从那里更深入地导航。
```js
Small Screen
url: /invoices

+----------------------+
|                      |
|      Dashboard       |
|                      |
+----------------------+
|                      |
|      Invoice 01      |
|                      |
+----------------------+
|                      |
|      Invoice 02      |
|                      |
+----------------------+
|                      |
|      Invoice 03      |
|                      |
+----------------------+
|                      |
|      Invoice 04      |
|                      |
+----------------------+
```
在较大的屏幕上，我们想显示一个主从视图，其中导航在左侧，仪表板或特定发票在右侧。
```js
Large Screen
url: /invoices/dashboard

+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |   Unpaid:             5   |
+----------------------+                           |
|                      |   Balance:   $53,543.00   |
|      Invoice 01      |                           |
|                      |   Past Due:           2   |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |                           |
|                      |   +-------------------+   |
+----------------------+   |                   |   |
|                      |   |  +    +     +     |   |
|      Invoice 03      |   |  | +  |     |     |   |
|                      |   |  | |  |  +  |  +  |   |
+----------------------+   |  | |  |  |  |  |  |   |
|                      |   +--+-+--+--+--+--+--+   |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

现在暂停一分钟，考虑/invoices两种屏幕尺寸的网址。它甚至是大屏幕的有效路线吗？我们应该在右边放什么？

```js
Large Screen
url: /invoices
+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 01      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |             ???           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 03      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```
在大屏幕上，/invoices这不是有效路线，但在小屏幕上，则是有效路线！为了使事情变得更有趣，请考虑使用大型手机的人。他们可能会/invoices纵向观看，然后将手机旋转到横向。突然，我们有足够的空间来显示主从界面，因此您应该立即进行重定向！

React Router先前版本的静态路由并没有真正解决这个问题的方法。但是，当路由是动态的时，您可以声明性地组合此功能。如果您开始考虑将路由选择为UI，而不是静态配置，那么您的直觉将引导您进入以下代码：
```js
const App = () => (
  <AppLayout>
    <Route path="/invoices" component={Invoices} />
  </AppLayout>
);

const Invoices = () => (
  <Layout>
    {/* always show the nav */}
    <InvoicesNav />

    <Media query={PRETTY_SMALL}>
      {screenIsSmall =>
        screenIsSmall ? (
          // small screen has no redirect
          <Switch>
            <Route
              exact
              path="/invoices/dashboard"
              component={Dashboard}
            />
            <Route path="/invoices/:id" component={Invoice} />
          </Switch>
        ) : (
          // large screen does!
          <Switch>
            <Route
              exact
              path="/invoices/dashboard"
              component={Dashboard}
            />
            <Route path="/invoices/:id" component={Invoice} />
            <Redirect from="/invoices" to="/invoices/dashboard" />
          </Switch>
        )
      }
    </Media>
  </Layout>
);
```
当用户将手机从纵向旋转到横向时，此代码将自动将其重定向到仪表板。有效路线的集合根据用户手中的移动设备的动态性质而改变。

这只是一个例子。我们可以讨论许多其他问题，但我们将总结以下建议：为了使您的直觉与React Router的直觉保持一致，请考虑组件而不是静态路由。考虑一下如何使用React的声明式可组合性解决问题，因为几乎每个“ React Router问题”都可能是“ React问题”。