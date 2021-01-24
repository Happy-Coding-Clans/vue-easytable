:::tip
1、通过配置对象`cellStyleOption`设置单元格的样式<br>
2、回调函数属性`bodyCellClass({ row, column, rowIndex })`设置符合条件的表体单元格 class<br>
3、回调函数属性`headerCellClass({column, rowIndex})`设置符合条件的表头单元格 class<br>
4、回调函数属性`footerCellClass({row,column, rowIndex})`设置符合条件的 footer 单元格 class<br>
5、`<style>`标签不可以使用`scoped`属性<br>
6、当然你也可以通过`renderBodyCell`、`renderHeaderCell`、`renderFooterCell`等实现单元格样式的自定义功能

:::
