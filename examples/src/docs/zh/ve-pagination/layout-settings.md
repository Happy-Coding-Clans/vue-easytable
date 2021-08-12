:::anchor 布局设置

:::demo 1、通过设置 `layout` 属性，改变布局。<br>2、`layout` 属性支持以下配置项：<br>`total`：显示总条数、`prev`：显示上一页按钮、`pager`：显示页码按钮、`next`：显示下一页按钮、`sizer`：显示每页大小设置、`jumper`：显示跳转文本框

```html
<template>
    <div>
        <div>
            <div class="mb20 bold">不显示页码按钮</div>
            <ve-pagination :total="600" :layout="['total', 'prev', 'next', 'sizer', 'jumper']" />
        </div>
        <div>
            <div class="mt30 mb20 bold">调整显示顺序</div>
            <ve-pagination
                :total="600"
                :layout="['total', 'sizer', 'prev', 'pager', 'next', 'jumper']"
            />
        </div>

        <div>
            <div class="mt30 mb20 bold">完整布局</div>
            <ve-pagination
                :total="600"
                :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
            />
        </div>
    </div>
</template>
```

:::
