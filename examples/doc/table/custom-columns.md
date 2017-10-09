:::demo formatter 对当前数据进行简单的加工处理；自定义列的高级用法通过`componentName`传递一个vue组件，同时这个自定义组件会接收到`rowData`、`field`、`index`数据
```html
<template>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
    ></v-table>
</template>

<script>

    import mockData from '../../mock/tableData.js'
    import Vue from 'vue'

    export default{
        data() {
            return {
                tableConfig: {
                    tableData:[],
                    columns: [
                        {
                            field: 'custome', title:'序号', width: 50, titleAlign: 'center', columnAlign: 'center',
                            formatter: function (rowData,rowIndex,pagingIndex,field) {
                                return rowIndex < 3 ? '<span style="color:red;font-weight: bold;">' + (rowIndex + 1) + '</span>' : rowIndex + 1
                            }, isFrozen: true,isResize:true
                        },
                        {field: 'name', title:'姓名', width: 130, titleAlign: 'center',columnAlign:'center',isResize:true},
                        {field: 'tel', title: '手机号码', width: 160, titleAlign: 'center',columnAlign:'center',isResize:true},
                        {field: 'hobby', title: '爱好', width: 230, titleAlign: 'center',columnAlign:'center',isResize:true},
                        {field: 'address', title: '地址', width: 330, titleAlign: 'center',columnAlign:'left',isResize:true},
                        {field: 'custome-adv', title: '操作',width: 280, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
                    ]
                }
            }
        },
        created(){

            this.tableConfig.tableData = mockData;
        }
    }

    // 自定义列组件
    Vue.component('table-operation',{
        template:`<span>
        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
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
        },
        methods:{
            update(){
                alert('编辑: '+this.index)
                console.log(this.index)
                console.log(this.rowData[this.field])

                console.log(this.rowData)
            },

            deleteRow(){
                alert('删除: '+this.index)
                console.log(this.index)
                console.log(this.rowData[this.field])

                console.log(this.rowData)
            }
        }
    })
</script>
```
:::