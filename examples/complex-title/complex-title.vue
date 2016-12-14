<template>
    <div>
        固定表格<br/><br/>
        <easyTable :width="tables.width"
                   :minWidth="tables.minWidth"
                   :height="tables.height"
                   :minHeight="tables.minHeight"
                   :multipleSort="tables.multipleSort"
                   :titleRows="tables.titleRows"
                   :columns="tables.columns"
                   :tableData="tables.tableData"
        ></easyTable>
    </div>


</template>

<script>

    import easyTable from '../../参考/vue-easytable_new.vue'
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
                    height: 600,
                    minHeight: 300,
                    tableData: [],
                    titleRows:[
                        [
                            {fields: ['name','gender'], title: '姓名、性别', width: 300, align: 'center', isFrozen: false,colspan:2,rowspan:2},
                            /*{field: 'gender', title: '性别', width: 150, align: 'center', isFrozen: false},*/
                            {fields: ['nickname'], title: '昵称', width: 150, align: 'center', isFrozen: false},
                            {fields: ['birthday'], title: '出生日期', width: 150, align: 'center', isFrozen: false},
                            {fields: ['height'], title: '身高', width: 150, align: 'center', isFrozen: false},
                            {fields: ['tel'], title: '手机号码', width: 150, align: 'center', isFrozen: false},
                            {fields: ['email'], title: '邮箱', width: 150, align: 'center', isFrozen: false},
                            {fields: ['hobby'], title: '爱好', width: 300, align: 'center', isFrozen: false},
                            {fields: ['address'], title: '家庭地址', width: 300, align: 'center', isFrozen: false},
                            {fields: ['job'], title: '职业', width: 150, align: 'center', isFrozen: false}
                        ]
                    ],
                    columns: [
                        {field: 'name', title: '姓名', width: 150, align: 'center', isFrozen: true},
                        {field: 'gender', title: '性别', width: 150, align: 'center', isFrozen: true},
                        {field: 'nickname', title: '昵称', width: 150, align: 'center', isFrozen: false},
                        {field: 'birthday', title: '出生日期', width: 150, align: 'center', isFrozen: false},
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