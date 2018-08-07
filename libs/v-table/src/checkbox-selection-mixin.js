export default {

    data(){
        return {
            // 是否全部选中
            isAllChecked: false,

            checkboxGroupModel: [],

            indeterminate: false

        }

    },

    computed: {

        // 禁用未选中的复选框集合
        disabledUnChecked(){

            let result = [];

            this.internalTableData.filter((item, index) => {

                if (item._disabled && !item._checked) {
                    result.push(index);
                }
            })
            return result;
        },

        // 获取当前选中的行信息
        getCheckedTableRow(){

            return this.internalTableData.filter((item, index) => {

                return this.checkboxGroupModel.indexOf(index) > -1;
            })
        },

        // 检测是否有
        hasSelectionColumns(){

            return this.internalColumns.some(x=>{

                return x.type && x.type === 'selection';
            })
        }
    },

    methods: {
        // 检测复杂表头是否需要设置 checkbox
        isSelectionCol(fileds){

            if (Array.isArray(fileds) && fileds.length === 1){

                return this.internalColumns.some(x => x.field === fileds[0] && x.type === 'selection')
            }

            return false;
        },

        // 禁用已选中的复选框集合
        disabledChecked(){

            let result = [];

            this.internalTableData.filter((item, index) => {

                if (item._disabled && item._checked) {
                    result.push(index);
                }
            })
            return result;
        },

        // check all trigger event
        handleCheckAll(){

            if (this.isAllChecked) {

                this.checkboxGroupModel = [];

                let allLen = this.internalTableData.length;

                if (allLen > 0) {

                    for (let i = 0; i < allLen; i++) {

                        if (this.disabledUnChecked.indexOf(i) === -1) {

                            this.checkboxGroupModel.push(i);
                        }
                    }
                }

            } else {

                this.checkboxGroupModel = this.disabledChecked();
            }

            this.selectAll && this.selectAll(this.getCheckedTableRow);

            this.setIndeterminateState();
        },

        // checkbox change event
        handleCheckChange(rowData){

            this.$nextTick(x => {
                this.selectChange && this.selectChange(this.getCheckedTableRow, rowData);
            })
        },

        // checkbox-group change event
        handleCheckGroupChange(){

            this.selectGroupChange && this.selectGroupChange(this.getCheckedTableRow);

            this.setCheckState();
        },

        // 设置部分选中状态（全选或者取消全选时）
        setIndeterminateState(){

            let checkedLen = this.checkboxGroupModel.length,
                allLen = this.internalTableData.length;

            // 全选
            if (checkedLen > 0 && checkedLen === allLen) {

                this.indeterminate = false;

            } else if (checkedLen > 0 && checkedLen < allLen) { // 部分选中

                this.indeterminate = true;

            } else { // 全不选

                this.indeterminate = false;
            }
        },

        // 设置选中状态
        setCheckState(){

            let checkedLen = this.checkboxGroupModel.length,
                allLen = this.internalTableData.length;

            // 全选
            if (checkedLen > 0 && checkedLen === allLen) {

                this.indeterminate = false;

                this.isAllChecked = true;

            } else if (checkedLen > 0 && checkedLen < allLen) { // 部分选中

                this.isAllChecked = false;

                this.indeterminate = true;

            } else { // 全不选

                this.indeterminate = false;

                this.isAllChecked = false;
            }
        },

        // 修改checkbox 选中状态(table.vue 中调用)
        updateCheckboxGroupModel(){

            if (!this.hasSelectionColumns){return false;}

            this.checkboxGroupModel = [];

            this.internalTableData.filter((item, index) => {

                if (item._checked) {

                    this.checkboxGroupModel.push(index);
                }
            })

            this.setCheckState();
        }
    }
}