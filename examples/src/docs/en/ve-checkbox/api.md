<anchor label="API" />

### props

| 参数          | 说明                                     | 类型      | 可选值 | 默认值   |
| ------------- | ---------------------------------------- | --------- | ------ | -------- | --- | --- |
| value         | `v-model`绑定的值                        | `String   | Number | Boolean` | -   | -   |
| label         | checkbox label                           | `String`  | -      | -        |
| disabled      | 是否禁止选择                             | `Boolean` | -      | false    |
| indeterminate | 是否是半选                               | `Boolean` | -      | false    |
| isControlled  | 是否为可控组件，配合 `isSelected` 使用   | `Boolean` | -      | false    |
| isSelected    | 是否选中。当 isControlled 为 true 时生效 | `Boolean` | -      | false    |

### Event

| 事件名称          | 说明           | 回调参数  |
| ----------------- | -------------- | --------- |
| on-checked-change | 选中改变时回调 | isChecked |
