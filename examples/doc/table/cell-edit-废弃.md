
:::demo 通过给 `columns` 设置 `isEdit:true` 开启单元格编辑。<br> **回调事件**： <br> - `cell-edit-done`回调函数，回调参数为 `newValue`、`oldValue`、`rowIndex`、`rowData`、`field`，并给`table-data`当前编辑的列赋值 <br> **提示**：由于直接通过操作DOM 会破坏响应式，通过在`cell-edit-done`回调函数中给 `table-data`编辑的列赋值，达到响应式的目的

```html
<template>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
    ></v-table>
</template>

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
                columns:  [
                       {field: 'name', title:'姓名', width: 80, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
                       {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
                       {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
                       {field: 'address', title: '地址', width: 280, titleAlign: 'center',columnAlign:'left',isEdit:true,isResize:true}
                 ]
            }
        },
        methods:{
             // 单元格编辑回调
            cellEditDone(newValue,oldValue,rowIndex,rowData,field){
                 console.log(newValue)
                 console.log(oldValue)
                 console.log(rowIndex)
                 console.log(rowData)
                 console.log(field)
            }
        }
    }
</script>
```
:::

