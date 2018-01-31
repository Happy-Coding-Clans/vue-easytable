<template>
    <div class="main">

        <div class="main-banner">
            <div class="main-banner-title">
                <span><i style="font-size:20px" class="icon iconfont icon-table"></i>&nbsp;vue-easytable</span>
                <span class="main-banner-title-items">
                    <a class="main-banner-title-item" href="https://github.com/huangshuwei/vue-easytable">
                        <i class="icon iconfont icon-github"></i>&nbsp;&nbsp;github</a>
                    <a class="main-banner-title-item" href="https://github.com/huangshuwei/vue-easytable/releases">
                        <i class="icon iconfont icon-gengxinrizhi"></i>&nbsp;&nbsp;更新日志</a>
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
                                <router-link to="/intro">介绍</router-link>
                            </li>
                            <li>
                                <router-link to="/install">安装</router-link>
                            </li>
                            <li>
                                <router-link to="/start">快速上手</router-link>
                            </li>
                        </ul>

                        <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">table 组件</a>
                        <ul class="menu-sub">
                            <li>
                                <router-link to="/table/basic">基本用法</router-link>
                            </li>
                            <li>
                                <router-link to="/table/horizontalResize">表格横向自适应</router-link>
                            </li>
                            <li>
                                <router-link to="/table/verticalResize">表格纵向自适应</router-link>
                            </li>
                            <li>
                                <router-link to="/table/customColumns">自定义列</router-link>
                            </li>
                            <li>
                                <router-link to="/table/cellStyle">单元格样式</router-link>
                            </li>
                            <li>
                                <router-link to="/table/columnWidthDrag">列宽拖动</router-link>
                            </li>
                            <li>
                                <router-link to="/table/selection">多选功能</router-link>
                            </li>
                            <li>
                                <router-link to="/table/cellEdit">单元格编辑</router-link>
                            </li>
                            <li>
                                <router-link to="/table/cellMerge">行、列合并</router-link>
                            </li>
                            <li>
                                <router-link to="/table/conditionFilters">条件筛选</router-link>
                            </li>
                            <li>
                                <router-link to="/table/footerSummary">footer 汇总</router-link>
                            </li>
                            <li>
                                <router-link to="/table/loading">loading 以及错误提示</router-link>
                            </li>
                            <li>
                                <router-link to="/table/sort">排序</router-link>
                            </li>
                            <li>
                                <router-link to="/table/fixedColumnsTitle">固定表头固定列</router-link>
                            </li>
                            <li>
                                <router-link to="/table/hideTable">隐藏表格</router-link>
                            </li>
                            <li>
                                <router-link to="/table/combinedPaging">表格结合分页</router-link>
                            </li>
                            <li>
                                <router-link to="/table/api">API</router-link>
                            </li>
                        </ul>

                        <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">分页组件</a>
                        <ul class="menu-sub">
                            <li>
                                <router-link to="/pagination">pagination 分页</router-link>
                            </li>
                        </ul>

                        <template v-if="showHide">
                            <a class="main-wrapper-sidebar-link" href="javascript:javascript:void(0);">内置组件</a>
                            <ul class="menu-sub">
                                <li>
                                    <router-link to="/select">Select 选择</router-link>
                                </li>
                                <li>
                                    <router-link to="/checkbox">Checkbox 多选</router-link>
                                </li>
                                <li>
                                    <router-link to="/dropdown">Dropdown 下拉</router-link>
                                </li>
                            </ul>
                        </template>

                    </li>
                </ul>
            </div>

            <!--主体内容 Start-->
            <div class="main-wrapper-container">
                <router-view></router-view>
            </div>
            <!--主体内容 End-->
        </div>

        <div class="main-footer">
            <div>
                <span><i class="iconfont icon-github"></i><a href="https://github.com/huangshuwei/vue-easytable"> GitHub</a></span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Created by <a href="https://github.com/huangshuwei">huangsw</a></span>
            </div>
        </div>

        <!--回到顶部-->
        <div>
            <div class="main-back-top" v-show="showBackTop">
                <i @click="goBackTop()" class="icon iconfont icon-huidaodingbu-copy main-back-top-icon"></i>
            </div>

        </div>

        <!--目录-->
        <div>
            <catolog :catalog-data="catalogData"></catolog>
        </div>

    </div>
</template>

<script>

    import catolog from './catalog.vue'

    export default{
        name: "App",
        components: {catolog},
        data(){
            return {
                showBackTop: false,
                catalogData: [],
                showHide:false // 是否显示内置组件
            }
        },
        methods: {
            goBackTop(){

                window.scroll(0,0);
            },

            handleScroll(){

                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || window.scrollY;

                this.showBackTop = scrollTop > 600 ? true : false;
            },

            anchorLink(to){

                let query = to.query;

                if (query && query.anchor) {

                    this.$nextTick(x => {
                        let anchor = this.$el.querySelector('#' + query.anchor);

                        if (anchor && anchor.offsetTop) {

                            window.scroll(0, anchor.offsetTop)
                        }
                    })
                }


                this.$nextTick(x => {

                    let anchorLinkArr = this.$el.querySelectorAll(".anchor-link"),
                        catalogData = [];

                    console.log(anchorLinkArr);

                    if (anchorLinkArr && anchorLinkArr.length > 0) {

                        for (var i = 0, len = anchorLinkArr.length; i < len; i++) {

                            catalogData.push({id: anchorLinkArr[i].id, label: anchorLinkArr[i].getAttribute('label')})
                        }
                    }


                    this.catalogData = catalogData;
                })
            },

            // select、checkbox、dropdown 等组件都是内置的，showHide=1 则开启
            enableHideComp(to){

                let query = to.query;

                if (query.showHide && query.showHide == 1){

                    this.showHide = true;
                }
            },

            setFavicon(){

                var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = require('./../images/favicon.ico');
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        },
        mounted(){
            document.addEventListener('scroll', this.handleScroll);

            this.setFavicon();
        },
        beforeDestroy() {
            document.removeEventListener('scroll', this.handleScroll);
        },
        watch:{

            $route(to,from){

                this.anchorLink(to);

                // 显示内置组件
                this.enableHideComp(to);
            }
        }
    }


</script>
