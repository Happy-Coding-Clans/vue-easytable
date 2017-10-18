:::demo 通过给 `columns` 设置 `type: 'selection'`，即可自动开启多选功能。<br>**回调事件**：<br> - `select-all`回调函数，全选后触发，回调参数为 `selection`，已选项。<br> - `select-change`回调函数，选中某一项触发，回调参数为 `selection` 和 `rowData`，分别为已选项和刚选择的项 <br> - `select-group-change`回调函数，任意选中项发生变化时就会触发，回调参数为 `selection`，已选项。
```html
<template>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :select-all="selectALL"
            :select-change="selectChange"
            :select-group-change="selectGroupChange"
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
                    columns: [
                        {width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection'},
                        {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                        {field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'left',isResize:true}
                    ]
            }
        },
         methods:{
                 //
                 selectALL(selection){

                     console.log('select-aLL',selection);
                 },

                 selectChange(selection,rowData){
                     console.log('select-change',selection,rowData);
                 },

                 selectGroupChange(selection){
                     console.log('select-group-change',selection);
                 }
         }
    }
</script>
```
:::