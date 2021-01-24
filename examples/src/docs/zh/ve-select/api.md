<anchor label="API" />

### props

| 参数        | 说明              | 类型      | 可选值 | 默认值   |
| ----------- | ----------------- | --------- | ------ | -------- |
| width       | 宽度              | `Number`  | -      | 90       |
| maxWidth    | 最大宽度          | `Number`  | -      | -        |
| isMultiple  | 是否是多选下拉    | `Boolean` | -      | false    |
| value       | `v-model`绑定的值 | `Array`   | -      | -        |
| placeholder | placeholder 文本  | `String`  | -      | "请选择" |
| textAlign   | 文本居中方式      | `String`  | -      | "left"   |
| isInput   | 是否支持输入input      | `Boolean`  | -      | false   |

### Event

| 事件名称          | 说明                 | 回调参数 |
| ----------------- | -------------------- | -------- |
| on-select-change | 选择项改变事件 | options  |
