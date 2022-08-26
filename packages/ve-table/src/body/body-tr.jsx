import BodyTd from "./body-td";
import { clsName } from "../util";
import { COMPS_NAME, EMIT_EVENTS, COMPS_CUSTOM_ATTRS } from "../util/constant";
import VueDomResizeObserver from "../../../src/comps/resize-observer";
import emitter from "../../../src/mixins/emitter";
import { isEmptyValue } from "../../../src/utils";
export default {
    name: COMPS_NAME.VE_TABLE_BODY_TR,
    mixins: [emitter],
    props: {
        rowData: {
            type: Object,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        colgroups: {
            type: Array,
            required: true,
        },
        columnCollection: {
            type: Array,
            required: true,
        },
        rowKeyFieldName: {
            type: String,
            default: null,
        },
        /*
        expand
        */
        // expand row option
        expandOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // is expand row
        isExpandRow: {
            type: Boolean,
            required: true,
        },
        // expanded row keys
        expandedRowkeys: {
            type: Array,
            default: function () {
                return [];
            },
        },
        // expand row change
        expandRowChange: {
            type: Function,
            default: null,
        },

        /*
        checkbox
        */
        // checkbox option
        checkboxOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        internalCheckboxSelectedRowKeys: {
            type: Array,
            default: function () {
                return null;
            },
        },

        /*
        radio
        */
        radioOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        internalRadioSelectedRowKey: {
            type: [String, Number],
            default: null,
        },
        // is virtual scroll
        isVirtualScroll: {
            type: Boolean,
            default: false,
        },
        // cell style option
        cellStyleOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // highlight row key
        highlightRowKey: {
            type: [String, Number],
            default: null,
        },
        // event custom option
        eventCustomOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // cell selection key data
        cellSelectionData: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // cell span option
        cellSpanOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // edit opttion
        editOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
    },
    computed: {
        // current row key
        currentRowKey() {
            const { rowKeyFieldName } = this;
            return rowKeyFieldName ? this.rowData[rowKeyFieldName] : null;
        },
        // tr class
        trClass() {
            let result = null;

            const { highlightRowKey, currentRowKey } = this;

            let isHighlight = false;

            if (!isEmptyValue(highlightRowKey)) {
                if (highlightRowKey === currentRowKey) {
                    isHighlight = true;
                }
            }

            result = {
                [clsName("body-tr")]: true,
                [clsName("tr-highlight")]: isHighlight,
            };

            return result;
        },
    },

    methods: {
        // click
        rowClick(e, fn) {
            fn && fn(e);

            const { rowData, rowIndex } = this;

            this.dispatch(COMPS_NAME.VE_TABLE_BODY, EMIT_EVENTS.BODY_TR_CLICK, {
                rowData,
                rowIndex,
            });
        },
        // dblclick
        rowDblclick(e, fn) {
            fn && fn(e);
        },
        // contextmenu
        rowContextmenu(e, fn) {
            fn && fn(e);
        },
        // mouseenter
        rowMouseenter(e, fn) {
            fn && fn(e);
        },
        // mouseleave
        rowMouseleave(e, fn) {
            fn && fn(e);
        },
        // mousemove
        rowMousemove(e, fn) {
            fn && fn(e);
        },
        // mouseover
        rowMouseover(e, fn) {
            fn && fn(e);
        },
        // mousedown
        rowMousedown(e, fn) {
            fn && fn(e);
        },
        // mouseup
        rowMouseup(e, fn) {
            fn && fn(e);
        },
    },

    render() {
        const {
            colgroups,
            expandOption,
            expandRowChange,
            isExpandRow,
            expandedRowkeys,
            checkboxOption,
            rowKeyFieldName,
            rowIndex,
            rowData,
            internalCheckboxSelectedRowKeys,
            internalRadioSelectedRowKey,
            radioOption,
            cellStyleOption,
            eventCustomOption,
        } = this;

        // get td content
        const getTdContent = () => {
            return colgroups.map((column) => {
                const tdProps = {
                    key: column.key,
                    props: {
                        rowIndex,
                        rowData,
                        column,
                        columnCollection: this.columnCollection,
                        colgroups,
                        expandOption,
                        expandedRowkeys,
                        checkboxOption,
                        rowKeyFieldName,
                        isExpandRow,
                        internalCheckboxSelectedRowKeys,
                        internalRadioSelectedRowKey,
                        radioOption,
                        cellStyleOption,
                        cellSpanOption: this.cellSpanOption,
                        eventCustomOption,
                        cellSelectionData: this.cellSelectionData,
                        editOption: this.editOption,
                    },
                    on: {
                        [EMIT_EVENTS.EXPAND_ROW_CHANGE]: () =>
                            expandRowChange(rowData, rowIndex),
                    },
                };
                return <BodyTd {...tdProps} />;
            });
        };

        let result = null;

        // custom on row event
        let customEvents = {};
        if (eventCustomOption) {
            const { bodyRowEvents } = eventCustomOption;
            customEvents = bodyRowEvents
                ? bodyRowEvents({ row: rowData, rowIndex })
                : {};
        }

        const {
            click,
            dblclick,
            contextmenu,
            mouseenter,
            mouseleave,
            mousemove,
            mouseover,
            mousedown,
            mouseup,
        } = customEvents;

        const events = {
            click: (e) => {
                this.rowClick(e, click);
            },
            dblclick: (e) => {
                this.rowDblclick(e, dblclick);
            },
            contextmenu: (e) => {
                this.rowContextmenu(e, contextmenu);
            },
            mouseenter: (e) => {
                this.rowMouseenter(e, mouseenter);
            },
            mouseleave: (e) => {
                this.rowMouseleave(e, mouseleave);
            },
            mousemove: (e) => {
                this.rowMousemove(e, mousemove);
            },
            mouseover: (e) => {
                this.rowMouseover(e, mouseover);
            },
            mousedown: (e) => {
                this.rowMousedown(e, mousedown);
            },
            mouseup: (e) => {
                this.rowMouseup(e, mouseup);
            },
        };

        if (this.isVirtualScroll) {
            const props = {
                class: this.trClass,
                props: {
                    tagName: "tr",
                    id: this.currentRowKey,
                },
                attrs: {
                    [COMPS_CUSTOM_ATTRS.BODY_ROW_KEY]: this.currentRowKey,
                },
                on: {
                    "on-dom-resize-change": ({ key, height }) => {
                        this.dispatch(
                            COMPS_NAME.VE_TABLE,
                            EMIT_EVENTS.BODY_TR_HEIGHT_CHANGE,
                            {
                                rowKey: key,
                                height,
                            },
                        );
                    },
                },
                nativeOn: events,
            };

            result = (
                <VueDomResizeObserver {...props}>
                    {getTdContent()}
                </VueDomResizeObserver>
            );
        } else {
            const props = {
                class: this.trClass,
                attrs: {
                    [COMPS_CUSTOM_ATTRS.BODY_ROW_KEY]: this.currentRowKey,
                },
                on: events,
            };

            result = <tr {...props}>{getTdContent()}</tr>;
        }

        return result;
    },
};
