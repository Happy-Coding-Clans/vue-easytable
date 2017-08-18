<template>
    <div class="main">

        <div class="main-banner">
            <div class="main-banner-title">
                vue-easytable
            </div>
        </div>

        <div class="main-wrapper">
            <!--左侧菜单-->
            <div class="main-wrapper-sidebar">
                <ul class="menu-root">
                    <li>
                        <div>
                            <router-link style="cursor: pointer;" class="main-wrapper-sidebar-link" to="/updateLog">
                                开始
                            </router-link>
                        </div>

                        <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">组件</a>
                        <ul class="menu-sub">

                            <li>
                                <router-link to="/pagination">Pagination 分页</router-link>
                            </li>

                            <li>
                                <router-link to="/table">Table 表格</router-link>
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

                this.scrollTo(document.body, 0, 200);
            },

            scrollTo(element, to, duration) {
                if (duration <= 0) return;
                var difference = to - element.scrollTop;
                var perTick = difference / duration * 10;

                setTimeout(x => {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop === to) return;
                    this.scrollTo(element, to, duration - 10);
                }, 10)
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
        }
    }


</script>
