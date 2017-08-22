
### 介绍
基于 vue2 的 组件。[github仓库地址](https://github.com/huangshuwei/vue-easytable)


### 主要功能
1. 自适应，可以随着浏览器窗口改变自动适应
2. 固定列，表头固定
3. 列宽拖动（默认支持）
4. 排序，支持单个、多个字段排序
5. 自定义列、自定义单元格样式、loading效果等
6. 自带分页组件

### 安装

```javascript
npm install vue-easytable --save-dev
```

### 使用


```javascript
import 'vue-easytable/packages/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
```

```html
<template>
    <v-table
            :width="1100"
             :columns="tableConfig.columns"
             :table-data="tableConfig.tableData"
    ></v-table>
</template>
```
```javascript
<script>

    export default{
        data() {
            return {
                tableConfig: {
                    tableData:[
                              {"name":"tom","gender":"男","job":"the cat"},
                              {"name":"jerry","gender":"男","job":"the mouse"},
                              {"name":"张飞","gender":"女","job":"勇而有义，皆万人之敌，而为之将"}
                              ],
                    columns: [
                        {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'job', title: '职业', titleAlign: 'center',columnAlign:'left'}
                    ]
                }
            }
        }
    }
</script>
```

### 参考
[饿了么ui组件](http://element.eleme.io/#/zh-CN/component/quickstart)



