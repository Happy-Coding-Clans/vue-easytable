export default {
    data(){

        return {

            filterSpecialValue: '__all__'
        }
    },
    methods: {

        // 初始化 columns filters
        initColumnsFilters(){

            // 如果是复杂表头
            if (this.isComplexTitle) {

                this.internalTitleRows.forEach(rows => {

                    rows.forEach(col => {

                        if (this.enableFilters(col.filters, col.fields) && !col.filterMultiple) {

                            col.filters.unshift({label: '全部', value: this.filterSpecialValue, selected: true});
                        }
                    })
                })
            } else {

                this.internalColumns.map(col => {

                    if (this.enableFilters(col.filters) && !col.filterMultiple) {

                        col.filters.unshift({label: '全部', value: this.filterSpecialValue, selected: true});
                    }
                })
            }
        },

        // 单选条件改变
        filterConditionChange(filterMultiple){

            // 单选
            if (!filterMultiple) {

                this.filterSummary();
            }
        },

        /*
         * 是否包含 filters 功能
         * fields : 当是复杂表头时，必须保证不是 colspan 的列
         * */
        enableFilters(filters, fields){

            let result = false

            if (Array.isArray(fields) && fields.length > 1) {

                result = false;
            }
            if (Array.isArray(filters) && filters.length > 0) {

                result = true;
            }
            return result;
        },

        filterEvent(){

            this.filterSummary();
        },

        filterSummary(){

            let result = {},
                columns = [],
                tempArr = [];

            // 复杂表头
            if (this.isComplexTitle) {

                columns = this.internalTitleRows;

                columns.forEach(rows => {

                    rows.forEach(col => {

                        tempArr = [];
                        if (this.enableFilters(col.filters, col.fields)) {

                            col.filters.forEach(f => {

                                if (f.selected && f.value !== this.filterSpecialValue) {
                                    tempArr.push(f.value)
                                }
                            })

                            result[col.fields[0]] = tempArr.length > 0 ? tempArr : null;
                        }
                    })
                })
            } else {

                columns = this.internalColumns;

                columns.forEach(col => {

                    tempArr = [];
                    if (this.enableFilters(col.filters)) {

                        col.filters.forEach(f => {

                            if (f.selected && f.value !== this.filterSpecialValue) {
                                tempArr.push(f.value)
                            }
                        })

                        result[col.field] = tempArr.length > 0 ? tempArr : null;
                    }
                })
            }

            this.filterMethod && this.filterMethod(result);
        }
    }
}