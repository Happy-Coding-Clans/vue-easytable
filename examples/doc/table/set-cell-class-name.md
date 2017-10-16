
:::demo 设置表头单元格：通过‘titleCellClassName’属性给表头的单元格设置class；设置列单元格:通过‘columnCellClassName’方法给列的单元格设置class

```html
<template>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="columns"
            :table-data="tableData"
            :on-row-click="onRowClick"
            :column-cell-class-name="columnCellClass"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
    ></v-table>
</template>

<style>
    .title-cell-class-name-test{
        background-color: #f60;
        color:#fff;
    }
    .column-cell-class-name-test{
        background-color: #187;
    }
    .column-cell-class-name-test .v-table-body-cell{
        border-color: #187;
    }
    .column-cell-class-name-test2{
        background-color: #2db7f5;
        font-weight: bold;
    }
    .column-cell-class-name-test2 .v-table-body-cell{
        border-color: #2db7f5;
    }
</style>

<script>

    export default{
        data() {
            return {
                   tableData: [
                       {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                       {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                       {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                       {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                       {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                    ],
                   columns: [
                      {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true},
                      {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center',columnAlign:'center',isResize:true},
                      {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center',columnAlign:'center',titleCellClassName:'title-cell-class-name-test',isResize:true},
                      {field: 'address', title: '地址', width: 280, titleAlign: 'center',columnAlign:'left',isResize:true}
                   ],
                   onRowClick(rowIndex,rowData){
                       console.log(rowIndex);
                       console.log(rowData);
                   }
            }
        },
        methods:{

            columnCellClass(rowIndex,columnName,rowData){

                // 给三行column为‘hobby’的列设置className
                if (rowIndex === 1 && columnName==='hobby'){

                    return 'column-cell-class-name-test';
                }

                // 给第二行设置className
                if (rowIndex ===1){

                    return 'column-cell-class-name-test2';
                }

                // 给姓名为‘周伟’的行设置className
                if (rowData.name === '周伟'){

                    return 'column-cell-class-name-test';
                }
            }
        }
    }
</script>
```
:::