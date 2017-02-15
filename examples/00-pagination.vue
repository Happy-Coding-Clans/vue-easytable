<template>
    <div>
        分页组件展示<br/><br/>
        <v-pagination
                :total="total"
                size="small"
                :layout="layout"
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
        ></v-pagination>
        <br /> <br />
        <v-pagination
                :total="total"
                size="middle"
                :layout="layout"
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
        ></v-pagination>
        <br /> <br />
        <v-pagination
                :total="total"
                size="large"
                :layout="layout"
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
        ></v-pagination>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                total:600,
                layout:['total', 'prev', 'pager', 'next', 'sizer', 'jumper']
                //layout:[ 'prev','pager', 'next']
                /*pageSize:25,*/
                /*pageSizeOption:[25,50,100]*/
            }
        },
        methods:{
            pageChange(pageIndex){
                console.log(pageIndex)
            },

            pageSizeChange(pageSize){
                console.log(pageSize)
            }
        }
    }
</script>