import { clsName } from "../util";
import { COMPS_NAME, COLUMN_TYPES } from "../util/constant";
import emitter from "../../../src/mixins/emitter";

export default {
    name: COMPS_NAME.VE_TABLE_EXPAND_TR,
    mixins: [emitter],
    props: {
        // expand column
        expandColumn: {
            type: Object,
            default: function() {
                return null;
            }
        },
        colgroups: {
            type: Array,
            required: true
        },
        // expand row option
        expandOption: {
            type: Object,
            default: function() {
                return null;
            }
        },
        // expanded row keys
        expandedRowkeys: {
            type: Array,
            default: function() {
                return [];
            }
        },
        rowData: {
            type: Object,
            required: true
        },
        rowIndex: {
            type: Number,
            required: true
        },
        rowKeyFieldName: {
            type: String,
            default: null
        },
        // is virtual scroll
        isVirtualScroll: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // get column count
        columnCount() {
            return this.colgroups.length;
        },
        // current row key
        currentRowKey() {
            return this.rowData[this.rowKeyFieldName];
        },
        // expand row class
        expanRowClass() {
            let result = {
                [clsName("expand-tr")]: true
            };

            const { expandOption, expandedRowkeys, currentRowKey } = this;

            // defalut expand all rows
            if (expandOption.defaultExpandAllRows) {
                result[clsName("expand-tr-show")] = true;
            }
            // defaultExpandedRowKeys includes currentRowKey
            else if (expandedRowkeys.includes(currentRowKey)) {
                result[clsName("expand-tr-show")] = true;
            }

            return result;
        },

        // is last left fixed column
        lastLeftFixedColumn() {
            let result = null;

            const fixedLeftColumns = this.colgroups.filter(
                x => x.fixed === "left"
            );

            if (fixedLeftColumns.length > 0) {
                result = fixedLeftColumns[fixedLeftColumns.length - 1].field;
            }

            return result;
        },

        // expand td class
        expandTdClass() {
            let result = {
                [clsName("expand-td")]: true
            };

            if (this.lastLeftFixedColumn) {
                result[clsName("fixed-left")] = true;
            }
            return result;
        }
    },
    methods: {
        // 获取展开行的内容
        getExpandRowContent(h) {
            const { expandOption } = this;
            return (
                expandOption.render &&
                expandOption.render(
                    {
                        row: this.rowData,
                        column: this.expandColumn,
                        rowIndex: this.rowIndex
                    },
                    h
                )
            );
        }
    },
    render(h) {
        const {
            columnCount,
            getExpandRowContent,
            expanRowStyle,
            expandTdClass
        } = this;

        let content = getExpandRowContent(h);

        let result = (
            <tr class={this.expanRowClass}>
                <td class={expandTdClass} colSpan={columnCount}>
                    {content}
                </td>
            </tr>
        );

        return result;
    }
};
