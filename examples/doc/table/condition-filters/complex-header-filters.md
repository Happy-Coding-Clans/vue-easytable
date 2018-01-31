:::demo 复杂表头表格使用筛选功能和简单表头表格使用方式类似，区别是 `filters` 以及 `filterMultiple`配置 是通过 `titleRows` 设置，详情见demo
 ```html

<template>
    <div>
        <v-table
                is-horizontal-resize
                style="width:100%"
                :columns="columns"
                :title-rows="titleRows"
                :table-data="tableData"
                :filter-method="filterMethod"
        ></v-table>
    </div>
</template>

<script>

    export default{
        name: 'complex-header-filters',
        data(){
            return {
                tableData: [],
                columns: [
                    {field: 'name', title: '姓名', width: 80, columnAlign:'center',isResize:true},
                    {field: 'gender', title: '手机号码', width: 50,columnAlign:'center',isResize:true},
                    {field: 'hobby', title: '爱好', width: 150,columnAlign:'center',isResize:true},
                    {field: 'address', title: '地址',width: 280,isResize:true}
                ],
                titleRows:[
                    [
                        {fields:["name","gender"],title:"基础信息", titleAlign: 'center', colspan: 2},
                        {fields: ['hobby'], title: '爱好', titleAlign: 'center',rowspan: 2},
                        {fields: ['address'], title: '地址', titleAlign: 'center',rowspan: 2}
                    ],
                    [
                        {fields: ['name'], title: '姓名', titleAlign: 'center',
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
                            }]},
                        {fields: ['gender'], title: '性别', titleAlign: 'center',
                            filterMultiple: false,
                            filters: [{
                                label: '男',
                                value: '男',
                            }, {
                                label: '女',
                                value: '女',
                            }]}
                    ]
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