[![npm](https://img.shields.io/npm/v/vue-easytable.svg)](https://www.npmjs.com/package/vue-easytable)
[![npm](https://img.shields.io/npm/l/vue-easytable.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)

# vue-easytable

[切换中文](https://github.com/huangshuwei/vue-easytable/blob/master/README-CN.md)


## Introduction
Based on vue2.x flexible table components.

## API & Examples(如果访问不了说明被墙了，我也很无奈......)
[API&Examples](http://doc.huangsw.com/vue-easytable/app.html#/install)

## Features
- [x] [Adaptive, you can automatically adapt to the browser window changes](http://doc.huangsw.com/vue-easytable/app.html#/table/horizontalResize)
- [x] [Fixed column, header fixed](http://doc.huangsw.com/vue-easytable/app.html#/table/fixedColumnsTitle)  
- [x] [Support column width drag](http://doc.huangsw.com/vue-easytable/app.html#/table/columnWidthDrag)
- [x] [Supports single field sorting and multiple field sorting](http://doc.huangsw.com/vue-easytable/app.html#/table/sort)
- [x] [Custom columns, custom cell styles](http://doc.huangsw.com/vue-easytable/app.html#/table/cellStyle)
- [x] [Loading effects, custom loading, etc](http://doc.huangsw.com/vue-easytable/app.html#/table/loading)
- [x] [Own paging component](http://doc.huangsw.com/vue-easytable/app.html#/pagination)
- [x] [Cell Editing](http://doc.huangsw.com/vue-easytable/app.html#/table/cellEdit)
- [x] [Support cell merge (colSpan and rowSpan)](http://doc.huangsw.com/vue-easytable/app.html#/table/cellMerge)
- [x] [Support checkbox selection](http://doc.huangsw.com/vue-easytable/app.html#/table/selection)  
- [x] [Footer summary](http://doc.huangsw.com/vue-easytable/app.html#/table/footerSummary)
- [x] [Conditional filter](http://doc.huangsw.com/vue-easytable/app.html#/table/conditionFilters)
- [ ] Export excel
- [ ] Export PDF
- [ ] Row expansion
- [ ] Vertical column drag
   

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

> also you can use it **[by cdn](http://doc.huangsw.com/vue-easytable/app.html#/install)**


## Discussion group
Group discussion by adding WeChat

![weixin](./examples/images/weixin.png)

## License
http://www.opensource.org/licenses/mit-license.php





