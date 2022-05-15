[![npm](https://img.shields.io/npm/v/vue-easytable.svg)](https://www.npmjs.com/package/vue-easytable)
[![vue2](https://img.shields.io/badge/vue-2.6+-brightgreen.svg)](https://vuejs.org/)
[![NPM downloads](https://img.shields.io/npm/dm/vue-easytable.svg?style=flat)](https://npmjs.org/package/vue-easytable)
[![codecov](https://codecov.io/gh/Happy-Coding-Clans/vue-easytable/branch/master/graph/badge.svg?token=UJy3LHInUn)](https://codecov.io/gh/Happy-Coding-Clans/vue-easytable)
[![license](https://img.shields.io/npm/l/vue-easytable.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)
[![Discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/gBm3k6r)
[![Gitter](https://badges.gitter.im/vue-easytable/community.svg)](https://gitter.im/vue-easytable/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# vue-easytable

**English** | [中文](./README-CN.md)

<p>
  <a href="https://www.patreon.com/huangshuwei" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
  </a>
</p>

## Sponsors

Support this project by becoming a sponsor. Your logo or name will show up here with a link you provided. [Become a sponsor](https://www.patreon.com/huangshuwei)


## Introduction

Based on vue2.x flexible table components.

## API & Examples

- [Official documents (Github)](http://happy-coding-clans.github.io/vue-easytable/) 
- [Official documents (China)](http://huangshuwei.gitee.io/vue-easytable/)

## Features

**Base components**

-   [x] [Loading component](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/base/loading)
-   [x] [Pagination component](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/base/pagination)
-   [x] [Contextmenu component](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/base/contextmenu)
-   [x] [Icon component](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/base/icon)
-   [x] [Locale component](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/base/locale)

**Table component**

-   [x] [Internationalization](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/locale)
-   [x] [Theme Custom & Built in theme](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/theme)
-   [x] [Virtual Scroll](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/virtual-scroll)
-   [x] [Column Fixed](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/column-fixed)
-   [x] [Column Hidden](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/column-hidden)
-   [x] [Header Fixed](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/header-fixed)
-   [x] [Header Grouping](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/header-grouping)
-   [x] [Filter](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/header-filter)
-   [x] [Sort](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/header-sort)
-   [x] [Cell Style](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-style)
-   [x] [Cell Custom](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-custom)
-   [x] [Cell Span](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-span)
-   [x] [Cell Selection(keyboard operation)](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-selection)
-   [x] [Cell Edit](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-edit)
-   [x] [Contextmenu](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/contextmenu)
-   [x] [Cell Ellipsis](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-ellipsis)
-   [x] [Row Radio](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/row-radio)
-   [x] [Row Checkbox](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/row-checkbox)
-   [x] [Row Expand](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/row-expand)
-   [x] [Row Style](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/row-style)
-   [x] [Footer Summary](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/footer-summary)
-   [x] [Event Custom](http://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/event-custom)
-   [More](http://happy-coding-clans.github.io/vue-easytable)

If there is no feature you want,
[Please Tell Us](http://happy-coding-clans.github.io/issue-template-generater/#/en)

## Install

```
npm install vue-easytable
```

or

```
yarn add vue-easytable
```

## Usage

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

## Todo List

[What are we doing](https://github.com/Happy-Coding-Clans/vue-easytable/projects)

## Environment Support

-   Modern browser and ie11 and above

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

## How to contribute

If you want to contribute,just create a
[Pull Request](https://github.com/huangshuwei/vue-easytable/pulls)

## Contributors

Thanks to the following friends for their contributions 🙏

<a href="https://github.com/Happy-Coding-Clans/vue-easytable/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Happy-Coding-Clans/vue-easytable" />
</a>

## Discussion group

-   [Join In Gitter Chat Room](https://gitter.im/vue-easytable/community)
-   [Join In Discord Chat Room](https://discord.gg/gBm3k6r)

## License

http://www.opensource.org/licenses/mit-license.php
