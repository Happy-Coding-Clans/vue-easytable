<template>

    <div class="v-table-empty">
        <!--表格无数据的提示信息-->
        <div class="v-table-empty-content"
             :style="{'height':contentHeight+'px','width':width+'px','top':titleHeight+'px'}">
            <div class="v-table-empty-inner"
                 :style="{'height':contentHeight+'px','width':'100%','line-height':contentHeight+'px'}"
                 v-html="getCurrentContent"></div>
        </div>

        <!--表格无数据的滚动条-->
        <div class="v-table-empty-scroll"
             :style="{'height':contentHeight+'px','width':rightViewWidth+'px','top':titleHeight+'px','left':leftViewWidth+'px'}">
            <div class="v-table-empty-inner" :style="{'height':'1px','width':(totalColumnsWidth-leftViewWidth)+'px'}"></div>
        </div>

    </div>

</template>

<script>

    export default{

        props: {

            // 表头的宽度
            titleHeight: [Number, String],

            // 内容显示的高度
            contentHeight: [Number, String],

            // 显示的宽度
            width: [Number, String],

            // 所有列的宽度和
            totalColumnsWidth: [Number, String],

            // 左固定宽度
            leftViewWidth: [Number],
            
            // 右固定宽度
            rightViewWidth: [Number],

            // 没数据时显示的内容
            errorContent: {
                type: [String]
            },

            // 是否正在加载
            isLoading: [Boolean]

        },

        computed: {
            // 获取当前要显示的内容
            getCurrentContent(){

                var result = '';

                if (!this.isLoading) {
                    result = this.errorContent;
                }

                return result;
            }

        }
    }
</script>