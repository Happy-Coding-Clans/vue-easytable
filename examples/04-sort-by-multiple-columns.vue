<template>
    <div>
        表格多条件排序<br/><br/>
        <easytable :width="tables.width"
                   :multipleSort="tables.multipleSort"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   @actionCallBack="actionCallBack"
        ></easytable>
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

    import easytable from '../src/main.vue'
    import '../src/css/basic.css'

    import mockData from './mockServer/simpleData'


    export default{
        name: 'sort-by-multiple-columns',
        components: {
            easytable,
        },
        data(){
            return {
                tables: {
                    width: 1100,
                    tableData: [],
                    multipleSort:true,
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: true,orderBy:'asc'},
                        {field: 'height', title: '身高', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false,orderBy:'asc'},
                        {field: 'tel', title: '手机号码', width: 130, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'email', title: '邮箱', width: 130, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'hobby', title: '爱好', width: 230, titleAlign: 'center',columnAlign:'left', isFrozen: false},
                        {field: 'job', title: '职业', titleAlign: 'center',columnAlign:'left', isFrozen: false}
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