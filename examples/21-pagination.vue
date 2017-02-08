<template>
    <div>
        分页组件展示<br/><br/>
        <v-pagination
                :page-count="pageCount"
                :page-index="pageIndex"
                :page-size="pageSize"
                :page-size-option="pageSizeOption"
                @pagingCallBack="pagingCallBack"
        ></v-pagination>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                pageCount:32,
                pageIndex:1,
                pageSize:100,
                pageSizeOption:[25,50,100]
            }
        },
        methods:{
            pagingCallBack(pageIndex){
                this.pageIndex = pageIndex
            }
        }
    }
</script>