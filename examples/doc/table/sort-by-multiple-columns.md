:::demo 可以设置根据多个字段进行排序
```html
<template>
    <div>
        <v-table
               is-horizontal-resize
               style="width:100%"
               multipleSort
               :columns="tables.columns"
               :table-data="tables.tableData"
               @sort-change="sortChange"
               row-hoverColor="#eee"
               row-click-color="#edf7ff"
        ></v-table>
    </div>
</template>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        name: 'sort-by-multiple-columns',
        data(){
            return {
                tables: {
                    tableData: [],
                    columns: [
                         {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center',orderBy:'asc',isResize:true},
                         {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center',columnAlign:'center',orderBy:'desc',isResize:true},
                         {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center',columnAlign:'center',isResize:true},
                         {field: 'address', title: '地址',width: 280, titleAlign: 'center',columnAlign:'left',isResize:true}
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
            sortChange(params){
                console.log(params)
            }
        },
        created(){
            this.getTableData()
        }
    }
</script>
```
:::