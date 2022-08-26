import { cloneDeep, debounce } from "lodash";
import {
    initGroupColumns,
    clsName,
    getNotFixedTotalWidthByColumnKey,
    recursiveRemoveColumnByKey,
    getContextmenuBodyOptionCollection,
    createEmptyRowData,
    isContextmenuPanelClicked,
    getRowKey,
    getColumnByColkey,
    isCellInSelectionRange,
    cellAutofill,
    isOperationColumn,
    getSelectionRangeData,
} from "./util";
import {
    onBeforeCopy,
    onAfterCopy,
    onBeforePaste,
    onAfterPaste,
    onBeforeCut,
    onAfterCut,
    onBeforeDelete,
    onAfterDelete,
} from "./util/clipboard";
import {
    getValByUnit,
    isFunction,
    isNumber,
    scrollTo,
    isEmptyValue,
    isEmptyArray,
    isBoolean,
    isDefined,
    createLocale,
} from "../../src/utils/index.js";

import emitter from "../../src/mixins/emitter";
import {
    COMPS_NAME,
    HOOKS_NAME,
    EMIT_EVENTS,
    COMPS_CUSTOM_ATTRS,
    INSTANCE_METHODS,
    CELL_SELECTION_DIRECTION,
    LOCALE_COMP_NAME,
    CONTEXTMENU_TYPES,
    AUTOFILLING_DIRECTION,
    CURRENT_CELL_SELECTION_TYPES,
    COLUMN_FIXED_TYPE,
} from "./util/constant";
import Colgroup from "./colgroup";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import EditInput from "./editor/edit-input";
import Selection from "./selection/index";
import { KEY_CODES } from "../../src/utils/constant";
import { getScrollbarWidth } from "../../src/utils/scroll-bar";
import {
    requestAnimationTimeout,
    cancelAnimationTimeout,
} from "../../src/utils/request-animation-timeout";
import { isInputKeyCode } from "../../src/utils/event-key-codes";
import clickoutside from "../../src/directives/clickoutside";
import VueDomResizeObserver from "../../src/comps/resize-observer";
import Hooks from "../../src/utils/hooks-manager";
import VeContextmenu from "vue-easytable/packages/ve-contextmenu";

const t = createLocale(LOCALE_COMP_NAME);

export default {
    name: COMPS_NAME.VE_TABLE,
    directives: {
        "click-outside": clickoutside,
    },
    mixins: [emitter],
    props: {
        tableData: {
            required: true,
            type: Array,
        },
        footerData: {
            type: Array,
            default: function () {
                return [];
            },
        },
        showHeader: {
            type: Boolean,
            default: true,
        },
        columns: {
            type: Array,
            required: true,
        },
        // row key field for row expand、row selection
        rowKeyFieldName: {
            type: String,
            default: null,
        },
        // table scroll width
        scrollWidth: {
            type: [Number, String],
            default: null,
        },
        // table max height
        maxHeight: {
            type: [Number, String],
            default: null,
        },
        // fixed header
        fixedHeader: {
            type: Boolean,
            default: true,
        },
        // fixed footer
        fixedFooter: {
            type: Boolean,
            default: true,
        },
        // border around
        borderAround: {
            type: Boolean,
            default: true,
        },
        // border horizontal
        borderX: {
            type: Boolean,
            default: true,
        },
        // border vertical
        borderY: {
            type: Boolean,
            default: false,
        },
        // event custom option
        eventCustomOption: {
            type: Object,
            default: function () {
                return null;
            },
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
        // row style option
        rowStyleOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        /*
        virual scroll option
        {
            enable:true,
            bufferCount:10, // 缓冲的数据
            minRowHeight:40,
            scrolling:(startRowIndex,visibleStartIndex,visibleEndIndex,visibleAboveCount,visibleBelowCount)=>{}
        }
        */
        virtualScrollOption: {
            type: Object,
            default: null,
        },
        // sort option
        sortOption: {
            type: Object,
            default: function () {
                return null;
            },
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
        // cell selection option
        cellSelectionOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // cell autofill option
        cellAutofillOption: {
            type: [Object, Boolean],
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
        // column hidden option
        columnHiddenOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // contextmenu body option
        contextmenuBodyOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // clipboard option
        clipboardOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
    },
    data() {
        return {
            // Hooks instance
            hooks: {},
            // is parent rendered
            parentRendered: false,
            // table viewport width except scroll bar width
            tableViewportWidth: 0,
            /*
            列配置变化次数
            依赖columns 配置渲染，都需要重新计算：粘性布局时，重新触发 on-dom-resize-change 事件
            */
            columnsOptionResetTime: 0,
            tableContainerRef: "tableContainerRef",
            tableBodyRef: "tableBodyRef",
            tableContentWrapperRef: "tableContentWrapperRef",
            virtualPhantomRef: "virtualPhantomRef",
            editInputRef: "editInputRef",
            cloneColumns: [],
            // is group header
            isGroupHeader: false,
            /*
            header rows created by groupColumns
            */
            headerRows: [
                /* {
                rowHeight:40
            } */
            ],
            /*
            footer rows created by footerData
            */
            footerRows: [
                /* {
                rowHeight:40
             } */
            ],
            // colgroups
            colgroups: [],
            // groupColumns
            groupColumns: [],
            /*
            存储当前隐藏列信息
            hidden columns
            */
            hiddenColumns: [],
            /*
            // virtual scroll positions（非响应式）
            virtualScrollPositions = [
                {
                    rowKey: "", // 当前行数据 rowKey
                    top: 0, // 距离上一个项的高度
                    bottom: 100, // 距离下一个项的高度
                    height: 100 // 自身高度
                }
            ],
            */
            // virtual scroll visible data
            virtualScrollVisibleData: [],
            // virtual scroll visible indexs
            virtualScrollVisibleIndexs: {
                start: -1,
                end: -1,
            },
            // default virtual scroll buffer scale
            defaultVirtualScrollBufferScale: 1,
            // default virtual scroll min row height
            defaultVirtualScrollMinRowHeight: 40,
            // default placeholder per scrolling row count
            defaultPlaceholderPerScrollingRowCount: 8,
            //起始索引
            virtualScrollStartIndex: 0,
            // preview virtual scroll start index
            previewVirtualScrollStartIndex: 0,
            //结束索引
            virtualScrollEndIndex: 0,
            // is scrolling
            showVirtualScrollingPlaceholder: false,
            // disable pointer events timeout id
            disablePointerEventsTimeoutId: null,
            // is scrolling left
            isLeftScrolling: false,
            // is scrolling right
            isRightScrolling: false,
            // has horizontal scroll bar
            hasXScrollBar: false,
            // has vertical scroll bar
            hasYScrollBar: false,
            // scroll bar width
            scrollBarWidth: 0,
            // preview table container scrollLeft （处理左列或右列固定效果）
            previewTableContainerScrollLeft: null,
            // cell selection data
            cellSelectionData: {
                currentCell: {
                    rowKey: "",
                    colKey: "",
                    rowIndex: -1,
                },
                normalEndCell: {
                    rowKey: "",
                    colKey: "",
                    rowIndex: -1,
                },
                autoFillEndCell: {
                    rowKey: "",
                    colKey: "",
                },
            },
            // cell selection range data
            cellSelectionRangeData: {
                leftColKey: "",
                rightColKey: "",
                topRowKey: "",
                bottomRowKey: "",
            },
            /*
            is body td mousedown
            mousedown+mouseup 才允许 area 绘制
            */
            isBodyTdMousedown: false,
            /* 
            is cell selection corner mousedown
            */
            isAutofillStarting: false,
            /* 
            autofilling direction
            */
            autofillingDirection: null,
            // current cell selection type
            currentCellSelectionType: "",
            /*
            table offest height（开启虚拟滚动时使用）
            1、当 :max-height="500" 时使用 max-height 
            2、当 max-height="calc(100vh - 210px)" 或者 max-height="80%" 时使用 tableOffestHeight
            */
            tableOffestHeight: 0,
            // table height
            tableHeight: 0,
            // highlight row key
            highlightRowKey: "",
            /* 
            editing cell
            */
            editingCell: {
                rowKey: "",
                colKey: "",
                row: null,
                column: null,
            },
            // 编辑单元格每次开始编辑前的初始值
            editorInputStartValue: "",
            /* 
            是否允许按下方向键时，停止编辑并移动选中单元格。当双击可编辑单元格或者点击输入文本框时设置为false值

            像excel一样：如果直接在可编辑单元格上输入内容后，按下上、下、左、右按键可以直接选中其他单元格，并停止当前单元格编辑状态
            like Excel:If you directly enter content in an editable cell, press the up, down, left and right buttons to directly select other cells and stop editing the current cell
            */
            enableStopEditing: true,
            // contextmenu event target
            contextmenuEventTarget: "",
            start: 0,
            end: 0
        };
    },
    computed: {
        // actual render table data
        actualRenderTableData() {
            return this.isVirtualScroll
                ? this.virtualScrollVisibleData
                : this.tableData;
        },
        // return row keys
        allRowKeys() {
            let result = [];

            const { tableData, rowKeyFieldName } = this;

            if (rowKeyFieldName) {
                result = tableData.map((x) => {
                    return x[rowKeyFieldName];
                });
            }

            return result;
        },
        // virtual scroll buffer count
        virtualScrollBufferCount() {
            let result = 0;

            const {
                virtualScrollOption,
                defaultVirtualScrollBufferScale,
                virtualScrollVisibleCount,
            } = this;

            if (virtualScrollOption) {
                const { bufferScale } = virtualScrollOption;

                let realBufferScale =
                    isNumber(bufferScale) && bufferScale > 0
                        ? bufferScale
                        : defaultVirtualScrollBufferScale;

                result = realBufferScale * virtualScrollVisibleCount;
            }

            return result;
        },
        // virtual scroll visible count
        virtualScrollVisibleCount() {
            let result = 0;

            const {
                isVirtualScroll,
                virtualScrollOption,
                defaultVirtualScrollMinRowHeight,
                maxHeight,
                tableOffestHeight,
            } = this;

            if (isVirtualScroll && maxHeight) {
                const minRowHeight = isNumber(virtualScrollOption.minRowHeight)
                    ? virtualScrollOption.minRowHeight
                    : defaultVirtualScrollMinRowHeight;

                if (isNumber(maxHeight)) {
                    result = Math.ceil(maxHeight / minRowHeight);
                } else if (tableOffestHeight) {
                    // 修复当动态高度 当 max-height="calc(100vh - 210px)" 或者 max-height="80%" 时无法计算的问题
                    result = Math.ceil(tableOffestHeight / minRowHeight);
                }
            }
            return result;
        },
        // table container style
        tableContainerStyle() {
            let maxHeight = getValByUnit(this.maxHeight);

            let tableContainerHeight = null;
            if (this.isVirtualScroll) {
                if (maxHeight) {
                    tableContainerHeight = maxHeight;
                } else {
                    console.error(
                        "maxHeight prop is required when 'virtualScrollOption.enable = true'",
                    );
                }
            } else {
                /* 
                fixed:虚拟滚动表格行展开的 ve-table 存在固定头时（sticky 冲突），表格样式错乱的问题
                fixed:When there is a fixed header in the ve-table expanded by the row of the virtual rolling table(header sticky conflict),Incorrect table presentation
                */
                const { tableHeight, hasXScrollBar } = this;

                tableContainerHeight = tableHeight;

                /*
                    有横向滚动条时，表格高度需要加上滚动条的宽度
                    When there is a horizontal scroll bar, the table height needs to be added with the width of the scroll bar
                    */
                if (hasXScrollBar) {
                    tableContainerHeight += this.getScrollBarWidth();
                }

                tableContainerHeight = getValByUnit(tableContainerHeight);
            }

            return {
                "max-height": maxHeight,
                // if virtual scroll
                height: tableContainerHeight,
            };
        },
        // table style
        tableStyle() {
            return {
                width: getValByUnit(this.scrollWidth),
            };
        },
        // table class
        tableClass() {
            return {
                [clsName("border-x")]: this.borderX,
                [clsName("border-y")]: this.borderY,
            };
        },
        // table container class
        tableContainerClass() {
            const {
                isVirtualScroll,
                isLeftScrolling,
                isRightScrolling,
                isCellEditing,
                isAutofillStarting,
                enableCellSelection,
            } = this;

            return {
                [clsName("container")]: true,
                [clsName("virtual-scroll")]: isVirtualScroll,
                [clsName("container-left-scrolling")]: isLeftScrolling,
                [clsName("container-right-scrolling")]: isRightScrolling,
                [clsName("is-cell-editing")]: isCellEditing,
                [clsName("autofilling")]: isAutofillStarting,
                // 如果开启单元格选择，则关闭 user-select
                [clsName("enable-cell-selection")]: enableCellSelection,
            };
        },
        // table body class
        tableBodyClass() {
            let result = null;

            const { rowStyleOption } = this;

            let hoverHighlight = true;
            let clickHighlight = true;
            let stripe = false;

            if (rowStyleOption) {
                hoverHighlight = rowStyleOption.hoverHighlight;
                clickHighlight = rowStyleOption.clickHighlight;
                stripe = rowStyleOption.stripe;
            }

            result = {
                [clsName("stripe")]: stripe === true, // 默认不开启
                [clsName("row-hover")]: hoverHighlight !== false, // 默认开启
                [clsName("row-highlight")]: clickHighlight !== false, // 默认开启
            };

            return result;
        },
        // is virtual scroll
        isVirtualScroll() {
            const { virtualScrollOption } = this;
            return virtualScrollOption && virtualScrollOption.enable;
        },
        // has fixed column
        hasFixedColumn() {
            return this.colgroups.some(
                (x) =>
                    x.fixed === COLUMN_FIXED_TYPE.LEFT ||
                    x.fixed === COLUMN_FIXED_TYPE.RIGHT,
            );
        },
        // has left fixed column
        hasLeftFixedColumn() {
            return this.colgroups.some(
                (x) => x.fixed === COLUMN_FIXED_TYPE.LEFT,
            );
        },
        // has right fixed column
        hasRightFixedColumn() {
            return this.colgroups.some(
                (x) => x.fixed === COLUMN_FIXED_TYPE.RIGHT,
            );
        },
        // is editing cell
        isCellEditing() {
            const { editingCell } = this;

            return (
                !isEmptyValue(editingCell.rowKey) &&
                !isEmptyValue(editingCell.colKey)
            );
        },
        // has edit column
        hasEditColumn() {
            return this.colgroups.some((x) => x.edit);
        },
        // enable contextmenu
        enableContextmenu() {
            let result = false;

            const { contextmenuBodyOption } = this;
            if (contextmenuBodyOption) {
                const { contextmenus } = contextmenuBodyOption;

                if (Array.isArray(contextmenus) && contextmenus.length) {
                    result = true;
                }
            }
            return result;
        },
        /*
        enable cell selection
        单元格编辑、剪贴板都依赖单元格选择
        */
        enableCellSelection() {
            let result = true;

            const { cellSelectionOption, rowKeyFieldName } = this;

            if (isEmptyValue(rowKeyFieldName)) {
                result = false;
            } else if (
                cellSelectionOption &&
                isBoolean(cellSelectionOption.enable) &&
                cellSelectionOption.enable === false
            ) {
                result = false;
            }
            return result;
        },
        // enable clipboard
        enableClipboard() {
            return this.rowKeyFieldName;
        },
        // contextmenus
        contextmenus() {
            let result = [];
            const { enableContextmenu, contextmenuBodyOption } = this;
            if (enableContextmenu) {
                const { contextmenus } = contextmenuBodyOption;

                const contextmenuBodyOptionCollection =
                    getContextmenuBodyOptionCollection(t);

                contextmenus.forEach((contextmenu) => {
                    const contentmenuCollectionItem =
                        contextmenuBodyOptionCollection.find(
                            (x) => x.type === contextmenu.type,
                        );
                    if (contentmenuCollectionItem) {
                        result.push(contentmenuCollectionItem);
                    } else {
                        result.push(contextmenu);
                    }
                });
            }

            return result;
        },
        // header total height
        headerTotalHeight() {
            let result = 0;
            if (this.showHeader) {
                result = this.headerRows.reduce((total, currentVal) => {
                    return currentVal.rowHeight + total;
                }, 0);
            }
            return result;
        },
        // footer total height
        footerTotalHeight() {
            return this.footerRows.reduce((total, currentVal) => {
                return currentVal.rowHeight + total;
            }, 0);
        },
    },
    watch: {
        // watch clone table data
        tableData: {
            handler(newVal, oldVal) {
                this.initVirtualScrollPositions();
                // 第一次不需要触发，仅数据变更触发
                if (oldVal) {
                    this.initVirtualScroll();
                }
            },
            immediate: true,
        },
        allRowKeys: {
            handler(newVal) {
                if (Array.isArray(newVal)) {
                    const { currentCell } = this.cellSelectionData;
                    // 行被移除，清空单元格选中
                    if (currentCell.rowIndex > -1) {
                        if (newVal.indexOf(currentCell.rowKey) === -1) {
                            this.clearCellSelectionCurrentCell();
                        }
                    }
                }
            },
            immediate: false,
        },
        columns: {
            handler(newVal, oldVal) {
                this.initColumns();
                this.initGroupColumns();

                // 排除首次
                if (newVal != oldVal && oldVal) {
                    this.columnsOptionResetTime++;
                    // 需要等待 initColumns 和 initGroupColumns 先执行
                    this.initScrolling();
                }
            },
            immediate: true,
        },
        cloneColumns: {
            handler() {
                this.initGroupColumns();

                this.columnsOptionResetTime++;
                // 需要等待 initColumns 和 initGroupColumns 先执行
                this.initScrolling();
            },
            immediate: false,
        },
        // group columns change watch
        groupColumns: {
            handler(val) {
                if (!isEmptyArray(val)) {
                    this.initHeaderRows();
                }
            },
            immediate: true,
        },
        // footer data
        footerData: {
            handler(val) {
                if (!isEmptyArray(val)) {
                    this.initFooterRows();
                }
            },
            immediate: true,
        },
        /*
        watch virtualScrollOption enable
        允许按需开启虚拟滚动
        */
        "virtualScrollOption.enable": {
            handler(newVal) {
                // enable virtual scroll
                if (newVal) {
                    this.initVirtualScrollPositions();
                    this.initVirtualScroll();
                }
                // disable virtual scroll
                else {
                    // clear table content top value
                    this.setTableContentTopValue({ top: 0 });
                }
            },
            immediate: false,
        },
        // is auto fill starting
        isAutofillStarting: {
            handler(val) {
                if (!val) {
                    this.setCellSelectionByAutofill();
                    this.clearCellSelectionAutofillEndCell();
                }
            },
        },
        // watch current cell
        "cellSelectionData.currentCell": {
            handler: function () {
                this.setCurrentCellSelectionType();
            },
            deep: true,
            immediate: true,
        },
        // watch normal end cell
        "cellSelectionData.normalEndCell": {
            handler: function () {
                this.setCurrentCellSelectionType();
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        // int header rows
        initHeaderRows() {
            const { groupColumns } = this;

            if (Array.isArray(groupColumns)) {
                this.headerRows = groupColumns.map(() => {
                    return { rowHeight: 0 };
                });
            }
        },

        // int footer rows
        initFooterRows() {
            const { footerData } = this;

            if (Array.isArray(footerData)) {
                this.footerRows = footerData.map(() => {
                    return { rowHeight: 0 };
                });
            }
        },

        // header tr height resize
        headerTrHeightChange({ rowIndex, height }) {
            this.headerRows.splice(rowIndex, 1, { rowHeight: height });
        },

        // footer tr height resize
        footTrHeightChange({ rowIndex, height }) {
            this.footerRows.splice(rowIndex, 1, { rowHeight: height });
        },

        // td width change
        tdWidthChange(colWidths) {
            this.colgroups = this.colgroups.map((item) => {
                // map
                item._realTimeWidth = colWidths.get(item.key);
                return item;
            });
            this.hooks.triggerHook(HOOKS_NAME.TABLE_TD_WIDTH_CHANGE);
        },

        // update colgroups by sort change
        updateColgroupsBySortChange(sortColumns) {
            this.colgroups = this.colgroups.map((item) => {
                // update colgroups by sort columns
                if (Object.keys(sortColumns).indexOf(item.field) > -1) {
                    item.sortBy = sortColumns[item.field];
                }

                return item;
            });
        },

        // init columns
        initColumns() {
            const { columnHiddenOption } = this;
            if (columnHiddenOption) {
                const { defaultHiddenColumnKeys } = columnHiddenOption;

                if (!isEmptyArray(defaultHiddenColumnKeys)) {
                    this.hiddenColumns = defaultHiddenColumnKeys;
                }
            }

            this.showOrHideColumns();
        },

        // show or hide columns
        showOrHideColumns() {
            let cloneColumns = cloneDeep(this.columns);

            const { hiddenColumns } = this;

            if (!isEmptyArray(hiddenColumns)) {
                //  recursive remove column key
                hiddenColumns.forEach((key) => {
                    cloneColumns = recursiveRemoveColumnByKey(
                        cloneColumns,
                        key,
                    );
                });
            }

            this.cloneColumns = cloneColumns;
        },

        // 初始化分组表头
        initGroupColumns() {
            const result = initGroupColumns(this.cloneColumns);

            // set is group header
            this.isGroupHeader = result.isGroupHeader;
            // set colgroups
            this.colgroups = result.colgroups;
            // set groupColumns
            this.groupColumns = result.groupColumns;
        },

        // scroll bar width
        getScrollBarWidth() {
            let result = 0;

            const { scrollBarWidth } = this;

            if (scrollBarWidth) {
                result = scrollBarWidth;
            } else {
                result = getScrollbarWidth();
                this.scrollBarWidth = result;
            }

            return result;
        },

        /*
         * @selectedAllChange
         * @desc  selected all change
         * @param {bool} isSelected - is selected
         */
        selectedAllChange({ isSelected }) {
            this.broadcast(
                COMPS_NAME.VE_TABLE_BODY,
                EMIT_EVENTS.CHECKBOX_SELECTED_ALL_CHANGE,
                {
                    isSelected,
                },
            );
        },

        /*
         * @setSelectedAllInfo
         * @desc  set selected all info
         * @param {bool} isSelected - is selected
         * @param {bool} isIndeterminate - is indeterminate
         */
        setSelectedAllInfo({ isSelected, isIndeterminate }) {
            this.broadcast(
                COMPS_NAME.VE_TABLE_HEADER_CHECKBOX_CONTENT,
                EMIT_EVENTS.CHECKBOX_SELECTED_ALL_INFO,
                {
                    isSelected,
                    isIndeterminate,
                },
            );
        },

        // cell selection current cell change
        cellSelectionCurrentCellChange({ rowKey, colKey }) {
            this.cellSelectionData.currentCell.colKey = colKey;
            this.cellSelectionData.currentCell.rowKey = rowKey;
            this.cellSelectionData.currentCell.rowIndex =
                this.allRowKeys.indexOf(rowKey);
        },

        // cell selection end cell change
        cellSelectionNormalEndCellChange({ rowKey, colKey }) {
            this.cellSelectionData.normalEndCell.colKey = colKey;
            this.cellSelectionData.normalEndCell.rowKey = rowKey;
            this.cellSelectionData.normalEndCell.rowIndex =
                this.allRowKeys.indexOf(rowKey);
        },

        // cell selection auto fill cell change
        cellSelectionAutofillCellChange({ rowKey, colKey }) {
            this.cellSelectionData.autoFillEndCell.colKey = colKey;
            this.cellSelectionData.autoFillEndCell.rowKey = rowKey;
        },

        // clear cell selection current cell
        clearCellSelectionCurrentCell() {
            this.cellSelectionCurrentCellChange({
                rowKey: "",
                colKey: "",
                rowIndex: -1,
            });
        },

        // clear cell selection normal end cell
        clearCellSelectionNormalEndCell() {
            this.cellSelectionNormalEndCellChange({
                rowKey: "",
                colKey: "",
                rowIndex: -1,
            });
        },

        // clear cell selection autofill end cell
        clearCellSelectionAutofillEndCell() {
            this.cellSelectionAutofillCellChange({ rowKey: "", colKey: "" });
        },

        // set cell selection by autofill
        setCellSelectionByAutofill() {
            const {
                cellAutofillOption,
                cellSelectionRangeData,
                colgroups,
                allRowKeys,
                autofillingDirection,
                currentCellSelectionType,
            } = this;
            const { autoFillEndCell, currentCell } = this.cellSelectionData;

            const { rowKey, colKey } = autoFillEndCell;

            if (isEmptyValue(rowKey) || isEmptyValue(colKey)) {
                return false;
            }

            let currentCellData = {};
            let normalEndCellData = {};

            const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
                cellSelectionRangeData;

            // cell selection range auto fill
            if (
                currentCellSelectionType === CURRENT_CELL_SELECTION_TYPES.RANGE
            ) {
                if (
                    !isCellInSelectionRange({
                        cellData: autoFillEndCell,
                        cellSelectionRangeData,
                        colgroups,
                        allRowKeys,
                    })
                ) {
                    if (autofillingDirection === AUTOFILLING_DIRECTION.RIGHT) {
                        currentCellData = {
                            rowKey: topRowKey,
                            colKey: leftColKey,
                        };
                        normalEndCellData = { rowKey: bottomRowKey, colKey };
                    } else if (
                        autofillingDirection === AUTOFILLING_DIRECTION.DOWN
                    ) {
                        currentCellData = {
                            rowKey: topRowKey,
                            colKey: leftColKey,
                        };
                        normalEndCellData = { rowKey, colKey: rightColKey };
                    } else if (
                        autofillingDirection === AUTOFILLING_DIRECTION.UP
                    ) {
                        currentCellData = {
                            rowKey,
                            colKey: leftColKey,
                        };
                        normalEndCellData = {
                            rowKey: bottomRowKey,
                            colKey: rightColKey,
                        };
                    } else if (
                        autofillingDirection === AUTOFILLING_DIRECTION.LEFT
                    ) {
                        currentCellData = { rowKey: topRowKey, colKey };
                        normalEndCellData = {
                            rowKey: bottomRowKey,
                            colKey: rightColKey,
                        };
                    }
                } else {
                    // return if within the range
                    return false;
                }
            }
            // cell selection single auto fill
            else if (
                currentCellSelectionType === CURRENT_CELL_SELECTION_TYPES.SINGLE
            ) {
                if (
                    currentCell.rowKey !== rowKey ||
                    currentCell.colKey !== colKey
                ) {
                    if (autofillingDirection === AUTOFILLING_DIRECTION.RIGHT) {
                        currentCellData = {
                            rowKey,
                            colKey: leftColKey,
                        };
                        normalEndCellData = {
                            rowKey,
                            colKey,
                        };
                    } else if (
                        autofillingDirection === AUTOFILLING_DIRECTION.DOWN
                    ) {
                        currentCellData = {
                            rowKey: topRowKey,
                            colKey: leftColKey,
                        };
                        normalEndCellData = {
                            rowKey,
                            colKey: leftColKey,
                        };
                    } else if (
                        autofillingDirection === AUTOFILLING_DIRECTION.UP
                    ) {
                        currentCellData = {
                            rowKey,
                            colKey: leftColKey,
                        };
                        normalEndCellData = {
                            rowKey: bottomRowKey,
                            colKey: leftColKey,
                        };
                    } else if (
                        autofillingDirection === AUTOFILLING_DIRECTION.LEFT
                    ) {
                        currentCellData = {
                            rowKey,
                            colKey,
                        };
                        normalEndCellData = {
                            rowKey,
                            colKey: rightColKey,
                        };
                    }
                } else {
                    // return if within the range
                    return false;
                }
            }

            const cellAutofillParams = {
                tableData: this.tableData,
                allRowKeys: this.allRowKeys,
                colgroups: this.colgroups,
                rowKeyFieldName: this.rowKeyFieldName,
                direction: autofillingDirection,
                currentCellSelectionType,
                cellSelectionRangeData,
                nextCurrentCell: currentCellData,
                nextNormalEndCell: normalEndCellData,
            };

            if (cellAutofillOption) {
                const { beforeAutofill, afterAutofill } = cellAutofillOption;

                if (isFunction(beforeAutofill)) {
                    // before autofill
                    const autofillResponse = cellAutofill({
                        isReplaceData: false,
                        ...cellAutofillParams,
                    });
                    const callback = beforeAutofill(autofillResponse);
                    if (isBoolean(callback) && !callback) {
                        return false;
                    }
                }

                // after autofill
                const autofillResponse = cellAutofill({
                    isReplaceData: true,
                    ...cellAutofillParams,
                });
                if (isFunction(afterAutofill)) {
                    afterAutofill(autofillResponse);
                }
            }

            if (!isEmptyValue(currentCellData.rowKey)) {
                this.cellSelectionCurrentCellChange({
                    rowKey: currentCellData.rowKey,
                    colKey: currentCellData.colKey,
                });
            }

            if (!isEmptyValue(normalEndCellData.rowKey)) {
                this.cellSelectionNormalEndCellChange({
                    rowKey: normalEndCellData.rowKey,
                    colKey: normalEndCellData.colKey,
                });
            }
        },

        // cell selection range data change
        cellSelectionRangeDataChange(newData) {
            this.cellSelectionRangeData = Object.assign(
                this.cellSelectionRangeData,
                newData,
            );
        },

        // autofilling direction change
        autofillingDirectionChange(direction) {
            this.autofillingDirection = direction;
        },

        // set current cell selection type
        setCurrentCellSelectionType() {
            const { currentCell, normalEndCell } = this.cellSelectionData;

            let result;

            if (
                isEmptyValue(currentCell.rowKey) ||
                isEmptyValue(currentCell.colKey)
            ) {
                result = "";
            } else {
                if (
                    !isEmptyValue(normalEndCell.rowKey) &&
                    !isEmptyValue(normalEndCell.colKey)
                ) {
                    result = CURRENT_CELL_SELECTION_TYPES.RANGE;
                } else {
                    result = CURRENT_CELL_SELECTION_TYPES.SINGLE;
                }
            }

            this.currentCellSelectionType = result;
        },

        // deal keydown event
        dealKeydownEvent(event) {
            const {
                colgroups,
                cellSelectionData,
                enableStopEditing,
                isCellEditing,
            } = this;

            const { keyCode, ctrlKey, shiftKey, altKey } = event;

            const { rowKey, colKey } = cellSelectionData.currentCell;

            const currentColumn = colgroups.find((x) => x.key === colKey);

            if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                switch (keyCode) {
                    case KEY_CODES.TAB: {
                        let direction;
                        if (shiftKey) {
                            direction = CELL_SELECTION_DIRECTION.LEFT;
                        } else {
                            direction = CELL_SELECTION_DIRECTION.RIGHT;
                        }

                        this.selectCellByDirection({
                            direction,
                        });

                        this.clearCellSelectionNormalEndCell();

                        this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                        event.preventDefault();
                        break;
                    }
                    case KEY_CODES.ARROW_LEFT: {
                        const direction = CELL_SELECTION_DIRECTION.LEFT;
                        if (enableStopEditing) {
                            this.selectCellByDirection({
                                direction,
                            });

                            this.clearCellSelectionNormalEndCell();

                            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                            event.preventDefault();
                        }

                        break;
                    }
                    case KEY_CODES.ARROW_RIGHT: {
                        const direction = CELL_SELECTION_DIRECTION.RIGHT;

                        if (enableStopEditing) {
                            this.selectCellByDirection({
                                direction,
                            });

                            this.clearCellSelectionNormalEndCell();

                            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                            event.preventDefault();
                        }
                        break;
                    }
                    case KEY_CODES.ARROW_UP: {
                        const direction = CELL_SELECTION_DIRECTION.UP;

                        if (enableStopEditing) {
                            this.selectCellByDirection({
                                direction,
                            });

                            this.clearCellSelectionNormalEndCell();

                            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                            event.preventDefault();
                        }
                        break;
                    }
                    case KEY_CODES.ARROW_DOWN: {
                        const direction = CELL_SELECTION_DIRECTION.DOWN;

                        if (enableStopEditing) {
                            this.selectCellByDirection({
                                direction,
                            });

                            this.clearCellSelectionNormalEndCell();

                            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                            event.preventDefault();
                        }
                        break;
                    }
                    case KEY_CODES.ENTER: {
                        let direction;
                        // add new line
                        if (altKey) {
                            const editInputEditor =
                                this.$refs[this.editInputRef];

                            editInputEditor.textareaAddNewLine();
                        }
                        // direction up
                        else if (shiftKey) {
                            direction = CELL_SELECTION_DIRECTION.UP;
                            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                        }
                        // stop editing and stay in current cell
                        else if (ctrlKey) {
                            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                        }
                        // direction down
                        else {
                            direction = CELL_SELECTION_DIRECTION.DOWN;
                            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                        }

                        if (direction) {
                            this.clearCellSelectionNormalEndCell();
                            this.selectCellByDirection({
                                direction,
                            });
                        }
                        event.preventDefault();
                        break;
                    }
                    case KEY_CODES.SPACE: {
                        if (!isCellEditing) {
                            // start editing and enter a space
                            this[INSTANCE_METHODS.START_EDITING_CELL]({
                                rowKey,
                                colKey,
                                defaultValue: " ",
                            });
                            event.preventDefault();
                        }

                        break;
                    }
                    case KEY_CODES.BACK_SPACE: {
                        if (!isCellEditing) {
                            // start editing and clear value
                            this[INSTANCE_METHODS.START_EDITING_CELL]({
                                rowKey,
                                colKey,
                                defaultValue: "",
                            });
                            event.preventDefault();
                        }

                        break;
                    }
                    case KEY_CODES.DELETE: {
                        if (!isCellEditing) {
                            // delete cell selection range value
                            this.deleteCellSelectionRangeValue();
                            event.preventDefault();
                        }

                        break;
                    }
                    case KEY_CODES.F2: {
                        if (!isCellEditing) {
                            if (currentColumn.edit) {
                                // start editing cell and don't allow stop eidting by direction key
                                this.enableStopEditing = false;
                                this[INSTANCE_METHODS.START_EDITING_CELL]({
                                    rowKey,
                                    colKey,
                                });
                            }
                            event.preventDefault();
                        }

                        break;
                    }
                    default: {
                        // enter text directly
                        if (isInputKeyCode(event)) {
                            this[INSTANCE_METHODS.START_EDITING_CELL]({
                                rowKey,
                                colKey,
                                defaultValue: "",
                            });
                        }
                        break;
                    }
                }
            }
        },

        // select cell by direction
        selectCellByDirection({ direction }) {
            const { colgroups, allRowKeys, cellSelectionData } = this;

            const { rowKey, colKey } = cellSelectionData.currentCell;

            let columnIndex = colgroups.findIndex((x) => x.key === colKey);
            let rowIndex = allRowKeys.indexOf(rowKey);

            if (direction === CELL_SELECTION_DIRECTION.LEFT) {
                if (columnIndex > 0) {
                    let nextColumn = colgroups[columnIndex - 1];
                    this.cellSelectionData.currentCell.colKey = nextColumn.key;
                    this.columnToVisible(nextColumn);
                }
            } else if (direction === CELL_SELECTION_DIRECTION.RIGHT) {
                if (columnIndex < colgroups.length - 1) {
                    let nextColumn = colgroups[columnIndex + 1];
                    this.cellSelectionData.currentCell.colKey = nextColumn.key;
                    this.columnToVisible(nextColumn);
                }
            } else if (direction === CELL_SELECTION_DIRECTION.UP) {
                if (rowIndex > 0) {
                    const nextRowKey = allRowKeys[rowIndex - 1];
                    this.rowToVisible(KEY_CODES.ARROW_UP, nextRowKey);
                }
            } else if (direction === CELL_SELECTION_DIRECTION.DOWN) {
                if (rowIndex < allRowKeys.length - 1) {
                    const nextRowKey = allRowKeys[rowIndex + 1];
                    this.rowToVisible(KEY_CODES.ARROW_DOWN, nextRowKey);
                }
            }
        },

        /*
         * @columnToVisible
         * @desc  column to visible
         * @param {object} nextColumn - next column
         */
        columnToVisible(nextColumn) {
            const { hasXScrollBar, colgroups } = this;

            if (!hasXScrollBar) {
                return false;
            }

            const tableContainerRef = this.$refs[this.tableContainerRef];

            const { scrollWidth, clientWidth, scrollLeft } = tableContainerRef;

            if (!nextColumn.fixed) {
                const leftTotalWidth = getNotFixedTotalWidthByColumnKey({
                    colgroups,
                    colKey: nextColumn.key,
                    fixed: COLUMN_FIXED_TYPE.LEFT,
                });

                const rightTotalWidth = getNotFixedTotalWidthByColumnKey({
                    colgroups,
                    colKey: nextColumn.key,
                    fixed: COLUMN_FIXED_TYPE.RIGHT,
                });

                if (scrollLeft) {
                    const diff = scrollLeft - leftTotalWidth;
                    if (diff > 0) {
                        tableContainerRef.scrollLeft = scrollLeft - diff;
                    }
                }

                const scrollRight = scrollWidth - clientWidth - scrollLeft;
                if (scrollRight) {
                    const diff = scrollRight - rightTotalWidth;
                    if (diff > 0) {
                        tableContainerRef.scrollLeft = scrollLeft + diff;
                    }
                }
            }
        },

        /*
         * @rowToVisible
         * @desc  row to visible
         * @param {number} keyCode - current keyCode
         * @param {any} nextRowKey - next row key
         */
        rowToVisible(keyCode, nextRowKey) {
            const tableContainerRef = this.$refs[this.tableContainerRef];
            const tableContentWrapperRef =
                this.$refs[this.tableContentWrapperRef].$el;

            const { isVirtualScroll, headerTotalHeight, footerTotalHeight } =
                this;

            const {
                clientHeight: containerClientHeight,
                scrollTop: containerScrollTop,
            } = tableContainerRef;

            const nextRowEl = this.$el.querySelector(
                `tbody tr[${COMPS_CUSTOM_ATTRS.BODY_ROW_KEY}="${nextRowKey}"]`,
            );

            if (nextRowEl) {
                const { offsetTop: trOffsetTop, clientHeight: trClientHeight } =
                    nextRowEl;

                const parentOffsetTop = tableContentWrapperRef.offsetTop;

                // arrow up
                if (keyCode === KEY_CODES.ARROW_UP) {
                    let diff = 0;
                    if (isVirtualScroll) {
                        diff =
                            headerTotalHeight -
                            (trOffsetTop -
                                (containerScrollTop - parentOffsetTop));
                    } else {
                        diff =
                            containerScrollTop +
                            headerTotalHeight -
                            trOffsetTop;
                    }

                    if (diff > 0) {
                        tableContainerRef.scrollTop = containerScrollTop - diff;
                    }
                }
                // arrow down
                else if (keyCode === KEY_CODES.ARROW_DOWN) {
                    let diff = 0;
                    if (isVirtualScroll) {
                        diff =
                            trOffsetTop -
                            (containerScrollTop - parentOffsetTop) +
                            trClientHeight +
                            footerTotalHeight -
                            containerClientHeight;
                    } else {
                        diff =
                            trOffsetTop +
                            trClientHeight +
                            footerTotalHeight -
                            (containerClientHeight + containerScrollTop);
                    }

                    if (diff >= 0) {
                        tableContainerRef.scrollTop = containerScrollTop + diff;
                    }
                }
                const { currentCell } = this.cellSelectionData;
                this.cellSelectionCurrentCellChange({
                    rowKey: nextRowKey,
                    colKey: currentCell.colKey,
                });
            }
        },

        // set virtual scroll visible data
        setVirtualScrollVisibleData() {
            const { tableData } = this;

            const startIndex = this.virtualScrollStartIndex;
            const endIndex = this.virtualScrollEndIndex;

            const aboveCount = this.getVirtualScrollAboveCount();
            const belowCount = this.getVirtualScrollBelowCount();

            let start = startIndex - aboveCount;
            let end = endIndex + belowCount;
            if (end <= this.start) {
                this.start = start;
                this.end = end;
                this.virtualScrollVisibleData = tableData.slice(start, end);
                return
            };
            if (start >= this.start) {
                this.virtualScrollVisibleData = tableData.slice(this.start, end);
            } else {
                this.virtualScrollVisibleData = tableData.slice(start, this.end);
            }

            this.$nextTick(() => {
                this.start = start;
                this.end = end;
                this.virtualScrollVisibleData = tableData.slice(start, end);
            })
        },

        // get virtual scroll above count
        getVirtualScrollAboveCount() {
            let result = 0;
            const { isVirtualScroll, virtualScrollBufferCount } = this;

            const virtualScrollStartIndex = this.virtualScrollStartIndex;

            if (isVirtualScroll) {
                result = Math.min(
                    virtualScrollStartIndex,
                    virtualScrollBufferCount,
                );
            }
            return result;
        },

        // get virtual scroll bellow count
        getVirtualScrollBelowCount() {
            let result = 0;

            const { isVirtualScroll, tableData, virtualScrollBufferCount } =
                this;

            const virtualScrollEndIndex = this.virtualScrollEndIndex;

            if (isVirtualScroll) {
                result = Math.min(
                    tableData.length - virtualScrollEndIndex,
                    virtualScrollBufferCount,
                );
            }

            return result;
        },

        // get virtual phantom
        getVirtualViewPhantom() {
            let content = null;

            /*
            1、is virtualScroll
            or
            2、
            has left fixed column and expand option（resolve expand row content sticky）
            */
            const { isVirtualScroll, hasLeftFixedColumn, expandOption } = this;

            if (isVirtualScroll || (hasLeftFixedColumn && expandOption)) {
                const props = {
                    props: {
                        tagName: "div",
                    },
                    style: {
                        width: "100%",
                    },
                    on: {
                        "on-dom-resize-change": ({ width }) => {
                            this.tableViewportWidth = width;
                        },
                    },
                };

                content = (
                    <div
                        ref={this.virtualPhantomRef}
                        class={[
                            clsName("virtual-phantom"),
                            isVirtualScroll ? clsName("virtual-scroll") : "",
                        ]}
                    >
                        <VueDomResizeObserver {...props} />
                    </div>
                );
            }

            return content;
        },

        // init virtual scroll positions
        initVirtualScrollPositions() {
            if (this.isVirtualScroll) {
                const {
                    virtualScrollOption,
                    rowKeyFieldName,
                    tableData,
                    defaultVirtualScrollMinRowHeight,
                } = this;

                const minRowHeight = isNumber(virtualScrollOption.minRowHeight)
                    ? virtualScrollOption.minRowHeight
                    : defaultVirtualScrollMinRowHeight;

                this.virtualScrollPositions = tableData.map((item, index) => ({
                    rowKey: item[rowKeyFieldName],
                    height: minRowHeight,
                    top: index * minRowHeight,
                    bottom: (index + 1) * minRowHeight,
                }));
            }
        },

        // list item height change
        bodyTrHeightChange({ rowKey, height }) {
            //获取真实元素大小，修改对应的尺寸缓存
            const index = this.virtualScrollPositions.findIndex(
                (x) => x.rowKey === rowKey,
            );

            let oldHeight = this.virtualScrollPositions[index].height;
            let dValue = oldHeight - height;
            //存在差值
            if (dValue) {
                this.virtualScrollPositions[index].bottom =
                    this.virtualScrollPositions[index].bottom - dValue;
                this.virtualScrollPositions[index].height = height;
                for (
                    let k = index + 1;
                    k < this.virtualScrollPositions.length;
                    k++
                ) {
                    this.virtualScrollPositions[k].top =
                        this.virtualScrollPositions[k - 1].bottom;
                    this.virtualScrollPositions[k].bottom =
                        this.virtualScrollPositions[k].bottom - dValue;
                }

                // 更新 virtual phantom 列表总高度
                this.setVirtualPhantomHeight();

                //更新真实偏移量
                this.setVirtualScrollStartOffset();
            }
        },
        // update virtual phantom list height
        setVirtualPhantomHeight() {
            let totalHeight = 0;
            if (this.virtualScrollPositions.length) {
                totalHeight =
                    this.virtualScrollPositions[
                        this.virtualScrollPositions.length - 1
                    ].bottom;
            }

            this.$refs[this.virtualPhantomRef].style.height =
                totalHeight + "px";
        },
        // set virtual scroll start offset
        setVirtualScrollStartOffset() {
            const start = this.virtualScrollStartIndex;

            const aboveCount = this.getVirtualScrollAboveCount();

            let startOffset = 0;

            if (start >= 1) {
                let size =
                    this.virtualScrollPositions[start].top -
                    (this.virtualScrollPositions[start - aboveCount]
                        ? this.virtualScrollPositions[start - aboveCount].top
                        : 0);
                startOffset =
                    this.virtualScrollPositions[start - 1].bottom - size;
            }

            this.setTableContentTopValue({ top: startOffset });
        },
        // set table content top value
        setTableContentTopValue({ top }) {
            //this.$refs[this.tableContentWrapperRef].style.transform = `translate3d(0,${startOffset}px,0)`;
            window.requestAnimationFrame(() => {
                const ele = this.$refs[this.tableContentWrapperRef];
                if (ele) {
                    ele.$el.style.top = `${top}px`;
                }
            });
        },
        // get virtual scroll start index
        getVirtualScrollStartIndex(scrollTop = 0) {
            return this.virtualScrollBinarySearch(
                this.virtualScrollPositions,
                scrollTop,
            );
        },
        // virtual scroll binary search
        virtualScrollBinarySearch(list, value) {
            let start = 0;
            let end = list.length - 1;
            let tempIndex = null;

            while (start <= end) {
                let midIndex = parseInt((start + end) / 2);
                let midValue = list[midIndex].bottom;
                if (midValue === value) {
                    return midIndex + 1;
                } else if (midValue < value) {
                    start = midIndex + 1;
                } else if (midValue > value) {
                    if (tempIndex === null || tempIndex > midIndex) {
                        tempIndex = midIndex;
                    }
                    end = end - 1;
                }
            }
            return tempIndex;
        },
        // table container virtual scroll handler
        tableContainerVirtualScrollHandler(tableContainerRef) {
            const {
                virtualScrollVisibleCount: visibleCount,
                virtualScrollOption,
            } = this;

            //当前滚动位置
            let scrollTop = tableContainerRef.scrollTop;

            //此时的开始索引
            let visibleStartIndex = this.getVirtualScrollStartIndex(scrollTop);
            this.virtualScrollStartIndex = visibleStartIndex;

            //此时的结束索引
            let visibleEndIndex = visibleStartIndex + visibleCount;
            this.virtualScrollEndIndex = visibleEndIndex;

            const visibleAboveCount = this.getVirtualScrollAboveCount();
            const visibleBelowCount = this.getVirtualScrollBelowCount();

            //此时的偏移量
            this.setVirtualScrollStartOffset();

            if (!this.showVirtualScrollingPlaceholder) {
                const bodyElement = this.$refs[this.tableBodyRef];

                if (bodyElement) {
                    bodyElement.renderingRowKeys(
                        this.allRowKeys.slice(
                            visibleStartIndex - visibleAboveCount,
                            visibleEndIndex + visibleBelowCount,
                        ),
                    );
                }
            }

            const { scrolling } = virtualScrollOption;
            if (isFunction(scrolling)) {
                const visibleAboveCount = this.getVirtualScrollAboveCount();
                const visibleBelowCount = this.getVirtualScrollBelowCount();

                let startRowIndex = visibleStartIndex - visibleAboveCount;

                scrolling({
                    startRowIndex: startRowIndex > 0 ? startRowIndex : 0,
                    visibleStartIndex,
                    visibleEndIndex,
                    visibleAboveCount,
                    visibleBelowCount,
                });
            }

            this.setVirtualScrollVisibleData();
        },
        // debounce scroll ended
        debounceScrollEnded() {
            const scrollingResetTimeInterval = 150;

            const { disablePointerEventsTimeoutId } = this;

            if (disablePointerEventsTimeoutId) {
                cancelAnimationTimeout(disablePointerEventsTimeoutId);
            }

            this.disablePointerEventsTimeoutId = requestAnimationTimeout(
                this.debounceScrollEndedCallback,
                scrollingResetTimeInterval,
            );
        },
        // debounce scroll callback
        debounceScrollEndedCallback() {
            this.disablePointerEventsTimeoutId = null;
            this.showVirtualScrollingPlaceholder = false;
        },
        // init virtual scroll
        initVirtualScroll() {
            if (this.isVirtualScroll) {
                const startIndex = 0;

                this.virtualScrollStartIndex = startIndex;
                this.virtualScrollEndIndex =
                    startIndex + this.virtualScrollVisibleCount;
                this.start = startIndex;
                const belowCount = this.getVirtualScrollBelowCount();
                this.end = this.virtualScrollEndIndex + belowCount;
                // 修复渲染结束，同时开启虚拟滚动和设置表格数据，无法设置 virtual phantom 高度的问题
                this.$nextTick(() => {
                    const tableContainerRef =
                        this.$refs[this.tableContainerRef];
                    this.tableContainerVirtualScrollHandler(tableContainerRef);
                    this.setVirtualPhantomHeight();
                });
            }
        },

        // set scrolling
        setScrolling(tableContainerRef) {
            if (this.hasFixedColumn) {
                const { scrollWidth, clientWidth, scrollLeft } =
                    tableContainerRef;

                const { previewTableContainerScrollLeft: previewScrollLeft } =
                    this;

                // 仅横向滚动需要处理
                if (
                    previewScrollLeft === 0 ||
                    previewScrollLeft !== scrollLeft
                ) {
                    this.previewTableContainerScrollLeft = scrollLeft;

                    this.isLeftScrolling = scrollLeft > 0;
                    this.isRightScrolling =
                        scrollWidth - clientWidth > scrollLeft;
                }
                this.isLeftScrolling = scrollLeft > 0;
                this.isRightScrolling = scrollWidth - clientWidth > scrollLeft;
            }
        },

        // set scroll bar status
        setScrollBarStatus() {
            const tableContainerRef = this.$refs[this.tableContainerRef];
            if (tableContainerRef) {
                const { scrollWidth, clientWidth, scrollHeight, clientHeight } =
                    tableContainerRef;

                if (scrollWidth && clientWidth) {
                    this.hasXScrollBar =
                        scrollWidth - clientWidth ? true : false;
                }

                if (scrollHeight && clientHeight) {
                    this.hasYScrollBar =
                        scrollHeight - clientHeight ? true : false;
                }
            }
        },

        // init scrolling
        initScrolling() {
            this.setScrolling(this.$refs[this.tableContainerRef]);
        },

        // table click outside
        tableClickOutside(e) {
            // exclude contextmenu panel clicked
            if (isContextmenuPanelClicked(e)) {
                return false;
            }

            this.isBodyTdMousedown = false;
            this.isAutofillStarting = false;

            // clear cell selection
            this.clearCellSelectionCurrentCell();
            this.clearCellSelectionNormalEndCell();

            // stop editing cell
            this[INSTANCE_METHODS.STOP_EDITING_CELL]();
        },

        // save cell when stop editing
        saveCellWhenStopEditing() {
            const {
                colgroups,
                rowKeyFieldName,
                editOption,
                editingCell,
                isCellEditing,
            } = this;

            const {
                cellValueChange,
                beforeCellValueChange,
                afterCellValueChange,
            } = editOption;

            if (isCellEditing) {
                const { rowKey, colKey } = editingCell;

                let currentRow = this.tableData.find(
                    (x) => x[rowKeyFieldName] === rowKey,
                );

                if (currentRow) {
                    const currentColumn = colgroups.find(
                        (x) => x.key === colKey,
                    );

                    const changeValue = editingCell.row[currentColumn.field];

                    if (isFunction(beforeCellValueChange)) {
                        const allowChange = beforeCellValueChange({
                            row: cloneDeep(currentRow),
                            column: currentColumn,
                            changeValue,
                        });
                        if (isBoolean(allowChange) && !allowChange) {
                            // celar editing cell
                            this.clearEditingCell();
                            return false;
                        }
                    }

                    currentRow[currentColumn.field] = changeValue;

                    // 同 afterCellValueChange，未来被移除
                    cellValueChange &&
                        cellValueChange({
                            row: currentRow,
                            column: currentColumn,
                            changeValue,
                        });

                    afterCellValueChange &&
                        afterCellValueChange({
                            row: currentRow,
                            column: currentColumn,
                            changeValue,
                        });

                    // celar editing cell
                    this.clearEditingCell();
                }

                // reset status
                this.enableStopEditing = true;
            }
        },

        // cell selection by click
        cellSelectionByClick({ rowData, column }) {
            const { rowKeyFieldName } = this;

            const rowKey = getRowKey(rowData, rowKeyFieldName);

            // set cell selection and column to visible
            this[INSTANCE_METHODS.SET_CELL_SELECTION]({
                rowKey,
                colKey: column.key,
                isScrollToRow: false,
            });
            // row to visible
            this.rowToVisible(KEY_CODES.ARROW_UP, rowKey);
            this.rowToVisible(KEY_CODES.ARROW_DOWN, rowKey);
        },

        /*
         * @tdContextmenu
         * @desc  recieve td right click\contextmenu event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdContextmenu({ rowData, column }) {
            const { editOption, rowKeyFieldName, colgroups } = this;

            // cell selection by click
            if (!isOperationColumn(column.key, colgroups)) {
                this.cellSelectionByClick({ rowData, column });
            }

            if (editOption) {
                const rowKey = getRowKey(rowData, rowKeyFieldName);
                this.editCellByClick({
                    isDblclick: false,
                    rowKey,
                    colKey: column.key,
                });
            }
        },

        /*
         * @tdDoubleClick
         * @desc  recieve td double click event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdDoubleClick({ event, rowData, column }) {
            const { editOption, rowKeyFieldName, colgroups } = this;

            if (isOperationColumn(column.key, colgroups)) {
                // clear cell selection
                this.clearCellSelectionCurrentCell();
                this.clearCellSelectionNormalEndCell();

                // stop editing cell
                this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                return false;
            }

            if (editOption) {
                const rowKey = getRowKey(rowData, rowKeyFieldName);
                this.editCellByClick({
                    isDblclick: true,
                    rowKey,
                    colKey: column.key,
                });
            }
        },

        /*
         * @tdClick
         * @desc  recieve td click event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdClick({ event, rowData, column }) {
            // feature...
        },

        /*
         * @tdMousedown
         * @desc  recieve td mousedown event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdMousedown({ event, rowData, column }) {
            this.isBodyTdMousedown = true;

            const { shiftKey } = event;

            const { editOption, rowKeyFieldName, colgroups } = this;

            const rowKey = getRowKey(rowData, rowKeyFieldName);
            const colKey = column.key;

            if (isOperationColumn(colKey, colgroups)) {
                // clear cell selection
                this.clearCellSelectionCurrentCell();
                this.clearCellSelectionNormalEndCell();

                // stop editing cell
                this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                return false;
            }

            if (shiftKey) {
                this.cellSelectionNormalEndCellChange({
                    rowKey,
                    colKey,
                });
            } else {
                // cell selection by click
                this.cellSelectionByClick({ rowData, column });
                this.clearCellSelectionNormalEndCell();
            }

            if (editOption) {
                this.editCellByClick({
                    isDblclick: false,
                    rowKey,
                    colKey,
                });
            }
        },

        /*
         * @tdMouseover
         * @desc  recieve td mouseover event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdMouseover({ event, rowData, column }) {
            const { rowKeyFieldName, isBodyTdMousedown, isAutofillStarting } =
                this;

            const rowKey = getRowKey(rowData, rowKeyFieldName);
            const colKey = column.key;
            if (isOperationColumn(colKey, this.colgroups)) {
                return false;
            }

            if (isBodyTdMousedown) {
                this.cellSelectionNormalEndCellChange({
                    rowKey,
                    colKey: column.key,
                });
            }

            if (isAutofillStarting) {
                this.cellSelectionAutofillCellChange({
                    rowKey,
                    colKey: column.key,
                });
            }
        },

        /*
         * @tdMouseup
         * @desc  recieve td mouseup event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdMouseup({ event, rowData, column }) {
            // feature...
        },

        // table content wrapper mouseup
        tableContainerMouseup() {
            this.isBodyTdMousedown = false;
            this.isAutofillStarting = false;
        },

        /*
         * @cellSelectionCornerMousedown
         * @desc  recieve cell selection corner mousedown
         */
        cellSelectionCornerMousedown({ event }) {
            this.isAutofillStarting = true;
        },

        /*
         * @cellSelectionCornerMouseup
         * @desc  recieve cell selection corner mouseup
         */
        cellSelectionCornerMouseup({ event }) {
            this.isAutofillStarting = false;
        },

        // is edit column
        isEditColumn(colKey) {
            return this.colgroups.some((x) => x.key === colKey && x.edit);
        },

        /*
         * @editCellByClick
         * @desc  recieve td click event
         * @param {boolean} isDblclick - is dblclick
         */
        editCellByClick({ isDblclick, rowKey, colKey }) {
            const {
                editOption,
                isCellEditing,
                hasEditColumn,
                editingCell,
                isEditColumn,
            } = this;

            if (!editOption) {
                return false;
            }

            // has edit column
            if (!hasEditColumn) {
                return false;
            }

            if (isEmptyValue(rowKey) || isEmptyValue(colKey)) {
                return false;
            }
            if (
                editingCell &&
                editingCell.rowKey == rowKey &&
                editingCell.colKey == colKey
            ) {
                return false;
            }
            if (isCellEditing) {
                this[INSTANCE_METHODS.STOP_EDITING_CELL]();
            }

            if (isDblclick && isEditColumn(colKey)) {
                this.enableStopEditing = false;

                this[INSTANCE_METHODS.START_EDITING_CELL]({
                    rowKey,
                    colKey,
                });
            } else {
                this.enableStopEditing = true;
            }
        },

        /*
         * @setEditingCell
         * @desc  add editing cells
         * @param {object} rowKey - row key
         * @param {object} colKey - col key
         * @param {object} column - column
         * @param {object} row - row data
         */
        setEditingCell({ rowKey, colKey, column, row }) {
            this.editingCell = {
                rowKey,
                row: cloneDeep(row),
                colKey,
                column,
            };
        },

        // update editing cell value
        updateEditingCellValue(value) {
            const { editingCell } = this;
            let { row, column } = editingCell;
            row[column.field] = value;
            this.editingCell.row = row;
        },

        /*
         * @clearEditingCell
         * @desc clear editing cell
         */
        clearEditingCell() {
            this.editingCell = {
                rowKey: "",
                colKey: "",
                row: null,
                column: null,
            };
        },

        // contextmenu call back
        contextmenuCallBack(type) {
            const {
                contextmenuBodyOption,
                cellSelectionData,
                tableData,
                allRowKeys,
                colgroups,
                rowKeyFieldName,
            } = this;

            const { rowKey, colKey } = cellSelectionData.currentCell;
            const { callback } = contextmenuBodyOption;

            if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                const rowIndex = allRowKeys.findIndex((x) => x === rowKey);

                // insert row above
                if (CONTEXTMENU_TYPES.INSERT_ROW_ABOVE === type) {
                    tableData.splice(
                        rowIndex,
                        0,
                        createEmptyRowData({ colgroups, rowKeyFieldName }),
                    );
                }
                // insert row below
                else if (CONTEXTMENU_TYPES.INSERT_ROW_BELOW === type) {
                    tableData.splice(
                        rowIndex + 1,
                        0,
                        createEmptyRowData({ colgroups, rowKeyFieldName }),
                    );
                }
                // remove row
                else if (CONTEXTMENU_TYPES.REMOVE_ROW === type) {
                    tableData.splice(rowIndex, 1);
                }
                // hide column
                else if (CONTEXTMENU_TYPES.HIDE_COLUMN === type) {
                    this[INSTANCE_METHODS.HIDE_COLUMNS_BY_KEYS]([colKey]);
                }

                // callback
                if (isFunction(callback)) {
                    callback({
                        type,
                        selection: cellSelectionData.currentCell,
                    });
                }
            }
        },

        // editor copy
        editorCopy(event) {
            const {
                isCellEditing,
                enableClipboard,
                clipboardOption,
                cellSelectionRangeData,
                tableData,
                colgroups,
                allRowKeys,
            } = this;

            if (!enableClipboard) {
                return false;
            }

            // 正在编辑的单元格不进行自定义复制功能
            if (isCellEditing) {
                return false;
            }

            const {
                copy,
                beforeCopy: beforeCopyCallback,
                afterCopy: afterCopyCallback,
            } = clipboardOption || {};

            if (isBoolean(copy) && !copy) {
                return false;
            }

            event.preventDefault();

            const selectionRangeData = getSelectionRangeData({
                cellSelectionRangeData,
                resultType: "flat",
                tableData,
                colgroups,
                allRowKeys,
            });

            const response = onBeforeCopy({
                cellSelectionRangeData,
                selectionRangeData,
                colgroups,
                allRowKeys,
            });

            if (isFunction(beforeCopyCallback)) {
                const allowCoping = beforeCopyCallback(response);
                if (isBoolean(allowCoping) && !allowCoping) {
                    return false;
                }
            }

            onAfterCopy({ event, selectionRangeData });

            if (isFunction(afterCopyCallback)) {
                afterCopyCallback(response);
            }
        },

        // editor paste
        editorPaste(event) {
            const { isCellEditing, enableClipboard, clipboardOption } = this;

            if (!enableClipboard) {
                return false;
            }

            // 正在编辑的单元格不进行自定义粘贴功能
            if (isCellEditing) {
                return false;
            }

            const {
                paste,
                beforePaste: beforePasteCallback,
                afterPaste: afterPasteCallback,
            } = clipboardOption || {};

            if (isBoolean(paste) && !paste) {
                return false;
            }

            event.preventDefault();

            const response = onBeforePaste({
                event,
                cellSelectionRangeData: this.cellSelectionRangeData,
                colgroups: this.colgroups,
                allRowKeys: this.allRowKeys,
                rowKeyFieldName: this.rowKeyFieldName,
            });

            if (
                response &&
                Array.isArray(response.data) &&
                response.data.length
            ) {
                if (isFunction(beforePasteCallback)) {
                    const allowPasting = beforePasteCallback(response);
                    if (isBoolean(allowPasting) && !allowPasting) {
                        return false;
                    }
                }
                // change table cell data
                onAfterPaste({
                    tableData: this.tableData,
                    beforePasteResponse: response,
                });

                if (isFunction(afterPasteCallback)) {
                    afterPasteCallback(response);
                }

                const { startColKey, endColKey, startRowKey, endRowKey } =
                    response.selectionRangeKeys;

                this.cellSelectionCurrentCellChange({
                    rowKey: startRowKey,
                    colKey: startColKey,
                });

                this.cellSelectionNormalEndCellChange({
                    rowKey: endRowKey,
                    colKey: endColKey,
                });

                // clipboard cell value change
                this.hooks.triggerHook(HOOKS_NAME.CLIPBOARD_CELL_VALUE_CHANGE);
            }
        },

        // editor cut
        editorCut(event) {
            const {
                isCellEditing,
                enableClipboard,
                clipboardOption,
                cellSelectionRangeData,
                tableData,
                colgroups,
                allRowKeys,
            } = this;

            if (!enableClipboard) {
                return false;
            }

            // 正在编辑的单元格不进行自定义剪切功能
            if (isCellEditing) {
                return false;
            }

            const {
                cut,
                beforeCut: beforeCutCallback,
                afterCut: afterCutCallback,
            } = clipboardOption || {};

            if (isBoolean(cut) && !cut) {
                return false;
            }

            event.preventDefault();

            const selectionRangeData = getSelectionRangeData({
                cellSelectionRangeData,
                resultType: "flat",
                tableData,
                colgroups,
                allRowKeys,
            });

            const response = onBeforeCut({
                cellSelectionRangeData,
                selectionRangeData,
                colgroups,
                allRowKeys,
            });

            if (isFunction(beforeCutCallback)) {
                const allowCuting = beforeCutCallback(response);
                if (isBoolean(allowCuting) && !allowCuting) {
                    return false;
                }
            }

            onAfterCut({
                event,
                tableData,
                colgroups,
                selectionRangeData,
                selectionRangeIndexes: response.selectionRangeIndexes,
            });

            if (isFunction(afterCutCallback)) {
                afterCutCallback(response);
            }
        },

        // delete selection cell value
        deleteCellSelectionRangeValue() {
            const {
                isCellEditing,
                enableClipboard,
                clipboardOption,
                cellSelectionRangeData,
                tableData,
                colgroups,
                allRowKeys,
            } = this;

            if (!enableClipboard) {
                return false;
            }

            // 正在编辑的单元格不进行删除区域单元格功能
            if (isCellEditing) {
                return false;
            }

            const {
                // delete is key word
                delete: delete2,
                beforeDelete: beforeDeleteCallback,
                afterDelete: afterDeleteCallback,
            } = clipboardOption || {};

            if (isBoolean(delete2) && !delete2) {
                return false;
            }

            const selectionRangeData = getSelectionRangeData({
                cellSelectionRangeData,
                resultType: "flat",
                tableData,
                colgroups,
                allRowKeys,
            });

            const response = onBeforeDelete({
                cellSelectionRangeData,
                selectionRangeData,
                colgroups,
                allRowKeys,
            });

            if (isFunction(beforeDeleteCallback)) {
                const allowDeleting = beforeDeleteCallback(response);
                if (isBoolean(allowDeleting) && !allowDeleting) {
                    return false;
                }
            }

            onAfterDelete({
                tableData,
                colgroups,
                selectionRangeIndexes: response.selectionRangeIndexes,
            });

            if (isFunction(afterDeleteCallback)) {
                afterDeleteCallback(response);
            }
        },

        /*
        set cell selection and column to visible
        */
        [INSTANCE_METHODS.SET_CELL_SELECTION]({
            rowKey,
            colKey,
            isScrollToRow = true,
        }) {
            const { enableCellSelection } = this;

            if (!enableCellSelection) {
                return false;
            }

            if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                this.cellSelectionCurrentCellChange({
                    rowKey,
                    colKey,
                });

                const column = getColumnByColkey(colKey, this.colgroups);
                // column to visible
                this.columnToVisible(column);
                // row to visible
                if (isScrollToRow) {
                    this[INSTANCE_METHODS.SCROLL_TO_ROW_KEY]({ rowKey });
                }
            }
        },

        // hide columns by keys
        [INSTANCE_METHODS.HIDE_COLUMNS_BY_KEYS](keys) {
            if (!isEmptyArray(keys)) {
                /*
                将要隐藏的列添加到 hiddenColumns 中
                Add the columns you want to hide to hidden columns
                */
                this.hiddenColumns = Array.from(
                    new Set(this.hiddenColumns.concat(keys)),
                );

                this.showOrHideColumns();
            }
        },

        // show columns by keys
        [INSTANCE_METHODS.SHOW_COLUMNS_BY_KEYS](keys) {
            if (!isEmptyArray(keys)) {
                /*
                将要显示的列从 hiddenColumns 中移除
                Remove the columns to show from hidden columns
                */
                for (let i = keys.length - 1; i >= 0; i--) {
                    const delIndex = this.hiddenColumns.indexOf(keys[i]);
                    if (delIndex > -1) {
                        this.hiddenColumns.splice(delIndex, 1);
                    }
                }

                this.showOrHideColumns();
            }
        },

        // table scrollTo
        [INSTANCE_METHODS.SCROLL_TO](option) {
            scrollTo(this.$refs[this.tableContainerRef], option);
        },
        // table scroll to rowKey position
        [INSTANCE_METHODS.SCROLL_TO_ROW_KEY]({ rowKey }) {
            if (isEmptyValue(rowKey)) {
                console.warn("Row key can't be empty!");
                return false;
            }

            let scrollTop = 0;

            const { isVirtualScroll, headerTotalHeight } = this;

            const tableContainerRef = this.$refs[this.tableContainerRef];

            if (isVirtualScroll) {
                const position = this.virtualScrollPositions.find(
                    (x) => x.rowKey === rowKey,
                );

                if (position) {
                    scrollTop = position.top;
                }

                // fix bug #470
                setTimeout(() => {
                    scrollTo(tableContainerRef, {
                        top: scrollTop,
                        behavior: "auto",
                    });
                }, 200);
            } else {
                const rowEl = this.$el.querySelector(
                    `tbody tr[${COMPS_CUSTOM_ATTRS.BODY_ROW_KEY}="${rowKey}"]`,
                );

                scrollTop = rowEl.offsetTop - headerTotalHeight;
            }

            scrollTo(tableContainerRef, {
                top: scrollTop,
                behavior: isVirtualScroll ? "auto" : "smooth",
            });
        },
        // scroll to col key position
        [INSTANCE_METHODS.SCROLL_TO_COL_KEY]({ colKey }) {
            const column = getColumnByColkey(colKey, this.colgroups);
            if (column) {
                this.columnToVisible(column);
            }
        },
        // start editing cell
        [INSTANCE_METHODS.START_EDITING_CELL]({
            rowKey,
            colKey,
            defaultValue,
        }) {
            const {
                editOption,
                colgroups,
                rowKeyFieldName,
                editingCell,
                cellSelectionData,
            } = this;

            if (!editOption) {
                return false;
            }

            let currentRow = this.tableData.find(
                (x) => x[rowKeyFieldName] === rowKey,
            );

            currentRow = cloneDeep(currentRow);

            /* 
            调用API编辑的情况，需要关闭之前编辑的单元格
            */
            if (
                editingCell.rowKey === rowKey &&
                editingCell.colKey === colKey
            ) {
                return false;
            }

            const currentColumn = colgroups.find((x) => x.key === colKey);
            // 当前列是否可编辑
            if (!currentColumn.edit) {
                return false;
            }

            // 给当前列赋默认值
            if (isDefined(defaultValue)) {
                this.editorInputStartValue = defaultValue;
                // doesn't change cell original value
                currentRow[currentColumn.field] = defaultValue;
            } else {
                this.editorInputStartValue = currentRow[currentColumn.field];
            }

            if (
                cellSelectionData.currentCell.colKey !== colKey ||
                cellSelectionData.currentCell.rowKey !== rowKey
            ) {
                this.cellSelectionCurrentCellChange({
                    rowKey,
                    colKey,
                });
            }

            // set editing cell
            this.setEditingCell({
                rowKey,
                colKey,
                column: currentColumn,
                row: cloneDeep(currentRow),
            });
        },
        // stop editing cell
        [INSTANCE_METHODS.STOP_EDITING_CELL]() {
            const { editOption, isCellEditing } = this;

            if (!editOption) {
                return false;
            }

            // clear editor input start value
            this.editorInputStartValue = "";

            if (isCellEditing) {
                this.saveCellWhenStopEditing();
            }
        },
        // set highlight row
        [INSTANCE_METHODS.SET_HIGHLIGHT_ROW]({ rowKey }) {
            this.highlightRowKey = rowKey;
        },
    },
    created() {
        // bug fixed #467
        this.debouncedTdWidthChange = debounce(this.tdWidthChange, 0);
    },
    mounted() {
        this.parentRendered = true;

        // set contextmenu event target
        this.contextmenuEventTarget = this.$el.querySelector(
            `.${clsName("body")}`,
        );

        // create hook instance
        this.hooks = new Hooks();

        // receive sort change
        this.$on(EMIT_EVENTS.SORT_CHANGE, (params) => {
            this.updateColgroupsBySortChange(params);
        });

        // receive row selected change
        this.$on(EMIT_EVENTS.CHECKBOX_SELECTED_ALL_CHANGE, (params) => {
            this.selectedAllChange(params);
        });

        // receive selected all info
        this.$on(EMIT_EVENTS.CHECKBOX_SELECTED_ALL_INFO, (params) => {
            this.setSelectedAllInfo(params);
        });

        // receive multiple header row height change
        this.$on(
            EMIT_EVENTS.HEADER_TR_HEIGHT_CHANGE,
            ({ rowIndex, height }) => {
                this.headerTrHeightChange({ rowIndex, height });
            },
        );

        // receive virtual scroll row height change
        this.$on(EMIT_EVENTS.BODY_TR_HEIGHT_CHANGE, ({ rowKey, height }) => {
            this.bodyTrHeightChange({ rowKey, height });
        });

        // receive footer row height change
        this.$on(
            EMIT_EVENTS.FOOTER_TR_HEIGHT_CHANGE,
            ({ rowIndex, height }) => {
                this.footTrHeightChange({ rowIndex, height });
            },
        );

        // recieve td click
        this.$on(EMIT_EVENTS.BODY_TD_CLICK, (params) => {
            this.tdClick(params);
        });

        // recieve td mouseover
        this.$on(EMIT_EVENTS.BODY_TD_MOUSEOVER, (params) => {
            this.tdMouseover(params);
        });

        // recieve td mousedown
        this.$on(EMIT_EVENTS.BODY_TD_MOUSEDOWN, (params) => {
            this.tdMousedown(params);
        });

        // recieve td mousedown
        this.$on(EMIT_EVENTS.BODY_TD_MOUSEUP, (params) => {
            this.tdMouseup(params);
        });

        // recieve selection corner mousedown
        this.$on(EMIT_EVENTS.SELECTION_CORNER_MOUSEDOWN, (params) => {
            this.cellSelectionCornerMousedown(params);
        });

        // recieve selection corner mousedown
        this.$on(EMIT_EVENTS.SELECTION_CORNER_MOUSEUP, (params) => {
            this.cellSelectionCornerMouseup(params);
        });

        // autofilling direction change
        this.$on(EMIT_EVENTS.AUTOFILLING_DIRECTION_CHANGE, (params) => {
            this.autofillingDirectionChange(params);
        });

        // recieve td contextmenu(right click)
        this.$on(EMIT_EVENTS.BODY_TD_CONTEXTMENU, (params) => {
            this.tdContextmenu(params);
        });

        // recieve td double click
        this.$on(EMIT_EVENTS.BODY_TD_DOUBLE_CLICK, (params) => {
            this.tdDoubleClick(params);
        });

        // add key down event listener
        document.addEventListener("keydown", this.dealKeydownEvent);

        // init scrolling
        this.initScrolling();
    },
    destroyed() {
        // remove key down event listener
        document.removeEventListener("keydown", this.dealKeydownEvent);
    },
    render() {
        const {
            showHeader,
            tableViewportWidth,
            tableContainerStyle,
            tableStyle,
            tableClass,
            colgroups,
            groupColumns,
            fixedHeader,
            fixedFooter,
            actualRenderTableData,
            debouncedTdWidthChange,
            expandOption,
            checkboxOption,
            radioOption,
            rowKeyFieldName,
            virtualScrollOption,
            isVirtualScroll,
            sortOption,
            cellStyleOption,
            showVirtualScrollingPlaceholder,
            cellSelectionData,
            editOption,
            contextmenus,
            allRowKeys,
        } = this;

        // header props
        const headerProps = {
            class: clsName("header"),
            props: {
                columnsOptionResetTime: this.columnsOptionResetTime,
                tableViewportWidth,
                groupColumns,
                colgroups,
                fixedHeader,
                checkboxOption,
                sortOption,
                cellStyleOption,
                eventCustomOption: this.eventCustomOption,
                headerRows: this.headerRows,
            },
            nativeOn: {
                click: () => {
                    this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                },
            },
        };

        // body props
        const bodyProps = {
            ref: this.tableBodyRef,
            class: [clsName("body"), this.tableBodyClass],
            props: {
                tableViewportWidth,
                columnsOptionResetTime: this.columnsOptionResetTime,
                colgroups,
                expandOption,
                checkboxOption,
                actualRenderTableData,
                rowKeyFieldName,
                radioOption,
                virtualScrollOption,
                isVirtualScroll,
                cellStyleOption,
                cellSpanOption: this.cellSpanOption,
                eventCustomOption: this.eventCustomOption,
                cellSelectionOption: this.cellSelectionOption,
                hasFixedColumn: this.hasFixedColumn,
                cellSelectionData,
                allRowKeys,
                editOption,
                highlightRowKey: this.highlightRowKey,
                showVirtualScrollingPlaceholder,
            },
            on: {
                [EMIT_EVENTS.BODY_TD_WIDTH_CHANGE]: debouncedTdWidthChange,
                [EMIT_EVENTS.HIGHLIGHT_ROW_CHANGE]:
                    this[INSTANCE_METHODS.SET_HIGHLIGHT_ROW],
            },
        };

        // footer props
        const footerProps = {
            class: [clsName("footer")],
            props: {
                colgroups,
                footerData: this.footerData,
                rowKeyFieldName,
                cellStyleOption,
                fixedFooter,
                cellSpanOption: this.cellSpanOption,
                eventCustomOption: this.eventCustomOption,
                hasFixedColumn: this.hasFixedColumn,
                allRowKeys,
                footerRows: this.footerRows,
            },
            nativeOn: {
                click: () => {
                    this[INSTANCE_METHODS.STOP_EDITING_CELL]();
                },
            },
        };

        // table root props
        const tableRootProps = {
            class: {
                "ve-table": true,
                [clsName("border-around")]: this.borderAround,
            },
            props: {
                tagName: "div",
            },
            on: {
                "on-dom-resize-change": ({ height }) => {
                    this.tableOffestHeight = height;
                    this.initVirtualScroll();
                    // fixed #404
                    this.initScrolling();
                    this.setScrollBarStatus();
                    this.hooks.triggerHook(HOOKS_NAME.TABLE_SIZE_CHANGE);
                },
            },
            directives: [
                {
                    name: "click-outside",
                    value: (e) => {
                        this.tableClickOutside(e);
                    },
                },
            ],
        };

        // table container props
        const tableContainerProps = {
            ref: this.tableContainerRef,
            class: this.tableContainerClass,
            style: tableContainerStyle,
            on: {
                scroll: () => {
                    const tableContainerRef =
                        this.$refs[this.tableContainerRef];

                    this.hooks.triggerHook(
                        HOOKS_NAME.TABLE_CONTAINER_SCROLL,
                        tableContainerRef,
                    );
                    this.setScrolling(tableContainerRef);

                    if (isVirtualScroll) {
                        this.tableContainerVirtualScrollHandler(
                            tableContainerRef,
                        );

                        const {
                            virtualScrollStartIndex: startIndex,
                            previewVirtualScrollStartIndex: previewStartIndex,
                        } = this;

                        const differ = Math.abs(startIndex - previewStartIndex);

                        this.previewVirtualScrollStartIndex = startIndex;

                        // default placeholder per scrolling row count
                        if (
                            differ > this.defaultPlaceholderPerScrollingRowCount
                        ) {
                            this.showVirtualScrollingPlaceholder = true;
                        } else {
                            this.showVirtualScrollingPlaceholder = false;
                        }

                        this.debounceScrollEnded();
                    }
                },
                mouseup: () => {
                    this.tableContainerMouseup();
                },
            },
        };

        // table wrapper props
        const tableWrapperProps = {
            ref: this.tableContentWrapperRef,
            class: [clsName("content-wrapper")],
            props: {
                tagName: "div",
            },
            on: {
                "on-dom-resize-change": ({ height }) => {
                    this.tableHeight = height;
                },
            },
        };

        // tale props
        const tableProps = {
            class: [clsName("content"), tableClass],
            style: tableStyle,
        };

        // selection props
        const selectionProps = {
            props: {
                allRowKeys,
                colgroups,
                parentRendered: this.parentRendered,
                hooks: this.hooks,
                cellSelectionData,
                isAutofillStarting: this.isAutofillStarting,
                cellSelectionRangeData: this.cellSelectionRangeData,
                currentCellSelectionType: this.currentCellSelectionType,
                showVirtualScrollingPlaceholder,
                isVirtualScroll,
                virtualScrollVisibleIndexs: this.virtualScrollVisibleIndexs,
                previewTableContainerScrollLeft:
                    this.previewTableContainerScrollLeft,
                isCellEditing: this.isCellEditing,
                cellAutofillOption: this.cellAutofillOption,
            },
            on: {
                [EMIT_EVENTS.CELL_SELECTION_RANGE_DATA_CHANGE]: (newData) => {
                    this.cellSelectionRangeDataChange(newData);
                },
            },
        };

        // edit input props
        const editInputProps = {
            ref: this.editInputRef,
            props: {
                hooks: this.hooks,
                parentRendered: this.parentRendered,
                inputStartValue: this.editorInputStartValue,
                rowKeyFieldName,
                tableData: this.tableData,
                cellSelectionData,
                colgroups,
                editingCell: this.editingCell,
                isCellEditing: this.isCellEditing,
                allRowKeys,
                hasXScrollBar: this.hasXScrollBar,
                hasYScrollBar: this.hasYScrollBar,
                hasRightFixedColumn: this.hasRightFixedColumn,
                scrollBarWidth: this.getScrollBarWidth(),
            },
            on: {
                // edit input click
                [EMIT_EVENTS.EDIT_INPUT_CLICK]: () => {
                    this.enableStopEditing = false;
                },
                // edit input value change
                [EMIT_EVENTS.EDIT_INPUT_VALUE_CHANGE]: (value) => {
                    this.updateEditingCellValue(value);
                },
                // copy
                [EMIT_EVENTS.EDIT_INPUT_COPY]: (e) => {
                    this.editorCopy(e);
                },
                // paste
                [EMIT_EVENTS.EDIT_INPUT_PASTE]: (e) => {
                    this.editorPaste(e);
                },
                // cut
                [EMIT_EVENTS.EDIT_INPUT_CUT]: (e) => {
                    this.editorCut(e);
                },
            },
        };

        // 直接在组件上写单元测试无法通过。如 on={{"on-node-click":()=>{}}}
        const contextmenuProps = {
            props: {
                eventTarget: this.contextmenuEventTarget,
                options: contextmenus,
            },
            on: {
                "on-node-click": (type) => {
                    this.contextmenuCallBack(type);
                },
            },
        };

        return (
            <VueDomResizeObserver {...tableRootProps}>
                <div {...tableContainerProps}>
                    {/* virtual view phantom */}
                    {this.getVirtualViewPhantom()}
                    {/* vue 实例类型，访问dom时需要通过$el属性访问 */}
                    <VueDomResizeObserver {...tableWrapperProps}>
                        <table {...tableProps}>
                            {/* colgroup */}
                            <Colgroup colgroups={colgroups} />
                            {/* table header */}
                            {showHeader && <Header {...headerProps} />}
                            {/* table body */}
                            <Body {...bodyProps} />
                            {/* table footer */}
                            <Footer {...footerProps} />
                        </table>
                        {/* cell selection */}
                        {this.enableCellSelection && (
                            <Selection {...selectionProps} />
                        )}
                    </VueDomResizeObserver>
                </div>
                {/* edit input */}
                {this.enableCellSelection && <EditInput {...editInputProps} />}
                {/* contextmenu */}
                {this.enableContextmenu && (
                    <VeContextmenu {...contextmenuProps} />
                )}
            </VueDomResizeObserver>
        );
    },
};
