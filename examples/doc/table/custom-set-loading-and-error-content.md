:::demo 自定义loading 以及 错误信息
```html
<template>
    <div>
        <input type="button" value="重新请求" @click="request()"/>

        <v-table
                is-horizontal-resize
                :loading-content="tableConfig.loadingContent"
                :error-content="tableConfig.errorContent"
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
                    loadingContent:'<span>加载中...</span>',
                    errorContent:'<a href="javascript:void(0);">刷新重试</a>',
                    isLoading: true, // 是否正在加载中
                    tableData: [],
                    columns: [
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize: true},
                        {field: 'gender', title: '性别', width: 80, titleAlign: 'center', columnAlign: 'center',isResize: true},
                        {field: 'height', title: '身高', width: 80, titleAlign: 'center', columnAlign: 'center',isResize: true},
                         {field: 'address',title: '地址', width: 280,titleAlign: 'center',columnAlign: 'left',isResize: true}
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
                        this.tableConfig.tableData = [];
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