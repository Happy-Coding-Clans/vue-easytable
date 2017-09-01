'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        enableSort: function enableSort(val) {
            return typeof val === 'string' ? true : false;
        },
        sortColumns: function sortColumns() {
            var self = this,
                sortColumns = {},
                collection = self.titleRowsToSortInfo.length > 0 ? self.titleRowsToSortInfo : self.internalColumns;

            collection.filter(function (item, index) {
                if (self.enableSort(item.orderBy)) {
                    sortColumns[item.field] = item.orderBy;
                }
            });

            return sortColumns;
        },
        sortControl: function sortControl(field, orderBy) {

            var self = this,
                collection = self.titleRowsToSortInfo.length > 0 ? self.titleRowsToSortInfo : self.internalColumns;

            if (self.enableSort(orderBy)) {
                collection.filter(function (column, index) {

                    if (self.enableSort(column.orderBy) && column.field === field) {
                        column.orderBy = column.orderBy === 'asc' ? 'desc' : column.orderBy === 'desc' ? '' : 'asc';
                    }

                    if (!self.multipleSort) {
                        if (column.field !== field && self.enableSort(column.orderBy)) {
                            column.orderBy = '';
                        }
                    }
                });

                self.$emit('sort-change', self.sortColumns());
            }
        },
        singelSortInit: function singelSortInit() {
            var self = this,
                result = false,
                collection;
            if (!self.multipleSort) {
                collection = self.titleRowsToSortInfo.length > 0 ? self.titleRowsToSortInfo : self.internalColumns;
                collection.filter(function (item, index) {
                    if (self.enableSort(item.orderBy) && item.orderBy !== '') {
                        if (result) {
                            item.orderBy = '';
                        }
                        result = true;
                    }
                });
            }
        }
    }
};