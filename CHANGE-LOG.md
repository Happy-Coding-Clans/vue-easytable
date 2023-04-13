Vx.x.x(TPL)

-   Breaking Changes
-   Feature
-   Bug Fixes
-   Performance Improvements
-   Style changes
-   Dependencies Changes

V2.26.0

### Feature

-   Add Korean language ko-KR （by @ClemOz-Dev ）

---

### Feature

-   新增韩语 ko-KR （by @ClemOz-Dev ）

V2.25.0

### Feature

-   New `beforeStartCellEditing` callback method for cell editing function

### Bug Fixes

-   Fix the bug that the addEventListener event handler function is empty #557 @Alfred-Skyblue

---

### Feature

-   单元格编辑功能新增`beforeStartCellEditing`回调方法

### Bug Fixes

-   修复 addEventListener 事件处理函数为空的问题 #557 @Alfred-Skyblue

V2.24.0

### Breaking Changes

-   The sorting click area is changed from 'icon' click area to the whole 'th' click area [407](https://github.com/Happy-Coding-Clans/vue-easytable/pull/407) @timefordroids

---

### Breaking Changes

-   排序的点击区域调整，从 `icon` 点击变更为整个 `th` 点击 [407](https://github.com/Happy-Coding-Clans/vue-easytable/pull/407) @timefordroids

V2.23.0

### Feature

-   add container scrolling class `ve-table-container-vertical-scrolling` When the table has vertical scrolling distance [#544](https://github.com/Happy-Coding-Clans/vue-easytable/pull/544) @looeyf @micheldpcarlos

---

### Feature

-   表格有垂直滚动距离时，添加容器滚动样式 `ve-table-container-vertical-scrolling`

V2.22.0

### Feature

-   Support disabling column resizing optional [#539](https://github.com/Happy-Coding-Clans/vue-easytable/issues/539) @micheldpcarlos

---

### Feature

-   支持禁用列宽拖动配置化 [#539](https://github.com/Happy-Coding-Clans/vue-easytable/issues/539) @micheldpcarlos

V2.21.11

### Bug Fixes

-   Fix the bug that the header is hidden due to batch hidden columns in the header right-click menu #538

---

### Bug Fixes

-   修复表头右键菜单批量隐藏列，导致表头隐藏的问题 #538

V2.21.9

### Bug Fixes

-   Fix the bug that the console warns "Resizer column needs set column width" when the column width dragging function is grouped in the header

---

### Bug Fixes

-   修复列宽拖动功能在表头分组时，控制台警告提示“Resizer column needs set column width”的问题

V2.21.8

### Breaking Changes

-   Change contextmenu type name of the header: CANCLE_LEFT_FIXED_COLUMN_TO -> CANCEL_LEFT_FIXED_COLUMN_TO

### Bug Fixes

-   Fix the bug that the column width restoring when cancel or fix the column through the right-click menu after dragging the column width

---

### Breaking Changes

-   修改表头右键菜单类型名称： CANCLE_LEFT_FIXED_COLUMN_TO -> CANCEL_LEFT_FIXED_COLUMN_TO

### Bug Fixes

-   修复列宽拖动后，通过右键菜单取消或者固定列时，列宽还原的问题

V2.21.7

### Bug Fixes

-   Fix the bug that cell selection is enabled in the parent table and cell text cannot be selected in the child table by default when nested child tables
-   Fix the bug that the parent table height jitter after expanding when nested sub tables #453

---

### Bug Fixes

-   修复嵌套子表格时，父表格开启了单元格选择，子表格默认无法选中单元格文字的问题
-   修复嵌套子表格时，展开后父级表格高度抖动的问题 #453

V2.21.6

### Bug Fixes

-   Fix the bug that the border of the table column is occasionally disappeared

---

### Bug Fixes

-   修复表格的边框偶尔消失的问题

V2.21.5

### Performance Improvements

-   Reconstruct the column resize feature, and automatically adapt when the column width is insufficient [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/column-resize?anchor=column-drag)

### Breaking Changes

-   Remove the `tableWidth` parameter of the `columnWidthResizeOption` callback function `sizeChange`

---

### Performance Improvements

-   重构列宽拖动功能，当列宽不够时自动自适应 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/column-resize)

### Breaking Changes

-   移除 `columnWidthResizeOption` 回调函数 `sizeChange`的 `tableWidth` 参数

V2.21.3

### Style changes

-   Add theme vars [default theme file](https://github.com/Happy-Coding-Clans/vue-easytable/blob/master/packages/theme-default/var.less#L6) 、 [theme dark file](https://github.com/Happy-Coding-Clans/vue-easytable/blob/master/packages/theme-dark/var.less#L7) #463
    -   @ve-fixed-body-cell-index
    -   @ve-fixed-cell-selection-border-index
    -   @ve-fixed-cell-selection-corner-index
    -   @ve-fixed-header-index
    -   @ve-fixed-foot-index
    -   @ve-fixed-header-cell-index
    -   @ve-fixed-foot-cell-index

---

-   添加主题变量 [default theme 文件](https://github.com/Happy-Coding-Clans/vue-easytable/blob/master/packages/theme-default/var.less#L6) 、 [theme dark 文件](https://github.com/Happy-Coding-Clans/vue-easytable/blob/master/packages/theme-dark/var.less#L7) #463
    -   @ve-fixed-body-cell-index
    -   @ve-fixed-cell-selection-border-index
    -   @ve-fixed-cell-selection-corner-index
    -   @ve-fixed-header-index
    -   @ve-fixed-foot-index
    -   @ve-fixed-header-cell-index
    -   @ve-fixed-foot-cell-index

V2.21.2

### Style changes

-   Add theme vars
    -   @ve-table-column-resizer-handler-background-color
    -   @ve-table-column-resizer-line-background-color

---

-   添加主题变量
    -   @ve-table-column-resizer-handler-background-color
    -   @ve-table-column-resizer-line-background-color

### Style changes

V2.21.1

### Bug Fixes

-   Fix the bug that table is repeatedly rendered due to the column resize

---

### Bug Fixes

-   修复因列宽拖动功能导致表格一直重复渲染的问题

V2.21.0

### Feature

-   Add column resize feature [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/column-resize)

---

### Feature

-   支持列宽拖动功能 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/column-resize)

V2.20.2

### Bug Fixes

-   Fix the bug that cell selection can't selected all by click header cell

---

### Bug Fixes

-   修复了单元格选择无法通过单击标题全部选中的问题

V2.19.1

### Bug Fixes

-   修复表格自定义筛选面板无法关闭的问题 #505

---

-   Fix the bug that the table custom filter panel could not be closed #505

### Bug Fixes

V2.19.0

### Feature

-   Table filter - Add callback method `beforeVisibleChange({nextVisible})` #504 [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/header-filter?anchor=api)
-   Table custom filter - Add callback method `beforeVisibleChange({nextVisible})` #504 [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/header-filter-custom?anchor=api)
-   Cell Selection - Add instance method `getRangeCellSelection()` #502 [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/instance-methods?anchor=api)

---

### Feature

-   表格筛选功能-新增 `beforeVisibleChange({nextVisible})` 回调函数 #504 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/header-filter?anchor=api)
-   表格自定义筛选功能-新增 `beforeVisibleChange({nextVisible})` 回调函数 #504 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/header-filter-custom?anchor=api)
-   单元格选择功能-新增获取当前选择区域的实例方法 `getRangeCellSelection()` #502 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/instance-methods?anchor=api)

### Feature

V2.19.1

### Bug Fixes

-   Fix the bug that after the header column is selected, the right click item in the non header selected area of the right-click menu is incorrect

---

### Bug Fixes

-   修复表头列选中后，右键菜单非头部的选中区域右键项不正确的问题

V2.19.0

### Breaking Changes

-   Modify the non Chinese text in the right-click menu of the table, and convert the first lower case letter to upper case letter
-   Contextmenu of table, remove callback function `callback({type, selection})` replace with `afterMenuClick({ type, selectionRangeKeys, selectionRangeIndexes })` [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/contextmenu)

### Feature

-   Cell selection [detail](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection)

    -   Add multi column selection feature
    -   Add multi row selection feature
    -   Cell selection feature, adding header and column indicator effects
    -   Cell selection feature, add range selection instance method `setRangeCellSelection({ startRowKey,startColKey,endRowKey,endColKey,isScrollToStartCell })`
    -   Cell selection feature, add cell select all instance method`setAllCellSelection()` [detail](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection)

-   Table contextmenu [detail](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/contextmenu)

    -   Add table header contextmenu
    -   Add table body contextmenu
    -   Add table body contextmenu callback `beforeShow({ isWholeRowSelection, selectionRangeKeys, selectionRangeIndexes, })`
    -   Add theme vars
        -   @ve-table-head-indicator-active-text-color
        -   @ve-table-body-indicator-active-text-color
        -   @ve-table-header-cell-indicator-active-background-color
        -   @ve-table-body-cell-indicator-active-background-color

-   Contextmenu comp adds instance method `hideContextmenu()`

### Bug Fixes

-   Fixed the problem that the menu could not be expanded and collapsed after the right menu expansion node was clicked

---

### Breaking Changes

-   修改表格右键菜单的非中文文字，将开头小写字母转大写字母
-   表格右键菜单功能，移除回调函数`callback({type, selection})` 使用`afterMenuClick({ type, selectionRangeKeys, selectionRangeIndexes })`替代 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/contextmenu)

### Feature

-   单元格选择功能 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection)

    -   添加多列选择功能
    -   添加多行选择功能
    -   单元格选择功能，添加表头和列指示器效果
    -   单元格选择功能，添加区域选择实例方法 `setRangeCellSelection({ startRowKey,startColKey,endRowKey,endColKey,isScrollToStartCell })`
    -   单元格选择功能，添加单元格全选实例方法`setAllCellSelection()` [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection)

-   表格右键菜单功能 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/contextmenu)
    -   表格 header 添加右键菜单功能
    -   表格 body 右键菜单功能增强
    -   表格 body 右键菜单功能添加回调方法 `beforeShow({ isWholeRowSelection, selectionRangeKeys, selectionRangeIndexes, })`
    -   右键菜单组件添加`hideContextmenu()`实例方法
    -   添加主题变量
        -   @ve-table-head-indicator-active-text-color
        -   @ve-table-body-indicator-active-text-color
        -   @ve-table-header-cell-indicator-active-background-color
        -   @ve-table-body-cell-indicator-active-background-color

### Bug Fixes

-   修复右侧菜单展开节点被点击后，菜单无法展开折叠的问题

V2.18.3

### Bug Fixes

-   修复非虚拟滚动表格，移除列时控制台报错的问题

---

### Bug Fixes

-   Fixed the bug that the console of non virtual scrolling hidden columns report errors

V2.18.2

### Bug Fixes

-   修复单元格自动填充，当停止在起始单元格后报错的问题

---

### Bug Fixes

-   Fixed the bug that cell autofilling error when stoppped at the starting cell

V2.18.0

### Breaking Changes

-   Remove `virtualScrollOption.bufferCount` prop

### Feature

-   Add header hidden feature [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/header-hidden) #495
-   Add cell selection supports batch cell selection feature [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-selection)
-   Add operation column feature [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/operation-column)
-   Add cell autofill feature [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-autofill)
-   Add clipboard feature [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/clipboard)
    -   Add cell batch copy
    -   Add cell batch paste
    -   Add cell batch cut
    -   Add cell batch delete
-   Add cell edit callback method: `beforeCellValueChange`、`afterCellValueChange`[detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-edit)
-   body、header、footer add mousemove、mouseover、mousedown、mouseup custom events [detail](https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/event-custom)
-   Add `virtualScrollOption.bufferScale` virtual scroll buffer scale prop
-   Add theme css variables
    -   @ve-table-td-editing-font-color
    -   @ve-table-td-editing-background-color
    -   @ve-table-td-editing-box-shadow-color
    -   @ve-table-selection-border-color
    -   @ve-table-selection-autofill-border-color
    -   @ve-table-selection-corner-border-color
    -   @ve-table-selection-corner-background-color
    -   @ve-table-selection-area-layer-background-color

---

### Breaking Changes

-   移除 `virtualScrollOption.bufferCount` 虚拟滚动缓冲数量 prop

### Feature

-   添加隐藏表头功能 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/header-hidden) #495
-   单元格选择支持批量单元格选择 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-selection)
-   添加操作列功能 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/operation-column)
-   添加单元格自动填充功能 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-autofill)
-   添加剪贴板功能 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/clipboard)
    -   添加单元格批量复制功能
    -   添加单元格批量粘贴功能
    -   添加单元格批量剪切功能
    -   添加单元格批量删除功能
-   添加单元格编辑回调方法 `beforeCellValueChange` 和 `afterCellValueChange` [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/cell-edit)
-   body、header、footer 新增 mousemove、mouseover、mousedown、mouseup 自定义事件 [详情](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/table/event-custom)
-   添加 `virtualScrollOption.bufferScale` 虚拟滚动缓冲倍数 props
-   添加主题变量
    -   @ve-table-td-editing-font-color
    -   @ve-table-td-editing-background-color
    -   @ve-table-td-editing-box-shadow-color
    -   @ve-table-selection-border-color
    -   @ve-table-selection-autofill-border-color
    -   @ve-table-selection-corner-border-color
    -   @ve-table-selection-corner-background-color
    -   @ve-table-selection-area-layer-background-color

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
