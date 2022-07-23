Vx.x.x(TPL)

-   Breaking Changes
-   Feature
-   Bug Fixes
-   Performance Improvements
-   Style changes
-   Dependencies Changes

V2.18.0

### Breaking Changes

-   移除 `virtualScrollOption.bufferCount` 虚拟滚动缓冲数量 props

### Feature

-   事件自定义 body、header、footer 新增 mousemove、mouseover、mousedown、mouseup 事件
-   添加 `virtualScrollOption.bufferScale` 虚拟滚动缓冲倍数 props
-   `cellSelectionOption` add props `autofillChange`
-   add operation column
-   add theme vars @ve-table-td-editing-font-color、@ve-table-td-editing-background-color
-   添加单元格批量复制功能
-   添加单元格批量粘贴功能
-   添加单元格批量剪切功能

### Bug Fixes

-   修复虚拟滚动过快，编辑单元格消失的问题

V2.17.3

### Bug Fixes

-   Fix the bug that page number jump is not updated #483
-   Fix the bug that the edit cell position display error when drag scroll bar #485

---

### Bug Fixes

-   修复分页组件跳转页码没有更新的问题 #483
-   修复拖动滚动条导致编辑单元格显示位置不正确的问题 #485

V2.17.2

### Bug Fixes

-   Fix the bug that the contextment panel can't' be displayed after the dynamic modification of the contextment option
-   Fix the bug that incorrect positioning of edit text box in some browsers (QQ, Safari, etc.)

---

### Bug Fixes

-   修复右键菜单配置动态修改后，右键菜单功无法显示的问题
-   修复在部分浏览器（QQ、Safari 等）编辑文本框定位不准确的问题

V2.16.3

### Bug Fixes

-   Fix the bug that the right-click menu is combined with cell editing. After deleting a row, the header will disappear #477
-   Fix the bug that dynamically turn on or off virtual scrolling, table rendering error #478

---

### Bug Fixes

-   修复开启单元格编辑功能，当最后一行数据被删除，表头消失的问题 #477
-   修复动态开启或关闭虚拟滚动，表格渲染异常的问题 #478

V2.16.2

### Bug Fixes

-   Fix the bug that the filter custom layer could not be closed

---

### Bug Fixes

-   修复筛选自定义弹层无法关闭的问题

V2.16.1

### Bug Fixes

-   Fix the bug that the virtual list cannot scroll to the last row by `scrollToRowKey` #470
-   Fix the bug that the first Chinese cannot match after entering Pinyin after clicking on the cell

---

### Bug Fixes

-   修复虚拟滚动列表无法通过实例方法`scrollToRowKey`滚动到底部的问题 #470
-   修复单元格点击后，输入拼音后第一个中文无法匹配的问题

V2.16.0

### Feature

-   Add new instance method `scrollToColKey({colKey})` [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/instance-methods?anchor=scrolltocolkey-column-scroll-method)
-   Add new instance method `setCellSelection({rowKey,colKey})` [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-selection?anchor=cell-selection-instance-method)
-   Cell selection by click, and the hidden row will be automatically displayed in the visible range [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-selection?anchor=basic-usage)

### Bug Fixes

-   Fix the bug that multiple tables have fixed columns, and only one is effective #467
-   Fix the bug that multiple right-click menu component options are suspended and only one takes effect

---

### Feature

-   新增列滚动实例方法 `scrollToColKey({colKey})` [查看详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/instance-methods?anchor=scrolltocolkey-lie-gun-dong-fang-fa)
-   新增单元格选中实例方法 `setCellSelection({rowKey,colKey})` [查看详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection?anchor=dan-yuan-ge-xuan-zhong-shi-li-fang-fa)
-   单元格点击选择，自动将隐藏的行内容显示在可视范围 [查看详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection?anchor=ji-ben-yong-fa)

### Bug Fixes

-   修复多个表格包含固定列功能，只有一个生效的问题 #467
-   修复多个右键菜单选项悬浮，只有一个生效的问题

V2.15.0

### Feature

-   Pagination add new prop of `popperAppendTo`. [Details]()
-   Virtual scroll add new prop of `bufferCount`

### Bug Fixes

-   Fix the bug that Pagination component drop-down option popper layer position error #464
-   Fix the bug that Virtual scrolling merges to many rows, and the columns will be misaligned after scrolling up and down #458

---

### Feature

-   分页组件新增属性 `popper-append-to`. [查看详情]()
-   虚拟滚动添加新属性`bufferCount`

### Bug Fixes

-   修复分页组件下拉选项弹层定位不准确的问题 #464
-   修复虚拟滚动存在大量行合并时，上下滚动数据显示有误的问题 #458

V2.14.3

### Performance Improvements

-   优化表格渲染逻辑（使用防抖 debounce），提升表格渲染速度

### Bug Fixes

-   修复 keep-alive 对包含固定列的排序不生效的问题 #454

V2.14.1

### Bug Fixes

-   修复表头分组筛选下拉框会被遮盖 #455

### Style changes

-   添加下拉组件样式变量 @ve-dropdown-z-index
-   修改表格过滤条件底部操作按钮的布局，改为两侧的间隔相等(justify-content: space-around)

V2.12.3

### Bug Fixes

-   修复多个虚拟滚动表格实例互相干扰的问题 #429
-   修复表格最后一行高度多出 2px 的问题

V2.12.2

### Style changes

-   添加行展开主题变量 @ve-table-body-row-expand-content-padding
-   去除样式的 padding 和 margin，避免样式的侵入（比如结合 element-ui 相关组件）

V2.12.1

### Bug Fixes

-   修复单元格编辑功能，不可编辑单元格双击后方向键无法移动活动单元格的问题

V2.12.0

### Breaking Changes

-   单元格编辑功能非兼容性更新

    -   废弃单元格整行编辑功能
    -   废弃单击进入编辑状态
    -   废弃 `Enter`键切换单元格编辑状态
    -   废弃参数 `stopEditingWhenCellLoseFocus`
    -   废弃属性 `textSelectedWhenCellFocus`
    -   废弃示例方法 `stopAllEditingCell `
    -   去除实例方法 `stopEditingCell` 的参数

### Feature

-   单元格选择功能

    -   支持 `Enter`键向下移动活动单元格
    -   支持 `Shift + Enter`键向上移动活动单元格
    -   支持 `Tab`键向右移动活动单元格
    -   支持 `Shift + Tab`键向左移动活动单元格
    -   支持单元格点击进入可见区域（被固定列遮挡时）

-   单元格编辑功能

    -   支持 `F2`键活动单元格进入编辑状态
    -   支持 `Ctrl + Enter`键停止编辑状态，并停留在当前单元格
    -   支持 `Alt + Enter`键单元格内文本换行
    -   支持 `Delete`键清空活动单元格内容
    -   支持 `BackSpace`键清空活动单元格内容，并进入编辑状态
    -   支持 `Space`键清空活动单元格内容填入空格
    -   支持 `Enter`键停止编辑状态并键向下移动活动单元格
    -   支持 `Tab`键停止编辑状态并向右移动活动单元格
    -   支持 `Shift + Tab`键停止编辑状态并向左移动活动单元格
    -   支持在可编辑单元格直接输入文本并进入编辑状态
    -   支持长文本输入时，编辑框自动伸缩功能

### Style

-   修改外边框作用的元素，设置 border-radius 更简单
-   新增主题变量 @ve-table-column-fixed-border-color
-   新增主题变量 @ve-table-td-editing-line-height

V2.11.0

### Feature

-   添加列隐藏功能
    -   使用 `defaultHiddenColumnKeys` 设置默认隐藏列
    -   使用实例方法 `hideColumnsByKeys(keys)` 将列隐藏
    -   使用实例方法 `showColumnsByKeys(keys)` 将隐藏的列显示

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
