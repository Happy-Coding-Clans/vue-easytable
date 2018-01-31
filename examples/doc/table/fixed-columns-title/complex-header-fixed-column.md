:::demo 表头合并需要设置 `titleRows`对象：<br>`titleRows`数组中的每一项代表表头的每一行，通过 `fields`属性设置当前要合并的表头列，如果需要和并列则使用`colspan`,如果需要行合并则设置`rowspan`

```html
<template>
   <v-table
            :width="1100"
            :height="280"
            even-bg-color="#f2f2f2"
            :title-rows="titleRows"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
    ></v-table>
</template>

<style>
    .title-cell-class-name-test1 {
        background-color: #2db7f5;
    }
    .title-cell-class-name-test2 {
        background-color: #f60;
    }
</style>

<script>

    export default{
        data(){
            return {
                multipleSort: false,
                tableData: [
                        {"name":"赵伟","gender":"男","height":"183","email":"zhao@gmail.com","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                        {"name":"李伟","gender":"男","height":"166","email":"li@gmail.com","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                        {"name":"孙伟","gender":"女","height":"186","email":"sun@gmail.com","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                        {"name":"周伟","gender":"女","height":"188","email":"zhou@gmail.com","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                        {"name":"吴伟","gender":"男","height":"160","email":"wu@gmail.com","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"},
                        {"name":"冯伟","gender":"女","height":"168","email":"feng@gmail.com","tel":"133*****3793","hobby":"钢琴、书法、唱歌","address":"上海市金山区龙胜路143号一层"}
                ],
                columns: [
                     {
                        field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',
                        formatter: function (rowData, index) {
                            return index < 3 ? '<span style="color:red;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
                        }, isFrozen: true
                    },
                    {field: 'name', width: 100, columnAlign: 'center', isFrozen: true},
                    {field: 'gender', width: 150, columnAlign: 'center', isFrozen: true},
                    {field: 'height', width: 150, columnAlign: 'center', isFrozen: true},
                    {field: 'tel', width: 190, columnAlign: 'center'},
                    {field: 'email', width: 230, columnAlign: 'center'},
                    {field: 'hobby', width: 230, columnAlign: 'center'},
                    {field: 'address', width: 330, columnAlign: 'left'}
                ],

                titleRows: [
                             [{fields: ['custome'], title: '排序', titleAlign: 'center', rowspan: 2},
                              {fields: ['name', 'gender', 'height'], title: '基础信息', titleAlign: 'center', colspan: 3},
                              {fields: ['tel', 'email'], title: '联系方式', titleAlign: 'center', colspan: 2},
                              {fields: ['hobby','address'], title: '爱好及地址', titleAlign: 'center', rowspan: 2,colspan: 2}],

                             [{fields: ['name'], title: '姓名', titleAlign: 'center'},
                              {fields: ['gender'], title: '性别', titleAlign: 'center', orderBy: 'asc'},
                              {fields: ['height'], title: '身高', titleAlign: 'center', orderBy: 'desc'},
                              {fields: ['tel'], title: '手机号码', titleAlign: 'center'},
                              {fields: ['email'], title: '邮箱', titleAlign: 'center'}],

                             [{fields: ['custome','name','gender','height'], title: '平均值', titleAlign: 'center', colspan: 4,titleCellClassName:'title-cell-class-name-test1'},
                              {fields: ['tel'], title: '000', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'},
                              {fields: ['email'], title: '111', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'},
                              {fields: ['hobby'], title: '222', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'},
                              {fields: ['address'], title: '333', titleAlign: 'center',titleCellClassName:'title-cell-class-name-test2'}]
                           ]
            }
        }
    }
</script>
```
:::
