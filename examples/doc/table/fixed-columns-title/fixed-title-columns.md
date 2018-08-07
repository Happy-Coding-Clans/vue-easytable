:::demo **固定表头**：<br> - 只需要设置`height`属性即可，如果设置的高度大于实际表格的高度，将以实际表格高度为准<br> **固定列**：<br> - 通过给**需要固定的列**，设置 `isFrozen: true` 即可

```html
<template>
    <div>
        <v-table
             :width="970"
             :height="200"
             :columns="columns"
             :table-data="tableData"
             even-bg-color="#f4f4f4"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             :actions="[{key:'detail',text:'详情',class:'info'},{key:'update',text:'更新',class:'success'},{key:'delete',text:'删除',class:'error'}]"
             :action-view-width="180"
             @do-action="doAction"
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
        },
        methods:{
        	doAction(key, row){
        		console.log('do action', key, row);
        	}
        }
    }
</script>
```
:::