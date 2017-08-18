:::demo 设置表格总宽度，最后一列不设置，那么自动一列宽度将会自动计算

```html
<template>
    <v-table
            :width="1100"
             :columns="tableConfig.columns"
             :table-data="tableConfig.tableData"
             :on-row-click="tableConfig.onRowClick"
             :show-vertical-border="false"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :row-mouse-enter="rowMouseEnter"
            :row-mouse-leave="rowMouseLeave"
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
                        {field: 'tel', title: '手机号码', width: 160, titleAlign: 'center',columnAlign:'center'},
                        {field: 'email', title: '邮箱', width: 150, titleAlign: 'center',columnAlign:'center'},
                        {field: 'hobby', title: '爱好', width: 180, titleAlign: 'center',columnAlign:'left'},
                        {field: 'job', title: '职业', titleAlign: 'center',columnAlign:'left'}
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

            rowMouseEnter(rowIndex){
                console.log('鼠标悬浮进入，行号：'+rowIndex);
            },
            rowMouseLeave(rowIndex){
                console.log('鼠标悬浮离开，行号：'+rowIndex);
            }
        }
    }
</script>
```
:::