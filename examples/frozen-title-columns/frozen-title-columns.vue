<template>
    <div>
        固定表格<br/><br/>
        <easyTable :width="tables.width"
                   :minWidth="tables.minWidth"
                   :height="tables.height"
                   :minHeight="tables.minHeight"
                   :multipleSort="tables.multipleSort"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
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


    export default{
        name: 'frozen-columns',
        components: {
            easyTable
        },
        data(){
            return {
                tables: {
                    width: 1300,
                    height:500,
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'gender', title: '性别', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'nickname', title: '昵称', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'birthday', title: '出生日期', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'height', title: '身高', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'tel', title: '手机号码', width: 130, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'email', title: '邮箱', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'hobby', title: '爱好', width: 230, titleAlign: 'center',columnAlign:'left', isFrozen: false},
                        {field: 'address', title: '家庭地址', width: 230, titleAlign: 'center',columnAlign:'left', isFrozen: false},
                        {field: 'job', title: '职业', width: 230, titleAlign: 'center',columnAlign:'left', isFrozen: false}
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

            }
        },
        created(){
            this.getTableData()
        }
    }
</script>