Vx.x.x(TPL)

-   Breaking Changes
-   Feature
-   Bug Fixes
-   Performance Improvements
-   Style
-   Dependencies Changes

V2.10.2

### Bug Fixes

-   修复虚拟滚动表格展开表格导致浏览器崩溃的问题 #414
-   修复固定列效果在横向滚动时不生效的问题
-   修复单元格整行编辑开启后，当前编辑行的焦点无法改变的问题

V2.10.1

### Performance Improvements

-   虚拟滚动渲染性能优化
    -   快速滚动中，如拖动滚动条时只渲染占位符
    -   将表格单元格计算的 style、class 改为 body 中统计计算
-   内存占用优化。内存减少 45% 左右
    -   弃用 deepClone 表格数据

V2.10.0

### Feature

-   新增单元格编辑功能

### Bug Fixes

-   修复单元格数据更改，单元格没有重新渲染的问题
-   修复当同时使用多个 table 组件，行展开内容宽度互相干扰的问题（Vue.observable 的影响）

V2.9.1

### Bug Fixes

-   修复分页组件向前 5 页乱码的问题 #408

V2.9.0

### Feature

-   添加设置行高亮的`setHighlightRow`实例方法。[参考示例]()

V2.8.3

### Bug Fixes

-   修复表格显示隐藏切换，右列固定效果消失的问题 #404

V2.8.2

### Bug Fixes

-   修复行 key 为 0 时，行高亮失效的问题

V2.8.1

### Bug Fixes

-   修复当数据为空时，虚拟滚动功能滚动条高度没有还原的问题 #403

V2.8.0

### Feature

-   编译支持 IE11 浏览器

V2.7.1

### Bug Fixes

-   修复设置了禁止选中，点击全选仍然会选中的问题 #397

V2.7.0

### Breaking Changes

-   调整了虚拟滚动功能默认最小行高度。由 “42px” 改为了 “40px”，你可以通过`minRowHeight`属性控制

### Feature

-   添加 scrollToRowKey 实例方法

### Bug Fixes

-   修复虚拟滚动功能最小高度 `minRowHeight`值与表格行高一样，滚动条高度没撑开的问题
-   修复虚拟滚动功能，浏览器窗口大小改变表格白屏的问题
-   修复长时间键盘操作（keycode 38 = Up）导致选中框消失的的问题

### Performance Improvements

-   优化虚拟滚动功能渲染速度。使用非响应式变量替代
-   优化虚拟滚动功能缓冲策略。将缓冲倍数改为缓冲行数
