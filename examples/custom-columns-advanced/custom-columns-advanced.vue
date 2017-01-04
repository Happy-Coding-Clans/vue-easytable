<template>
    <div>
        基本的表格功能展示<br/><br/>
        <Easytable :width="tables.width"
                   :minWidth="tables.minWidth"
                   :height="tables.height"
                   :minHeight="tables.minHeight"
                   :rowHeight="tables.rowHeight"
                   :multipleSort="tables.multipleSort"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   @actionCallBack="actionCallBack"
        ></Easytable>
    </div>
</template>


<style>
    .easytable-class{
        font-size: 14px;
        font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif;;
    }

    .easytable-title-class{

        font-weight: bold;
        color: rgb(31, 45, 61);
    }

    .easytable-body-class{

        color: rgb(31, 45, 61);
    }
</style>

<script>

    import Easytable from '../../src/main.vue'
    import '../../src/css/basic.css'

    import mockData from '../../mockServer/simpleData'
    import Vue from 'vue'


    Vue.component('table-operation',{
        template:`<span>
        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
        props:{
            rowData:{
                type:Object
            },
            index:{
                type:Number
            }
        },
        methods:{
            update(){
                alert('编辑')
                console.log(this.index)
                console.log(this.rowData)
            },

            deleteRow(){
                alert('删除')
                console.log(this.index)
                console.log(this.rowData)
            }
        }
    })

    export default{
        name: 'basic',
        components: {
            Easytable
        },
        data(){
            return {
                tables: {
                    width: 1300,
                    minWidth: 600,
                    height: 700,
                    minHeight: 300,
                    rowHeight:35,
                    tableData: [],
                    multipleSort: true,
                    columns: [
                        {title: '头像', width: 50, align: 'center', isFrozen: true,
                            format: function (rowData) {
                                var src = require('../../libs/imgs/'+rowData.img)
                                return '<img height="33px" width="35px" src="'+src+'" />'
                            }
                        },
                        {field: 'name', title: '姓名', width: 150, align: 'center', isFrozen: true,orderBy:''},
                        {field: 'gender', title: '性别', width: 100, align: 'center', isFrozen: true,orderBy:''},
                        {field: 'nickname', title: '昵称', width: 150, align: 'center', isFrozen: false},
                        {field: 'birthday', title: '出生日期', width: 150, align: 'center', isFrozen: false,orderBy:''},
                        {field: 'height', title: '身高', width: 100, align: 'center', isFrozen: false},
                        {field: 'tel', title: '手机号码', width: 150, align: 'center', isFrozen: false},
                        {title: '邮箱', width: 100, align: 'center', isFrozen: true,
                            format:function (rowData) {
                                if (rowData.email.length>1){
                                    return '<a href="https://github.com/huangshuwei/vue-easytable" target="_blank">'+rowData.email+'</a>'
                                }
                                return rowData.email
                            }
                        },
                        {field: 'hobby', title: '爱好', width: 160, align: 'center', isFrozen: false},
                        {field: 'address', title: '家庭地址', width: 300, align: 'center', isFrozen: false},
                        {field: 'job', title: '职业', width: 150, align: 'center', isFrozen: false},
                        {componentName: 'table-operation', title: '操作', width: 180, align: 'center', isFrozen: false}
                    ]
                }
            }
        },
        methods: {

            getTableData(){
                var vm = this

                setTimeout(function () {
                    vm.tables.tableData = mockData
                }, 10)

            },

            // 获取 table 组件每次操作后的参数（重新去请求数据）
            actionCallBack(params){
                console.log(params)
            }
        },
        created(){
            this.getTableData()
        }
    }
</script>