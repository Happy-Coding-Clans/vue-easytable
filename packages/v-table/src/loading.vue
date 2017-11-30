<template>
    <div style="width:100%;height: 100%;">
        <div class="v-table-loading" :style="{'opacity':loadingOpacity}"></div>
        <div class="v-table-loading-content" v-html="loadingContent"></div>
    </div>

</template>

<script>
    export default{

        props: {

            loadingContent: [String],

            loadingOpacity: [Number],

            titleRows: [Array],

            titleRowHeight: [Number],

            columns:[Array]
        },

        methods: {

            setPosition(){

                let loadingEle = this.$el,
                    loadingContentEle = this.$el.querySelector('.v-table-loading-content'),
                    titleHeight = 0;

                if (this.columns && this.columns.length > 0){

                    titleHeight = (this.titleRows && this.titleRows.length > 0) ? this.titleRows.length * this.titleRowHeight : this.titleRowHeight;
                }

                loadingContentEle.style.top = ((loadingEle.clientHeight + titleHeight) / 2 - loadingContentEle.clientHeight / 2) + 'px';
            }
        },

        mounted(){

            this.$nextTick(x => {
                this.setPosition();
            })
        }
    }
</script>