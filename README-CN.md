[![npm](https://img.shields.io/npm/v/vue-easytable.svg)](https://www.npmjs.com/package/vue-easytable)
[![vue2](https://img.shields.io/badge/vue-2.6+-brightgreen.svg)](https://vuejs.org/)
[![NPM downloads](https://img.shields.io/npm/dm/vue-easytable.svg?style=flat)](https://npmjs.org/package/vue-easytable)
[![codecov](https://codecov.io/gh/Happy-Coding-Clans/vue-easytable/branch/master/graph/badge.svg?token=UJy3LHInUn)](https://codecov.io/gh/Happy-Coding-Clans/vue-easytable)
[![license](https://img.shields.io/npm/l/vue-easytable.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)
[![Discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/gBm3k6r)
[![Gitter](https://badges.gitter.im/vue-easytable/community.svg)](https://gitter.im/vue-easytable/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# vue-easytable

[English](./README.md) | **中文**

<p>
  <a href="https://www.patreon.com/huangshuwei" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
  </a>
</p>

## Sponsors

<h3 align="center">Gold Sponsor</h3>

<h3 align="center">Silver Sponsor</h3>

<h3 align="center">Generous Sponsor</h3>

## 介绍

一个基于 Vue2.x 的表格组件

## 特点

-   使用简单
-   功能强大
-   单元测试覆盖率大于 85%

## API & 文档

[官方文档](http://happy-coding-clans.github.io/vue-easytable/)

## 功能支持

-   [x] [国际化](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/locale)
-   [x] [主题定制 & 内置主题](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/theme)
-   [x] [虚拟滚动](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/virtual-scroll)
-   [x] [列固定](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/column-fixed)
-   [x] [列隐藏](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/column-hidden)
-   [x] [表头固定](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/header-fixed)
-   [x] [表头分组](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/header-grouping)
-   [x] [筛选](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/header-filter)
-   [x] [排序](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/header-sort)
-   [x] [单元格样式](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-style)
-   [x] [单元格自定义](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-custom)
-   [x] [单元格合并](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-span)
-   [x] [单元格选择（键盘操作）](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection)
-   [x] [单元格编辑](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-edit)
-   [x] [单元格省略](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-ellipsis)
-   [x] [行单选](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/row-radio)
-   [x] [行多选](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/row-checkbox)
-   [x] [行展开](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/row-expand)
-   [x] [行样式](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/row-style)
-   [x] [footer 汇总](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/footer-summary)
-   [x] [自定义事件](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/event-custom)
-   [x] [内置 loading 组件](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/base/loading)
-   [x] [内置分页组件](http://happy-coding-clans.github.io/vue-easytable/#/zh/doc/base/pagination)
-   [更多](http://happy-coding-clans.github.io/vue-easytable)

如果没有你想要的的功能
，[请告诉我们](http://happy-coding-clans.github.io/issue-template-generater/#/zh)

## 安装

```
npm install vue-easytable
```

or

```
yarn add vue-easytable
```

## 使用

Write the following in mian.js：

```
import Vue from "vue";
import "vue-easytable/libs/theme-default/index.css";
import VueEasytable from "vue-easytable";

Vue.use(VueEasytable);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

Example:

```
<template>
  <ve-table :columns="columns" :table-data="tableData" />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { field: "name", key: "a", title: "Name", align: "center" },
          { field: "date", key: "b", title: "Date", align: "left" },
          { field: "hobby", key: "c", title: "Hobby", align: "right" },
          { field: "address", key: "d", title: "Address" },
        ],
        tableData: [
          {
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
          },
          {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
          },
          {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
          },
          {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
          },
          {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
          },
        ],
      };
    },
  };
</script>
```

## 开发计划

[正在做的事情](https://github.com/Happy-Coding-Clans/vue-easytable/projects)

## 支持环境

-   现代浏览器和 IE11 及以上

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

## 如何贡献

如果你希望参与贡献，欢迎
[Pull Request](https://github.com/huangshuwei/vue-easytable/pulls)

## Discussion 讨论组

-   [加入 gitter 讨论](https://gitter.im/vue-easytable/community)
-   [加入 discord 讨论](https://discord.gg/gBm3k6r)

## License

http://www.opensource.org/licenses/mit-license.php
