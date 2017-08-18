:::demo 如果加载等待时间较长，建议使用loading
```html
<template>
    <div>
        <input type="button" value="重新请求" @click="request()"/>
        <v-table
                is-horizontal-resize
                :is-loading="tableConfig.isLoading"
                style="width:100%"
                :columns="tableConfig.columns"
                :table-data="tableConfig.tableData"
                :on-row-click="tableConfig.onRowClick"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
        ></v-table>
    </div>
</template>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data() {
            return {
                tableConfig: {
                    isLoading: true, // 是否正在加载中
                    tableData: null,
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center'},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center', columnAlign: 'center'},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center', columnAlign: 'right'},
                        {
                            field: 'tel',
                            title: '手机号码',
                            width: 150,
                            titleAlign: 'center',
                            columnAlign: 'center',
                            isResize: true
                        },
                        {field: 'email', title: '邮箱', width: 150, titleAlign: 'center', columnAlign: 'center'},
                        {
                            field: 'hobby',
                            title: '爱好',
                            width: 280,
                            titleAlign: 'center',
                            columnAlign: 'left',
                            isResize: true
                        },
                        {
                            field: 'job',
                            title: '职业',
                            width: 280,
                            titleAlign: 'center',
                            columnAlign: 'left',
                            isResize: true
                        }
                    ],
                    titleBgColor: "#e1e1e1",
                    onRowClick(rowIndex, rowData){
                        console.log(rowIndex);
                        console.log(rowData);
                    }
                }
            }
        },

        methods: {

            request(){
                this.tableConfig.isLoading = true;

                var r = Math.random();

                setTimeout(x => {
                    this.tableConfig.isLoading = false;

                    if (r > 0.5) {
                        this.tableConfig.tableData = null;
                    } else {
                        this.tableConfig.tableData = mockData;
                    }
                }, 3000);
            }
        },

        created(){

            this.request();
        }
    }
</script>
```
:::