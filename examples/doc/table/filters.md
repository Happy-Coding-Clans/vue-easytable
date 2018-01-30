
:::demo 通过给 `columns` 数据的项，设置 `filters`，可进行筛选，`filters` 接收一个数组<br> 如果指定 `filterMultiple: true`，则使用多选，默认为单选。<br>指定一个筛选函数 `filterMethod` 才能进行数据筛选功能，`filterMethod` 接收的参数为筛选的结果，通过该参数改变原数据达到筛选的目的。<br> 注意：筛选功能不会在组件内部处理数据
```html
<template>
    <div>
        <v-table
                is-horizontal-resize
                style="width:100%"
                :columns="columns"
                :table-data="tableData"
                :filter-method="filterMethod"
        ></v-table>
    </div>
</template>

<script>

    export default{
        name: 'filters',
        data(){
            return {
                tableData: [],
                columns: [
                    {field: 'name', title: '姓名', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true,
                        filterMultiple: true,
                        filters: [{
                            label: '孙伟',
                            value: '孙伟',
                        }, {
                            label: '吴伟',
                            value: '吴伟',
                        }, {
                            label: '周伟',
                            value: '周伟',
                        }],
                        isFrozen:true
                    },
                    {field: 'gender', title: '性别', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true,
                        filterMultiple: false,
                        filters: [{
                            label: '男',
                            value: '男',
                        }, {
                            label: '女',
                            value: '女',
                        }]
                    },
                    {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center',columnAlign:'center',isResize:true},
                    {field: 'address', title: '地址',width: 280, titleAlign: 'center',columnAlign:'left',isResize:true}
                ]
            }
        },
        methods: {

            // 数据筛选
            filterMethod(filters){

                let tableData = this.getTableData();

                // filter gender
                if (Array.isArray(filters.gender)){

                    tableData = tableData.filter(item => item.gender === filters.gender[0])
                }

                // filter name
                if (Array.isArray(filters.name)){

                    tableData = tableData.filter(item => filters.name.indexOf(item.name) > -1);
                }

                this.tableData = tableData;
            },

            getTableData(){

                return [
                    {"name":"赵伟","gender":"女","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                    {"name":"李伟","gender":"女","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                    {"name":"孙伟","gender":"男","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                    {"name":"周伟","gender":"女","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                    {"name":"吴伟","gender":"男","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                ]
            }
        },

        created(){

            this.tableData = this.getTableData();
        }
    }
</script>
```
:::

