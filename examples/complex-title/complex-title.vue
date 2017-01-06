<template>
    <div>
        固定表格<br/><br/>
        <easyTable :width="tables.width"
                   :minWidth="tables.minWidth"
                   :height="tables.height"
                   :minHeight="tables.minHeight"
                   :multipleSort="tables.multipleSort"
                   :titleRows="tables.titleRows"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   @actionCallBack="actionCallBack"
        ></easyTable>
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
    import easyTable from '../../src/main.vue'
    import '../../src/css/basic.css'

    import mockData from '../../mockServer/simpleData'
    import Vue from 'vue'

    Vue.component('table-operation',{
        template:`<span>
        <a href="" @click.stop.prevent="update(rowData)">编辑</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData)">删除</a>
        </span>`,
        props:{
            rowData:{
                type:Object,
                require:true
            }
        },
        methods:{
            update(){
                alert('编辑')
                console.log(this.rowData)
            },

            deleteRow(){
                alert('删除')
                console.log(this.rowData)
            }
        }
    })

    export default{
        name: 'frozen-columns',
        components: {
            easyTable
        },
        data(){
            return {
                tables: {
                    multipleSort:false,
                    width: 1300,
                    tableData: [],
                    titleRows:[
                        [
                            {fields: ['name'], title: '姓名', titleAlign: 'center',orderBy:'desc'},
                            {fields: ['gender'], title: '性别', titleAlign: 'center',orderBy:'asc',rowspan:2,},
                            {fields: ['nickname'], title: '昵称', titleAlign: 'center',orderBy:'desc'},
                            {fields: ['birthday','height'], title: '出生日期、身高', titleAlign: 'center',colspan:2},
                            {fields: ['tel'], title: '手机号码', titleAlign: 'center'},
                            {fields: ['email'], title: '邮箱', titleAlign: 'center'},
                            {fields: ['hobby'], title: '爱好', titleAlign: 'center'},
                            {fields: ['address'], title: '家庭地址', titleAlign: 'center'},
                            {fields: ['job'], title: '职业', titleAlign: 'center'}
                        ],
                        [
                            {fields: ['name'], title: '姓名', titleAlign: 'center'},
                           /* {fields: ['gender'], title: '性别', align: 'center',rowspan:2},*/
                            {fields: ['nickname'], title: '昵称', titleAlign: 'center'},
                            {fields: ['birthday'], title: '出生日期', titleAlign: 'center'},
                            {fields: ['height'], title: '身高', titleAlign: 'center'},
                            {fields: ['tel'], title: '手机号码', titleAlign: 'center'},
                            {fields: ['email'], title: '邮箱', titleAlign: 'center'},
                            {fields: ['hobby'], title: '爱好', titleAlign: 'center'},
                            {fields: ['address'], title: '家庭地址', titleAlign: 'center'},
                            {fields: ['job'], title: '职业', titleAlign: 'center'}
                        ]
                    ],
                    columns: [
                        {field: 'name',  width: 100,columnAlign:'center', isFrozen: true},
                        {field: 'gender', width: 100, align: 'center', isFrozen: true},
                        {field: 'nickname', width: 100, align: 'center', isFrozen: false},
                        {field: 'birthday', width: 100, align: 'center', isFrozen: false},
                        {field: 'height', width: 100, align: 'center', isFrozen: false},
                        {field: 'tel', width: 100, align: 'center', isFrozen: false},
                        {field: 'email', width: 100, align: 'center', isFrozen: false},
                        {field: 'hobby', width: 100, align: 'center', isFrozen: false},
                        {field: 'address', width: 100, align: 'center', isFrozen: false},
                        {field: 'job', width: 0, align: 'center', isFrozen: false},
                        /*{componentName: 'table-operation', title: '操作', width: 180, align: 'center', isFrozen: false}*/
                    ]
                }
            }
        },
        methods: {
            // 模拟获取数据
            getTableData(){
                var vm = this

                setTimeout(function () {
                    vm.tables.tableData = mockData
                }, 10)

            },

            actionCallBack(params){
                console.log(params)
            }
        },
        created(){
            this.getTableData()
        }
    }
</script>