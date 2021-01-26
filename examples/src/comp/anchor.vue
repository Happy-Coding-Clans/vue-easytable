<template>
    <div v-if="label.length && id.length" class="anchor-container">
        <div class="content">
            <a
                :id="id"
                class="anchor-link"
                :label="label"
                href="javascript:void(0)"
                @click.stop="goAnchor()"
            >
                <i style="font-size:15px" class="icon iconfont icon-ai-link" />
            </a>
            <div class="anchor-label">
                <h3>
                    {{ label }}
                    <i
                        v-show="isEdit"
                        :title="eidtDemoTitle"
                        class="iconfont icon-edit"
                        @click.stop="eidt"
                    />
                </h3>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { slugify } from "transliteration";
import { goTobyAnchorId } from "../utils/index";
import locale from "./locale";
import I18nMixins from "./mixins/i18n-mixins";

export default {
    mixins: [I18nMixins],
    props: {
        label: {
            type: String,
            default: ""
        },
        // allow edit on github or gitlab etc.
        isEdit: {
            type: Boolean,
            default: true
        },
        // isEdit=true 时生效
        fileName: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            id: ""
        };
    },
    computed: {
        eidtDemoTitle() {
            return locale[this.currentDocLang]["eidtDemoTitle"];
        }
    },
    methods: {
        goAnchor() {
            goTobyAnchorId(this, this.id);
        },
        // edit on github or gitlab etc.
        eidt() {
            if (this.isEdit) {
                const fileName = this.fileName;

                let result = "";

                let routerUrl = window.location.href.split("/doc/")[1];

                if (routerUrl) {
                    routerUrl = routerUrl.split("?")[0];

                    const routerUrlDetail = routerUrl.split("/");

                    if (routerUrlDetail.length === 1) {
                        // scene 1 : /#/en/doc/qa
                        result = fileName;
                    } else if (routerUrlDetail[0] === "base") {
                        // scene 2 : /#/en/doc/base/loading
                        result = `ve-${routerUrlDetail[1]}/${fileName}`;
                    } else if (routerUrlDetail[0] === "table") {
                        // scene 3 : /#/en/doc/table/header-fixed
                        result = `ve-table/${routerUrlDetail[1]}/${fileName}`;
                    }

                    if (result) {
                        result =
                            locale[this.currentDocLang]["eidtDemoUrlPrefix"] +
                            result;
                        window.open(result, "_blank");
                    }
                }
            }
        }
    },
    created() {
        if (this.label) {
            this.id = slugify(this.label);
        }
    }
};
</script>

<style lang="scss" scoped>
.anchor-container {
    .content {
        &:hover {
            .anchor-link {
                opacity: 0.5;
            }
        }

        .anchor-link {
            margin-left: -20px;
            margin-right: 5px;
            opacity: 0;
            font-weight: bold;
        }

        .anchor-label {
            display: inline-block;
            .icon-edit {
                margin-left: 5px;
                color: #ddd;
                cursor: pointer;
                &:hover {
                    color: #333;
                }
            }
        }
    }
}
</style>
