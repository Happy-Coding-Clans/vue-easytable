<template>
    <div>
        表格多条件排序<br/><br/>
        <v-table :width="tables.width"
                   :multipleSort="tables.multipleSort"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   @actionCallBack="actionCallBack"
        ></v-table>
    </div>
</template>

<script>

    import mockData from './mockServer/simpleData'


    export default{
        name: 'sort-by-multiple-columns',
        data(){
            return {
                tables: {
                    width: 1100,
                    tableData: [],
                    multipleSort:true,
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'asc'},
                        {field: 'height', title: '身高', width: 100, titleAlign: 'center',columnAlign:'center',orderBy:'asc'},
                        {field: 'tel', title: '手机号码', width: 130, titleAlign: 'center',columnAlign:'center'},
                        {field: 'email', title: '邮箱', width: 130, titleAlign: 'center',columnAlign:'center'},
                        {field: 'hobby', title: '爱好', width: 230, titleAlign: 'center',columnAlign:'left'},
                        {field: 'job', title: '职业', titleAlign: 'center',columnAlign:'left'}
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