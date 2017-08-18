<template>
    <div style="width:100%;height: 100%;">
        <div class="v-table-loading"></div>

        <div class="v-table-loading-content" v-html="loadingContent"></div>
    </div>

</template>

<script>
    export default{

        props: {

            loadingContent: [String],

            width: [Number, String],

            height: [Number, String]

        },

        methods: {

            setPosition(){

                var loadingEle = this.$el,
                    loadingContentEle = this.$el.querySelector('.v-table-loading-content');

                loadingContentEle.style.top = (loadingEle.clientHeight / 2 - loadingContentEle.clientHeight / 2) + 'px';

            }

        },

        mounted(){

            this.$nextTick(x=>{
                this.setPosition();
            })
        }
    }
</script>