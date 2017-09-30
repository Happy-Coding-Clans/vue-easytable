:::demo 通过传入回调函数 ‘cell-merge’ 设置要合并的单元格

```html
<template>
    <div>
        <v-table
             :width="1100"
             :height="430"
             :columns="tableConfig.columns"
             :table-data="tableConfig.tableData"
             even-bg-color="#f4f4f4"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             :cell-merge="cellMerge"
        ></v-table>
    </div>
</template>

<script>
    import Vue from 'vue'
    import mockData from '../../mock/tableData.js'

    export default{
        name: 'frozen-title-columns',
        data(){
            return {
                tableConfig: {
                    tableData: [],
                    columns:[
                           {field: 'name', title:'姓名', width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                           {field: 'gender', title:'性别', width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                           {field: 'tel', title: '手机号码', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                           {field: 'birthday', title: '出生日期', width: 180, titleAlign: 'center',columnAlign:'center'},
                           {field: 'hobby', title: '爱好', width: 380, titleAlign: 'center',columnAlign:'center'},
                           {field: 'address', title: '地址', width: 430, titleAlign: 'center',columnAlign:'left'}
                         ]
                }
            }
        },
        methods: {
            // 模拟获取数据
            getTableData(){
                var self = this

                setTimeout(function () {
                    self.tableConfig.tableData = mockData
                }, 100)
            },
            cellMerge(rowIndex,rowData,field){
                if (field === 'name' && rowData[field] === '李伟') {
                    return {
                        colSpan: 2,
                        rowSpan: 1,
                        content: '<span style="color:red">单元格 colSpan</span>',
                        componentName: ''

                    }
                } else if (rowIndex === 3 && field === 'gender') {

                    return {
                        colSpan: 1,
                        rowSpan: 3,
                        content: '<span style="color:red">单元格 rowSpan</span>',
                        componentName: ''
                    }

                }else if (rowIndex === 2 && field === 'birthday') {

                        return {
                            colSpan: 2,
                            rowSpan: 3,
                            content:'',
                            componentName:'table-cell-merge',
                        }
                }
            }
        },
        created(){
            this.getTableData()
        }
    }

        // 自定义列组件
        Vue.component('table-cell-merge',{
            template:`<span style="color:red">
               单元格 rowSpan 和 colSpan 同时使用
            </span>`,
            props:{
                rowData:{
                    type:Object
                },
                field:{
                    type:String
                },
                index:{
                    type:Number
                }
            }
        })
</script>
```
:::