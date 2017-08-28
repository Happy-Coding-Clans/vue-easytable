:::demo 1、首先要设置当前容器的宽度（通过百分比，具体的宽度自适应无意义）；2、设置表格在当前容器的显示比例
```html
<template>
    <div>
        <div style="border:10px dotted orange;width:49%;float:left;">
            <v-table
                    is-horizontal-resize
                    style="width:100%;"
                    :columns="tableConfig1.columns"
                    :table-data="tableConfig1.tableData"
                    row-hover-color="#eee"
                    row-click-color="#edf7ff"
            ></v-table>
        </div>

        <div style="border:10px dotted orange;width:49%;float:right;">
            <v-table
                    is-horizontal-resize
                    style="width:100%;"
                    :columns="tableConfig2.columns"
                    :table-data="tableConfig2.tableData"
                    row-hover-color="#eee"
                    row-click-color="#edf7ff"
            ></v-table>
        </div>
        <div style="clear:both;"></div>
    </div>
</template>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data() {
            return {
                tableConfig1: {
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'tel', title: '手机号码', width: 160, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    ],
                    titleBgColor: "#e1e1e1"
                },

                tableConfig2: {
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'tel', title: '手机号码', width: 160, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    ],
                    titleBgColor: "#e1e1e1"
                },
            }
        },

        created(){

            setTimeout(function () {
                this.tableConfig1.tableData = mockData;
                this.tableConfig2.tableData = mockData;
            }.bind(this), 20);
        }
    }
</script>
```
:::