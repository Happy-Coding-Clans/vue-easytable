
## 基础用法
<anchor id="page-simple" label="简单实例" h4 ></anchor>
:::demo 简单实例
```html
<template>
      <v-pagination :total="600"></v-pagination>
</template>
```
:::

<anchor id="page-set-page-size" label="设置页数大小" h4 ></anchor>
:::demo 设置页数大小
```html
<template>
         <v-pagination :total="600" :page-size="30"></v-pagination>
</template>
```
:::

:::demo 当页码改变或者每页条数改变都会触发分页回调
<anchor id="page-callback" label="分页回调" h4 ></anchor>
```html
<template>
          <v-pagination :total="600" @page-change="pageChange1" @page-size-change="pageSizeChange1"></v-pagination>
</template>
<script>

    export default{

        methods: {

            pageChange1(pageIndex){
                console.log(pageIndex)
            },

            pageSizeChange1(pageSize){
                console.log(pageSize)
            }
        }
    }
</script>
```
:::


## 尺寸配置
<anchor id="page-set-size" label="分页尺寸配置" h4 ></anchor>
:::demo 实例
```html
<template>
       <div>
            <div>
                <v-pagination :total="600" size="small"></v-pagination>

            </div>

            <div class="mt20">
                <v-pagination :total="600" size="middle"></v-pagination>
            </div>

             <div class="mt20">
                 <v-pagination :total="600" size="large"></v-pagination>
             </div>
       </div>
</template>

```
:::



## 布局设置
<anchor id="page-set-layout" label="layout 布局设置" h4 ></anchor>
:::demo 通过设置 layout 属性，改变布局
```html
<template>
    <div>
        <div>
            <div class="mb20 bold">不显示分页页码</div>
             <v-pagination
                    :total="600"
                    :layout="['total', 'prev', 'next', 'sizer', 'jumper']">
             </v-pagination>
        </div>
        <div>
             <div class="mt30 mb20 bold">调整显示顺序</div>
                 <v-pagination
                         :total="600"
                         :layout="['total', 'sizer', 'prev', 'pager', 'next', 'jumper']">
                 </v-pagination>
         </div>

          <div>
             <div class="mt30 mb20 bold">完整布局</div>
                 <v-pagination :total="600" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
             </div>
    </div>
</template>
```
:::

<anchor id="page-api" label="API" h3 ></anchor>
### Pagination props
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| layout | 布局设置，可以根据自己的业务场景自行搭配 | Array | — | ['total', 'prev', 'pager', 'next', 'sizer', 'jumper'] |
| size | 设置分页组件的尺寸大小 | string | small/middle/large | middle |
| total | 总条数 | number | — | — |
| pageIndex | 当前页码 | number | — | 1 |
| showPagingCount | 显示分页按钮的个数 | number | — | 5 |
| pageSize | 每页大小 | number | — | 10 |
| pageSizeOption | 每页大小下拉配置 | Array | — | [10, 20, 30] |


### Pagination Event
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| page-change | 页码改变回调 | pageIndex |
| page-size-change|  每页大小下拉框改变回调| newPageSize |

