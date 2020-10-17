---
title: 代码分割
date: 2019-10-01
categories:
  - react
tags:
  - react
---

## 代码分割
网络的一项重要功能是，我们不必让访问者下载整个应用程序即可使用。您可以将代码拆分视为增量下载应用程序。要做到这一点，我们将使用的WebPack，@babel/plugin-syntax-dynamic-import和loadable-components。

webpack内置了对动态导入的支持；但是，如果您使用Babel（例如，将JSX编译为JavaScript），则需要使用该@babel/plugin-syntax-dynamic-import插件。这是一个仅语法的插件，这意味着Babel不会进行任何其他转换。该插件仅允许Babel解析动态导入，因此webpack可以将它们捆绑为代码拆分。您.babelrc应该看起来像这样：
```js
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```
loadable-components是用于通过动态导入加载组件的库。它自动处理各种边缘情况，并使代码拆分变得简单！这是使用方法的示例loadable-components：
```js
import loadable from "@loadable/component";
import Loading from "./Loading.js";

const LoadableComponent = loadable(() => import("./Dashboard.js"), {
  fallback: <Loading />
});

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```
这里的所有都是它的！只需使用LoadableDashboard（或使用任何您命名的组件），当您在应用程序中使用它时，它将自动加载并呈现。该fallback是一个占位符组件显示而真正的分量加载。

[完整的文档在这里](https://loadable-components.com/docs/getting-started/)

### 代码拆分和服务器端渲染
[loadable-components](https://github.com/gregberge/loadable-components) 包括 [服务器端渲染指南](https://loadable-components.com/docs/server-side-rendering/)