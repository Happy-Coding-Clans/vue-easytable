'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classesMixin = require('./classes-mixin.js');

var _classesMixin2 = _interopRequireDefault(_classesMixin);

var _scrollControlMixin = require('./scroll-control-mixin.js');

var _scrollControlMixin2 = _interopRequireDefault(_scrollControlMixin);

var _frozenColumnsMixin = require('./frozen-columns-mixin.js');

var _frozenColumnsMixin2 = _interopRequireDefault(_frozenColumnsMixin);

var _tableResizeMixin = require('./table-resize-mixin.js');

var _tableResizeMixin2 = _interopRequireDefault(_tableResizeMixin);

var _sortControlMixin = require('./sort-control-mixin.js');

var _sortControlMixin2 = _interopRequireDefault(_sortControlMixin);

var _tableEmptyMixin = require('./table-empty-mixin.js');

var _tableEmptyMixin2 = _interopRequireDefault(_tableEmptyMixin);

var _dragWidthMixin = require('./drag-width-mixin.js');

var _dragWidthMixin2 = _interopRequireDefault(_dragWidthMixin);

var _cellEditMixin = require('./cell-edit-mixin.js');

var _cellEditMixin2 = _interopRequireDefault(_cellEditMixin);

var _bodyCellMergeMixin = require('./body-cell-merge-mixin.js');

var _bodyCellMergeMixin2 = _interopRequireDefault(_bodyCellMergeMixin);

var _titleCellMergeMixin = require('./title-cell-merge-mixin.js');

var _titleCellMergeMixin2 = _interopRequireDefault(_titleCellMergeMixin);

var _checkboxSelectionMixin = require('./checkbox-selection-mixin.js');

var _checkboxSelectionMixin2 = _interopRequireDefault(_checkboxSelectionMixin);

var _tableFooterMixin = require('./table-footer-mixin.js');

var _tableFooterMixin2 = _interopRequireDefault(_tableFooterMixin);

var _scrollBarControlMixin = require('./scroll-bar-control-mixin.js');

var _scrollBarControlMixin2 = _interopRequireDefault(_scrollBarControlMixin);

var _tableRowMouseEventsMixin = require('./table-row-mouse-events-mixin');

var _tableRowMouseEventsMixin2 = _interopRequireDefault(_tableRowMouseEventsMixin);

var _tableFiltersMixin = require('./table-filters-mixin');

var _tableFiltersMixin2 = _interopRequireDefault(_tableFiltersMixin);

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _deepClone = require('../../src/utils/deepClone.js');

var _deepClone2 = _interopRequireDefault(_deepClone);

var _tableEmpty = require('./table-empty.vue');

var _tableEmpty2 = _interopRequireDefault(_tableEmpty);

var _loading = require('./loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _index = require('../../v-checkbox-group/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../v-checkbox/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../../v-dropdown/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'v-table',
    mixins: [_classesMixin2.default, _tableResizeMixin2.default, _frozenColumnsMixin2.default, _scrollControlMixin2.default, _sortControlMixin2.default, _tableEmptyMixin2.default, _dragWidthMixin2.default, _cellEditMixin2.default, _bodyCellMergeMixin2.default, _titleCellMergeMixin2.default, _checkboxSelectionMixin2.default, _tableFooterMixin2.default, _scrollBarControlMixin2.default, _tableRowMouseEventsMixin2.default, _tableFiltersMixin2.default],
    components: { tableEmpty: _tableEmpty2.default, loading: _loading2.default, VCheckboxGroup: _index2.default, VCheckbox: _index4.default, VDropdown: _index6.default },
    data: function data() {
        return {
            internalTableData: [],

            internalWidth: 0,

            internalHeight: 0,

            internalColumns: [],

            internalTitleRows: [],
            errorMsg: ' V-Table error: ',

            maxWidth: 5000,
            hasFrozenColumn: false,
            resizeTimer: null
        };
    },

    props: {
        width: [Number, String],
        minWidth: {
            type: Number,
            default: 50
        },
        height: {
            type: Number,
            require: false
        },
        minHeight: {
            type: Number,
            default: 50
        },
        titleRowHeight: {
            type: Number,
            default: 38
        },

        isHorizontalResize: {
            type: Boolean,
            default: false
        },

        isVerticalResize: {
            type: Boolean,
            default: false
        },

        verticalResizeOffset: {
            type: Number,
            default: 0
        },

        tableBgColor: {
            type: String,
            default: '#fff'
        },

        titleBgColor: {
            type: String,
            default: '#fff'
        },

        oddBgColor: {
            type: String,
            default: ''
        },

        evenBgColor: {
            type: String,
            default: ''
        },

        rowHeight: {
            type: Number,
            default: 40
        },

        multipleSort: {
            type: Boolean,
            default: true
        },

        sortAlways: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            require: true
        },

        titleRows: {
            type: Array,
            require: true,
            default: function _default() {
                return [];
            }
        },
        tableData: {
            type: Array,
            require: true,
            default: function _default() {
                return [];
            }
        },

        pagingIndex: Number,

        errorContent: {
            type: String,
            default: '暂无数据'
        },

        errorContentHeight: {
            type: Number,
            default: 50
        },

        isLoading: {
            type: Boolean,
            default: false
        },
        loadingContent: {
            type: String,
            default: '<span><i class="v-icon-spin5 animate-loading-23" style="font-size: 28px;opacity:0.6;"></i></span>'
        },

        rowHoverColor: {
            type: String
        },
        rowClickColor: {
            type: String
        },
        showVerticalBorder: {
            type: Boolean,
            default: true
        },
        showHorizontalBorder: {
            type: Boolean,
            default: true
        },
        footer: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        footerRowHeight: {
            type: Number,
            default: 40
        },
        columnWidthDrag: {
            type: Boolean,
            default: false
        },
        loadingOpacity: {
            type: Number,
            default: 0.6
        },

        columnCellClassName: Function,

        footerCellClassName: Function,

        rowClick: Function,

        rowDblclick: Function,

        titleClick: Function,

        titleDblclick: Function,

        rowMouseEnter: Function,

        rowMouseLeave: Function,

        cellEditDone: Function,

        cellMerge: Function,

        selectAll: Function,

        selectChange: Function,

        selectGroupChange: Function,

        filterMethod: Function
    },
    computed: {
        isComplexTitle: function isComplexTitle() {

            return Array.isArray(this.internalTitleRows) && this.internalTitleRows.length > 0;
        },
        getTableHeight: function getTableHeight() {

            return this.isTableEmpty ? this.tableEmptyHeight : this.internalHeight;
        },
        leftViewWidth: function leftViewWidth() {
            var result = 0;
            if (this.hasFrozenColumn) {
                result = this.frozenCols.reduce(function (total, curr) {
                    return total + curr.width;
                }, 0);
            }
            return result;
        },
        rightViewWidth: function rightViewWidth() {

            var result = this.internalWidth - this.leftViewWidth;

            return this.hasFrozenColumn ? result - 2 : result;
        },
        bodyViewHeight: function bodyViewHeight() {
            var result;
            if (this.internalTitleRows.length > 0) {

                result = this.internalHeight - this.titleRowHeight * (this.internalTitleRows.length + this.getTitleRowspanTotalCount);
            } else {
                result = this.internalHeight - this.titleRowHeight;
            }

            result -= this.footerTotalHeight + 1;

            return result;
        },
        totalColumnsWidth: function totalColumnsWidth() {
            return this.internalColumns.reduce(function (total, curr) {
                return curr.width ? total + curr.width : total;
            }, 0);
        },
        totalNoFrozenColumnsWidth: function totalNoFrozenColumnsWidth() {

            return this.noFrozenCols.reduce(function (total, curr) {
                return curr.width ? total + curr.width : total;
            }, 0);
        },
        getColumnsFields: function getColumnsFields() {
            return this.internalColumns.map(function (item) {
                return item.field;
            });
        },
        getNoFrozenColumnsFields: function getNoFrozenColumnsFields() {
            return this.internalColumns.filter(function (x) {
                return !x.isFrozen;
            }).map(function (item) {
                return item.field;
            });
        },
        getFrozenColumnsFields: function getFrozenColumnsFields() {
            return this.internalColumns.filter(function (x) {
                return x.isFrozen;
            }).map(function (item) {
                return item.field;
            });
        }
    },
    methods: {
        customCompFunc: function customCompFunc(params) {

            this.$emit('on-custom-comp', params);
        },
        trBgColor: function trBgColor(num) {
            if (this.evenBgColor && this.evenBgColor.length > 0 || this.oddBgColor && this.oddBgColor.length > 0) {
                return num % 2 === 0 ? { 'background-color': this.evenBgColor } : { 'background-color': this.oddBgColor };
            }
        },
        setColumnCellClassName: function setColumnCellClassName(rowIndex, field, rowData) {

            return this.columnCellClassName && this.columnCellClassName(rowIndex, field, rowData);
        },
        titleColumnWidth: function titleColumnWidth(fields) {
            var result = 0;
            if (Array.isArray(fields)) {
                var matchItems = this.internalColumns.filter(function (item, index) {
                    return fields.some(function (x) {
                        return x === item.field;
                    });
                });

                result = matchItems.reduce(function (total, curr) {
                    return total + curr.width;
                }, 0);
            } else {
                console.error(this.errorMsg + 'the fields attribute must be a array in titleRows');
            }
            return result;
        },
        titleColumnHeight: function titleColumnHeight(rowspan) {
            if (rowspan && rowspan > 0) {
                return this.titleRowHeight * rowspan;
            } else {
                return this.titleRowHeight;
            }
        },
        overflowTitle: function overflowTitle(row, rowIndex, col) {

            var result = '';
            if (typeof col.formatter === 'function') {
                var val = col.formatter(row, rowIndex, this.pagingIndex, col.field);

                if (_utils2.default.isHtml(val)) {
                    result = '';
                } else {
                    result = val;
                }
            } else {
                result = row[col.field];
            }
            return result;
        },
        getTotalColumnsHeight: function getTotalColumnsHeight() {

            var titleTotalHeight = this.internalTitleRows && this.internalTitleRows.length > 0 ? this.titleRowHeight * this.internalTitleRows.length : this.titleRowHeight;

            titleTotalHeight += this.footerTotalHeight;

            return titleTotalHeight + this.internalTableData.length * this.rowHeight + 1;
        },
        initTableWidth: function initTableWidth() {

            this.internalWidth = this.isHorizontalResize ? this.maxWidth : this.width;
        },
        initColumns: function initColumns() {

            this.internalHeight = this.height;

            this.footerTotalHeight = this.getFooterTotalRowHeight;

            this.internalColumns = Array.isArray(this.columns) ? (0, _deepClone2.default)(this.columns) : [];

            this.internalTitleRows = Array.isArray(this.titleRows) ? (0, _deepClone2.default)(this.titleRows) : [];

            this.initColumnsFilters();

            this.initResizeColumns();

            this.hasFrozenColumn = this.internalColumns.some(function (x) {
                return x.isFrozen;
            });

            this.initTableWidth();

            this.setSortColumns();

            var self = this,
                widthCountCheck = 0;

            if (self.internalWidth && self.internalWidth > 0) {
                self.internalColumns.map(function (item) {
                    if (!(item.width && item.width > 0)) {

                        widthCountCheck++;
                        if (self.isHorizontalResize) {
                            console.error(self.errorMsg + "If you are using the isHorizontalResize property,Please set the value for each column's width");
                        } else {
                            item.width = self.internalWidth - self.totalColumnsWidth;
                        }
                    }
                });
            }

            if (widthCountCheck > 1) {
                console.error(this.errorMsg + 'Only allow one column is not set width');
            }
        },
        initView: function initView() {
            if (!(this.internalWidth && this.internalWidth > 0)) {

                if (this.columns && this.columns.length > 0) {
                    this.internalWidth = this.columns.reduce(function (total, curr) {
                        return total + curr.width;
                    }, 0);
                }
            }

            var totalColumnsHeight = this.getTotalColumnsHeight();

            if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                if (!this.isVerticalResize) {

                    this.internalHeight = totalColumnsHeight;
                }
            } else if (this.height <= totalColumnsHeight) {

                this.internalHeight = this.height;
            }
        },
        initInternalTableData: function initInternalTableData() {

            return Array.isArray(this.tableData) ? (0, _deepClone2.default)(this.tableData) : [];
        },
        resize: function resize() {
            var _this = this;

            this.resizeTimer = setTimeout(function (x) {

                _this.tableResize();
            });
        }
    },
    created: function created() {

        this.internalTableData = this.initInternalTableData(this.tableData);

        if (Array.isArray(this.columns) && this.columns.length > 0) {

            this.initColumns();
        }

        this.updateCheckboxGroupModel();

        this.initView();
    },
    mounted: function mounted() {

        this.setScrollbarWidth();

        this.tableEmpty();

        this.tableResize();

        if (Array.isArray(this.tableData) && this.tableData.length > 0) {

            this.scrollControl();
        }

        this.controlScrollBar();
    },

    watch: {
        'columns': {
            handler: function handler(newVal) {

                this.initColumns();
            },
            deep: true
        },

        'titleRows': {
            handler: function handler(newVal) {

                this.initColumns();
            },
            deep: true
        },

        'tableData': {

            handler: function handler(newVal) {

                this.skipRenderCells = [];

                this.internalTableData = this.initInternalTableData(newVal);

                this.updateCheckboxGroupModel();

                this.tableEmpty();

                if (Array.isArray(newVal) && newVal.length > 0) {

                    this.initView();

                    this.scrollControl();
                }

                this.resize();
            },
            deep: true
        },
        'pagingIndex': {

            handler: function handler() {

                this.clearCurrentRow();

                this.bodyScrollTop();
            }
        }
    },
    beforeDestroy: function beforeDestroy() {

        clearTimeout(this.resizeTimer);
    }
};