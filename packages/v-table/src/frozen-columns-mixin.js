/*
* 固定列
*
* */
export default {
    computed:{
        // 冻结的列集合
        frozenCols(){
            return this.internalColumns.filter(x => x.isFrozen === true);
        },
        // 非冻结列集合
        noFrozenCols(){
            return this.internalColumns.filter(x => x.isFrozen !== true);
        },
        // 冻结的表头列集合
        frozenTitleCols(){
            var frozenTitleCols = [];

            if (this.internalTitleRows.length > 0) {

                // 获取当前锁定的字段集合
                var frozenFields = this.frozenCols.map(x => x.field);

                this.internalTitleRows.forEach(function (rows) {

                    var frozenTitleRows = rows.filter(function (row) {
                        if (Array.isArray(row.fields)) {
                            if (row.fields.every(field => frozenFields.indexOf(field) !== -1)) {
                                return true;
                            }
                        }
                    })
                    if (frozenTitleRows.length > 0) {
                        frozenTitleCols.push(frozenTitleRows);
                    }
                })
            }
            return frozenTitleCols;
        },
        // 未的表头列集合
        noFrozenTitleCols(){
            var noFrozenTitleCols = [];

            if (this.internalTitleRows.length > 0) {

                // 获取当前未锁定的字段集合
                var noFrozenFields = this.noFrozenCols.map(x => x.field);

                this.internalTitleRows.forEach(function (rows) {

                    var noFrozenTitleRows = rows.filter(function (row) {
                        if (Array.isArray(row.fields)) {
                            return row.fields.every(field => noFrozenFields.indexOf(field) !== -1)
                        }
                    })

                    if (noFrozenTitleRows.length > 0) {
                        noFrozenTitleCols.push(noFrozenTitleRows);
                    }
                })
            }
            return noFrozenTitleCols;
        },
    }
}