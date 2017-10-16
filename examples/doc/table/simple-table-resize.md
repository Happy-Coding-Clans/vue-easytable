:::demo 自适应分为表格高度适应和表格宽度自适应。如果是表格宽度自适应需要满足下面条件：1、通过 is-horizontal-resize 属性设置横向自适应；2、通过 isResize 属性设置哪些列需要自适应（所有列都可以设置，达到所有列自适应）；3、通过 style="width:100%" 设置显示比例；4、每个列必须提供宽度，这个宽度是自适应的最小宽度；如果是高度自适应需要设置is-vertical-resize 属性
```html
<template>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="columns"
            :table-data="tableData"
            :on-row-click="onRowClick"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
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
                    {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'left',isResize:true}
                ],
                onRowClick(rowIndex, rowData){
                    console.log(rowIndex,rowData);
                }
            }
        }
    }
</script>
```
:::