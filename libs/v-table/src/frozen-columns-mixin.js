"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    computed: {
        frozenCols: function frozenCols() {
            return this.internalColumns.filter(function (x) {
                return x.isFrozen === true;
            });
        },
        noFrozenCols: function noFrozenCols() {
            return this.internalColumns.filter(function (x) {
                return x.isFrozen !== true;
            });
        },
        frozenTitleCols: function frozenTitleCols() {
            var frozenTitleCols = [];

            if (this.internalTitleRows.length > 0) {
                var frozenFields = this.frozenCols.map(function (x) {
                    return x.field;
                });

                this.internalTitleRows.forEach(function (rows) {

                    var frozenTitleRows = rows.filter(function (row) {
                        if (Array.isArray(row.fields)) {
                            if (row.fields.every(function (field) {
                                return frozenFields.indexOf(field) !== -1;
                            })) {
                                return true;
                            }
                        }
                    });
                    if (frozenTitleRows.length > 0) {
                        frozenTitleCols.push(frozenTitleRows);
                    }
                });
            }
            return frozenTitleCols;
        },
        noFrozenTitleCols: function noFrozenTitleCols() {
            var noFrozenTitleCols = [];

            if (this.internalTitleRows.length > 0) {
                var noFrozenFields = this.noFrozenCols.map(function (x) {
                    return x.field;
                });

                this.internalTitleRows.forEach(function (rows) {

                    var noFrozenTitleRows = rows.filter(function (row) {
                        if (Array.isArray(row.fields)) {
                            return row.fields.every(function (field) {
                                return noFrozenFields.indexOf(field) !== -1;
                            });
                        }
                    });

                    if (noFrozenTitleRows.length > 0) {
                        noFrozenTitleCols.push(noFrozenTitleRows);
                    }
                });
            }
            return noFrozenTitleCols;
        }
    }
};