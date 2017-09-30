[![npm](https://img.shields.io/npm/v/vue-easytable.svg)](https://www.npmjs.com/package/vue-easytable)
[![npm](https://img.shields.io/npm/l/vue-easytable.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)

# vue-easytable

[切换中文](https://github.com/huangshuwei/vue-easytable/blob/master/README-CN.md)


## Introduction
Based on vue2.x flexible table components.

## API & Examples
[API&Examples](http://doc.huangsw.com/vue-easytable/app.html#/table)

## Features
1. [Adaptive, you can automatically adapt to the browser window changes](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-simple-table-resize)
2. [Fixed column, header fixed](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-frozen-title-columns)  
3. [Support column width drag](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-basic-no-table-width)
4. [Supports single field sorting and multiple field sorting](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-sort-by-single-columns)
5. [Custom columns, custom cell styles](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-custom-columns)
6. [Loading effects, custom loading, etc](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-loading-and-error-content)
7. [Own paging component](http://doc.huangsw.com/vue-easytable/app.html#/pagination)
8. [Cell Editing](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-cell-edit)
9. [Support cell merge (colSpan and rowSpan)](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-cell-merge)
   

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

- [x] [Cell editing](https://github.com/huangshuwei/vue-easytable/releases/tag/1.2.1)
- [x] [Support cell colSpan and rowSpan](https://github.com/huangshuwei/vue-easytable/releases/tag/1.3.0)
- [ ] Support checkbox selection  
- [ ] Add footer
- [ ] Export excel
- [ ] Export PDF
- [ ] Conditional filter
- [ ] Row expansion
- [ ] Vertical column drag


## License
http://www.opensource.org/licenses/mit-license.php





