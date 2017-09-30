
### Table props
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| width | table 宽度 | number | — | — |
| min-width | table 最小宽度（当表格自适应时） | number |  —  |  —  |
| height | table 高度 | number | — | — |
| min-height | table最小高度（当表格自适应时生效`resize()`） | - | — | — |
| title-row-height | 表头行高 | number | — | 38px |
| is-horizontal-resize | 是否开启横向自适应（开启后会随着窗口改变而改变、根据表格宽度自动填充），注意需要设置`style="width:100%"` | boolean | — | false |
| is-vertical-resize | 是否开启纵向自适应（开启后会随着窗口改变而改变、根据表格高度自动填充）| boolean | — | false |
| vertical-resize-offset | 垂直自适应的偏移量，一般是表格下方有分页时会用到，使其成为自适应的一部分 | number | — | - |
| title-bg-color | 表头背景颜色 | string | — | #fff |
| odd-bg-color | 表格体奇数行颜色 | string | — | #fff |
| even-bg-color |表格体偶数行颜色 | string | — | #fff |
| row-height | 表格体行高 | string | — | 40px |
| multiple-sort | 是否开启多列排序| boolean | — | true |
| table-data | 表格数据集合 | - | — | array |
| columns | 列的集合。具体参考columns | array | — | — |
| title-rows | 复杂表头集合，只有复杂表头时用到。具体参考titleRows | array | — | — |
| paging-index | 当前分页序号，结合分页需要显示在表格内时（一般是分页的行号） | number | — | — |
| error-content | 表体没数据时显示的内容 | html/string | — | ’暂无数据‘ |
| error-content-height | 表体没数据时区域高度 | number | — | 50px |
| is-loading |  是否正在加载,异步请求结束要显示的设置false | boolean | — | false |
| loading-content | 加载时的内容 | html/string | — | loading 效果 |
| row-hoverColor | 表格体行浮动背景色 | string | — | - |
| row-click-color | 表格体行点击后的背景色（行高亮） | string | — | — |
| show-vertical-border | 是否显示垂直border,false 时列拖动失效 | boolean | — | true |
| show-horizontal-border | 是否显示横向border | boolean | — | true |


### columns（Table props）
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| field | 对应列的字段 | string | — | — |
| title | 列头显示文字 | string | — | — |
| width | 每一列的宽度，列设置横向自适应`is-horizontal-resize:true`时，必须要设置值 |number  | — | — |
| titleAlign | 表头列内容对齐方式 | string | left/center/right | — |
| columnAlign | 标体列内容对齐方式 | string | left/center/right | — |
| formatter | 用来格式化内容 | Function(rowData,rowIndex,pagingIndex,field) | — | — |
| componentName | 自定义列传入组件的名字 | string | — | — |
| titleCellClassName| 表头单元格设置className | string | — | — |
| isFrozen | 此列是否要固定 | boolean | — | false |
| isResize | 此列是否要自适应，前提是设置了`is-horizontal-resize:true` |  boolean| — | false |
| orderBy | 排序规则 | string | asc/desc | — |
| isEdit | 是否启用单元格编辑 | boolean | — | false |

### title-rows（Table props）
只处理复杂表头信息时用到。需要配置 `columns` 一起使用，具体用法参考复杂表头实例
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| fields | 此列跨几个字段 | array | — | — |
| title | 列头显示文字，`columns` 中不用配置 | string | — | — |
| titleAlign | 表头列内容对齐方式，`columns` 中不用配置 | string  | — | — |
| rowspan | 合并行的数目 | number | — | — |
| colspan | 合并列的数目 | number | — | — |
| orderBy | 排序规则，`columns` 中不用配置 | string | asc/desc  | — |
| titleCellClassName | 表头单元格设置className | string | — | — |


### Table Event
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| on-row-click | 行点击回调 | rowIndex, rowData, field |
| row-mouse-enter|  鼠标进入表体行的回调| rowIndex |
| row-mouse-leave|  鼠标离开表体行的回调| rowIndex |
| sort-change|  点击排序回调| sortColumns（排序的列对象信息） |
| cell-edit-formatter|  单元格编辑格式化回调（可以对编辑的结果设置样式等）|  newValue,oldValue,rowIndex,rowData,field|
| cell-edit-done|  单元格编辑完成回调|  newValue,oldValue,rowIndex,rowData,field|
| cell-merge|  单元格合并，支持rowSpan、colSpan,返回值`{colSpan: 1,rowSpan: 1,content: '',componentName: ''}`；合并后单元格的内容可以通过`content`（html）设置也可以通过,`componentName`（自定义组件）设置| rowIndex,rowData,field|



### Table Methods
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| resize| 强制自适应（当表格有显示隐藏切换时需要用到） | — |