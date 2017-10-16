:::demo 固定表头、固定列

```html
<template>
    <div>
        <v-table
             :width="1100"
             :height="200"
             :columns="columns"
             :table-data="tableData"
             even-bg-color="#f4f4f4"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
        ></v-table>
    </div>
</template>

<script>

    export default{
        name: 'frozen-title-columns',
        data(){
            return {
                 tableData: [
                           {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                           {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                           {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                           {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                           {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                    ],
                    columns: [
                           {field: 'name', title:'姓名', width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                           {field: 'tel', title: '手机号码', width: 280, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                           {field: 'hobby', title: '爱好', width: 380, titleAlign: 'center',columnAlign:'center'},
                           {field: 'address', title: '地址', width: 430, titleAlign: 'center',columnAlign:'left'}
                    ]
            }
        }
    }
</script>
```
:::