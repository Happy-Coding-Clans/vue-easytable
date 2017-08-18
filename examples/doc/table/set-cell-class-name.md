
:::demo 设置表头单元格：通过‘titleCellClassName’属性给表头的单元格设置class；设置列单元格:通过‘columnCellClassName’方法给列的单元格设置class

```html
<template>
    <v-table
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            :on-row-click="tableConfig.onRowClick"
            :column-cell-class-name="columnCellClass"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
    ></v-table>
</template>

<style>
    .title-cell-class-name-test{
        background-color: #f60;
        color:#fff;
    }
    .column-cell-class-name-test{
        background-color: #187;
    }
    .column-cell-class-name-test .v-table-body-cell{
        border-color: #187;
    }
    .column-cell-class-name-test2{
        background-color: #2db7f5;
        font-weight: bold;
    }
    .column-cell-class-name-test2 .v-table-body-cell{
        border-color: #2db7f5;
    }
</style>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data() {
            return {
                tableConfig: {
                    tableData:[],
                    columns: [
                        {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center',titleCellClassName:'title-cell-class-name-test'},
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
        },

        methods:{

            columnCellClass(rowIndex,columnName,rowData){

                // 给二行column为‘tel’的列设置className
                if (rowIndex === 1 && columnName==='height'){

                    return 'column-cell-class-name-test';
                }

                // 给第三行设置className
                if (rowIndex ===2){

                    return 'column-cell-class-name-test2';
                }

                // 给姓名为李清照的行设置className
                if (rowData.name === '李清照'){

                    return 'column-cell-class-name-test';
                }
            }
        }
    }
</script>
```
:::