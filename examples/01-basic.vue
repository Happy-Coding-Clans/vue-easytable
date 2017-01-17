<template>
    <div>
        基本的表格功能展示<br/><br/>
        <easy-table :width="tables.width"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
        ></easy-table>
    </div>
</template>


<script>



    import mockData from './mockServer/simpleData'


    export default{
        name: 'basic',
        data(){
            return {
                tables: {
                    width:1100,
                    tableData: [],
                    columns: [
                        {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center',columnAlign:'right'},
                        {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center',columnAlign:'center'},
                        {field: 'email', title: '邮箱', width: 150, titleAlign: 'center',columnAlign:'center'},
                        {field: 'hobby', title: '爱好', width: 280, titleAlign: 'center',columnAlign:'left'},
                        {field: 'job', title: '职业', titleAlign: 'center',columnAlign:'left'}
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
                }, 0)

            }
        },
        created(){
            this.getTableData()
        }
    }
</script>