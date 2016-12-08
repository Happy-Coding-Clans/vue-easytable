<template>
    <div style="width: 1200px;margin: 0 auto;">
        基本的表格功能展示<br/><br/>
        <Easytable :width="tables.width"
                   :minWidth="tables.minWidth"
                   :height="tables.height"
                   :minHeight="tables.minHeight"
                   :multipleSort="tables.multipleSort"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   @actionCallBack="actionCallBack"
        ></Easytable>
    </div>
</template>

<script>

    import Easytable from '../../src/vue-easytable.vue'
    import mockData from '../../mockServer/simpleData'


    export default{
        name: 'basic',
        components: {
            Easytable,

        },
        data(){
            return {
                tables: {
                    width: 1100,
                    minWidth: 600,
                    height: 450,
                    minHeight: 300,
                    tableData: [],
                    multipleSort:false,
                    columns: [
                        {fileld: 'name', title: '姓名', width: 150, align: 'center', isFrozen: true},
                        {fileld: 'gender', title: '性别', width: 150, align: 'center', isFrozen: true,orderBy:'asc'},
                        {fileld: 'nickname', title: '昵称', width: 150, align: 'center', isFrozen: false},
                        {fileld: 'birthday', title: '出生日期', width: 150, align: 'center', isFrozen: false},
                        {fileld: 'height', title: '身高', width: 150, align: 'center', isFrozen: false,orderBy:''},
                        {fileld: 'tel', title: '手机号码', width: 150, align: 'center', isFrozen: false},
                        {fileld: 'email', title: '邮箱', width: 150, align: 'center', isFrozen: false},
                        {fileld: 'hobby', title: '爱好', width: 300, align: 'center', isFrozen: false},
                        {fileld: 'address', title: '家庭地址', width: 300, align: 'center', isFrozen: false},
                        {fileld: 'job', title: '职业', width: 150, align: 'center', isFrozen: false}
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