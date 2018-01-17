'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {

        return {
            sortColumns: {}
        };
    },


    methods: {
        enableSort: function enableSort(val) {
            return typeof val === 'string' ? true : false;
        },
        setSortColumns: function setSortColumns() {
            var self = this,
                sortColumns = {},
                titleRowsToSortInfo = [];

            if (self.internalTitleRows.length > 0) {
                self.internalTitleRows.filter(function (row) {
                    row.filter(function (column, index) {
                        if (typeof column.orderBy === 'string' && column.fields.length === 1) {
                            column.field = column.fields[0];
                            titleRowsToSortInfo.push(column);
                        }
                    });
                });
            }

            var collection = titleRowsToSortInfo.length > 0 ? titleRowsToSortInfo : self.internalColumns;

            collection.filter(function (item, index) {
                if (self.enableSort(item.orderBy)) {
                    sortColumns[item.field] = item.orderBy;
                }
            });

            this.sortColumns = sortColumns;

            this.singleSortInit();
        },
        getCurrentSort: function getCurrentSort(field) {

            return this.sortColumns[field];
        },
        sortControl: function sortControl(field) {

            var orderBy = this.sortColumns[field];

            if (this.enableSort(orderBy)) {

                if (this.sortAlways) {

                    this.sortColumns[field] = orderBy === 'asc' ? 'desc' : 'asc';
                } else {

                    this.sortColumns[field] = orderBy === 'asc' ? 'desc' : this.sortColumns[field] === 'desc' ? '' : 'asc';
                }

                if (!this.multipleSort) {

                    for (var col in this.sortColumns) {

                        if (col !== field) {

                            this.sortColumns[col] = '';
                        }
                    }
                }

                this.$emit('sort-change', this.sortColumns);
            }
        },
        singleSortInit: function singleSortInit() {

            var self = this,
                result = false;

            if (!self.multipleSort && self.sortColumns) {

                for (var col in self.sortColumns) {

                    if (result) {

                        self.sortColumns[col] = '';
                    }
                    result = true;
                }
            }
        },
        resetOrder: function resetOrder() {

            this.setSortColumns();

            this.$emit('sort-change', this.sortColumns);
        }
    }
};