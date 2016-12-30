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
                    minWidth: 600,
                    height: 700,
                    minHeight: 300,
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 150, align: 'center', isFrozen: false},
                        {field: 'gender', title: '性别', width: 150, align: 'center', isFrozen: true},
                        {field: 'nickname', title: '昵称', width: 150, align: 'center', isFrozen: true},
                        {field: 'birthday', title: '出生日期', width: 150, align: 'center', isFrozen: true},
                        {field: 'height', title: '身高', width: 150, align: 'center', isFrozen: false},
                        {field: 'tel', title: '手机号码', width: 150, align: 'center', isFrozen: false},
                        {field: 'email', title: '邮箱', width: 150, align: 'center', isFrozen: false},
                        {field: 'hobby', title: '爱好', width: 300, align: 'center', isFrozen: false},
                        {field: 'address', title: '家庭地址', width: 300, align: 'center', isFrozen: false},
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