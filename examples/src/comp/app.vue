<template>
    <div class="main">
        <div class="main-banner">
            <div class="main-banner-warpper">
                <!-- logo -->
                <div v-show="showLogo" class="main-banner-logo">
                    <i
                        style="font-size: 20px"
                        class="icon iconfont icon-table"
                    ></i>
                    &nbsp;vue-easytable
                </div>
                <!-- menus -->
                <div class="main-banner-menus-container">
                    <div class="main-banner-menus">
                        <span
                            v-for="item in currentLocal.menus"
                            :key="item.name"
                            :class="[
                                'main-banner-menu-item',
                                activeMenuClass(item),
                            ]"
                        >
                            <a
                                class="main-banner-menu-link"
                                href="javascript:void(0)"
                                @click="gotoRouter(item)"
                            >
                                {{ item.name }}
                            </a>
                        </span>

                        <!-- switch lang -->
                        <span class="main-banner-menu-item">
                            <div
                                v-click-outside="
                                    () => (showLangDropdown = false)
                                "
                                class="switch-lang-container"
                            >
                                <span
                                    class="switch-lang"
                                    @click="
                                        showLangDropdown = !showLangDropdown
                                    "
                                >
                                    <i class="icon iconfont icon-translate" />
                                    <i class="icon iconfont icon-dropdown" />
                                </span>
                                <div
                                    class="switch-lang-dropdown-pannel"
                                    :class="
                                        showLangDropdown
                                            ? 'dropdown-pannel-show'
                                            : ''
                                    "
                                >
                                    <span
                                        v-for="item in switchLangOptions"
                                        :key="item.value"
                                        :class="[
                                            'dropdown-item',
                                            {
                                                active:
                                                    item.value ===
                                                    currentDocLang,
                                            },
                                        ]"
                                        @click.stop="langChange(item)"
                                    >
                                        {{ item.label }}
                                    </span>
                                </div>
                            </div>
                        </span>

                        <!-- switch theme -->
                        <span class="main-banner-menu-item">
                            <div
                                v-click-outside="
                                    () => (showThemeDropdown = false)
                                "
                                class="switch-theme-container"
                            >
                                <span
                                    class="switch-theme"
                                    @click="
                                        showThemeDropdown = !showThemeDropdown
                                    "
                                >
                                    {{ currentLocal.docTheme }}
                                    <i class="icon iconfont icon-dropdown" />
                                </span>
                                <div
                                    class="switch-theme-dropdown-pannel"
                                    :class="
                                        showThemeDropdown
                                            ? 'dropdown-pannel-show'
                                            : ''
                                    "
                                >
                                    <span
                                        v-for="item in currentLocal.switchDocThemeOptions"
                                        :key="item.value"
                                        :class="[
                                            'dropdown-item',
                                            {
                                                active:
                                                    item.value ===
                                                    currentDocTheme,
                                            },
                                        ]"
                                        @click.stop="themeChange(item)"
                                    >
                                        {{ item.label }}
                                    </span>
                                </div>
                            </div>
                        </span>

                        <!-- switch version -->
                        <span class="main-banner-menu-item">
                            <div
                                v-click-outside="
                                    () => (showVersionDropdown = false)
                                "
                                class="switch-version-container"
                            >
                                <span
                                    class="switch-version"
                                    @click="
                                        showVersionDropdown =
                                            !showVersionDropdown
                                    "
                                >
                                    {{ currentDocVersion }}
                                    <i class="icon iconfont icon-dropdown" />
                                </span>
                                <div
                                    class="switch-version-dropdown-pannel"
                                    :class="
                                        showVersionDropdown
                                            ? 'dropdown-pannel-show'
                                            : ''
                                    "
                                >
                                    <span
                                        v-for="item in switchVersionOptions"
                                        :key="item.value"
                                        :class="[
                                            'dropdown-item',
                                            {
                                                active:
                                                    item.label ===
                                                    currentDocVersion,
                                            },
                                        ]"
                                        @click.stop="versionChange(item)"
                                    >
                                        {{ item.label }}
                                    </span>
                                </div>
                            </div>
                        </span>

                        <span class="main-banner-menu-item">
                            <a
                                class="main-banner-menu-link"
                                href="https://github.com/huangshuwei/vue-easytable"
                            >
                                <i class="icon iconfont icon-github"></i>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
    </div>
</template>

<script>
import { getDocTheme, setDocTheme } from "@/utils/cookies";
import locale from "./locale";
import I18nMixins from "./mixins/i18n-mixins";
import ThemeSwitchMixins from "./mixins/theme-switch-mixins.js";
import clickoutside from "./directives/clickoutside.js";
import { version as latestVersion } from "../../../package.json";

import { getVersions } from "@/service/index.js";

export default {
    directives: {
        "click-outside": clickoutside,
    },
    mixins: [I18nMixins, ThemeSwitchMixins],
    data() {
        return {
            //switch lang option
            switchLangOptions: [
                { value: "en", label: "English" },
                { value: "zh", label: "简体中文" },
            ],
            // show lang dropdown
            showLangDropdown: false,
            //switch version option,
            switchVersionOptions: [],
            showVersionDropdown: false,
            // show theme dropdown
            showThemeDropdown: false,
            // default doc theme
            defalutDocTheme: "default",
            // current doc theme
            currentDocTheme: "",
        };
    },
    computed: {
        // current local
        currentLocal() {
            return locale[this.currentDocLang];
        },

        // show logo
        showLogo() {
            return window.env !== "dev";
        },

        // current doc version
        currentDocVersion() {
            const { switchVersionOptions } = this;

            const { pathname } = window.location;

            const versionItem = switchVersionOptions.find(
                (x) => x.value === pathname,
            );

            return versionItem ? versionItem.label : latestVersion;
        },
    },
    watch: {
        currentDocLang() {
            this.$veLocale.use(locale[this.currentDocLang]["compLang"]);
        },
    },
    methods: {
        // lang change
        langChange(item) {
            const { matched } = this.$route;

            const lang = item.value;

            if (matched[0].path !== `/${lang}`) {
                const path = this.$route.path.replace(
                    this.currentDocLang,
                    lang,
                );
                this.$router.push(path);
                this.$veLocale.use(locale[lang]["compLang"]);
            }
            setTimeout(() => {
                this.showLangDropdown = false;
            }, 150);
        },
        // theme change
        themeChange({ value }) {
            setDocTheme(value);
            this.showThemeDropdown = false;

            if (window.env === "dev") {
                setTimeout(() => {
                    window.location.reload();
                });
            } else {
                this.switchThemeMix(value).finally(() => {
                    //this.loadingInstance.close();
                });
            }
        },
        // version change
        versionChange(item) {
            const { protocol, host, pathname, hash } = window.location;
            // version 1.0
            if (item.isVersion1) {
                const newUrl = protocol + "//" + host + item.value;
                window.open(newUrl, "_blank");
            } else {
                const newUrl = protocol + "//" + host + item.value + hash;
                window.open(item.value, "_self");
            }
        },
        // go ro router path
        gotoRouter(item) {
            if (item.isRouter) {
                this.$router
                    .push({ path: `/${this.currentDocLang}${item.path}` })
                    .catch(() => {});
            } else {
                window.open(item.path, "_blank");
            }
        },
        activeMenuClass(item) {
            let result = "";

            const { matched } = this.$route;
            if (
                matched &&
                matched.length > 0 &&
                matched.some(
                    (x) => x.path === `/${this.currentDocLang}${item.path}`,
                )
            ) {
                result = "link-active";
            }
            return result;
        },
        // init theme
        initDocTheme() {
            this.currentDocTheme = getDocTheme() ?? this.defalutDocTheme;
            // 初始化
            if (window.env != "dev") {
                this.switchThemeMix(this.currentDocTheme);
            }
            console.log("current doc theme ::", this.currentDocTheme);
        },
    },
    created() {
        getVersions().then(({ data }) => {
            this.switchVersionOptions = data;
        });
    },
    mounted() {
        this.initDocTheme();
    },
};
</script>
