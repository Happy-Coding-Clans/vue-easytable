<template>
    <div class="catalog-container" v-if="catalogData && catalogData.length > 0">
        <div class="catalog-corner">
            <span class="catalog-corner">目录</span>
        </div>
        <ul class="catalog-ul">
            <li class="catalog-li-title">目 录</li>
            <li class="catalog-li" v-for="item in catalogData" @click.stop="goAnchor(item.id)"><a
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
            }
        },

        methods: {

            goAnchor(id){

                let anchor = document.querySelector('#' + id);


                if (anchor) {

                    window.scroll(0, anchor.offsetTop);

                    this.$router.replace({path: this.$route.path, query: {anchor: id}});
                }

            }
        },

    }

</script>


<style scoped>

    .catalog-container {

    }

    .catalog-corner:hover + .catalog-ul {

        display: block;
    }

    .catalog-corner {
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
    }

    .catalog-ul:hover {

        display: block;
    }

    .catalog-ul {
        display: none;
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
        font-weight: bold;
        font-size:14px;
        margin-bottom: 10px;
    }

    .catalog-li {

        line-height: 2.1em;
        display: list-item;
    }
</style>