:::anchor API

### props

| Property    | Description                                                                              | Type         | Optional value | Default |
| ----------- | ---------------------------------------------------------------------------------------- | ------------ | -------------- | ------- | --- |
| eventTarget | Sets the element triggered by the contextmenu event                                      | `HTMLElement | String`        | -       | -   |
| options     | menu item.It supports infinite hierarchical tree structure. The structure is as follows: | `Array`      | -              | -       |

### options

| Property | Description                                                                                                        | Type      | Optional value | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------ | --------- | -------------- | ------- |
| label    | Displayed menu name                                                                                                | `String`  | -              | -       |
| type     | contextmenu item type,The split line through ‘SEPARATOR’。It will be used as a parameter for callback after cliked | `String`  | -              | -       |
| disabled | Disable the current menu, click will be invalid                                                                    | `Boolean` | -              | -       |

### Event

| Event Name    | Description         | Parameters                  |
| ------------- | ------------------- | --------------------------- |
| on-node-click | menu click callback | currently clicked menu type |

### Instance Methods

| Method Name     | Description | Parameters |
| --------------- | ----------- | ---------- |
| hideContextmenu | 该右键菜单  | -          |
