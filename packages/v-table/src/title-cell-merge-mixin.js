export default {

    computed: {

        // 获取表头行合并的数量
        getTitleRowspanTotalCount(){

            let titleRowspanTotalCount1 = 0,
                titleRowspanTotalCount2 = 0,
                rowspanCountArr, minVal;


            // 不能用noFrozenTitleCols 要用原始数据处理
            this.noFrozenTitleCols.forEach(row => {

                rowspanCountArr = this.getTitleRowspanCountArr(row);

                // 如果每一项的rowspan值都大于1则继续处理
                if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                    minVal = Math.min.apply(null, rowspanCountArr);

                    titleRowspanTotalCount1 += minVal - 1;
                }
            });

            this.frozenTitleCols.forEach(row => {

                rowspanCountArr = this.getTitleRowspanCountArr(row);

                // 如果每一项的rowspan值都大于1则继续处理
                if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                    minVal = Math.min.apply(null, rowspanCountArr);

                    titleRowspanTotalCount2 += minVal - 1;
                }
            });

            return titleRowspanTotalCount1 < titleRowspanTotalCount2 ? titleRowspanTotalCount1 : titleRowspanTotalCount2;
        },

    },
    methods: {

        // return array
        getTitleRowspanCountArr(row){

            let rowspanCountArr = [];

            let shouldDeal = row.every(col => {

                if (col.rowspan && parseInt(col.rowspan) > 1) {

                    rowspanCountArr.push(parseInt(col.rowspan));
                    return true;
                } else {
                    return false;
                }
            })

            if (shouldDeal) {
                return rowspanCountArr;
            } else {
                return [];
            }
        },

        /*
         * row :行信息
         * rowspan：当前列的rowspan值
         * */
        /*dealTitleRowspan(row, rowspan){

         let result = rowspan,
         rowspanCountArr,
         minVal;

         rowspanCountArr = this.getTitleRowspanCountArr(row);

         // 如果每一项的rowspan值都大于1则继续处理
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
         },*/

        // 获取最小的 rowspan
        getMinRowspan(row){

            let result;

            let rowspanCountArr = this.getTitleRowspanCountArr(row);

            // 如果每一项的rowspan值都大于1则继续处理
            if (Array.isArray(rowspanCountArr) && rowspanCountArr.length > 0) {

                result = Math.min.apply(null, rowspanCountArr);
            }
            return result - 1;
        }
    }

}