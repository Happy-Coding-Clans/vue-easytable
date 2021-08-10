<template>
    <div v-if="catalogData && catalogData.length > 0" class="catalog-container">
        <div
            v-show="!showCatalogList2"
            class="catalog-corner"
            @click.stop="toggleCatalogList()"
        >
            <span>{{ catalogTitle }}</span>
        </div>
        <ul v-show="showCatalogList2" class="catalog-ul">
            <li class="catalog-li-title" @click.stop="toggleCatalogList()">
                {{ catalogTitle }}
                <i class="catalog-li-title-down icon iconfont icon-shouqi1"></i>
            </li>
            <li
                v-for="(item, index) in catalogData"
                :key="index"
                :title="item.label"
                class="catalog-li"
            >
                <a href="javascript:void(0);" @click.stop="goAnchor(item.id)">
                    {{ item.label }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import locale from "./locale";
import { goTobyAnchorId } from "@/utils/index";
import I18nMixins from "./mixins/i18n-mixins";

export default {
    mixins: [I18nMixins],
    props: {
        catalogData: {
            type: Array,
            required: true,
        },
        showCatalogList: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            showCatalogList2: this.showCatalogList,
        };
    },
    computed: {
        // catalog title
        catalogTitle() {
            return locale[this.currentDocLang]["anchorCatalogTitle"];
        },
    },
    methods: {
        goAnchor(id) {
            goTobyAnchorId(this, id);
        },

        toggleCatalogList() {
            this.showCatalogList2 = !this.showCatalogList2;
        },
    },
};
</script>

<style lang="scss" scoped>
.catalog-container {
    .catalog-corner {
        z-index: 999;
        cursor: pointer;
        display: block;
        width: 45px;
        height: 180px;
        position: fixed;
        right: 0;
        top: 120px;
        background-color: #fff;
        border-radius: 5px 0 0 5px;
        border: solid 1px #eee;
        font-size: 15px;
        padding: 60px 10px;
        line-height: 1.9;
        font-weight: bold;
        color: #666;
    }

    .catalog-ul {
        z-index: 999;
        display: block;
        list-style: none;
        min-width: 100px;
        max-width: 200px;
        margin: 0;
        padding: 10px;
        background-color: #fff;
        position: fixed;
        right: 0;
        top: 120px;
        border-radius: 3px;
        border: solid 1px #eee;
        font-size: 12px;

        .catalog-li-title {
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 10px;
            color: #666;
        }

        .catalog-corner:hover,
        .catalog-li-title:hover {
            color: #000;
        }

        .catalog-li-title-down {
            font-size: 14px;
            margin-left: 10px;
        }

        .catalog-li {
            line-height: 2.1em;
            display: list-item;
            white-space: nowrap;
            word-wrap: normal;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
