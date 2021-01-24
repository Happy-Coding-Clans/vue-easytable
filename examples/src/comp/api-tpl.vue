<template>
    <div class="api-tpl">
        <anchor :is-edit="false" :label="getAnchor" />
        <div class="api-tpl-desc">{{ desc }}</div>
        <ve-table
            class="tpl-table"
            :columns="columns"
            :table-data="tableData"
            :border-around="true"
            :border-x="true"
            :border-y="false"
            row-key-field-name="rowKey"
            :expand-option="expandOption"
        />
    </div>
</template>

<script>
export default {
    name: "api-tpl",
    props: {
        desc: {
            type: String,
            required: true
        },
        anchor: {
            type: String,
            default: null
        },
        tableData: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        expandOption: {
            type: Object,
            default: function() {
                return null;
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        getAnchor() {
            return this.anchor ? this.anchor : this.desc;
        }
    }
};
</script>
<style lang="less">
.api-tpl {
    margin-bottom: 30px;
    .api-tpl-desc {
        height: 30px;
    }

    .tpl-table {
        td,
        th {
            color: #5e6d82 !important;
            font-size: 14px;
            code {
                display: inline-block;
                background: #f7f7f7;
                font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono,
                    monospace;
                margin: 0 3px;
                padding: 1px 5px;
                border-radius: 3px;
                color: #666;
                border: 1px solid #eee;
            }
        }

        td {
            .expand {
                font-weight: bold;
            }
        }
    }
}
</style>
