'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});
exports.default = {
            data: function data() {

                        return {

                                    hoverRowIndex: -1,
                                    clickRowIndex: -1
                        };
            },


            methods: {
                        handleMouseEnter: function handleMouseEnter(rowIndex) {

                                    if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                                                this.hoverRowIndex = rowIndex;
                                    }

                                    this.rowMouseEnter && this.rowMouseEnter(rowIndex);
                        },
                        handleMouseOut: function handleMouseOut(rowIndex) {

                                    if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                                                this.hoverRowIndex = -1;
                                    }

                                    this.rowMouseLeave && this.rowMouseLeave(rowIndex);
                        },
                        onCellClick: function onCellClick(rowIndex, rowData, column) {

                                    if (this.rowClickColor && this.rowClickColor.length > 0) {

                                                this.clickRowIndex = rowIndex;
                                    }

                                    this.onRowClick && this.onRowClick(rowIndex, rowData, column);
                        },
                        getHighPriorityBgColor: function getHighPriorityBgColor(rowIndex) {

                                    var result = '';

                                    if (this.clickRowIndex === rowIndex) {

                                                result = this.rowClickColor;
                                    } else if (this.hoverRowIndex === rowIndex) {

                                                result = this.rowHoverColor;
                                    }

                                    if (result.length <= 0) {

                                                if (this.evenBgColor && this.evenBgColor.length > 0 || this.oddBgColor && this.oddBgColor.length > 0) {

                                                            result = (rowIndex + 1) % 2 === 0 ? this.evenBgColor : this.oddBgColor;
                                                }
                                    }

                                    if (result.length <= 0) {

                                                result = this.tableBgColor;
                                    }

                                    return result;
                        },
                        setRowBgColor: function setRowBgColor(newVal, oldVal, color) {
                                    var _this = this;

                                    var el = this.$el;

                                    if (!el) {
                                                return false;
                                    }

                                    var rowsCollection = [],
                                        oldRow = void 0,
                                        newRow = void 0;

                                    if (this.hasFrozenColumn) {

                                                rowsCollection.push(el.querySelectorAll('.v-table-leftview .v-table-row'));
                                    }

                                    rowsCollection.push(el.querySelectorAll('.v-table-rightview .v-table-row'));

                                    rowsCollection.forEach(function (rows) {

                                                oldRow = rows[oldVal];
                                                newRow = rows[newVal];

                                                if (oldRow) {

                                                            oldRow.style.backgroundColor = _this.getHighPriorityBgColor(oldVal);
                                                }

                                                if (newRow) {

                                                            newRow.style.backgroundColor = color;
                                                }
                                    });
                        }
            },

            watch: {

                        'hoverRowIndex': function hoverRowIndex(newVal, oldVal) {

                                    this.setRowBgColor(newVal, oldVal, this.rowHoverColor);
                        },

                        'clickRowIndex': function clickRowIndex(newVal, oldVal) {

                                    this.setRowBgColor(newVal, oldVal, this.rowClickColor);
                        }
            }
};