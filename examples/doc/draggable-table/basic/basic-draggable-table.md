
:::demo v-draggable-table 继承了table的API，在此基础上添加start(拖拽开始事件)和end(拖拽结束事件)

```html
<template>
    <div>
        <v-draggable-table
                :width="1000"
                :columns="columns"
                :table-data="tableData"
                @start="startDrag"
                @end="endDrag"
        ></v-draggable-table>
    </div>
</template>

<script>
    export default{
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
                    {field: 'name', title:'姓名', width: 100, titleAlign: 'center',columnAlign:'center'},
                    {field: 'tel', title: '手机号码', width: 260, titleAlign: 'center',columnAlign:'center'},
                    {field: 'hobby', title: '爱好', width: 330, titleAlign: 'center',columnAlign:'center'},
                    {field: 'address', title: '地址', titleAlign: 'center',columnAlign:'left'}
                ]
            }
        },

       methods:{
           startDrag(data){
               console.log('startDrag: ', data)
           },
           endDrag(data){
               console.log('endDrag: ', data)
           }
       }

    }
</script>
```
:::

