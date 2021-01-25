## Quick Start

:::anchor npm & yarn

```javascript
npm install vue-easytable
```

or

```javascript
yarn add vue-easytable
```

:::anchor Usage

#### Fully import

Write the following in mian.js：

```javascript
import Vue from "vue";
import "vue-easytable/libs/theme-default/index.css"; // import style
import VueEasytable from "vue-easytable"; // import library

Vue.use(VueEasytable);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

The above code completes the introduction of vue-easytable.Don't forget to import style files.

#### On demand

Write the following in mian.js：

```javascript
import Vue from "vue";
import "vue-easytable/libs/theme-default/index.css"; // import style

import {
  VeTable,
  VePagination,
  VeIcon,
  VeLoading,
  VeLocale,
} from "vue-easytable"; // import library

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

#### Example

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
          {
            field: "name",
            key: "a",
            title: "Name",
            align: "center",
          },
          {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
          },
          {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "right",
          },
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

:::anchor Usage By CDN

Through [https://unpkg.com/vue-easytable/](https://unpkg.com/vue-easytable/), you can see the resources of the latest version of Vue easytable,You can also switch versions to select the required resources,You can start using JS and CSS files on the page

```css
<!-- import style -->
<link rel="stylesheet" href="https://unpkg.com/vue-easytable/umd/css/index.css">
<!-- import Vue -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import library -->
<script src="https://unpkg.com/vue-easytable/umd/js/index.js"></script>
```

#### Example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- import style -->
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
  <!-- import Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- import library -->
  <script src="https://unpkg.com/vue-easytable/libs/umd/js/index.js"></script>
  <script>
    new Vue({
      el: "#app",
      data: function() {
        return {
          columns: [
            {
              field: "name",
              key: "a",
              title: "Name",
              align: "center",
            },
            {
              field: "date",
              key: "b",
              title: "Date",
              align: "left",
            },
            {
              field: "hobby",
              key: "c",
              title: "Hobby",
              align: "right",
            },
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

:::anchor Browser Compatible
Support modern browser and ie10 and above
