:::anchor API

### props

| Property       | Description                                                                 | Type     | Optional value                                        | Default                                               |
| -------------- | --------------------------------------------------------------------------- | -------- | ----------------------------------------------------- | ----------------------------------------------------- |
| layout         | Layout settings can be matched according to your own business scenarios     | `Array`  | ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'] | ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'] |
| total          | Total Count                                                                 | `Number` | -                                                     | -                                                     |
| pageIndex      | Current page number                                                         | `Number` | -                                                     | 1                                                     |
| pagingCount    | The number of buttons in the middle of forward 5 pages and backward 5 pages | `Number` | -                                                     | 5                                                     |
| pageSize       | Page size                                                                   | `Number` | -                                                     | 10                                                    |
| pageSizeOption | Per page size drop-down configuration                                       | `Array`  | -                                                     | [10, 20, 30]                                          |

### Event

| Event Name            | Description                        | Parameters          |
| --------------------- | ---------------------------------- | ------------------- |
| on-page-number-change | Page change callback event         | Current page number |
| on-page-size-change   | Page size dropdown change callback | Current page size   |
