:::demo 自适应分为表格高度适应和表格宽度自适应。如果是表格宽度自适应需要满足下面条件：1、通过 is-horizontal-resize 属性设置横向自适应；2、通过 isResize 属性设置哪些列需要自适应（所有列都可以设置，达到所有列自适应）；3、通过 style="width:100%" 设置显示比例；4、每个列必须提供宽度，这个宽度是自适应的最小宽度；如果是高度自适应需要设置is-vertical-resize 属性
```html
<template>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :min-height="200"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            :on-row-click="tableConfig.onRowClick"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
    ></v-table>
</template>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data() {
            return {
                tableConfig: {
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'email', title: '邮箱', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'left',isResize:true}
                    ],
                    titleBgColor: "#e1e1e1",
                    onRowClick(rowIndex, rowData){
                        console.log(rowIndex);
                        console.log(rowData);
                    }
                }
            }
        },
        created(){

            var self = this;
            setTimeout(function () {
                self.tableConfig.tableData = mockData;
            }, 100);
        }
    }
</script>
```
:::