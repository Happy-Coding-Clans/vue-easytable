:::demo 通过传入回调函数 ‘cell-merge’ 设置要合并的单元格

```html
<template>
    <div>
        <v-table
             :width="1100"
             :height="300"
             :columns="columns"
             :table-data="tableData"
             even-bg-color="#f4f4f4"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
             :cell-merge="cellMerge"
        ></v-table>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default{
        name: 'frozen-title-columns',
        data(){
            return {
                tableData: [{"name":"赵伟","gender":"男","birthday":'1963-7-9',"height":"183","email":"zhao@gmail.com","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                            {"name":"李伟","gender":"男","birthday":'2003-12-7',"height":"166","email":"li@gmail.com","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                            {"name":"孙伟","gender":"女","birthday":'1993-12-7',"height":"186","email":"sun@gmail.com","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                            {"name":"周伟","gender":"女","birthday":'1993-12-7',"height":"188","email":"zhou@gmail.com","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                            {"name":"吴伟","gender":"男","birthday":'1993-12-7',"height":"160","email":"wu@gmail.com","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"},
                            {"name":"冯伟","gender":"女","birthday":'1993-12-7',"height":"168","email":"feng@gmail.com","tel":"133*****3793","hobby":"钢琴、书法、唱歌","address":"上海市金山区龙胜路143号一层"},
                            {"name":"褚伟","gender":"男","birthday":'1993-12-7',"height":"170","email":"zhu@gmail.com","tel":"189*****2345","hobby":"钢琴、书法、唱歌","address":"上海市闵行区都市路2988号2楼"},],
                columns:[
                       {field: 'name', title:'姓名', width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                       {field: 'gender', title:'性别', width: 150, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                       {field: 'tel', title: '手机号码', width: 180, titleAlign: 'center',columnAlign:'center', isFrozen: false},
                       {field: 'birthday', title: '出生日期', width: 180, titleAlign: 'center',columnAlign:'center'},
                       {field: 'hobby', title: '爱好', width: 380, titleAlign: 'center',columnAlign:'center'},
                       {field: 'address', title: '地址', width: 430, titleAlign: 'center',columnAlign:'left'}
                     ]
            }
        },
        methods: {

            cellMerge(rowIndex,rowData,field){
                if (field === 'name' && rowData[field] === '李伟') {
                    return {
                        colSpan: 2,
                        rowSpan: 1,
                        content: '<span style="color:red">单元格 colSpan</span>',
                        componentName: ''

                    }
                } else if (rowIndex === 3 && field === 'gender') {

                    return {
                        colSpan: 1,
                        rowSpan: 3,
                        content: '<span style="color:red">单元格 rowSpan</span>',
                        componentName: ''
                    }

                }else if (rowIndex === 2 && field === 'birthday') {

                        return {
                            colSpan: 2,
                            rowSpan: 3,
                            content:'',
                            componentName:'table-cell-merge',
                        }
                }
            }
        }
    }

        // 自定义列组件
        Vue.component('table-cell-merge',{
            template:`<span style="color:red">
               单元格 rowSpan 和 colSpan 同时使用
            </span>`,
            props:{
                rowData:{
                    type:Object
                },
                field:{
                    type:String
                },
                index:{
                    type:Number
                }
            }
        })
</script>
```
:::