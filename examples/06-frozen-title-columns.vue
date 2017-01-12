<template>
    <div>
        固定表列、表头<br/><br/>
        <easyTable :width="tables.width"
                   :height="tables.height"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   evenBgColor="#f4f4f4"
        ></easyTable>
    </div>
</template>

<script>

    import easyTable from 'easyTable'

    import mockData from './mockServer/simpleData'


    export default{
        name: 'frozen-title-columns',
        components: {
            easyTable
        },
        data(){
            return {
                tables: {
                    width: 1100,
                    height:430,
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'gender', title: '性别', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'height', title: '身高', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'tel', title: '手机号码', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'email', title: '邮箱', width: 190, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'hobby', title: '爱好', width: 230, titleAlign: 'center',columnAlign:'left', isFrozen: false},
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