
:::demo 不设置表格总体宽度，只设置每列的宽度，表格的总宽度将会自动计算

```html
<template>
    <v-table
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
                    tableData:[],
                    columns: [
                        {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center',columnAlign:'right'},
                        {field: 'tel', title: '手机号码', width: 168, titleAlign: 'center',columnAlign:'center'},
                        {field: 'email', title: '邮箱', width: 230, titleAlign: 'center',columnAlign:'center'},
                        {field: 'hobby', title: '爱好', width: 180, titleAlign: 'center',columnAlign:'left'},
                        {field: 'job', title: '职业',width: 280, titleAlign: 'center',columnAlign:'left'}
                    ],
                    titleBgColor: "#e1e1e1",
                    onRowClick(rowIndex,rowData){
                        console.log(rowIndex);
                        console.log(rowData);
                    }
                }
            }
        },
        created(){

            this.tableConfig.tableData = mockData;
        }
    }
</script>
```
:::

