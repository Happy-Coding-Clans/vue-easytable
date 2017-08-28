:::demo 固定表头、固定列

```html
<template>
    <div>
        <v-table
             :width="1100"
             :height="350"
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
                           {field: 'name', title:'姓名', width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                           {field: 'tel', title: '手机号码', width: 280, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                           {field: 'hobby', title: '爱好', width: 380, titleAlign: 'center',columnAlign:'center'},
                           {field: 'address', title: '地址', width: 430, titleAlign: 'center',columnAlign:'left'}
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