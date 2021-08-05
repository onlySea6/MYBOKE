---
title: API
date: 2018-10-30
sidebar: auto
categories:
  - css
tags:
  - css
---

## 网格布局

### display: grid 创建只有一列的网格
详细的地址[](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids)
```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px;/* 按固定的宽分网格*/
    /* grid-template-columns: 1fr 1fr 1fr; 按比例 */
    grid-gap: 20px;/*定义网格之间的间隙 配合gap一起使用*/
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);/* 创建多个等宽轨道 */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /*可以组合*/

    grid-auto-rows: 100px;/*设置网格的高*/
    grid-auto-rows: minmax(100px, auto);/*尺寸就至少为100像素，并且如果内容尺寸大于100像素则会根据内容自动调整*/
}
/* 使用grid-template-areas属性放置元素 */
.container {
  display: grid;
  grid-template-areas:
      "header header"
      "sidebar content"
      "footer footer";
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}
```