/*
 * 排序
 * */
export default {

    data(){

        return {
            sortColumns: {}
        }
    },

    methods: {
        // 是否允许排序
        enableSort(val){
            return typeof val === 'string' ? true : false;
        },
        // 允许排序的列集合
        setSortColumns(){
            var self = this, sortColumns = {},
                titleRowsToSortInfo = [];

            if (self.internalTitleRows.length > 0) {
                self.internalTitleRows.filter(function (row) {
                    row.filter(function (column, index) {
                        if (typeof column.orderBy === 'string' && column.fields.length === 1) {
                            column.field = column.fields[0];
                            titleRowsToSortInfo.push(column);
                        }
                    })
                })
            }

            let collection = titleRowsToSortInfo.length > 0 ? titleRowsToSortInfo : self.internalColumns;

            collection.filter(function (item, index) {
                if (self.enableSort(item.orderBy)) {
                    sortColumns[item.field] = item.orderBy;
                }
            })

            this.sortColumns = sortColumns;

            this.singleSortInit();
        },

        // 获取当前排序规则
        getCurrentSort(field){

            return this.sortColumns[field];
        },

        // 排序控制
        sortControl(field){

            let orderBy = this.sortColumns[field];

            if (this.enableSort(orderBy)) {

                if (this.sortAlways) {

                    this.sortColumns[field] = orderBy === 'asc' ? 'desc' : 'asc';
                } else {

                    this.sortColumns[field] = orderBy === 'asc' ? 'desc' :
                        (this.sortColumns[field] === 'desc' ? '' : 'asc');
                }

                if (!this.multipleSort){

                    for (var col in this.sortColumns) {

                        if (col !== field) {

                            this.sortColumns[col] = '';
                        }
                    }
                }

                this.$emit('sort-change', this.sortColumns);
            }

        },

        // 单排时只允许保留第一个排序规则（‘asc’或者‘desc’）
        singleSortInit(){

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

        // 对外暴露的方法（重置排序规则）
        resetOrder(){

            this.setSortColumns();

            this.$emit('sort-change', this.sortColumns);
        }
    }
}