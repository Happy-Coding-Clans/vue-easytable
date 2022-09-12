<template>
    <div>
        <div class="site-demo-container">
            <div class="demo-title">
                <div class="demo-title-text">
                    {{ currentLocal.demo1.selection }}
                </div>
            </div>
            <NormalDataGrid />
            <div class="demo-title last">
                <div class="demo-title-text">
                    {{ currentLocal.demo2.selection }}
                </div>
            </div>
            <Spreadsheet />
        </div>
    </div>
</template>

<script>
import locale from "../comp/locale";
import I18nMixins from "../comp/mixins/i18n-mixins";
import NormalDataGrid from "./normal-data-grid.vue";
import Spreadsheet from "./spreadsheet.vue";
export default {
    name: "demo",
    components: {
        NormalDataGrid,
        Spreadsheet,
    },
    mixins: [I18nMixins],
    data() {
        return {};
    },
    computed: {
        // current local
        currentLocal() {
            return locale[this.currentDocLang]["completeDemo"];
        },
    },
};
</script>
<style lang="less">
.site-demo-container {
    display: flex;
    flex-direction: column;
    background: #fff;
    margin-top: 62px;
    padding: 10px 0;

    .demo-title {
        display: flex;
        height: 60px;
        align-items: center;
        // background: #1890ffb3;
        font-size: 30px;
        padding: 0 100px;
        font-weight: bold;
        color: #555;

        .demo-title-text {
            display: inline;
            padding: 0 8px;
            border-left: 4px solid #555;
        }

        &.last {
            margin-top: 40px;
        }
    }
}
</style>
