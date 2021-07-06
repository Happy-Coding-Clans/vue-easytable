<template>
    <div class="main">
        <div class="main-banner">
            <div class="main-banner-warpper">
                <!-- logo -->
                <div class="main-banner-logo">
                    <i
                        style="font-size:20px"
                        class="icon iconfont icon-table"
                    ></i
                    >&nbsp;vue-easytable
                </div>
                <!-- menus -->
                <div class="main-banner-menus-container">
                    <div class="main-banner-menus">
                        <span
                            v-for="item in menus"
                            :key="item.name"
                            :class="[
                                'main-banner-menu-item',
                                activeMenuClass(item)
                            ]"
                        >
                            <a
                                class="main-banner-menu-link"
                                href="javascript:void(0)"
                                @click="gotoRouter(item)"
                            >
                                {{ item.name }}</a
                            >
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
                                        showVersionDropdown = !showVersionDropdown
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
                                                    currentDocVersion
                                            }
                                        ]"
                                        @click.stop="versionChange(item)"
                                        >{{ item.label }}</span
                                    >
                                </div>
                            </div>
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
                                    ><i class="icon iconfont icon-translate" />
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
                                                    currentDocLang
                                            }
                                        ]"
                                        @click.stop="langChange(item)"
                                        >{{ item.label }}</span
                                    >
                                </div>
                            </div>
                        </span>

                        <span class="main-banner-menu-item">
                            <a
                                class="main-banner-menu-link"
                                href="https://github.com/huangshuwei/vue-easytable"
                            >
                                <i class="icon iconfont icon-github"></i
                            ></a>
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
import locale from "./locale";
import I18nMixins from "./mixins/i18n-mixins";
import ThemeSwitchMixins from "./mixins/theme-switch-mixins.js";
import clickoutside from "./directives/clickoutside.js";
import { version } from "../../../package.json";

export default {
    directives: {
        "click-outside": clickoutside
    },
    mixins: [I18nMixins, ThemeSwitchMixins],
    data() {
        return {
            //switch lang option
            switchLangOptions: [
                { value: "en", label: "English" },
                { value: "zh", label: "简体中文" }
            ],
            showLangDropdown: false,
            //switch version option
            switchVersionOptions: [
                {
                    value:
                        "https://happy-coding-clans.github.io/vue-easytable/",
                    label: version
                },
                {
                    value:
                        " https://happy-coding-clans.github.io/vue-easytable/1.7.2/app.html",
                    label: "1.x"
                }
            ],
            showVersionDropdown: false,
            currentDocVersion: version
        };
    },
    computed: {
        // menus
        menus() {
            return locale[this.currentDocLang]["menus"];
        }
    },
    watch: {
        currentDocLang() {
            this.$veLocale.use(locale[this.currentDocLang]["compLang"]);
        }
    },
    methods: {
        // lang change
        langChange(item) {
            const { matched } = this.$route;

            const lang = item.value;

            if (matched[0].path !== `/${lang}`) {
                const path = this.$route.path.replace(
                    this.currentDocLang,
                    lang
                );
                this.$router.push(path);
                this.$veLocale.use(locale[lang]["compLang"]);
            }
            setTimeout(() => {
                this.showLangDropdown = false;
            }, 150);
        },
        // version change
        versionChange(item) {
            if (this.currentDocVersion !== item.label) {
                window.location.href = item.value;
            }
            this.currentDocVersion = item.label;

            setTimeout(() => {
                this.showVersionDropdown = false;
            }, 150);
        },
        // go ro router path
        gotoRouter(item) {
            this.$router
                .push({ path: `/${this.currentDocLang}${item.path}` })
                .catch(() => {});
        },
        activeMenuClass(item) {
            let result = "";

            const { matched } = this.$route;
            if (
                matched &&
                matched.length > 0 &&
                matched.some(
                    x => x.path === `/${this.currentDocLang}${item.path}`
                )
            ) {
                result = "link-active";
            }
            return result;
        }
    }
};
</script>
