<template>
    <div style="width:1350px">
        基本的表格功能展示<br/><br/>
        <easyTable :width="tables.width"
                   :minWidth="tables.minWidth"
                   :height="tables.height"
                   :minHeight="tables.minHeight"
                   :multipleSort="tables.multipleSort"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   :isHorizontalResize = "tables.isHorizontalResize"
                   :isVerticalResize = "tables.isVerticalResize"
                   :titleRowHeight="tables.titleRowHeight"
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
        name: 'basic',
        components: {
            easyTable
        },
        data(){
            return {
                tables: {
                   /* isHorizontalResize:false,
                    isVerticalResize:false,
                    width:1200,
                    height:600,*/
                 /*   minWidth:1000,
                    minHeight:500,*/
                    width:1500,
               /*     height:300,*/
                    titleRowHeight:50,
                    tableData: [],
                    columns: [
                        {field: 'name', title:'<span style="color:red;">姓名</span>', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'nickname', title: '昵称', width: 80, titleAlign: 'center',columnAlign:'center'},
                        {field: 'birthday', title: '出生日期', width: 100, titleAlign: 'center',columnAlign:'center'},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center',columnAlign:'right'},
                        {field: 'tel', title: '手机号码', width: 100, titleAlign: 'center',columnAlign:'center'},
                        {field: 'email', title: '邮箱', width: 100, titleAlign: 'center',columnAlign:'center'},
                        {field: 'hobby', title: '爱好', width: 200, titleAlign: 'center',columnAlign:'left'},
                        {field: 'address', title: '家庭地址', width: 230, titleAlign: 'center',columnAlign:'left',overflowTitle:true},
                        {field: 'job', title: '职业', width: 0, titleAlign: 'center',columnAlign:'center'}
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
                }, 600)

            }
        },
        created(){
            this.getTableData()
        }
    }
</script>