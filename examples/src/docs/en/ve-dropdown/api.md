<anchor label="API" />

### props

| 参数                               | 说明                                                      | 类型       | 可选值 | 默认值 |
| ---------------------------------- | --------------------------------------------------------- | ---------- | ------ | ------ |
| isSelect                           | 是否供 select 组件使用                                    | `Boolean`  | -      | false  |
| showOperation                      | 展示操作按钮                                              | `Boolean`  | -      | false  |
| width                              | 下拉组件最小宽度                                          | `Number`   | -      | 90     |
| maxWidth                           | 下拉组件最大宽度                                          | `Number`   | -      | 1000   |
| isMultiple                         | 是否是多选下拉                                            | `Boolean`  | -      | false  |
| value                              | v-model 输入值                                            | `Array`    | -      | -      |
| textAlign                          | 下拉项居中方式                                            | `String`   | -      | "left" |
| isInput                            | 是否包含 input                                            | `Boolean`  | -      | false  |
| confirmFilterText                  | 确认按钮文本                                              | `String`   | -      | -      |
| resetFilterText                    | 重置按钮文本                                              | `String`   | -      | -      |
| hideByItemClick                    | 点击选项时，是否隐藏下拉框                                | `Boolean`  | -      | false  |
| showRadio                          | 是否展示 radio，当是单选时生效                            | `Boolean`  | -      | false  |
| visible                            | 下拉框是否展示，当 isControlled=true 生效                 | `Boolean`  | -      | false  |
| isControlled                       | 是否是可控组件                                            | `Boolean`  | -      | false  |
| isCustomContent                    | 是否自定义下拉内容                                        | `Boolean`  | -      | false  |
| instance                           | 下拉面板和触发元素的距离                                  | `Number`   | -      | 12     |
| beforeVisibleChange({nextVisible}) | 显示状态变更之前的回调方法，返回`false`则阻止显示状态变更 | `Function` | -      | 12     |

### Event

| 事件名称                   | 说明                 | 回调参数  |
| -------------------------- | -------------------- | --------- |
| on-item-select-change      | 选项改变时触发的事件 | options   |
| on-filter-confirm          | 点击确认按钮时的回调 | options   |
| on-filter-reset            | 点击重置按钮时的回调 | options   |
| on-dropdown-visible-change | 下拉显示切换回调     | isVisible |
