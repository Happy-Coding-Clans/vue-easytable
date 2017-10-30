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
            hasContainerWidth: false };
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
        tableResize: function tableResize() {

            if (!this.isHorizontalResize && !this.isVerticalResize) {
                return false;
            }

            var self = this,
                maxWidth = self.maxWidth,
                maxHeight = self.height && self.height > 0 ? self.height : this.getTotalColumnsHeight(),
                minWidth = self.minWidth,
                minHeight = self.minHeight,
                view = this.$el,
                viewOffset = _utils2.default.getViewportOffset(view),
                currentWidth = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().width : view.clientWidth + 2,
                currentHeight = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().height : view.clientHeight + 2,
                right = window.document.documentElement.clientWidth - currentWidth - viewOffset.left,
                bottom = window.document.documentElement.clientHeight - currentHeight - viewOffset.top - 2;

            if (self.isVerticalResize && self.internalHeight && self.internalHeight > 0 && currentHeight > 0) {
                bottom -= self.VerticalResizeOffset;
                if (bottom < 0 && currentHeight > minHeight || bottom > 0 && currentHeight < maxHeight) {
                    var currentHeight = currentHeight + bottom;
                    currentHeight = currentHeight > maxHeight ? maxHeight : currentHeight;
                    currentHeight = currentHeight < minHeight ? minHeight : currentHeight;
                    self.internalHeight = currentHeight;
                }
            }

            if (self.isHorizontalResize && self.internalWidth && self.internalWidth > 0 && currentWidth > 0) {

                var newTableWidth = this.$el.clientWidth;

                if (right <= 0 && newTableWidth > minWidth || right >= 0 && newTableWidth < maxWidth) {

                    newTableWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
                    newTableWidth = newTableWidth < minWidth ? minWidth : newTableWidth;

                    self.internalWidth = newTableWidth;
                    self.changeColumnsWidth(newTableWidth);
                }
            }
        },
        changeColumnsWidth: function changeColumnsWidth(currentWidth) {

            var differ = currentWidth - 2 - this.totalColumnsWidth,
                initResizeWidths = this.initTotalColumnsWidth,
                rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            if (currentWidth <= initResizeWidths && !this.isTableEmpty) {

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'scroll';
                } else {

                    rightViewBody.style.overflowX = 'scroll';
                }
            } else {
                if (this.getTotalColumnsHeight() > this.internalHeight) {

                    differ -= _utils2.default.getScrollbarWidth() + 1;
                }

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'hidden';
                } else {

                    rightViewBody.style.overflowX = 'hidden';
                }
            }

            if (currentWidth >= initResizeWidths || differ > 0) {

                var average = differ / this.resizeColumns.length;

                this.internalColumns.map(function (item) {

                    if (item.isResize) {
                        item.width += average;
                    }

                    return item;
                });
            }
        }
    },

    mounted: function mounted() {

        _utils2.default.bind(window, 'resize', this.tableResize);
    },
    beforeDestroy: function beforeDestroy() {

        _utils2.default.unbind(window, 'resize', this.tableResize);
    }
};