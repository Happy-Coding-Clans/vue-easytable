'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _deepClone = require('../../src/utils/deepClone.js');

var _deepClone2 = _interopRequireDefault(_deepClone);

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

            computed: {
                        frozenFooterCols: function frozenFooterCols() {

                                    var result = [];

                                    if (this.initInternalFooter.length > 0) {

                                                this.initInternalFooter.forEach(function (columns) {

                                                            result.push(columns.filter(function (col) {
                                                                        return col.isFrozen;
                                                            }));
                                                });
                                    }

                                    return result;
                        },
                        noFrozenFooterCols: function noFrozenFooterCols() {
                                    var result = [];

                                    if (this.initInternalFooter.length > 0) {

                                                this.initInternalFooter.forEach(function (columns) {

                                                            result.push(columns.filter(function (col) {
                                                                        return !col.isFrozen;
                                                            }));
                                                });
                                    }

                                    return result;
                        },
                        getFooterTotalRowHeight: function getFooterTotalRowHeight() {

                                    if (Array.isArray(this.footer) && this.footer.length > 0) {

                                                return this.footer.length * this.footerRowHeight;
                                    }
                                    return 0;
                        },
                        getFooterContainerHeight: function getFooterContainerHeight() {

                                    var result = 0;
                                    if (this.getFooterTotalRowHeight > 0) {

                                                result = this.getFooterTotalRowHeight;

                                                if (this.hasBodyHorizontalScrollBar()) {

                                                            result += _utils2.default.getScrollbarWidth();
                                                }
                                    }

                                    return result;
                        },
                        hasTableFooter: function hasTableFooter() {

                                    return Array.isArray(this.footer) && this.footer.length;
                        },
                        initInternalFooter: function initInternalFooter() {

                                    if (!(Array.isArray(this.footer) && this.footer.length > 0)) {

                                                return [];
                                    }

                                    var result = [],
                                        resultRow = [],
                                        cloneInternalColumns;

                                    cloneInternalColumns = (0, _deepClone2.default)(this.internalColumns);

                                    cloneInternalColumns.sort(function (a, b) {

                                                if (a.isFrozen) {

                                                            return -1;
                                                } else if (b.isFrozen) {

                                                            return 1;
                                                }
                                                return 0;
                                    });

                                    this.footer.forEach(function (items, rows) {

                                                resultRow = [];

                                                items.forEach(function (value, index) {

                                                            resultRow.push({
                                                                        content: value,
                                                                        width: cloneInternalColumns[index].width,
                                                                        align: cloneInternalColumns[index].columnAlign,
                                                                        isFrozen: cloneInternalColumns[index].isFrozen ? true : false
                                                            });
                                                });

                                                result.push(resultRow);
                                    });
                                    return result;
                        }
            },

            methods: {
                        setFooterCellClassName: function setFooterCellClassName(isLeftView, rowIndex, colIndex, value) {

                                    var _colIndex = colIndex;

                                    if (!isLeftView && this.hasFrozenColumn) {

                                                _colIndex += this.frozenCols.length;
                                    }

                                    return this.footerCellClassName && this.footerCellClassName(rowIndex, _colIndex, value);
                        }
            }

};