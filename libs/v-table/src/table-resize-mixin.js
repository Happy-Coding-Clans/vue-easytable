'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            resizeColumns: [],
            initTotalColumnsWidth: 0,
            hasContainerWidth: false,
            containerWidthCheckTimer: null
        };
    },


    methods: {
        getResizeColumns: function getResizeColumns() {

            var result = [];

            this.internalColumns.forEach(function (item) {

                if (item.isResize) {
                    result.push({ width: item.width, field: item.field });
                }
            });

            this.resizeColumns = result;
        },
        initResizeColumns: function initResizeColumns() {

            this.initTotalColumnsWidth = this.totalColumnsWidth;
            this.getResizeColumns();
        },
        containerWidthCheck: function containerWidthCheck() {
            var _this = this;

            this.containerWidthCheckTimer = setTimeout(function (x) {

                var tableContainerWidth = _this.$el.clientWidth;

                if (tableContainerWidth - _this.internalWidth > 3) {

                    _this.tableResize();
                }
            });
        },
        adjustHeight: function adjustHeight(hasScrollBar) {

            if (!this.$el || this.isVerticalResize) {
                return false;
            }

            var totalColumnsHeight = this.getTotalColumnsHeight(),
                scrollbarWidth = this.scrollbarWidth;

            if (this.hasTableFooter) {

                if (hasScrollBar) {

                    if (this.footerTotalHeight === this.getFooterTotalRowHeight) {

                        this.footerTotalHeight += scrollbarWidth;

                        if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {
                            this.internalHeight += scrollbarWidth;
                        }
                    }
                } else if (!hasScrollBar) {

                    if (this.footerTotalHeight > this.getFooterTotalRowHeight) {

                        this.footerTotalHeight -= scrollbarWidth;

                        if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                            this.internalHeight -= scrollbarWidth;
                        }
                    }
                }
            } else if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                    if (hasScrollBar && this.internalHeight + 2 < totalColumnsHeight + scrollbarWidth) {

                        this.internalHeight += scrollbarWidth;
                    } else if (!hasScrollBar) {

                        this.internalHeight = this.getTotalColumnsHeight();
                    }
                }
        },
        tableResize: function tableResize() {

            if (!this.isHorizontalResize && !this.isVerticalResize) {
                return false;
            }

            var totalColumnsHeight = this.getTotalColumnsHeight(),
                maxWidth = this.maxWidth,
                maxHeight = this.height && this.height > 0 ? this.height : totalColumnsHeight,
                minWidth = this.minWidth,
                minHeight = this.minHeight > totalColumnsHeight ? totalColumnsHeight : this.minHeight,
                view = this.$el,
                viewOffset = _utils2.default.getViewportOffset(view),
                currentWidth = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().width : view.clientWidth,
                currentHeight = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().height : view.clientHeight,
                bottom = window.document.documentElement.clientHeight - currentHeight - viewOffset.top - 2,
                bottom2 = viewOffset.bottom2,
                scrollbarWidth = this.scrollbarWidth;

            if (this.isHorizontalResize && this.internalWidth && this.internalWidth > 0 && currentWidth > 0) {

                currentWidth = currentWidth > maxWidth ? maxWidth : currentWidth;
                currentWidth = currentWidth < minWidth ? minWidth : currentWidth;

                this.internalWidth = currentWidth;
            }

            if (this.isVerticalResize && currentHeight > 0) {

                bottom -= this.verticalResizeOffset;

                currentHeight = currentHeight + bottom;
                currentHeight = currentHeight > maxHeight ? maxHeight : currentHeight;
                currentHeight = currentHeight < minHeight ? minHeight : currentHeight;

                if (currentWidth <= this.initTotalColumnsWidth && !this.isTableEmpty) {

                    bottom2 -= this.verticalResizeOffset;

                    var differ = bottom2 - totalColumnsHeight;

                    if (bottom2 > totalColumnsHeight + scrollbarWidth) {

                        currentHeight += scrollbarWidth;
                    } else if (differ > 0 && differ < scrollbarWidth) {

                        currentHeight += differ;
                    }
                }

                this.internalHeight = currentHeight;
            }

            this.changeColumnsWidth(currentWidth);
        },
        changeColumnsWidth: function changeColumnsWidth(currentWidth) {
            var _this2 = this;

            var differ = currentWidth - this.totalColumnsWidth - this.actionViewWidth,
                initResizeWidths = this.initTotalColumnsWidth,
                rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            if (differ < 0 || currentWidth <= initResizeWidths && !this.isTableEmpty) {

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'scroll';
                } else {

                    rightViewBody.style.overflowX = 'scroll';
                }

                this.adjustHeight(true);
            } else {
                if (this.getTotalColumnsHeight() > this.internalHeight) {

                    differ -= this.scrollbarWidth;
                }

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'hidden';
                } else {

                    rightViewBody.style.overflowX = 'hidden';
                }

                this.adjustHeight(false);
            }

            if (this.hasFrozenColumn) {

                differ -= 1;
            }

            if (currentWidth >= initResizeWidths || differ > 0) {

                this.setColumnsWidth(differ);
            } else {

                this.columns.forEach(function (col, index) {

                    if (col.isResize) {

                        _this2.internalColumns[index].width = col.width;
                    }
                });
            }

            this.containerWidthCheck();
        },
        setColumnsWidth: function setColumnsWidth(differ) {

            var resizeColumnsLen = this.resizeColumns.length,
                average = Math.floor(differ / resizeColumnsLen),
                totalAverage = average * resizeColumnsLen,
                leftAverage = differ - totalAverage,
                leftAverageFloor = Math.floor(leftAverage),
                averageColumnsWidthArr = new Array(resizeColumnsLen).fill(average),
                index = 0;

            for (var i = 0; i < leftAverageFloor; i++) {

                averageColumnsWidthArr[i] += 1;
            }

            averageColumnsWidthArr[resizeColumnsLen - 1] += leftAverage - leftAverageFloor;

            this.internalColumns.map(function (item) {

                if (item.isResize) {

                    item.width += averageColumnsWidthArr[index++];
                }

                return item;
            });
        }
    },

    mounted: function mounted() {

        _utils2.default.bind(window, 'resize', this.tableResize);
    },
    beforeDestroy: function beforeDestroy() {

        _utils2.default.unbind(window, 'resize', this.tableResize);
        clearTimeout(this.containerWidthCheckTimer);
    }
};