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
                   @actionCallBack="actionCallBack"
        ></easyTable>
    </div>



</template>

<script>
    import easyTable from '../../src/main.vue'
    import mockData from '../../mockServer/simpleData'

    export default{
        name: 'frozen-columns',
        components: {
            easyTable
        },
        data(){
            return {
                tables: {
                    multipleSort:false,
                    width: 1300,
                    minWidth: 600,
                    height: 600,
                    minHeight: 300,
                    tableData: [],
                    titleRows:[
                     /*   [
                            {fields: ['name'], title: '姓名', align: 'center'},
                            {fields: ['gender','nickname','birthday','height'], title: '基本信息', align: 'center',colspan:4},
                            /!*{field: 'gender', title: '性别', width: 150, align: 'center'},*!/
                            {fields: ['tel','email','hobby','address','job'], title: '其他', align: 'center',colspan:5},
                        ],*/
                        [
                            {fields: ['name'], title: '姓名', align: 'center',orderBy:'desc'},
                            {fields: ['gender'], title: '性别', align: 'center',orderBy:'asc',rowspan:2,},
                            {fields: ['nickname'], title: '昵称', align: 'center',orderBy:'desc'},
                            {fields: ['birthday'], title: '出生日期', align: 'center'},
                            {fields: ['height'], title: '身高', align: 'center'},
                            {fields: ['tel'], title: '手机号码', align: 'center'},
                            {fields: ['email'], title: '邮箱', align: 'center'},
                            {fields: ['hobby'], title: '爱好', align: 'center'},
                            {fields: ['address'], title: '家庭地址', align: 'center'},
                            {fields: ['job'], title: '职业', align: 'center'}
                        ],
                        [
                            {fields: ['name'], title: '姓名', align: 'center'},
                           /* {fields: ['gender'], title: '性别', align: 'center',rowspan:2},*/
                            {fields: ['nickname'], title: '昵称', align: 'center',orderBy:'desc'},
                            {fields: ['birthday'], title: '出生日期', align: 'center'},
                            {fields: ['height'], title: '身高', align: 'center'},
                            {fields: ['tel'], title: '手机号码', align: 'center'},
                            {fields: ['email'], title: '邮箱', align: 'center'},
                            {fields: ['hobby'], title: '爱好', align: 'center'},
                            {fields: ['address'], title: '家庭地址', align: 'center'},
                            {fields: ['job'], title: '职业', align: 'center'}
                        ],
                        [
                            {fields: ['name'], title: '姓名', align: 'center'},
                            {fields: ['gender'], title: '性别', align: 'center'},
                            {fields: ['nickname'], title: '昵称', align: 'center'},
                            {fields: ['birthday'], title: '出生日期', align: 'center'},
                            {fields: ['height'], title: '身高', align: 'center'},
                            {fields: ['tel'], title: '手机号码', align: 'center'},
                            {fields: ['email'], title: '邮箱', align: 'center'},
                            {fields: ['hobby'], title: '爱好', align: 'center'},
                            {fields: ['address'], title: '家庭地址', align: 'center'},
                            {fields: ['job'], title: '职业', align: 'center'}
                        ],
                        [
                            {fields: ['name'], title: '姓名', align: 'center'},
                            {fields: ['gender'], title: '性别', align: 'center'},
                            {fields: ['nickname'], title: '昵称', align: 'center'},
                            {fields: ['birthday'], title: '出生日期', align: 'center'},
                            {fields: ['height'], title: '身高', align: 'center'},
                            {fields: ['tel'], title: '手机号码', align: 'center'},
                            {fields: ['email'], title: '邮箱', align: 'center'},
                            {fields: ['hobby'], title: '爱好', align: 'center'},
                            {fields: ['address'], title: '家庭地址', align: 'center'},
                            {fields: ['job'], title: '职业', align: 'center'}
                        ]
                    ],
                    columns: [
                        {field: 'name', width: 150, align: 'center', isFrozen: true},
                        {field: 'gender', width: 150, align: 'center', isFrozen: true},
                        {field: 'nickname', width: 150, align: 'center', isFrozen: false},
                        {field: 'birthday', width: 150, align: 'center', isFrozen: false},
                        {field: 'height', width: 150, align: 'center', isFrozen: false},
                        {field: 'tel', width: 150, align: 'center', isFrozen: false},
                        {field: 'email', width: 150, align: 'center', isFrozen: false},
                        {field: 'hobby', width: 300, align: 'center', isFrozen: false},
                        {field: 'address', width: 300, align: 'center', isFrozen: false},
                        {field: 'job', width: 150, align: 'center', isFrozen: false}
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

            },

            actionCallBack(params){
                console.log(params)
            }
        },
        created(){
            this.getTableData()
        }
    }
</script>