:::anchor Layout Settings

:::demo 1、Change the layout by setting the `layout` property.<br>2、The `layout` property supports the following configuration items:<br>`total`:Display total number、`prev`:Show previous button、`pager`:Show page number button、`next`:Show next page button、`sizer`:Show per page size settings、`jumper`:Show goto input

```html
<template>
    <div>
        <div>
            <div class="mb20 bold">Don't display page number button</div>
            <ve-pagination :total="600" :layout="['total', 'prev', 'next', 'sizer', 'jumper']" />
        </div>
        <div>
            <div class="mt30 mb20 bold">Adjust display order</div>
            <ve-pagination
                :total="600"
                :layout="['total', 'sizer', 'prev', 'pager', 'next', 'jumper']"
            />
        </div>

        <div>
            <div class="mt30 mb20 bold">All layout</div>
            <ve-pagination
                :total="600"
                :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
            />
        </div>
    </div>
</template>
```

:::
