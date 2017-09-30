[![npm](https://img.shields.io/npm/v/vue-easytable.svg)](https://www.npmjs.com/package/vue-easytable)
[![npm](https://img.shields.io/npm/l/vue-easytable.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)

# vue-easytable


## 介绍
基于 vue2.x 的table组件

## API & 实例
[API&实例](http://doc.huangsw.com/vue-easytable/app.html#/table)

## 功能
1. [自适应，可以随着浏览器窗口改变自动适应](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-simple-table-resize)
2. [固定列，表头固定](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-frozen-title-columns)  
3. [默认支持列宽拖动](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-basic-no-table-width)
4. [支持单个字段排序和多个字段排序](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-sort-by-single-columns)
5. [自定义列、自定义单元格样式](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-custom-columns)  
6. [loading效果、自定义loading 等](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-loading-and-error-content)
7. [自带分页组件](http://doc.huangsw.com/vue-easytable/app.html#/pagination)  
8. [单元格编辑](http://doc.huangsw.com/vue-easytable/app.html#/table?anchor=table-cell-edit)
   

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

## 效果（不是全部）
![vue-easytable](./examples/images/vue-easytable.gif)

## ToDo

- [x] [添加单元格编辑功能](https://github.com/huangshuwei/vue-easytable/releases/tag/1.2.1) 
- [x] [支持单元格 colSpan 和 rowSpan](https://github.com/huangshuwei/vue-easytable/releases/tag/1.3.0)
- [ ] 添加 checkbox 多选功能  
- [ ] 添加 footer 功能  
- [ ] 添加导出 excel 功能  
- [ ] 添加导出 pdf 功能  
- [ ] 添加条件过滤功能  
- [ ] 添加行展开功能  
- [ ] 纵向整列拖动


## License
http://www.opensource.org/licenses/mit-license.php





