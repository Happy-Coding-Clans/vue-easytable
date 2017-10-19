<template>
    <div class="main">

        <div class="main-banner">
            <div class="main-banner-title">
                <span>vue-easytable</span>
                <span class="main-banner-title-items">
                    <a class="main-banner-title-item" href="https://github.com/huangshuwei/vue-easytable">github</a>
                    <a class="main-banner-title-item" href="https://github.com/huangshuwei/vue-easytable/releases">更新日志</a>
                </span>
            </div>
        </div>

        <div class="main-wrapper">
            <!--左侧菜单-->
            <div class="main-wrapper-sidebar">
                <ul class="menu-root">
                    <li>
                        <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">开始</a>
                        <ul class="menu-sub">
                            <li>
                                <router-link to="/start">快速上手</router-link>
                            </li>
                        </ul>

                        <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">组件</a>
                        <ul class="menu-sub">
                            <li>
                                <router-link to="/table">Table 表格</router-link>
                            </li>
                            <li>
                                <router-link to="/pagination">Pagination 分页</router-link>
                            </li>
                        </ul>

                    </li>
                </ul>
            </div>

            <!--主体内容 Start-->
            <div class="main-wrapper-container">
                <router-view></router-view>
            </div>
            <!--主体内容 End-->
        </div>

        <!--回到顶部-->
        <div>
            <div class="main-back-top" v-show="showBackTop">
                <i @click="goBackTop()" class="icon iconfont icon-huidaodingbu-copy main-back-top-icon"></i>
            </div>

        </div>

    </div>
</template>

<script>

    export default{
        name: "App",
        data(){
            return {
                showBackTop: false
            }
        },
        methods: {
            goBackTop(){

                window.scroll(0,0);
            },

            handleScroll(){

                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || window.scrollY;

                this.showBackTop = scrollTop > 600 ? true : false;
            }
        },
        mounted(){
            document.addEventListener('scroll', this.handleScroll);

        },
        beforeDestroy() {
            document.removeEventListener('scroll', this.handleScroll);
        },
        watch:{

            $route(to,from){

                let query = to.query;
                if (query && query.anchor){

                    this.$nextTick(x=>{
                        let anchor = this.$el.querySelector('#'+query.anchor);

                        if (anchor && anchor.offsetTop){

                            window.scroll(0,anchor.offsetTop)
                        }
                    })
                }
            }
        }
    }


</script>
