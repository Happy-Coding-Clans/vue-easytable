<template>
    <div>
        列表头、列固定高级用法&nbsp;<span style="color:red;font-size:10px;">试试改变浏览器窗口大小看看变化...</span><br/><br/>
        <v-table
                :isHorizontalResize="tables.isHorizontalResize"
                :isVerticalResize="tables.isVerticalResize"
                :width="tables.width"
                :minWidth="tables.minWidth"
                :height="tables.height"
                :minHeight="tables.minHeight"
                :columns="tables.columns"
                :tableData="tables.tableData"
        ></v-table>
    </div>
</template>

<script>

    import mockData from './mockServer/simpleData'


    export default{
        name: 'frozen-title-columns-advanced',
        data(){
            return {
                tables: {
                    isHorizontalResize: true,
                    isVerticalResize: true,
                    width: 1100,
                    minWidth: 800,
                    height: 430,
                    minHeight: 250,
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