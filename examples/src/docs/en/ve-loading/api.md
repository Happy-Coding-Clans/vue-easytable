:::anchor API

### props

| Property               | Description                                                                           | Type            | Optional value   | Default                    |
| ---------------------- | ------------------------------------------------------------------------------------- | --------------- | ---------------- | -------------------------- |
| name                   | Load effect type name                                                                 | `String`        | refer to example | "plane"                    |
| target                 | DOM object or string that can be obtained through <code>document.querySelector</code> | `Object|String` | -                | -                          |
| fullscreen             | Full screen display                                                                   | `Boolean`       | -                | false                      |
| tip                    | Loading text                                                                          | `String`        | -                | -                          |
| color                  | The color of the loading icon                                                         | `String`        | -                | "#1890ff"                  |
| overlayBackgroundColor | Mask background color                                                                 | `String`        | -                | "rgba(255, 255, 255, 0.5)" |
| height                 | The height of the loaded icon                                                         | `String|Number` | -                | 40                         |
| width                  | The width of the loading icon                                                         | `String|Number` | -                | 40                         |

### methods

| Methods | Description                                                                    | Parameters |
| ------- | ------------------------------------------------------------------------------ | ---------- |
| show    | Show the effect of loading                                                     | -          |
| close   | Turn off loading effect                                                        | -          |
| destroy | It will not be destroyed by default. You need to call destroy loading manually | -          |
