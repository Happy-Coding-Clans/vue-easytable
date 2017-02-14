<template>
    <div>
        分页组件展示<br/><br/>
        <v-pagination
                :total="total"
                size="small"
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
        ></v-pagination>
        <br /> <br />
        <v-pagination
                :total="total"
                size="middle"
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
        ></v-pagination>
        <br /> <br />
        <v-pagination
                :total="total"
                size="large"
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