:::demo 当table需要显示隐藏切换时，需要使用table强制自适应，通过调用table组件的方法 resize();备注：由于元素在隐藏时无法获取隐藏内元素的宽高，所有需要手动强制自适应。如果有更好的方式，这个方法后期将会遗弃！
```html
<template>
   <div>
         <input type="button" value="tab1" @click="tabClick(1)"/>
         <input type="button" value="tab2" @click="tabClick(2)"/>
         <div v-show="tab==1">
             <v-table
                     ref="table1"
                     is-horizontal-resize
                     style="width:100%"
                     :columns="tables1.columns"
                     :table-data="tables1.tableData"
                     even-bg-color="#f4f4f4"
             ></v-table>
         </div>
         <div v-show="tab==2">
             <v-table
                     ref="table2"
                     is-horizontal-resize
                     style="width:100%"
                     :columns="tables2.columns"
                     :table-data="tables2.tableData"
                     even-bg-color="#f4f4f4"
                     row-hover-color="#eee"
                     row-click-color="#edf7ff"
             ></v-table>
         </div>
   </div>
</template>

<script>

    export default{
        name: 'frozen-title-columns',
        data(){
            return {
                tab:1,

                tables1: {
                    tableData: [
                            {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                            {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                            {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                            {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                            {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                    ],
                    columns: [
                        {field: 'name', title: '姓名1', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: true,formatter: function (rowData, index) {
                            return '表格1111111111';
                        }},
                        {field: 'tel', title: '手机号码1', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true,formatter: function (rowData, index) {
                            return '表格1111111111';
                        }},
                        {field: 'hobby', title: '爱好1', width: 190, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                        {field: 'address', title: '地址1', width: 200, titleAlign: 'center',columnAlign:'left', isFrozen: false,isResize:true},
                    ]
                },

                tables2: {
                    tableData: [
                        {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                        {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                        {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                        {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                        {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                    ],
                    columns: [
                        {field: 'name', title: '姓名2', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: true,formatter: function (rowData, index) {
                            return '表格222222222';
                        }},
                        {field: 'tel', title: '手机号码2', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true,formatter: function (rowData, index) {
                            return '表格222222222';
                        }},
                        {field: 'hobby', title: '爱好2', width: 190, titleAlign: 'center',columnAlign:'center', isFrozen: false,isResize:true},
                        {field: 'address', title: '地址2', width: 200, titleAlign: 'center',columnAlign:'left', isFrozen: false,isResize:true},
                    ]
                }
            }
        },
        methods: {

            tabClick(tabId){
                 this.tab = tabId;
                 this.$refs['table'+tabId].resize();

            }
        }
    }
</script>
```
:::