<template>
    <div>
        复杂表头<br/><br/>
        <easyTable :width="tables.width"
                   :titleRows="tables.titleRows"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
        ></easyTable>
    </div>



</template>

<script>
    import Vue from 'vue'
    import easyTable from 'easyTable'

    import mockData from './mockServer/simpleData'

  /*  Vue.component('table-operation',{
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
    })*/

    export default{
        name: 'complex-title',
        components: {
            easyTable
        },
        data(){
            return {
                tables: {
                    multipleSort:false,
                    width: 1100,
                    tableData: [],
                    titleRows:[
                        [
                            {fields: ['name','gender','height'], title: '基础信息', titleAlign: 'center',colspan:3},
                            {fields: ['tel','email'], title: '联系方式', titleAlign: 'center',colspan:2},
                            {fields: ['hobby'], title: '爱好', titleAlign: 'center',rowspan:2},
                            {fields: ['job'], title: '职业', titleAlign: 'center',rowspan:2}
                        ],
                        [
                            {fields: ['name'], title: '姓名', titleAlign: 'center'},
                            {fields: ['gender'], title: '性别', titleAlign: 'center',orderBy:'asc'},
                            {fields: ['height'], title: '身高', titleAlign: 'center',orderBy:'desc'},
                            {fields: ['tel'], title: '手机号码', titleAlign: 'center'},
                            {fields: ['email'], title: '邮箱', titleAlign: 'center'}
                        ]
                    ],
                    columns: [
                        {field: 'name',  width: 100,columnAlign:'center'},
                        {field: 'gender', width: 100, columnAlign: 'center'},
                        {field: 'height', width: 100, columnAlign: 'center'},
                        {field: 'tel', width: 150, columnAlign: 'center'},
                        {field: 'email', width: 150, columnAlign: 'center'},
                        {field: 'hobby', width: 200, columnAlign: 'left'},
                        {field: 'job', width: 0, columnAlign: 'left'},
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