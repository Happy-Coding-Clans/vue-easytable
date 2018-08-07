'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _dom = require('../../src/utils/dom.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
            data: function data() {
                        return {

                                    draggingColumn: null,
                                    isDragging: false,
                                    draggingStartX: 0,
                                    draggingEndX: 0,
                                    minColumnWidth: 15 };
            },


            methods: {
                        handleTitleMouseMove: function handleTitleMouseMove(event, column) {

                                    if (!this.columnWidthDrag) {
                                                return false;
                                    }

                                    var target = void 0,
                                        rect = void 0;

                                    if (this.isDragging) {
                                                this.setDragLinePosition(event);
                                    }

                                    if (Array.isArray(column)) {

                                                if (column.length > 1) {
                                                            return false;
                                                } else {
                                                            column = column[0];
                                                }
                                    }

                                    if (!this.showVerticalBorder) {
                                                return false;
                                    }

                                    target = event.target;

                                    while (target && (target.className && !(0, _dom.hasClass)(target, 'v-table-title-cell') || !target.className)) {
                                                target = target.parentNode;
                                    }

                                    rect = target.getBoundingClientRect();

                                    var bodyStyle = document.body.style;

                                    if (rect.width >= this.minColumnWidth && rect.right - event.pageX < 10) {

                                                if (!this.isDragging) {
                                                            this.draggingColumn = this.internalColumns.find(function (x) {
                                                                        return x.field === column;
                                                            });
                                                }

                                                bodyStyle.cursor = 'col-resize';
                                    } else {

                                                if (!this.isDragging) {

                                                            this.draggingColumn = null;
                                                            bodyStyle.cursor = '';
                                                }
                                    }
                        },
                        handleTitleMouseOut: function handleTitleMouseOut() {

                                    if (!this.isDragging) {

                                                document.body.style.cursor = '';
                                    }
                        },
                        handleTitleMouseDown: function handleTitleMouseDown(event, column) {

                                    if (!this.draggingColumn || !this.showVerticalBorder) {
                                                return false;
                                    }

                                    this.isDragging = true;

                                    this.draggingStartX = event.clientX;

                                    this.setDragLinePosition(event);

                                    document.onselectstart = function () {
                                                return false;
                                    };
                                    document.ondragstart = function () {
                                                return false;
                                    };

                                    _utils2.default.bind(document, 'mousemove', this.handleDragMouseMove);
                                    _utils2.default.bind(document, 'mouseup', this.handleDragMouseUp);
                        },
                        handleDragMouseMove: function handleDragMouseMove(e) {

                                    if (!this.isDragging) {
                                                return false;
                                    }

                                    this.setDragLinePosition(e);
                        },
                        setDragLinePosition: function setDragLinePosition(e) {

                                    var tableLeft = _utils2.default.getViewportOffset(this.$el).left,
                                        dragLine = this.$el.querySelector('.v-table-drag-line'),
                                        clientX = e.clientX;

                                    if (this.draggingColumn.width + (clientX - this.draggingStartX) <= this.minColumnWidth) {
                                                return;
                                    }

                                    dragLine.style.left = clientX - tableLeft + 'px';
                        },
                        handleDragMouseUp: function handleDragMouseUp(e) {

                                    if (!this.isDragging) {
                                                return false;
                                    }

                                    this.draggingEndX = e.clientX;

                                    var differ = this.draggingEndX - this.draggingStartX;

                                    if (Math.abs(differ) > 1) {

                                                var draggingColumn = this.draggingColumn;

                                                if (draggingColumn.width + differ < this.minColumnWidth) {

                                                            draggingColumn.width = this.minColumnWidth;
                                                } else {

                                                            draggingColumn.width += differ;
                                                }
                                    }

                                    var rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                                        rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer'),
                                        hasTableFooter = this.hasTableFooter;

                                    if (this.totalColumnsWidth < this.internalWidth) {

                                                if (!hasTableFooter) {

                                                            rightViewBody.style.overflowX = 'hidden';

                                                            (0, _dom.removeClass)(rightViewBody, 'v-table-rightview-special-border');
                                                            rightViewBody.classList.remove('v-table-rightview-special-border');
                                                } else {

                                                            rightViewFooter.style.overflowX = 'hidden';
                                                }
                                    } else {

                                                if (!hasTableFooter) {

                                                            rightViewBody.style.overflowX = 'scroll';

                                                            if (!this.hasFrozenColumn) {

                                                                        (0, _dom.addClass)(rightViewBody, 'v-table-rightview-special-border');
                                                            }
                                                } else {

                                                            rightViewFooter.style.overflowX = 'scroll';
                                                }
                                    }

                                    this.draggingColumn = null;
                                    document.body.style.cursor = '';
                                    this.isDragging = false;

                                    document.onselectstart = function () {
                                                return true;
                                    };
                                    document.ondragstart = function () {
                                                return true;
                                    };

                                    _utils2.default.unbind(document, 'mousemove', this.handleDragMouseMove);
                                    _utils2.default.unbind(document, 'mouseup', this.handleDragMouseUp);
                        }
            }

};