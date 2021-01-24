:::tip
1、Enable the multi selection function through the `checkboxoptipon` attribute<br>
2、By setting `type=checkbox` in `columns` as a multiple selection column<br>
3、The `rowKeyFieldName` property must be set<br>
4、`selectedRowChange` is row change event. The event receives 3 parameters,`row`:Current row data,`isSelected`Whether the current row is selected,`selectedRowKeys` all the selected rowkeys.<br>
5、`selectedAllChange` is select all events. The event receives 2 parameters,`isSelected` whether to select all,
`selectedRowKeys` is all the selected rowkeys
:::
