:::demo 提示：如果存在禁用的 **选中项** 则一直为部分选中状态 <br> - 通过给 `table-data` 设置 `_checked: true` 可以默认选中当前项<br> - 通过给 `table-data` 设置 `_disabled: true` 可以禁止选择当前项
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
                    {"name":"禁止取消","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼",_checked:true,_disabled:true},
                    {"name":"禁止选中","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号",_disabled:true},
                    {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号",_checked:true},
                    {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                ],
                columns: [
                    {width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection',isFrozen:true},
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