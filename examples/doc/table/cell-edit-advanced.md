
:::demo 默认单元格的编辑只接收文本格式，但是可以通过 cell-edit-formatter 方法回调对单元格的编辑后的结果进行二次处理。

```html
<template>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-formatter="cellEditFormatter"
            :cell-edit-done="cellEditDone"
    ></v-table>
</template>

<style>
    .cell-edit-color{
        color:#2db7f5;
        font-weight: bold;
    }
</style>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data() {
            return {
                tableConfig: {
                    tableData:[],
                    columns:  [
                             {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center',isEdit:true,
                              formatter: function (rowData,rowIndex,pagingIndex,field) {

                                   return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                               },isResize:true},
                             {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
                             {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
                             {field: 'address', title: '地址', width: 280, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true}
                         ],
                    titleBgColor: "#e1e1e1"
                }
            }
        },
        methods:{
           // 单元格编辑格式化回调
           cellEditFormatter(newValue,oldValue,rowIndex,rowData,field){

                if (field === 'name'){
                    return `<span class="cell-edit-color">${newValue}</span>`
                }
           },

            // 单元格编辑回调
            cellEditDone(newValue,oldValue,rowIndex,rowData,field){
                 console.log(newValue)
                 console.log(oldValue)
                 console.log(rowIndex)
                 console.log(rowData)
                 console.log(field)
            }
        },
        created(){

            this.tableConfig.tableData = mockData;
        }
    }
</script>
```
:::

