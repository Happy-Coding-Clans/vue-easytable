[![npm](https://img.shields.io/npm/v/vue-easytable.svg)](https://www.npmjs.com/package/vue-easytable)
[![npm](https://img.shields.io/npm/l/vue-easytable.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)

# vue-easytable


## Introduction
Based on vue2.x flexible table components.

## API & Examples
[API&Examples](http://doc.huangsw.com/vue-easytable/app.html)

## Features
1. [自适应，可以随着浏览器窗口改变自动适应](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-simple-table-resize)
2. [固定列，表头固定](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-frozen-title-columns)  
3. [默认支持列宽拖动](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-basic-no-table-width)
4. [支持单个字段排序和多个字段排序](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-sort-by-single-columns)
5. [自定义列、自定义单元格样式](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-custom-columns)  
6. [loading效果、自定义loading 等](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-loading-and-error-content)
7. [自带分页组件](http://doc.huangsw.com/vue-easytable/app.html#/pagination)  
8. [单元格编辑](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-cell-edit)
   

## Install

```javascript
npm install vue-easytable --save-dev
```

## Usage（[more usage](http://doc.huangsw.com/vue-easytable/app.html)）


```javascript
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

## ToDo

- 添加单元格编辑功能   
  Add cell editing
- 添加 checkbox 多选功能  
  Add the checkbox multiple selection
- 添加 footer 功能  
  Add the footer
- 添加导出 excel 功能  
  Add the export excel
- 添加导出 pdf 功能  
  Add the export pdf
- 添加条件过滤功能  
  Add conditional filtering
- 添加行展开功能  
  Add line expansion


## License
http://www.opensource.org/licenses/mit-license.php





