<template>
    <div>
        基本的表格功能展示<br/><br/>
        <easytable :width="tables.width"
                   :minWidth="tables.minWidth"
                   :height="tables.height"
                   :minHeight="tables.minHeight"
                   :rowHeight="tables.rowHeight"
                   :multipleSort="tables.multipleSort"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
                   @actionCallBack="actionCallBack"
        ></easytable>
    </div>
</template>

<script>

    import easytable from '../../src/vue-easytable.vue'
    import mockData from '../../mockServer/simpleData'

    export default{
        name: 'basic',
        components: {
            easytable
        },
        data(){
            return {
                tables: {
                    width: 1300,
                    minWidth: 600,
                    height: 700,
                    minHeight: 300,
                    rowHeight:35,
                    tableData: [],
                    multipleSort: true,
                    columns: [
                        {fileld: 'img', title: '头像', width: 50, align: 'center', isFrozen: true,
                            format: function (rowData) {
                                var src = require('../../libs/imgs/'+rowData.img)
                                return '<img height="33px" width="35px" src="'+src+'" />'
                            }
                        },
                        {fileld: 'name', title: '姓名', width: 150, align: 'center', isFrozen: true,orderBy:''},
                        {fileld: 'gender', title: '性别', width: 150, align: 'center', isFrozen: true,orderBy:''},
                        {fileld: 'nickname', title: '昵称', width: 150, align: 'center', isFrozen: false},
                        {fileld: 'birthday', title: '出生日期', width: 150, align: 'center', isFrozen: false,orderBy:''},
                        {fileld: 'height', title: '身高', width: 150, align: 'center', isFrozen: false},
                        {fileld: 'tel', title: '手机号码', width: 150, align: 'center', isFrozen: false},
                        {fileld: 'email', title: '邮箱', width: 150, align: 'center', isFrozen: false,
                            format:function (rowData) {
                                if (rowData.email.length>1){
                                    return '<a href="https://github.com/huangshuwei/vue-easytable" target="_blank">'+rowData.email+'</a>'
                                }
                                return rowData.email
                            }
                        },
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