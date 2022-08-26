## 常见问题

:::anchor scrollWidth 属性
Q:`scrollWidth`属性的用法？

A:当外层容器宽度小于 `scrollWidth` 值时，将会出现横向滚动条；当外层容器宽度大于 `scrollWidth` 值时，将会跟随容器自适应

:::anchor 固定列
Q:为什么设置固定列后，有些列无法显示？

A:因为设置的 `scrollWidth`值小于列（设置具体宽度的）的宽度之和，会导致未设置宽度或者设置百分比的列挤掉

:::anchor rowKeyFieldName 属性
Q:什么时候使用`rowKeyFieldName` 属性？

A:此属性为了解决数据更新时，渲染的正确性。适用的功能有：行展开、行单选、行多选、行点击高亮、虚拟滚动

:::anchor 报错：‘ReferenceError: h is not defined’
Q:为什么使用自定义列渲染函数`renderBodyCell`报‘ReferenceError: h is not defined’

A:参考[官方文档](https://cn.vuejs.org/v2/guide/render-function.html#JSX)。你可以**加上**第二个参数解决，如：

```
renderBodyCell: ({ row, column, rowIndex },h) => {
       return (<div>hello</div>);
}
```

:::anchor 长文本破坏布局
Q:为什么当单元格内容过多时，设置的宽度不生效

A:当单元格文本内容过多时会破坏布局，此时可以通过样式 [word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 控制（[具体参考这个示例](#/zh/doc/table/column-width?anchor=long-text-destroys-layout)），如：

```html
<template>
    <ve-table style="word-break: break-all" :columns="columns" :table-data="tableData" />
</template>
```

:::anchor 自定义滚动条样式
Q:如何自定义滚动条样式

A:组件内部没有定制滚动条样式，根据你的业务自定义即可。滚动条样式自定义可参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar
