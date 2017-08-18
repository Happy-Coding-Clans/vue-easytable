:::demo formatter 对当前数据进行简单的加工处理；自定义列的高级用法通过`componentName`传递一个vue组件，同时这个自定义组件会接收到`rowData`、`field`、`index`数据
```html
<template>
    <v-table
            :width="1100"
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
                            }, isFrozen: true
                        },
                        {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center',columnAlign:'right'},
                        {field: 'tel', title: '手机号码', width: 160, titleAlign: 'center',columnAlign:'center'},
                        {field: 'email', title: '邮箱', width: 150, titleAlign: 'center',columnAlign:'center'},
                        {field: 'hobby', title: '爱好', width: 180, titleAlign: 'center',columnAlign:'left'},
                        {field: 'job', title: '职业', width: 130, titleAlign: 'center',columnAlign:'left'},
                        {field: 'custome-adv', title: '操作', titleAlign: 'center',columnAlign:'left',componentName:'table-operation'}
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