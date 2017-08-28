:::demo 固定复杂表头+固定列

```html
<template>
   <v-table
            :width="1100"
            :height="350"
            even-bg-color="#f2f2f2"
            :title-rows="tableConfig.titleRows"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
    ></v-table>
</template>

<style>
    .title-cell-class-name-test1 {
        background-color: #2db7f5;
    }
    .title-cell-class-name-test2 {
        background-color: #f60;
    }
</style>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data(){
            return {
                tableConfig: {
                    multipleSort: false,
                    tableData: [],
                    columns: [
                         {
                            field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',
                            formatter: function (rowData, index) {
                                return index < 3 ? '<span style="color:red;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
                            }, isFrozen: true
                        },
                        {field: 'name', width: 100, columnAlign: 'center', isFrozen: true},
                        {field: 'gender', width: 150, columnAlign: 'center', isFrozen: true},
                        {field: 'height', width: 150, columnAlign: 'center', isFrozen: true},
                        {field: 'tel', width: 190, columnAlign: 'center'},
                        {field: 'email', width: 230, columnAlign: 'center'},
                        {field: 'hobby', width: 230, columnAlign: 'center'},
                        {field: 'address', width: 330, columnAlign: 'left'}
                    ],

                    titleRows: [
                                 [{fields: ['custome'], title: '排序', titleAlign: 'center', rowspan: 2},
                                  {fields: ['name', 'gender', 'height'], title: '基础信息', titleAlign: 'center', colspan: 3},
                                  {fields: ['tel', 'email'], title: '联系方式', titleAlign: 'center', colspan: 2},
                                  {fields: ['hobby','address'], title: '爱好及地址', titleAlign: 'center', rowspan: 2,colspan: 2}],

                                 [{fields: ['name'], title: '姓名', titleAlign: 'center'},
                                  {fields: ['gender'], title: '性别', titleAlign: 'center', orderBy: 'asc'},
                                  {fields: ['height'], title: '身高', titleAlign: 'center', orderBy: 'desc'},
                                  {fields: ['tel'], title: '手机号码', titleAlign: 'center'},
                                  {fields: ['email'], title: '邮箱', titleAlign: 'center'}],

                                 [{fields: ['custome','name','gender','height'], title: '平均值', titleAlign: 'center', colspan: 4,titleCellClassName:'title-cell-class-name-test1'},
                                  {fields: ['tel'], title: '000', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'},
                                  {fields: ['email'], title: '111', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'},
                                  {fields: ['hobby'], title: '222', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'},
                                  {fields: ['address'], title: '333', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'}]
                               ]
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
