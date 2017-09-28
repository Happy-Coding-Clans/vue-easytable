
:::demo 通过设置列对象中的 isEdit 属性，控制哪些列开启单元格编辑功能。通过传入回调函数 cell-edit-done，接收编辑结果。

```html
<template>
    <v-table
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
    ></v-table>
</template>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data() {
            return {
                tableConfig: {
                    tableData:[],
                    columns:  [
                             {field: 'name', title:'姓名', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true},
                             {field: 'tel', title: '手机号码', width: 260, titleAlign: 'center',columnAlign:'center',isEdit:true},
                             {field: 'hobby', title: '爱好', width: 380, titleAlign: 'center',columnAlign:'center',isEdit:true},
                             {field: 'address', title: '地址', width: 358, titleAlign: 'center',columnAlign:'left',isEdit:true}
                         ],
                    titleBgColor: "#e1e1e1"
                }
            }
        },
        methods:{
               // 单元格编辑回调
               cellEditDone(newValue,oldValue,rowData,field,index){
                    console.log(newValue)
                    console.log(oldValue)
                    console.log(rowData)
                    console.log(field)
                    console.log(index)
               }
        },
        created(){

            this.tableConfig.tableData = mockData;
        }
    }
</script>
```
:::

