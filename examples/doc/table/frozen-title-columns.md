:::demo 固定表头、固定列

```html
<template>
    <div>
        <v-table
             :width="1100"
             :height="430"
             :columns="tableConfig.columns"
             :table-data="tableConfig.tableData"
             even-bg-color="#f4f4f4"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
        ></v-table>
    </div>
</template>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        name: 'frozen-title-columns',
        data(){
            return {
                tableConfig: {
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                        {field: 'gender', title: '性别', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'height', title: '身高', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'tel', title: '手机号码', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'email', title: '邮箱', width: 190, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                        {field: 'hobby', title: '爱好', width: 230, titleAlign: 'center',columnAlign:'left', isFrozen: false},
                        {field: 'job', title: '职业', width: 200, titleAlign: 'center',columnAlign:'left', isFrozen: false},
                    ]
                }
            }
        },
        methods: {
            // 模拟获取数据
            getTableData(){
                var self = this

                setTimeout(function () {
                    self.tableConfig.tableData = mockData
                }, 100)
            }
        },
        created(){
            this.getTableData()
        }
    }
</script>
```
:::