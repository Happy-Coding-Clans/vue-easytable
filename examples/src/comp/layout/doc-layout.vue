<template>
    <div>
        <div class="main-wrapper">
            <!--左侧菜单-->
            <div class="main-wrapper-sidebar">
                <ul class="menu-root">
                    <template v-for="(config, index) in routerConfig">
                        <li v-if="config.children" :key="index">
                            <a
                                class="main-wrapper-sidebar-link"
                                href="javascript:javascript:void(0);"
                                >{{ config.name }}</a
                            >
                            <ul class="menu-sub">
                                <router-link
                                    v-for="(subConfig,
                                    subIndex) in config.children"
                                    :key="subIndex"
                                    tag="li"
                                    :to="
                                        `/${currentDocLang}/doc/${config.path}/${subConfig.path}`
                                    "
                                >
                                    <a>{{ subConfig.name }}</a>
                                </router-link>
                            </ul>
                        </li>
                        <router-link
                            v-else-if="!config.meta || !config.meta.hide"
                            :key="index"
                            class="no-child"
                            tag="li"
                            :to="`/${currentDocLang}/doc/${config.path}`"
                        >
                            <a>{{ config.name }}</a>
                        </router-link>
                    </template>
                </ul>
            </div>

            <!--主体内容 Start-->
            <div class="main-wrapper-container">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive" />
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive" />
                <!--主体内容 End-->
            </div>

            <!-- footer -->
            <Footer />
        </div>

        <!--回到顶部-->
        <div>
            <div v-show="showBackTop" class="main-back-top">
                <i
                    class="icon iconfont icon-huidaodingbu-copy main-back-top-icon"
                    @click="goBackTop()"
                />
            </div>
        </div>

        <!--目录-->
        <div>
            <catolog :catalog-data="catalogData" />
        </div>
    </div>
</template>

<script>
import catolog from "@/comp/catalog.vue";
import Footer from "./footer.vue";
import routers from "@/router/locale/index";
import { goTobyAnchorId } from "@/utils/index";
import I18nMixins from "./../mixins/i18n-mixins";

export default {
    name: "App",
    components: { Footer, catolog },
    mixins: [I18nMixins],
    data() {
        return {
            showBackTop: false,
            catalogData: [],
            showHide: false // 是否显示内置组件
        };
    },
    computed: {
        routerConfig() {
            return routers[this.currentDocLang];
        }
    },
    watch: {
        $route: {
            handler: function(to, from) {
                this.anchorLink(to);
                // 显示内置组件
                this.enableHideComp(to);
            },
            immediate: true
        }
    },
    methods: {
        goBackTop() {
            window.scroll(0, 0);
        },

        handleScroll() {
            var scrollTop =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop ||
                window.scrollHeight;

            this.showBackTop = scrollTop > 600 ? true : false;
        },

        anchorLink(to) {
            let query = to.query;

            if (query && query.anchor) {
                this.$nextTick(x => {
                    goTobyAnchorId(this, query.anchor);
                });
            }

            this.$nextTick(x => {
                let anchorLinkArr = this.$el.querySelectorAll(".anchor-link"),
                    catalogData = [];

                if (anchorLinkArr && anchorLinkArr.length > 0) {
                    for (var i = 0, len = anchorLinkArr.length; i < len; i++) {
                        catalogData.push({
                            id: anchorLinkArr[i].id,
                            label: anchorLinkArr[i].getAttribute("label")
                        });
                    }
                }

                this.catalogData = catalogData;
            });
        },

        // select、checkbox、dropdown 等组件都是内置的，showHide=1 则开启
        enableHideComp(to) {
            let query = to.query;

            if (query.showHide && query.showHide == 1) {
                this.showHide = true;
            }
        },

        setFavicon() {
            var link =
                document.querySelector("link[rel*='icon']") ||
                document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = require("./../../images/favicon.png");
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    },
    mounted() {
        document.addEventListener("scroll", this.handleScroll);

        this.setFavicon();
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
