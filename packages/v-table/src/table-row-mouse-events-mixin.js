export default {

    data(){

        return {

            hoverRowIndex: -1,
            clickRowIndex: -1
        }
    },

    methods: {


        handleMouseEnter(rowIndex){

            if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                this.hoverRowIndex = rowIndex;
            }

            this.rowMouseEnter && this.rowMouseEnter(rowIndex);
        },

        handleMouseOut(rowIndex){

            if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                this.hoverRowIndex = -1;
            }

            this.rowMouseLeave && this.rowMouseLeave(rowIndex);
        },

        /*
         * 表头单元格单击事件
         * 注意：如果为复杂表头，field 为数组
         * */
        titleCellClick(field,title){

            this.titleClick && this.titleClick(title,field);
        },

        /*
         * 表头单元格双击事件
         * 注意：如果为复杂表头，field 为数组
         * */
        titleCellDblClick(field,title){

            this.titleDblclick && this.titleDblclick(title,field);
        },

        // 行单击事件
        rowCellClick(rowIndex, rowData, column){
            if (this.rowClickColor && this.rowClickColor.length > 0) {

                this.clickRowIndex = rowIndex;
            }

            this.rowClick && this.rowClick(rowIndex, rowData, column);
        },

        // 行双击事件
        rowCellDbClick(rowIndex, rowData, column){

            this.rowDblclick && this.rowDblclick(rowIndex, rowData, column);
        },

        /*
         * @method getHighPriorityBgColor 获取高优先级的行背景色 优先级 click color > hover color > 奇偶color > table bg color
         * */
        getHighPriorityBgColor(rowIndex){

            var result = '';

            if (this.clickRowIndex === rowIndex) {

                result = this.rowClickColor;

            } else if (this.hoverRowIndex === rowIndex) {

                result = this.rowHoverColor;
            }

            if (result.length <= 0) {

                if ((this.evenBgColor && this.evenBgColor.length > 0) || (this.oddBgColor && this.oddBgColor.length > 0)) {

                    result = (rowIndex + 1) % 2 === 0 ? this.evenBgColor : this.oddBgColor;
                }
            }

            if (result.length <= 0) {

                result = this.tableBgColor;
            }

            return result;
        },

        setRowBgColor(newVal, oldVal, color){

            let el = this.$el;

            if (!el) {
                return false;
            }

            let rowsCollection = [],
                oldRow, newRow;

            if (this.hasFrozenColumn) {

                rowsCollection.push(el.querySelectorAll('.v-table-leftview .v-table-row'));
            }

            rowsCollection.push(el.querySelectorAll('.v-table-rightview .v-table-row'));

            rowsCollection.forEach(rows => {

                oldRow = rows[oldVal];
                newRow = rows[newVal];

                if (oldRow) {

                    oldRow.style.backgroundColor = this.getHighPriorityBgColor(oldVal);
                }

                if (newRow) {

                    newRow.style.backgroundColor = color;
                }
            })
        },

        // 取消当前选中的行
        clearCurrentRow(){

            this.clickRowIndex = -1;
        }

    },

    watch: {

        'hoverRowIndex': function (newVal, oldVal) {

            this.setRowBgColor(newVal, oldVal, this.rowHoverColor);
        },

        'clickRowIndex': function (newVal, oldVal) {

            this.setRowBgColor(newVal, oldVal, this.rowClickColor);
        }
    }
}