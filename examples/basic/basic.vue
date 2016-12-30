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
                    titleRowHeight:50,
                    width:1250,
                    tableData: [],
                    columns: [
                        {field: 'name', title:'<span style="color:red;">姓名</span>', width: 80, align: 'center'},
                        {field: 'gender', title: '性别', width: 80, align: 'center'},
                        {field: 'nickname', title: '昵称', width: 80, align: 'center'},
                        {field: 'birthday', title: '出生日期', width: 100, align: 'center'},
                        {field: 'height', title: '身高', width: 80, align: 'center', isFrozen: false},
                        {field: 'tel', title: '手机号码', width: 100, align: 'center', isFrozen: false},
                        {field: 'email', title: '邮箱', width: 100, align: 'center', isFrozen: false},
                        {field: 'hobby', title: '爱好', width: 200, align: 'center', isFrozen: false},
                        {field: 'address', title: '家庭地址', width: 260, align: 'center', isFrozen: false},
                        {field: 'job', title: '职业', width: 150, align: 'center', isFrozen: false}
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