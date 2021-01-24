:::anchor API

### props

| 参数                   | 说明                                                     | 类型            | 可选值               | 默认值                     |
| ---------------------- | -------------------------------------------------------- | --------------- | -------------------- | -------------------------- |
| name                   | 加载效果类型名称                                         | `String`        | 见“Loading 集合”示例 | "plane"                    |
| target                 | DOM 对象 或 可以通过 document.querySelector 获取的字符串 | `Object|String` | -                    | -                          |
| fullscreen             | 是否全屏展示                                             | `Boolean`       | -                    | false                      |
| tip                    | 加载文案                                                 | `String`        | -                    | -                          |
| color                  | 加载图标的颜色                                           | `String`        | -                    | "#1890ff"                  |
| overlayBackgroundColor | 遮罩背景色                                               | `String`        | -                    | "rgba(255, 255, 255, 0.5)" |
| height                 | 加载图标的高度                                           | `String|Number` | -                    | 40                         |
| width                  | 加载图标的宽度                                           | `String|Number` | -                    | 40                         |

### methods

| 方法名称 | 说明                                       | 参数 |
| -------- | ------------------------------------------ | ---- |
| show     | 展示 Loading 效果                          | -    |
| close    | 关闭 Loading 效果                          | -    |
| destroy  | 默认关闭不会销毁，需要手动调用销毁 Loading | -    |
