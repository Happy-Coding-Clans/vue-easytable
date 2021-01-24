## Common Problem

:::anchor 'scrollWidth' attribute

Q:When to use `scrollWidth` attribute？

A:When the outer container width is less than the `scrollwidth` value, a horizontal scroll bar will appear; when the outer container width is greater than the `scrollwidth` value, it will follow the container adaptively

:::anchor Column Fixed
Q:Why can't some columns be displayed after setting fixed columns？

A:Because the set scrollWidth value is less than the sum of the width of the column (setting the specific width), it will cause the column with no width or set percentage to be squeezed out

:::anchor 'rowKeyFieldName' property

Q:When to use `rowKeyFieldName` property？

A:This attribute is to solve the correctness of rendering when the data is updated. Applicable functions are: row expansion, row single selection, row multiple selection, row click highlighting, virtual scroll

:::anchor Error：'ReferenceError: h is not defined'
Q:Why ‘ReferenceError: h is not defined’

A:Refer to[official documents](https://cn.vuejs.org/v2/guide/render-function.html#JSX)。You can add the second parameter to solve,Such as:

```
renderBodyCell: ({ row, column, rowIndex },h) => {
       return (<div>hello</div>);
}
```
