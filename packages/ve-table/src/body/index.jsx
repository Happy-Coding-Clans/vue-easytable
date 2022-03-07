import BodyTr from "./body-tr";
import BodyTrScrolling from "./body-tr-scrolling";
import ExpandTr from "./expand-tr";
import VueDomResizeObserver from "../../../src/comps/resize-observer";
import {
    getDomResizeObserverCompKey,
    getFixedTotalWidthByColumnKey,
    clsName,
} from "../util";
import { getValByUnit } from "../../../src/utils/index.js";
import emitter from "../../../src/mixins/emitter";
import {
    COMPS_NAME,
    EMIT_EVENTS,
    COLUMN_TYPES,
    EXPAND_TRIGGER_TYPES,
} from "../util/constant";

export default {
    name: COMPS_NAME.VE_TABLE_BODY,
    mixins: [emitter],
    props: {
        tableViewportWidth: {
            type: Number,
            default: 0,
        },
        columnsOptionResetTime: {
            type: Number,
            default: 0,
        },
        colgroups: {
            type: Array,
            required: true,
        },
        actualRenderTableData: {
            type: Array,
            required: true,
        },
        hasFixedColumn: {
            type: Boolean,
            default: false,
        },
        allRowKeys: {
            type: Array,
            required: true,
        },
        // expand row option
        expandOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // checkbox option
        checkboxOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // radio option
        radioOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // virual scroll
        virtualScrollOption: {
            type: Object,
            default: null,
        },
        // is virtual scroll
        isVirtualScroll: {
            type: Boolean,
            default: false,
        },
        // is scrolling
        showVirtualScrollingPlaceholder: {
            type: Boolean,
            default: false,
        },
        rowKeyFieldName: {
            type: String,
            default: null,
        },
        // cell style option
        cellStyleOption: {
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
        // cell selection option
        cellSelectionOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // cell selection key data
        cellSelectionKeyData: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // edit option
        editOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
    },
    data() {
        return {
            // columns widths map
            colsWidths: new Map(),
            /*
            internal expand row keys
            1、当没有设置 expandedRowKeys 时生效
            */
            internalExpandRowkeys: [],
            /*
            1、存储当前多选功能的rowkey 信息
            */
            internalCheckboxSelectedRowKeys: [],
            /*
            1、存储当前单选功能的rowkey 信息
            */
            internalRadioSelectedRowKey: null,
            // virtual scroll preview rendered rowKey
            virtualScrollPreviewRenderedRowKeys: [],
            // virtual scroll repeat rendered rowKey
            virtualScrollRepeatRenderedRowKeys: [],
        };
    },
    computed: {
        /* 
        column collenction info 
        1、style of each column
        2、class of each column
        */
        columnCollection() {
            let columnCollection = [];

            const { colgroups } = this;

            colgroups.forEach((col) => {
                const colKey = col.key;

                let columnCollectionItem = {
                    colKey: colKey,
                    class: {
                        [clsName("last-left-fixed-column")]:
                            this.isLastLeftFixedColumn(col),
                        [clsName("first-right-fixed-column")]:
                            this.isfirstRightFixedColumn(col),
                    },
                    style: {},
                };

                const { fixed, align } = col;

                columnCollectionItem.style["text-align"] = align || "center";

                if (fixed) {
                    let totalWidth = 0;
                    // column index
                    const columnIndex = colgroups.findIndex(
                        (x) => x.key === colKey,
                    );
                    if (
                        (fixed === "left" && columnIndex > 0) ||
                        (fixed === "right" &&
                            columnIndex < colgroups.length - 1)
                    ) {
                        totalWidth = getFixedTotalWidthByColumnKey({
                            colgroups,
                            colKey,
                            fixed,
                        });

                        totalWidth = getValByUnit(totalWidth);
                    }

                    columnCollectionItem.style["left"] =
                        fixed === "left" ? totalWidth : "";
                    columnCollectionItem.style["right"] =
                        fixed === "right" ? totalWidth : "";
                }

                columnCollection.push(columnCollectionItem);
            });
            return columnCollection;
        },
        // expand column
        expandColumn() {
            return this.colgroups.find((x) => x.type === COLUMN_TYPES.EXPAND);
        },
        /*
        是否是可控行展开
        1、当设置了 expandedRowKeys 属性时则为可控行展开
        */
        isControlledExpand() {
            return (
                this.expandOption &&
                Array.isArray(this.expandOption.expandedRowKeys)
            );
        },

        // expanded row keys
        expandedRowkeys() {
            return this.isControlledExpand
                ? this.expandOption.expandedRowKeys
                : this.internalExpandRowkeys;
        },

        // disable row selected row keys
        disableCheckboxSelectedRowKeys() {
            let result = [];

            const { checkboxOption, internalCheckboxSelectedRowKeys } = this;

            if (!checkboxOption) {
                return result;
            }
            const { disableSelectedRowKeys } = checkboxOption;

            if (
                internalCheckboxSelectedRowKeys.length > 0 &&
                Array.isArray(disableSelectedRowKeys) &&
                disableSelectedRowKeys.length > 0
            ) {
                disableSelectedRowKeys.forEach((rowkey) => {
                    if (internalCheckboxSelectedRowKeys.includes(rowkey)) {
                        result.push(rowkey);
                    }
                });
            }

            return result;
        },

        // disable row unselected row keys
        disableCheckboxUnselectedRowKeys() {
            let result = [];

            const { checkboxOption, internalCheckboxSelectedRowKeys } = this;

            if (!checkboxOption) {
                return result;
            }
            const { disableSelectedRowKeys } = checkboxOption;

            if (
                Array.isArray(disableSelectedRowKeys) &&
                disableSelectedRowKeys.length > 0
            ) {
                disableSelectedRowKeys.forEach((rowkey) => {
                    if (!internalCheckboxSelectedRowKeys.includes(rowkey)) {
                        result.push(rowkey);
                    }
                });
            }

            return result;
        },

        /*
        is row keys selected all
        为 true 的条件：选中数量 + 禁用选中数量 === 总量
        */
        isCheckboxSelectedAll() {
            if (this.allRowKeys.length > 0) {
                if (
                    this.internalCheckboxSelectedRowKeys.length +
                        this.disableCheckboxUnselectedRowKeys.length ===
                    this.allRowKeys.length
                ) {
                    return true;
                }
            }

            return false;
        },
        // is checkbox indeterminate
        isCheckboxIndeterminate() {
            const { internalCheckboxSelectedRowKeys, allRowKeys } = this;

            return (
                internalCheckboxSelectedRowKeys.length > 0 &&
                internalCheckboxSelectedRowKeys.length < allRowKeys.length
            );
        },
        // 是否是受控属性（取决于selectedRowKey）
        isControlledRadio() {
            const { radioOption } = this;

            return (
                radioOption &&
                Object.keys(radioOption).includes("selectedRowKey")
            );
        },
    },
    watch: {
        // watch expand Option
        expandOption: {
            handler: function () {
                this.initInternalExpandRowKeys();
            },
            immediate: true,
        },
        // watch expandOption expandedRowKeys
        "expandOption.expandedRowKeys": {
            handler: function () {
                this.initInternalExpandRowKeys();
            },
        },
        // watch checkbox option
        checkboxOption: {
            handler: function () {
                this.initInternalCheckboxSelectedRowKeys();
            },
            immediate: true,
        },
        // watch selectedRowKeys
        "checkboxOption.selectedRowKeys": {
            handler: function () {
                this.resetInternalCheckboxSelectedRowKeys();
            },
        },
        // watch internalCheckboxSelectedRowKeys
        internalCheckboxSelectedRowKeys: {
            handler: function () {
                // send to checkbox all(in header)
                this.sendToCheckboxAll();
            },
        },
        // watch checkbox option
        radioOption: {
            handler: function () {
                this.initInternalRadioSelectedRowKey();
            },
            immediate: true,
        },
        // watch selectedRowKeys
        "radioOption.selectedRowKey": {
            handler: function () {
                this.initInternalRadioSelectedRowKey();
            },
        },
    },
    methods: {
        // is last left fixed column
        isLastLeftFixedColumn(column) {
            let result = false;

            const { colgroups } = this;

            const { fixed } = column;

            if (fixed === "left") {
                const { field } = column;
                const leftFixedColumns = colgroups.filter(
                    (x) => x.fixed === "left",
                );
                const index = leftFixedColumns.findIndex(
                    (x) => x.field === field,
                );

                if (index === leftFixedColumns.length - 1) {
                    result = true;
                }
            }
            return result;
        },

        // is first right fixed column
        isfirstRightFixedColumn(column) {
            let result = false;

            const { colgroups } = this;

            const { fixed } = column;

            if (fixed === "right") {
                const { field } = column;
                const rightFixedColumns = colgroups.filter(
                    (x) => x.fixed === "right",
                );

                if (rightFixedColumns[0].field === field) {
                    result = true;
                }
            }
            return result;
        },

        /*
         * @expandRowChange
         * @desc  row expand change
         * @param {object} rowData - row data
         * @param {number} rowIndex - row index
         */
        expandRowChange(rowData, rowIndex) {
            const {
                expandOption,
                internalExpandRowkeys,
                expandedRowkeys,
                rowKeyFieldName,
            } = this;

            // deal before expand row method
            if (typeof expandOption.beforeExpandRowChange === "function") {
                const beforeExpandRowResult =
                    expandOption.beforeExpandRowChange({
                        beforeExpandedRowKeys: expandedRowkeys,
                        row: rowData,
                        rowIndex,
                    });
                // interrupt execute
                if (beforeExpandRowResult === false) {
                    return false;
                }
            }

            const rowKey = rowData[rowKeyFieldName];

            const rowKeyIndex = internalExpandRowkeys.indexOf(rowKey);
            if (rowKeyIndex > -1) {
                internalExpandRowkeys.splice(rowKeyIndex, 1);
            } else {
                internalExpandRowkeys.push(rowKey);
            }

            // deal after expand row method
            if (typeof expandOption.afterExpandRowChange === "function") {
                expandOption.afterExpandRowChange({
                    afterExpandedRowKeys: internalExpandRowkeys,
                    row: rowData,
                    rowIndex,
                });
            }
        },

        /*
         * @rowClick
         * @desc  row expand click event
         * @param {object} rowData - row data
         * @param {number} rowIndex - row index
         */
        rowClick({ rowData, rowIndex }) {
            const {
                expandOption,
                isExpandRow,
                expandRowChange,
                rowKeyFieldName,
            } = this;

            // 行高亮功能
            if (rowKeyFieldName) {
                const rowKey = rowData[rowKeyFieldName];
                this.$emit(EMIT_EVENTS.HIGHLIGHT_ROW_CHANGE, { rowKey });
            }

            // 行展开功能
            if (!isExpandRow({ rowData, rowIndex })) {
                return false;
            }

            const trigger = expandOption.trigger;

            // expand row by click row
            if (trigger === EXPAND_TRIGGER_TYPES.ROW) {
                expandRowChange(rowData, rowIndex);
            }
        },

        /*
         * @isExpandRow
         * @desc  is expand row
         * @param {object} rowData - row data
         * @param {number} rowIndex - row index
         */
        isExpandRow({ rowData, rowIndex }) {
            let result = false;

            const { expandColumn, expandOption } = this;

            if (expandColumn && expandOption) {
                // 是否允许展开
                let expandable = true;
                if (typeof expandOption.expandable === "function") {
                    expandable = expandOption.expandable({
                        row: rowData,
                        column: expandColumn,
                        rowIndex,
                    });
                }

                if (expandable !== false) {
                    result = true;
                }
            }

            return result;
        },

        /*
         * @tdSizeChange
         * @desc  td size change
         * @param {any} key - column key
         * @param {number|string} width - column real width
         */
        tdSizeChange({ key, width }) {
            // 只有固定列才需要计算列宽
            if (this.hasFixedColumn) {
                const { colsWidths } = this;
                colsWidths.set(key, width);
                this.$emit(EMIT_EVENTS.BODY_TD_WIDTH_CHANGE, colsWidths);
            }
        },

        // init internal expand row keys
        initInternalExpandRowKeys() {
            const { expandOption, isControlledExpand, allRowKeys } = this;

            if (!expandOption) {
                return false;
            }

            if (isControlledExpand) {
                this.internalExpandRowkeys =
                    expandOption.expandedRowKeys.slice(0);
            } else if (expandOption.defaultExpandAllRows) {
                this.internalExpandRowkeys = allRowKeys;
            } else if (expandOption.defaultExpandedRowKeys) {
                this.internalExpandRowkeys =
                    expandOption.defaultExpandedRowKeys.slice(0);
            }
        },
        // get expand row
        getExpandRowComp({ rowData, rowIndex }) {
            if (this.isExpandRow({ rowData, rowIndex })) {
                const expandTrProps = {
                    props: {
                        tableViewportWidth: this.tableViewportWidth,
                        colgroups: this.colgroups,
                        expandOption: this.expandOption,
                        expandedRowkeys: this.expandedRowkeys,
                        expandColumn: this.expandColumn,
                        rowKeyFieldName: this.rowKeyFieldName,
                        rowData,
                        rowIndex,
                    },
                };

                return <ExpandTr {...expandTrProps} />;
            }

            return null;
        },

        // send to checkbox all
        sendToCheckboxAll() {
            const { isCheckboxSelectedAll, isCheckboxIndeterminate } = this;

            this.dispatch(
                COMPS_NAME.VE_TABLE,
                EMIT_EVENTS.CHECKBOX_SELECTED_ALL_INFO,
                {
                    isIndeterminate: isCheckboxIndeterminate,
                    isSelected: isCheckboxSelectedAll,
                },
            );
        },

        // init internal Radio SelectedRowKey
        initInternalRadioSelectedRowKey() {
            const { radioOption, isControlledRadio } = this;

            if (!radioOption) {
                return false;
            }

            const { selectedRowKey, defaultSelectedRowKey } = radioOption;

            this.internalRadioSelectedRowKey = isControlledRadio
                ? selectedRowKey
                : defaultSelectedRowKey;
        },

        // init internal Checkbox SelectedRowKeys
        initInternalCheckboxSelectedRowKeys() {
            let result = [];
            const { checkboxOption, allRowKeys } = this;

            if (!checkboxOption) {
                return false;
            }

            const {
                selectedRowKeys,
                defaultSelectedAllRows,
                defaultSelectedRowKeys,
            } = checkboxOption;

            if (Array.isArray(selectedRowKeys)) {
                result = selectedRowKeys;
            } else if (defaultSelectedAllRows) {
                result = allRowKeys;
            } else if (Array.isArray(defaultSelectedRowKeys)) {
                result = defaultSelectedRowKeys;
            }
            this.internalCheckboxSelectedRowKeys = result;
        },
        // reset internalCheckboxSelectedRowKeys by selectedRowKeys
        resetInternalCheckboxSelectedRowKeys() {
            this.internalCheckboxSelectedRowKeys =
                this.checkboxOption.selectedRowKeys.slice(0);
        },

        /*
         * @checkboxSelectedRowChange
         * @desc  selected row change
         * @param {number|string} rowKey - rowKey
         * @param {bool} isSelected
         */
        checkboxSelectedRowChange({ rowKey, isSelected }) {
            const {
                checkboxOption,
                internalCheckboxSelectedRowKeys,
                rowKeyFieldName,
            } = this;
            const { selectedRowChange, selectedRowKeys } = checkboxOption;

            let internalCheckboxSelectedRowKeysTemp =
                internalCheckboxSelectedRowKeys.slice(0);

            // will selected
            const rowKeyIndex =
                internalCheckboxSelectedRowKeysTemp.indexOf(rowKey);
            if (isSelected) {
                // bug fixed:通过行点击触发，导致key重复的问题
                if (rowKeyIndex === -1) {
                    internalCheckboxSelectedRowKeysTemp.push(rowKey);
                }
            } else {
                if (rowKeyIndex > -1) {
                    internalCheckboxSelectedRowKeysTemp.splice(rowKeyIndex, 1);
                }
            }

            // 非可控才改变 internalCheckboxSelectedRowKeys
            if (!Array.isArray(selectedRowKeys)) {
                this.internalCheckboxSelectedRowKeys =
                    internalCheckboxSelectedRowKeysTemp;
            }

            selectedRowChange({
                row: this.actualRenderTableData.find(
                    (x) => x[rowKeyFieldName] === rowKey,
                ),
                isSelected,
                selectedRowKeys: internalCheckboxSelectedRowKeysTemp,
            });
        },

        /*
         * @checkboxSelectedAllChange
         * @desc  selected all change
         * @param {bool} isSelected - is selected
         */
        checkboxSelectedAllChange({ isSelected }) {
            const {
                checkboxOption,
                internalCheckboxSelectedRowKeys,
                allRowKeys,
                disableCheckboxSelectedRowKeys,
                disableCheckboxUnselectedRowKeys,
            } = this;
            const { selectedAllChange, selectedRowKeys } = checkboxOption;

            let internalCheckboxSelectedRowKeysTemp =
                internalCheckboxSelectedRowKeys.slice(0);
            // selected all
            if (isSelected) {
                // except disable Row Unselected keys
                let allSelectedKeys = allRowKeys.slice(0);
                if (disableCheckboxUnselectedRowKeys.length > 0) {
                    disableCheckboxUnselectedRowKeys.forEach((rowkey) => {
                        let index = allSelectedKeys.indexOf(rowkey);
                        if (index > -1) {
                            allSelectedKeys.splice(index, 1);
                        }
                    });
                }

                internalCheckboxSelectedRowKeysTemp = allSelectedKeys;
            } else {
                // except disable Row Selected keys
                internalCheckboxSelectedRowKeysTemp =
                    disableCheckboxSelectedRowKeys;
            }

            // 非可控才改变 internalCheckboxSelectedRowKeys
            if (!Array.isArray(selectedRowKeys)) {
                this.internalCheckboxSelectedRowKeys =
                    internalCheckboxSelectedRowKeysTemp;
            }

            selectedAllChange &&
                selectedAllChange({
                    isSelected,
                    selectedRowKeys: internalCheckboxSelectedRowKeysTemp,
                    //changeRowKeys:
                });
        },

        /*
         * @radioSelectedRowChange
         * @desc  selected all change
         * @param {number|string} rowKey - rowKey
         */
        radioSelectedRowChange({ rowKey }) {
            const { radioOption, rowKeyFieldName, isControlledRadio } = this;

            const { selectedRowChange } = radioOption;

            // 非受控
            if (!isControlledRadio) {
                this.internalRadioSelectedRowKey = rowKey;
            }

            selectedRowChange({
                row: this.actualRenderTableData.find(
                    (x) => x[rowKeyFieldName] === rowKey,
                ),
            });
        },
        // get tr key
        getTrKey({ rowData, rowIndex }) {
            let result = rowIndex;

            const { rowKeyFieldName } = this;
            if (rowKeyFieldName) {
                result = rowData[rowKeyFieldName];
            }
            return result;
        },

        /*
        rendering row keys
        virtual scrolling will invoke
        */
        renderingRowKeys(rowKeys) {
            const {
                virtualScrollPreviewRenderedRowKeys: previewRenderedRowKeys,
            } = this;

            this.virtualScrollRepeatRenderedRowKeys = rowKeys.filter(
                (rowKey) => {
                    return previewRenderedRowKeys.indexOf(rowKey) != -1;
                },
            );

            this.virtualScrollPreviewRenderedRowKeys = rowKeys;
        },
    },
    mounted() {
        // receive checkbox row selected change from VE_TABLE_BODY_CHECKBOX_CONTENT
        this.$on(EMIT_EVENTS.CHECKBOX_SELECTED_ROW_CHANGE, (params) => {
            this.checkboxSelectedRowChange(params);
        });

        // receive checkbox row selected change from VE_TABLE_BODY_CHECKBOX_CONTENT
        this.$on(EMIT_EVENTS.CHECKBOX_SELECTED_ALL_CHANGE, (params) => {
            this.checkboxSelectedAllChange(params);
        });

        // receive radio row selected change from VE_TABLE_BODY_RADIO_CONTENT
        this.$on(EMIT_EVENTS.RADIO_SELECTED_ROW_CHANGE, (params) => {
            this.radioSelectedRowChange(params);
        });

        // recieve tr click
        this.$on(EMIT_EVENTS.BODY_TR_CLICK, (params) => {
            this.rowClick(params);
        });

        if (this.checkboxOption) {
            // 这里 nextTick 解决由于子组件先初始化，导致父组件无法接收消息的问题
            this.$nextTick(() => {
                this.sendToCheckboxAll();
            });
        }

        // add key down event listener
        document.addEventListener("keydown", this.dealKeydownEvent);
    },
    destroyed() {
        // remove key down event listener
        document.removeEventListener("keydown", this.dealKeydownEvent);
    },
    render() {
        const {
            colgroups,
            actualRenderTableData,
            expandOption,
            expandRowChange,
            isExpandRow,
            getExpandRowComp,
            expandedRowkeys,
            checkboxOption,
            radioOption,
            rowKeyFieldName,
            tdSizeChange,
            internalCheckboxSelectedRowKeys,
            internalRadioSelectedRowKey,
            isVirtualScroll,
            cellStyleOption,
            showVirtualScrollingPlaceholder,
        } = this;

        const { virtualScrollRepeatRenderedRowKeys } = this;

        return (
            <tbody>
                {/* Measure each column width with additional hidden col */}
                <tr style="height:0;">
                    {colgroups.map((column) => {
                        const measureTdProps = {
                            key: getDomResizeObserverCompKey(
                                column.key,
                                this.columnsOptionResetTime,
                            ),
                            props: {
                                tagName: "td",
                                id: column.key,
                            },
                            on: {
                                "on-dom-resize-change": tdSizeChange,
                            },
                            style: {
                                padding: 0,
                                border: 0,
                                height: 0,
                            },
                        };
                        return <VueDomResizeObserver {...measureTdProps} />;
                    })}
                </tr>
                {actualRenderTableData.map((rowData, rowIndex) => {
                    const trProps = {
                        key: this.getTrKey({ rowData, rowIndex }),
                        props: {
                            rowIndex,
                            rowData,
                            colgroups,
                            expandOption,
                            expandedRowkeys,
                            checkboxOption,
                            radioOption,
                            rowKeyFieldName,
                            expandRowChange,
                            internalCheckboxSelectedRowKeys,
                            internalRadioSelectedRowKey,
                            isVirtualScroll,
                            isExpandRow: isExpandRow({
                                rowData,
                                rowIndex,
                            }),
                            cellStyleOption,
                            cellSpanOption: this.cellSpanOption,
                            highlightRowKey: this.highlightRowKey,
                            eventCustomOption: this.eventCustomOption,
                            cellSelectionKeyData: this.cellSelectionKeyData,
                            editOption: this.editOption,
                            columnCollection: this.columnCollection,
                        },
                    };

                    if (showVirtualScrollingPlaceholder) {
                        const trPropsScrolling = {
                            key: this.getTrKey({ rowData, rowIndex }),
                            props: {
                                colgroups,
                            },
                        };

                        if (
                            virtualScrollRepeatRenderedRowKeys.indexOf(
                                rowData[this.rowKeyFieldName],
                            ) != -1
                        ) {
                            return [
                                // body tr
                                <BodyTr {...trProps} />,
                            ];
                        } else {
                            return <BodyTrScrolling {...trPropsScrolling} />;
                        }
                    } else {
                        return [
                            // body tr
                            <BodyTr {...trProps} />,
                            // expand row
                            getExpandRowComp({ rowData, rowIndex }),
                        ];
                    }
                })}
            </tbody>
        );
    },
};
