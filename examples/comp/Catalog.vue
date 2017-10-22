<template>
    <div class="catalog-container" v-if="catalogData && catalogData.length > 0">
        <div class="catalog-corner" v-show="!showCatalogList2" @click.stop="toggleCatalogList()">
            <span>目录</span>
        </div>
        <ul class="catalog-ul" v-show="showCatalogList2">
            <li class="catalog-li-title" @click.stop="toggleCatalogList()">目 录 <i class="catalog-li-title-down icon iconfont icon-shouqi1"></i></li>
            <li class="catalog-li" v-for="item in catalogData"><a @click.stop="goAnchor(item.id)"
                                                                  href="javascript:void(0);">{{item.label}}</a></li>
        </ul>
    </div>

</template>


<script>
    export default{
        props: {

            catalogData: {
                type: Array,
                require: true
            },
            showCatalogList:{
                type:Boolean,
                default:true

            }
        },

        data(){

            return {
                showCatalogList2:this.showCatalogList
            }
        },

        methods: {

            goAnchor(id){

                let anchor = document.querySelector('#' + id);


                if (anchor) {

                    window.scroll(0, anchor.offsetTop);

                    this.$router.replace({path: this.$route.path, query: {anchor: id}});
                }

            },

            toggleCatalogList(){

                this.showCatalogList2 = !this.showCatalogList2;
            }
        },

    }

</script>


<style scoped>

    .catalog-container {

    }

    .catalog-corner {
        cursor: pointer;
        display: block;
        width: 45px;
        height: 180px;
        position: fixed;
        right: 0;
        top: 73px;
        background-color: #fff;
        /*   -moz-border-radius-topleft: 15px;
           -moz-border-radius-bottomleft: 15px;*/
        border-radius: 5px 0 0 5px;
        border: solid 1px #eee;
        font-size: 15px;
        padding: 60px 10px;
        line-height: 1.9;
        font-weight: bold;
        color:#666;
    }

    .catalog-ul {
        display: block;
        list-style: none;
        width: 200px;
        min-height: 180px;
        margin: 0;
        padding: 10px;
        background-color: #fff;
        position: fixed;
        right: 0;
        top: 73px;
        border-radius: 3px;
        border: solid 1px #eee;
        font-size: 12px;
    }

    .catalog-li-title{
        cursor: pointer;
        font-weight: bold;
        font-size:14px;
        margin-bottom: 10px;
        color:#666;
    }

    .catalog-corner:hover,.catalog-li-title:hover{
        color:#000;
    }

    .catalog-li-title-down{

        font-size: 14px;
        margin-left: 10px;
    }

    .catalog-li {

        line-height: 2.1em;
        display: list-item;
    }
</style>