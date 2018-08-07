'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {

        return {

            filterSpecialValue: '__all__'
        };
    },

    methods: {
        initColumnsFilters: function initColumnsFilters() {
            var _this = this;

            if (this.isComplexTitle) {

                this.internalTitleRows.forEach(function (rows) {

                    rows.forEach(function (col) {

                        if (_this.enableFilters(col.filters, col.fields) && !col.filterMultiple) {

                            col.filters.unshift({ label: '全部', value: _this.filterSpecialValue, selected: true });
                        }
                    });
                });
            } else {

                this.internalColumns.map(function (col) {

                    if (_this.enableFilters(col.filters) && !col.filterMultiple) {

                        col.filters.unshift({ label: '全部', value: _this.filterSpecialValue, selected: true });
                    }
                });
            }
        },
        filterConditionChange: function filterConditionChange(filterMultiple) {
            if (!filterMultiple) {

                this.filterSummary();
            }
        },
        enableFilters: function enableFilters(filters, fields) {

            var result = false;

            if (Array.isArray(fields) && fields.length > 1) {

                result = false;
            }
            if (Array.isArray(filters) && filters.length > 0) {

                result = true;
            }
            return result;
        },
        filterEvent: function filterEvent() {

            this.filterSummary();
        },
        filterSummary: function filterSummary() {
            var _this2 = this;

            var result = {},
                columns = [],
                tempArr = [];

            if (this.isComplexTitle) {

                columns = this.internalTitleRows;

                columns.forEach(function (rows) {

                    rows.forEach(function (col) {

                        tempArr = [];
                        if (_this2.enableFilters(col.filters, col.fields)) {

                            col.filters.forEach(function (f) {

                                if (f.selected && f.value !== _this2.filterSpecialValue) {
                                    tempArr.push(f.value);
                                }
                            });

                            result[col.fields[0]] = tempArr.length > 0 ? tempArr : null;
                        }
                    });
                });
            } else {

                columns = this.internalColumns;

                columns.forEach(function (col) {

                    tempArr = [];
                    if (_this2.enableFilters(col.filters)) {

                        col.filters.forEach(function (f) {

                            if (f.selected && f.value !== _this2.filterSpecialValue) {
                                tempArr.push(f.value);
                            }
                        });

                        result[col.field] = tempArr.length > 0 ? tempArr : null;
                    }
                });
            }

            this.filterMethod && this.filterMethod(result);
        }
    }
};