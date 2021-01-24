:::tip
1、Set the span cells through the `cellSpanOption` method<br>
2、Set the body cell span through the `bodyCellSpan({row,column,rowIndx})` method<br>
3、Set the footer cell span through the `footerCellSpan({row,column,rowIndx})` method<br>
4、Property `colSpan` specifies the number of columns to span<br>
5、This function needs to specify columns that do not need to be rendered. Set the values of `colSpan` and `rowspan` to 0<br>
6、By default, the span content is the content of the rendered cell.To customize the cell content, you can combine it with `renderBodyCell({row,column,rowIndex},h)`<br>

:::
