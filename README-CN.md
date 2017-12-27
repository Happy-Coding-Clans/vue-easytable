[![npm](https://img.shields.io/npm/v/vue-easytable.svg)](https://www.npmjs.com/package/vue-easytable)
[![npm](https://img.shields.io/npm/l/vue-easytable.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)

# vue-easytable


## 介绍
基于 vue2.x 的table组件

## API & 实例(如果访问不了说明被墙了，我也很无奈......)
[API&实例](http://doc.huangsw.com/vue-easytable/app.html#/install)

## 功能
- [x] [自适应，可以随着浏览器窗口改变自动适应](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-simple-table-resize)
- [x] [固定列，表头固定](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-frozen-title-columns)  
- [x] [支持列宽拖动](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-column-width-drag)
- [x] [支持单个字段排序和多个字段排序](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-sort-by-single-columns)
- [x] [自定义列、自定义单元格样式](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-custom-columns)  
- [x] [loading效果、自定义loading 等](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-loading-and-error-content)
- [x] [自带分页组件](http://doc.huangsw.com/vue-easytable/app.html#/pagination)  
- [x] [单元格编辑](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-cell-edit-advanced)
- [x] [支持单元格合并 (colSpan and rowSpan)](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-cell-merge)
- [x] [支持 checkbox 多选功能](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-selection-advanced)
- [x] [footer 汇总功能](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-footer-summary)
- [ ] 添加导出 excel 功能  
- [ ] 添加导出 pdf 功能  
- [ ] 添加条件过滤功能  
- [ ] 添加行展开功能  
- [ ] 纵向整列拖动
   

## 安装

```javascript
npm install vue-easytable --save-dev
```

## 使用（[更多](http://doc.huangsw.com/vue-easytable/app.html)）


```javascript
// 导入 css
import 'vue-easytable/libs/themes-base/index.css'

// 导入 table 组件 和分页组件
import {VTable,VPagination} from 'vue-easytable'

// 将组件注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
```

> 你也可以 **[通过 cdn 使用](http://doc.huangsw.com/vue-easytable/app.html#/install)**

## 效果（不是全部）
**自适应、固定列，表头固定、支持列宽拖动、排序、分页**
![vue-easytable](./examples/images/vue-easytable.gif)

**支持单元格合并**
![vue-easytable](./examples/images/rowspan.png)

**单元格编辑**
![vue-easytable](./examples/images/edit.gif)

**支持 checkbox 多选功能**
![vue-easytable](./examples/images/selection.gif)

## 讨论组
通过添加微信进行群组讨论

![weixin](./examples/images/weixin.png)

## License
http://www.opensource.org/licenses/mit-license.php





