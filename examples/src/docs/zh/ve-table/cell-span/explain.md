:::tip
1、通过方法`cellSpanOption`设置合并单元格<br>
2、通过方法`bodyCellSpan({row,column,rowIndx})`设置 body 单元格合并<br>
3、通过方法`footerCellSpan({row,column,rowIndx})`设置 footer 单元格合并<br>
4、属性 `colspan` 指定合并的列数；属性 `rowspan` 指定合并的行数<br>
5、为实现功能，需要指定不需要渲染的列，设置`colspan`、 `rowspan` 的值为 0 即可<br>
6、默认合并后的内容，是渲染的单元格的内容。若要自定义单元格内容，可以结合`renderBodyCell({row,column,rowIndex},h)`实现<br>
7、具体见下面的示例

:::
