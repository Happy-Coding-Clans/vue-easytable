## 快速开始

:::anchor npm & yarn 安装

```javascript
npm install vue-easytable
```

或者

```javascript
yarn add vue-easytable
```

:::anchor 使用

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from "vue";
// 引入样式
import "vue-easytable/libs/theme-default/index.css";
// 引入组件库
import VueEasytable from "vue-easytable";

Vue.use(VueEasytable);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

以上代码便完成了 vue-easytable 的引入。别忘了引入样式文件。

#### 按需引入

在 main.js 中写入以下内容：

```javascript
import Vue from "vue";
// 引入样式
import "vue-easytable/libs/theme-default/index.css";
// 引入组件库
import {
  VeTable,
  VePagination,
  VeIcon,
  VeLoading,
  VeLocale,
} from "vue-easytable";

Vue.use(VeTable);
Vue.use(VePagination);
Vue.use(VeIcon);
Vue.use(VeLoading);

Vue.prototype.$veLoading = VeLoading;
Vue.prototype.$veLocale = VeLocale;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

#### 示例

:::demo

```html
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

:::

:::anchor CDN 方式使用

通过 [https://unpkg.com/vue-easytable/](https://unpkg.com/vue-easytable/) 可以看到 vue-easytable 最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 和 css 文件即可开始使用：

```css
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/vue-easytable/umd/css/index.css">
<!-- 引入Vue -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- 引入组件库 -->
<script src="https://unpkg.com/vue-easytable/umd/js/index.js"></script>
```

#### 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- 引入样式 -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-easytable/umd/css/index.css"
    />
  </head>
  <body>
    <div id="app">
      <ve-table :columns="columns" :table-data="tableData"></ve-table>
    </div>
  </body>
  <!-- 引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/vue-easytable/libs/umd/js/index.js"></script>
  <script>
    new Vue({
      el: "#app",
      data: function() {
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
    });
  </script>
</html>
```

:::anchor 浏览器兼容
默认支持现代浏览器和 IE10 及以上
