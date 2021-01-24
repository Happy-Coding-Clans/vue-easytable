<anchor label="API" />

### props

| 参数         | 说明                                     | 类型      | 可选值 | 默认值 |
| ------------ | ---------------------------------------- | --------- | ------ | ------ |
| value        | `v-model` 绑定的值                       | `Boolean` | -      | false  |
| disabled     | 禁用选择                                 | `Boolean` | -      | false  |
| label        | label                                    | `String`  | -      | -      |
| isControlled | 是否为可控组件，配合 `isSelected` 使用   | `Boolean` | -      | false  |
| isSelected   | 是否选中。当 isControlled 为 true 时生效 | `Boolean` | -      | false  |

### Event

| 事件名称        | 说明         | 回调参数  |
| --------------- | ------------ | --------- |
| on-radio-change | 选择切换事件 | isChecked |
