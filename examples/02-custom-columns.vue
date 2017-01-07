<template>
    <div>
        自定义列<br/><br/>
        <easyTable :width="tables.width"
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

    import easyTable from '../src/main.vue'
    import '../src/css/basic.css'

    import mockData from './mockServer/simpleData'

    export default{
        name: 'custom-columns',
        components: {
            easyTable
        },
        data(){
            return {
                tables: {
                    width: 1100,
                    tableData: [],
                    multipleSort: true,
                    columns: [
                        {
                            title: '排序', width: 50, titleAlign: 'center',columnAlign:'center', isFrozen: true,
                            formatter: function (rowData, index) {
                                return index < 3 ? '<span style="color:red;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
                            }
                        },
                        {
                            field: 'img', title: '头像', width: 50, titleAlign: 'center',columnAlign:'center', isFrozen: true,
                            formatter: function (rowData) {
                                var src = require('./imgs/' + rowData.img)
                                return '<img height="33px" width="33px" src="' + src + '" />'
                            }
                        },
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'tel', title: '手机号码', width: 100, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {
                            field: 'email', title: '邮箱', width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: false,
                            formatter: function (rowData) {
                                if (rowData.email.length > 1) {
                                    return '<a href="https://github.com/huangshuwei/vue-easytable" target="_blank">' + rowData.email + '</a>'
                                }
                                return "-"
                            }
                        },
                        {field: 'hobby', title: '爱好', width: 200, titleAlign: 'center',columnAlign:'left', isFrozen: false},
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