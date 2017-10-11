"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    computed: {
        getTitleRowspanTotalCount: function getTitleRowspanTotalCount() {
            var _this = this;

            var titleRowspanTotalCount1 = 0,
                titleRowspanTotalCount2 = 0,
                rowspanCountArr = void 0,
                minVal = void 0;

            this.noFrozenTitleCols.forEach(function (row) {

                rowspanCountArr = _this.getTitleRowspanCountArr(row);

                if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                    minVal = Math.min.apply(null, rowspanCountArr);

                    titleRowspanTotalCount1 += minVal - 1;
                }
            });

            this.frozenTitleCols.forEach(function (row) {

                rowspanCountArr = _this.getTitleRowspanCountArr(row);

                if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                    minVal = Math.min.apply(null, rowspanCountArr);

                    titleRowspanTotalCount2 += minVal - 1;
                }
            });

            return titleRowspanTotalCount1 < titleRowspanTotalCount2 ? titleRowspanTotalCount1 : titleRowspanTotalCount2;
        }
    },
    methods: {
        getTitleRowspanCountArr: function getTitleRowspanCountArr(row) {

            var rowspanCountArr = [];

            var shouldDeal = row.every(function (col) {

                if (col.rowspan && parseInt(col.rowspan) > 1) {

                    rowspanCountArr.push(parseInt(col.rowspan));
                    return true;
                } else {
                    return false;
                }
            });

            if (shouldDeal) {
                return rowspanCountArr;
            } else {
                return [];
            }
        },
        dealTitleRowspan: function dealTitleRowspan(row, rowspan) {

            var result = rowspan,
                rowspanCountArr = void 0,
                minVal = void 0;

            rowspanCountArr = this.getTitleRowspanCountArr(row);

            if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                rowspan = parseInt(rowspan);

                minVal = Math.min.apply(null, rowspanCountArr);

                if (rowspan === minVal) {

                    result = 1;
                } else {

                    result = rowspan - minVal + 1;
                }
            }
            return result;
        }
    }

};