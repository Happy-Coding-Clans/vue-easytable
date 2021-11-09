import { cloneDeep } from "lodash";
import {
    initGroupColumns,
    clsName,
    getNotFixedTotalWidthByColumnKey,
} from "./util";
import {
    getValByUnit,
    isFunction,
    isNumber,
    scrollTo,
    isEmptyValue,
    isBoolean,
    isDefined,
    isFalse,
} from "../../src/utils/index.js";
import {
    requestAnimationTimeout,
    cancelAnimationTimeout,
} from "../../src/utils/request-animation-timeout";
import emitter from "../../src/mixins/emitter";
import {
    COMPS_NAME,
    EMIT_EVENTS,
    COMPS_CUSTOM_ATTRS,
    INSTANCE_METHODS,
} from "./util/constant";
import Colgroup from "./colgroup";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import { KEY_CODES } from "../../src/utils/constant";
import clickoutside from "../../src/directives/clickoutside";
import VueDomResizeObserver from "../../src/comps/resize-observer";

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
            isFixedRowHeight:false,  // 如果为 true 使用 rowHeight，否则使用 minRowHeight
            fixedRowHeight:40,
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
        // edit opttion
        editOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
    },
    data() {
        return {
            //  table viewport width except scroll bar width
            tableViewportWidth: 0,
            /*
            列配置变化次数
            依赖columns 配置渲染，都需要重新计算：粘性布局时，重新触发 on-dom-resize-change 事件
            */
            columnsOptionResetTime: 0,
            tableContainerRef: "tableContainerRef",
            tableContentRef: "tableContentRef",
            virtualPhantomRef: "virtualPhantomRef",
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
            //  groupColumns
            groupColumns: [],
            /*
            // virtual scroll positions（非响应式）
            virtualScrollPositions = [
                {
                    rowKey: 0, // 当前行数据索引
                    top: 0, // 距离上一个项的高度
                    bottom: 100, // 距离下一个项的高度
                    height: 100 // 自身高度
                }
            ],
            */
            // virtual scroll visible data
            virtualScrollVisibleData: [],
            // default virtual scroll buffer count
            defaultVirtualScrollBufferCount: 1,
            // default virtual scroll min row height
            defaultVirtualScrollMinRowHeight: 40,
            // default placeholder per scrolling row count
            defaultPlaceholderPerScrollingRowCount: 8,
            // is scrolling
            isScrolling: false,
            // disable pointer events timeout id
            disablePointerEventsTimeoutId: null,
            // is scrolling left
            isLeftScrolling: false,
            // is scrolling right
            isRightScrolling: false,
            // cell selection key
            cellSelectionKeyData: {
                rowKey: "",
                columnKey: "",
            },
            /*
            table offest height（开启虚拟滚动时使用）
            1、当 :max-height="500" 时使用 max-height 
            2、当 max-height="calc(100vh - 210px)" 或者 max-height="80%" 时使用 tableOffestHeight
            */
            tableOffestHeight: 0,
            // highlight row key
            highlightRowKey: "",
            /* 
            editing cells
            1、full row edit:
            [
                {
                    rowKey:"",
                    row:null,
                }
            ]
            2、not full row wdit:
            [
                {
                    rowKey:"",
                    colKey:"",
                    row:null,
                    column:null
                }
            ]
            */
            editingCells: [],
            /*
            editing focus cell
            {
                rowKey:"",
                colKey:""
            }
            */
            editingFocusCell: null,
        };
    },
    // 存储非响应式数据
    customOption: {
        //起始索引
        virtualScrollStartIndex: 0,
        // preview virtual scroll start index
        previewVirtualScrollStartIndex: 0,
        //结束索引
        virtualScrollEndIndex: 0,
        // preview table container scrollLeft （处理左列或右列固定效果）
        previewTableContainerScrollLeft: null,
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

            let virtualScrollHeight = null;
            if (this.isVirtualScroll) {
                if (maxHeight) {
                    virtualScrollHeight = maxHeight;
                } else {
                    console.error(
                        "maxHeight prop is required when 'virtualScrollOption.enable = true'",
                    );
                }
            }

            return {
                "max-height": maxHeight,
                // if virtual scroll
                height: virtualScrollHeight,
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
                borderAround,
                isVirtualScroll,
                isLeftScrolling,
                isRightScrolling,
            } = this;

            return {
                [clsName("container")]: true,
                [clsName("border-around")]: borderAround,
                [clsName("virtual-scroll")]: isVirtualScroll,
                [clsName("container-left-scrolling")]: isLeftScrolling,
                [clsName("container-right-scrolling")]: isRightScrolling,
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
                (x) => x.fixed === "left" || x.fixed === "right",
            );
        },
        // is last left fixed column
        hasLeftFixedColumn() {
            return this.colgroups.some((x) => x.fixed === "left");
        },

        /*
        has editing focus cell
        是否有正在编辑的单元格
        */
        hasEditingFocusCell() {
            const { editingFocusCell } = this;
            return (
                editingFocusCell &&
                !isEmptyValue(editingFocusCell.rowKey) &&
                !isEmptyValue(editingFocusCell.colKey)
            );
        },

        // has edit column
        hasEditColumn() {
            return this.colgroups.some((x) => x.edit);
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
        // group columns change watch
        groupColumns: {
            handler(val) {
                if (Array.isArray(val) && val.length > 0) {
                    this.initHeaderRows();
                }
            },
            immediate: true,
        },
        // footerData
        footerData: {
            handler(val) {
                if (Array.isArray(val) && val.length > 0) {
                    this.initFooterRows();
                }
            },
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

        // int header rows
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
        },

        // init columns
        initColumns() {
            this.cloneColumns = cloneDeep(this.columns);
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

        // cell selection key change
        cellSelectionKeyChange(data) {
            this.cellSelectionKeyData = data;
        },

        // deal keydown event
        dealKeydownEvent(event) {
            // cell direction
            this.cellDirection(event);
            // toggle editing cell
            this.toggleEditigCell(event);
        },
        // cell direction
        cellDirection(event) {
            const {
                cellSelectionKeyData,
                colgroups,
                allRowKeys,
                editingFocusCell,
            } = this;

            const { keyCode } = event;

            const { rowKey, columnKey } = cellSelectionKeyData;

            // 如果是当前编辑的单元格
            if (editingFocusCell) {
                if (
                    editingFocusCell.rowKey === rowKey &&
                    editingFocusCell.colKey === columnKey
                ) {
                    return false;
                }
            }

            if (!isEmptyValue(rowKey) && !isEmptyValue(columnKey)) {
                let columnIndex = colgroups.findIndex(
                    (x) => x.key === columnKey,
                );
                let rowIndex = allRowKeys.indexOf(rowKey);
                if (keyCode === KEY_CODES.ARROW_LEFT) {
                    // 防止外层让其滚动
                    event.preventDefault();
                    if (columnIndex > 0) {
                        const nextColumn = colgroups[columnIndex - 1];
                        this.cellSelectionKeyData.columnKey = nextColumn.key;
                        this.columnToVisible(KEY_CODES.ARROW_LEFT, nextColumn);
                    }
                } else if (keyCode === KEY_CODES.ARROW_RIGHT) {
                    event.preventDefault();
                    if (columnIndex < colgroups.length - 1) {
                        const nextColumn = colgroups[columnIndex + 1];
                        this.cellSelectionKeyData.columnKey = nextColumn.key;
                        this.columnToVisible(KEY_CODES.ARROW_RIGHT, nextColumn);
                    }
                } else if (keyCode === KEY_CODES.ARROW_UP) {
                    event.preventDefault();
                    if (rowIndex > 0) {
                        const nextRowKey = allRowKeys[rowIndex - 1];
                        this.rowToVisible(KEY_CODES.ARROW_UP, nextRowKey);
                    }
                } else if (keyCode === KEY_CODES.ARROW_DOWN) {
                    event.preventDefault();

                    if (rowIndex < allRowKeys.length - 1) {
                        const nextRowKey = allRowKeys[rowIndex + 1];
                        this.rowToVisible(KEY_CODES.ARROW_DOWN, nextRowKey);
                    }
                }
            }
        },

        /*
         * @columnToVisible
         * @desc  column to visible
         * @param {number} keyCode - current keyCode
         * @param {object} nextColumn - next column
         */
        columnToVisible(keyCode, nextColumn) {
            const { colgroups } = this;

            const tableContainerRef = this.$refs[this.tableContainerRef];

            const { scrollWidth, clientWidth, scrollLeft } = tableContainerRef;

            // arrow left
            if (keyCode === KEY_CODES.ARROW_LEFT) {
                // 不是固定列
                if (scrollLeft && !nextColumn.fixed) {
                    const totalWidth = getNotFixedTotalWidthByColumnKey({
                        colgroups,
                        columnKey: nextColumn.key,
                        direction: "left",
                    });
                    const diff = scrollLeft - totalWidth;
                    if (diff > 0) {
                        tableContainerRef.scrollLeft = scrollLeft - diff;
                    }
                }
            }
            // arrow right
            else if (keyCode === KEY_CODES.ARROW_RIGHT) {
                const scrollRight = scrollWidth - clientWidth - scrollLeft;

                // 不是固定列
                if (scrollRight && !nextColumn.fixed) {
                    const totalWidth = getNotFixedTotalWidthByColumnKey({
                        colgroups,
                        columnKey: nextColumn.key,
                        direction: "right",
                    });
                    const diff = scrollRight - totalWidth;
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

            const { isVirtualScroll, headerRows, footerRows } = this;

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

                // arrow up
                if (keyCode === KEY_CODES.ARROW_UP) {
                    const totalHeaderHeight = headerRows.reduce(
                        (total, currentVal) => {
                            return currentVal.rowHeight + total;
                        },
                        0,
                    );

                    let diff = 0;
                    if (isVirtualScroll) {
                        const parentOffsetTop =
                            nextRowEl.offsetParent.offsetTop;

                        diff =
                            totalHeaderHeight -
                            (trOffsetTop -
                                (containerScrollTop - parentOffsetTop));
                    } else {
                        diff =
                            containerScrollTop +
                            totalHeaderHeight -
                            trOffsetTop;
                    }

                    if (diff > 0) {
                        tableContainerRef.scrollTop = containerScrollTop - diff;
                    }
                }
                // arrow down
                else if (keyCode === KEY_CODES.ARROW_DOWN) {
                    const totalFooterHeight = footerRows.reduce(
                        (total, currentVal) => {
                            return currentVal.rowHeight + total;
                        },
                        0,
                    );

                    let diff = 0;
                    if (isVirtualScroll) {
                        const parentOffsetTop =
                            nextRowEl.offsetParent.offsetTop;

                        diff =
                            trOffsetTop -
                            (containerScrollTop - parentOffsetTop) +
                            trClientHeight +
                            totalFooterHeight -
                            containerClientHeight;
                    } else {
                        diff =
                            trOffsetTop +
                            trClientHeight +
                            totalFooterHeight -
                            (containerClientHeight + containerScrollTop);
                    }

                    if (diff >= 0) {
                        tableContainerRef.scrollTop = containerScrollTop + diff;
                    }
                }
                // 解决滚动过快导致选中框消失的问题
                this.cellSelectionKeyData.rowKey = nextRowKey;
            }
        },

        // set virtual scroll visible data
        setVirtualScrollVisibleData() {
            const { tableData } = this;

            const startIndex =
                this.$options.customOption.virtualScrollStartIndex;
            const endIndex = this.$options.customOption.virtualScrollEndIndex;

            const aboveCount = this.getVirtualScrollAboveCount();
            const belowCount = this.getVirtualScrollBelowCount();

            let start = startIndex - aboveCount;
            let end = endIndex + belowCount;

            this.virtualScrollVisibleData = tableData.slice(start, end);
        },

        // get virtual scroll above count
        getVirtualScrollAboveCount() {
            let result = 0;
            const { isVirtualScroll, defaultVirtualScrollBufferCount } = this;

            const virtualScrollStartIndex =
                this.$options.customOption.virtualScrollStartIndex;

            if (isVirtualScroll) {
                result = Math.min(
                    virtualScrollStartIndex,
                    defaultVirtualScrollBufferCount,
                );
            }
            return result;
        },

        // get virtual scroll bellow count
        getVirtualScrollBelowCount() {
            let result = 0;

            const {
                isVirtualScroll,
                tableData,
                defaultVirtualScrollBufferCount,
            } = this;

            const virtualScrollEndIndex =
                this.$options.customOption.virtualScrollEndIndex;

            if (isVirtualScroll) {
                result = Math.min(
                    tableData.length - virtualScrollEndIndex,
                    defaultVirtualScrollBufferCount,
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
        // 更新 virtual phantom 列表总高度
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
            const start = this.$options.customOption.virtualScrollStartIndex;

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

            //this.$refs[this.tableContentRef].style.transform = `translate3d(0,${startOffset}px,0)`;
            window.requestAnimationFrame(() => {
                const ele = this.$refs[this.tableContentRef];
                if (ele) {
                    ele.style.top = `${startOffset}px`;
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
        // virtual scroll handler
        tableContainerScrollHandler() {
            const tableContainerRef = this.$refs[this.tableContainerRef];

            this.setScrolling(tableContainerRef);

            if (this.isVirtualScroll) {
                const {
                    virtualScrollVisibleCount: visibleCount,
                    virtualScrollOption,
                } = this;

                //当前滚动位置
                let scrollTop = tableContainerRef.scrollTop;

                //此时的开始索引
                let visibleStartIndex =
                    this.getVirtualScrollStartIndex(scrollTop);
                this.$options.customOption.virtualScrollStartIndex =
                    visibleStartIndex;

                //此时的结束索引
                let visibleEndIndex = visibleStartIndex + visibleCount;
                this.$options.customOption.virtualScrollEndIndex =
                    visibleEndIndex;

                //此时的偏移量
                this.setVirtualScrollStartOffset();

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
            }
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
            this.isScrolling = false;
        },
        // init virtual scroll
        initVirtualScroll() {
            if (this.isVirtualScroll) {
                const startIndex = 0;

                this.$options.customOption.virtualScrollStartIndex = startIndex;
                this.$options.customOption.virtualScrollEndIndex =
                    startIndex + this.virtualScrollVisibleCount;

                this.tableContainerScrollHandler();
                this.setVirtualPhantomHeight();
            }
        },

        // set scrolling
        setScrolling(tableContainerRef) {
            if (this.hasFixedColumn) {
                const { scrollWidth, clientWidth, scrollLeft } =
                    tableContainerRef;

                const { previewTableContainerScrollLeft: previewScrollLeft } =
                    this.$options.customOption;

                // 仅横向滚动需要处理
                if (
                    previewScrollLeft === 0 ||
                    previewScrollLeft !== scrollLeft
                ) {
                    this.$options.customOption.previewTableContainerScrollLeft =
                        scrollLeft;

                    this.isLeftScrolling = scrollLeft > 0;
                    this.isRightScrolling =
                        scrollWidth - clientWidth > scrollLeft;
                }
            }
        },

        // init scrolling
        initScrolling() {
            this.setScrolling(this.$refs[this.tableContainerRef]);
        },

        // table blur
        tableBlur() {
            const { rowKey, columnKey } = this.cellSelectionKeyData;

            if (!isEmptyValue(rowKey) || !isEmptyValue(columnKey)) {
                // reset cell selection key data
                this.cellSelectionKeyData = {
                    rowKey: "",
                    columnKey: "",
                };
            }
        },

        // save cell when stop editing
        saveCellWhenStopEditing({ rowKey, colKey }) {
            const { colgroups, rowKeyFieldName, editOption, editingCells } =
                this;

            const { cellValueChange, rowValueChange, fullRowEdit } = editOption;

            // 全行编辑
            if (fullRowEdit) {
                const editingCell = editingCells.find(
                    (x) => x.rowKey == rowKey,
                );

                if (editingCell) {
                    const updateIndex = this.tableData.findIndex(
                        (x) => x[rowKeyFieldName] === rowKey,
                    );

                    this.tableData.splice(updateIndex, 1, editingCell.row);

                    rowValueChange &&
                        rowValueChange({
                            row: editingCell.row,
                        });
                }
            } else {
                const editingCell = editingCells.find(
                    (x) => x.rowKey == rowKey && x.colKey == colKey,
                );

                if (editingCell) {
                    let currentRow = this.tableData.find(
                        (x) => x[rowKeyFieldName] === rowKey,
                    );

                    if (currentRow) {
                        const currentColumn = colgroups.find(
                            (x) => x.key === colKey,
                        );

                        currentRow[currentColumn.field] =
                            editingCell.row[currentColumn.field];
                        cellValueChange &&
                            cellValueChange({
                                row: currentRow,
                                column: currentColumn,
                            });
                    }
                }
            }
        },

        /*
         * @tdDoubleClick
         * @desc  recieve td double click event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdDoubleClick({ rowData, column }) {
            const { editOption } = this;

            if (editOption) {
                this.editCellByClick({
                    rowData,
                    column,
                    isDoubleClick: true,
                });
            }
        },

        /*
         * @tdClick
         * @desc  recieve td click event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        tdClick({ rowData, column }) {
            const { rowKeyFieldName, cellSelectionOption, editOption } = this;

            const rowKey = rowData[rowKeyFieldName];

            // update cell selection
            if (
                !(
                    cellSelectionOption &&
                    isBoolean(cellSelectionOption.enable) &&
                    cellSelectionOption.enable === false
                )
            ) {
                if (rowKeyFieldName && column.key) {
                    this.cellSelectionKeyChange({
                        rowKey,
                        columnKey: column.key,
                    });
                }
            }

            // eidting by single click
            if (editOption) {
                this.editCellByClick({
                    rowData,
                    column,
                    isDoubleClick: false,
                });
            }
        },

        // toggle editing cell
        toggleEditigCell(event) {
            const {
                cellSelectionKeyData,
                editOption,
                colgroups,
                editingFocusCell,
                hasEditColumn,
            } = this;

            const { keyCode } = event;

            if (!editOption) {
                return false;
            }

            if (keyCode !== KEY_CODES.ENTER) {
                return false;
            }

            // has edit column
            if (!hasEditColumn) {
                return false;
            }

            const { rowKey, columnKey } = cellSelectionKeyData;

            if (isEmptyValue(rowKey) || isEmptyValue(columnKey)) {
                return false;
            }

            let isStartEditing = false;
            let isStopEditing = false;

            // edit cell
            const { fullRowEdit } = editOption;

            // 整行编辑
            if (fullRowEdit) {
                if (editingFocusCell && editingFocusCell.rowKey === rowKey) {
                    isStopEditing = true;
                } else {
                    isStartEditing = true;
                }
            } else {
                const currentColumn = colgroups.find(
                    (x) => x.key === columnKey,
                );
                // 当前列是否可编辑
                if (currentColumn.edit) {
                    if (
                        editingFocusCell &&
                        editingFocusCell.rowKey === rowKey &&
                        editingFocusCell.colKey === columnKey
                    ) {
                        isStopEditing = true;
                    } else {
                        isStartEditing = true;
                    }
                }
            }

            if (isStartEditing) {
                this[INSTANCE_METHODS.START_EDITING_CELL]({
                    rowKey,
                    colKey: columnKey,
                });
            } else if (isStopEditing) {
                this[INSTANCE_METHODS.STOP_EDITING_CELL]({
                    rowKey,
                    colKey: columnKey,
                });
            }
        },

        /*
         * @editCellByClick
         * @desc  recieve td click event
         * @param {object} rowData - row data
         * @param {object} column - column data
         */
        editCellByClick({ rowData, column, isDoubleClick }) {
            const {
                rowKeyFieldName,
                editOption,
                colgroups,
                hasEditingFocusCell,
                hasEditColumn,
                editingFocusCell,
            } = this;

            if (!editOption) {
                return false;
            }

            // has edit column
            if (!hasEditColumn) {
                return false;
            }

            const clickRowKey = rowData[rowKeyFieldName];
            const clickColKey = column.key;

            let isStartEditing = false;
            let isStopEditing = false;

            // edit cell
            const { fullRowEdit, stopEditingWhenCellLoseFocus } = editOption;

            // 整行编辑
            if (fullRowEdit) {
                if (
                    editingFocusCell &&
                    editingFocusCell.rowKey === clickRowKey
                ) {
                    //
                    return false;
                } else {
                    isStopEditing = true;
                    isStartEditing = true;
                }
            } else {
                const currentColumn = colgroups.find(
                    (x) => x.key === clickColKey,
                );
                // 当前列是否可编辑
                if (currentColumn.edit) {
                    if (
                        editingFocusCell &&
                        editingFocusCell.rowKey === clickRowKey &&
                        editingFocusCell.colKey === clickColKey
                    ) {
                        //
                        return false;
                    } else {
                        isStopEditing = true;
                        isStartEditing = true;
                    }
                }
            }

            if (isStopEditing) {
                if (hasEditingFocusCell) {
                    if (!isFalse(stopEditingWhenCellLoseFocus)) {
                        this[INSTANCE_METHODS.STOP_EDITING_CELL]({
                            rowKey: editingFocusCell.rowKey,
                            colKey: editingFocusCell.colKey,
                        });
                    }
                }
            }

            if (isStartEditing) {
                let doubleClickEdit = isFalse(editOption.doubleClickEdit)
                    ? false
                    : true;
                if (doubleClickEdit === isDoubleClick) {
                    this[INSTANCE_METHODS.START_EDITING_CELL]({
                        rowKey: clickRowKey,
                        colKey: clickColKey,
                    });
                }
            }
        },

        /*
         * @setEditingFocusCell
         * @desc  set editing focus cell
         * @param {object} rowKey - row key
         * @param {object} colKey - col key
         */
        setEditingFocusCell({ rowKey, colKey }) {
            this.editingFocusCell = {
                rowKey,
                colKey,
            };
        },

        /*
         * @addEditingCells
         * @desc  add editing cells
         * @param {object} rowKey - row key
         * @param {object} colKey - col key
         * @param {object} column - column
         * @param {object} row - row data
         */
        addEditingCells({ rowKey, colKey, column, row }) {
            // 当是整行编辑时，colKey 和 column 为null
            this.editingCells.push({
                rowKey,
                row: cloneDeep(row),
                colKey: colKey ? colKey : null,
                column: column ? column : null,
            });
        },

        // table scrollTo
        [INSTANCE_METHODS.SCROLL_TO](option) {
            scrollTo(this.$refs[this.tableContainerRef], option);
        },
        // table scroll to rowKey
        [INSTANCE_METHODS.SCROLL_TO_ROW_KEY]({ rowKey }) {
            if (isEmptyValue(rowKey)) {
                console.warn("Row key can't be empty!");
                return false;
            }

            let scrollTop = 0;

            const { isVirtualScroll, headerRows } = this;

            const tableContainerRef = this.$refs[this.tableContainerRef];

            if (isVirtualScroll) {
                const position = this.virtualScrollPositions.find(
                    (x) => x.rowKey === rowKey,
                );

                if (position) {
                    scrollTop = position.top;
                }
            } else {
                const rowEl = this.$el.querySelector(
                    `tbody tr[${COMPS_CUSTOM_ATTRS.BODY_ROW_KEY}="${rowKey}"]`,
                );

                const totalHeaderHeight = headerRows.reduce(
                    (total, currentVal) => {
                        return currentVal.rowHeight + total;
                    },
                    0,
                );

                scrollTop = rowEl.offsetTop - totalHeaderHeight;
            }

            scrollTo(tableContainerRef, {
                top: scrollTop,
                behavior: "smooth",
            });
        },
        // start editing cell
        [INSTANCE_METHODS.START_EDITING_CELL]({
            rowKey,
            colKey,
            defaultValue,
        }) {
            const { editOption, colgroups, rowKeyFieldName, editingFocusCell } =
                this;

            if (!editOption) {
                return false;
            }

            const { fullRowEdit, stopEditingWhenCellLoseFocus } = editOption;

            let currentRow = this.tableData.find(
                (x) => x[rowKeyFieldName] === rowKey,
            );

            /* 
            调用API编辑的情况，需要关闭之前编辑的单元格
            */
            if (editingFocusCell) {
                // 整行编辑
                if (fullRowEdit) {
                    if (editingFocusCell.rowKey !== rowKey) {
                        if (!isFalse(stopEditingWhenCellLoseFocus)) {
                            this[INSTANCE_METHODS.STOP_ALL_EDITING_CELL]();
                        }
                    }
                } else {
                    if (
                        editingFocusCell.rowKey !== rowKey &&
                        editingFocusCell.colKey !== colKey
                    ) {
                        if (!isFalse(stopEditingWhenCellLoseFocus)) {
                            this[INSTANCE_METHODS.STOP_ALL_EDITING_CELL]();
                        }
                    }
                }
            }

            // 整行编辑
            if (fullRowEdit) {
                // 是否有可编辑的列
                if (!colgroups.some((x) => x.edit)) {
                    return false;
                }

                // 给每个可编辑的列赋默认值
                if (isDefined(defaultValue)) {
                    colgroups.forEach((col) => {
                        if (col.edit) {
                            currentRow[col.field] = defaultValue;
                        }
                    });
                }

                this.addEditingCells({
                    rowKey,
                    row: cloneDeep(currentRow),
                });
            } else {
                const currentColumn = colgroups.find((x) => x.key === colKey);
                // 当前列是否可编辑
                if (!currentColumn.edit) {
                    return false;
                }

                // 给当前列赋默认值
                if (isDefined(defaultValue)) {
                    currentRow[currentColumn.field] = defaultValue;
                }

                this.addEditingCells({
                    rowKey,
                    colKey,
                    column: currentColumn,
                    row: cloneDeep(currentRow),
                });
            }

            // set editing focus cell
            this.setEditingFocusCell({
                rowKey,
                colKey,
            });
        },
        // start editing cell
        [INSTANCE_METHODS.STOP_EDITING_CELL]({ rowKey, colKey }) {
            const { editOption, editingCells } = this;

            if (!editOption) {
                return false;
            }

            let deleteIndex = -1;

            // 整行编辑
            if (editOption.fullRowEdit) {
                deleteIndex = editingCells.findIndex(
                    (x) => x.rowKey === rowKey,
                );
            } else {
                deleteIndex = editingCells.findIndex(
                    (x) => x.rowKey === rowKey && x.colKey === colKey,
                );
            }

            if (deleteIndex > -1) {
                this.saveCellWhenStopEditing({
                    rowKey,
                    colKey,
                });

                this.editingCells.splice(deleteIndex, 1);

                // 清空正在编辑的单元格
                this.setEditingFocusCell({ rowKey: null, colKey: null });
            }
        },
        // stop all editing cell
        [INSTANCE_METHODS.STOP_ALL_EDITING_CELL]() {
            const { editOption, editingCells } = this;

            if (!editOption) {
                return false;
            }

            if (editingCells.length) {
                // 从后往前删
                for (let i = editingCells.length - 1; i >= 0; i--) {
                    this[INSTANCE_METHODS.STOP_EDITING_CELL]({
                        rowKey: editingCells[i].rowKey,
                        colKey: editingCells[i].colKey,
                    });
                }
            }
        },
        // set highlight row
        [INSTANCE_METHODS.SET_HIGHLIGHT_ROW]({ rowKey }) {
            this.highlightRowKey = rowKey;
        },
    },
    mounted() {
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

        // recieve td double click
        this.$on(EMIT_EVENTS.BODY_TD_DOUBLE_CLICK, (params) => {
            this.tdDoubleClick(params);
        });

        // body td edit cell value change
        this.$on(
            EMIT_EVENTS.BODY_TD_EDIT_CELL_VALUE_CHANGE,
            ({ editingCells }) => {
                this.editingCells = editingCells;
            },
        );

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
            tableViewportWidth,
            tableContainerStyle,
            tableStyle,
            tableClass,
            colgroups,
            groupColumns,
            fixedHeader,
            fixedFooter,
            actualRenderTableData,
            tdWidthChange,
            expandOption,
            checkboxOption,
            radioOption,
            rowKeyFieldName,
            virtualScrollOption,
            isVirtualScroll,
            sortOption,
            cellStyleOption,
            isScrolling,
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
        };

        // body props
        const bodyProps = {
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
                cellSelectionKeyData: this.cellSelectionKeyData,
                allRowKeys: this.allRowKeys,
                editOption: this.editOption,
                highlightRowKey: this.highlightRowKey,
                editingCells: this.editingCells,
                editingFocusCell: this.editingFocusCell,
                isScrolling,
            },
            on: {
                [EMIT_EVENTS.BODY_TD_WIDTH_CHANGE]: tdWidthChange,
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
                allRowKeys: this.allRowKeys,
                footerRows: this.footerRows,
            },
        };

        // container props
        const containerProps = {
            ref: this.tableContainerRef,
            class: this.tableContainerClass,
            style: tableContainerStyle,
            on: {
                scroll: () => {
                    if (isVirtualScroll) {
                        this.tableContainerScrollHandler();

                        const {
                            virtualScrollStartIndex: startIndex,
                            previewVirtualScrollStartIndex: previewStartIndex,
                        } = this.$options.customOption;

                        const differ = Math.abs(startIndex - previewStartIndex);

                        this.$options.customOption.previewVirtualScrollStartIndex =
                            startIndex;

                        // default placeholder per scrolling row count
                        if (
                            differ > this.defaultPlaceholderPerScrollingRowCount
                        ) {
                            this.isScrolling = true;
                        } else {
                            this.isScrolling = false;
                        }

                        this.debounceScrollEnded();
                    }
                },
            },
            directives: [
                {
                    name: "click-outside",
                    value: this.tableBlur,
                },
            ],
        };

        // wrapper container props
        const wrapperContainerProps = {
            class: "ve-table",
            props: {
                tagName: "div",
            },
            on: {
                "on-dom-resize-change": ({ height }) => {
                    this.tableOffestHeight = height;
                    this.initVirtualScroll();
                    // fixed #404
                    this.initScrolling();
                },
            },
        };

        return (
            <VueDomResizeObserver {...wrapperContainerProps}>
                <div {...containerProps}>
                    {/* virtual view phantom */}
                    {this.getVirtualViewPhantom()}
                    <table
                        ref={this.tableContentRef}
                        style={tableStyle}
                        class={[clsName("content"), tableClass]}
                    >
                        {/* colgroup */}
                        <Colgroup colgroups={colgroups} />
                        {/* table header */}
                        <Header {...headerProps} />
                        {/* table body */}
                        <Body {...bodyProps} />
                        {/* table footer */}
                        <Footer {...footerProps} />
                    </table>
                </div>
            </VueDomResizeObserver>
        );
    },
};
