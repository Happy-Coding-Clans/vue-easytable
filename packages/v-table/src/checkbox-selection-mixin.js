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
        }
    },

    methods: {

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

                this.selectAll && this.selectAll(this.getCheckedTableRow);

            } else {

                this.checkboxGroupModel = this.disabledChecked;
            }

            this.setCheckAllState();
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

            this.setCheckAllState();
        },

        // 设置全选状态
        setCheckAllState(){

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

        // 修改checkbox 选中状态
        updateCheckboxGroupModel(){

            this.checkboxGroupModel = [];

            this.internalTableData.filter((item, index) => {

                if (item._checked) {

                    this.checkboxGroupModel.push(index);
                }
            })

            this.setCheckAllState();
        }
    }
}