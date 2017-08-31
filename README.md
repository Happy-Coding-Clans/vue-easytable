# vue-easytable


## Introduction
Based on vue2.x flexible table components.

## API & Examples
[API&Examples](http://doc.huangsw.com/vue-easytable/app.html)

## Features
1. Adaptive, can be automatically adapted as the browser window changes  
   自适应，可以随着浏览器窗口改变自动适应
2. Fixed column, head fixed  
   固定列，表头固定
3. The default support for column width drag   
   默认支持列宽拖动
4. Supports single field sorting and multiple field sorting  
   支持单个字段排序和多个字段排序
5. Custom columns, custom cell styles, loading effects, and more   
   自定义列、自定义单元格样式、loading效果等
6. With paging components  
   自带分页组件

## Install

```
npm install vue-easytable --save-dev
```

## Usage（[more usage](http://doc.huangsw.com/vue-easytable/app.html)）


```
// import css
import 'vue-easytable/libs/themes-base/index.css'

// import table and pagination comp
import {VTable,VPagination} from 'vue-easytable'

// Register to global
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
```

## Effect
![vue-easytable](./examples/images/vue-easytable.gif)

## License
http://www.opensource.org/licenses/mit-license.php





