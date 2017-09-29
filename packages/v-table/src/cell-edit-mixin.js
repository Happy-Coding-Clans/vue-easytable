import utils from '../../src/utils/utils.js'
export default {

    methods: {
        // cell edit
        cellEdit(e,callback,rowIndex,rowData,field){

            let target = e.target,
                self = this,
                oldVal,
                editInput,
                editInputLen,
                actionFun,
                textAlign,
                formatterVal = '';

            while ((target.className && target.className.indexOf('v-table-body-cell') === -1) || !target.className) {
                target = target.parentNode;
            }

            if (target.classList.contains('cell-editing')) {
                return false
            }

            target.classList.add('cell-editing');

            oldVal = target.innerText;

            if (target.style.textAlign){

                textAlign = target.style.textAlign;
            }

            target.innerHTML = `<input type='text' value="${oldVal}" class='cell-edit-input' style='width:100%;height: 100%;text-align: ${textAlign};'>`;

            editInput = target.querySelector('.cell-edit-input');
            editInput.focus();


            editInputLen = editInput.value.length;
            if (document.selection) {
                let ctr = editInput.createTextRange();
                ctr.moveStart('character', editInputLen);
                ctr.collapse();
                ctr.select();
            } else if (typeof editInput.selectionStart == 'number' && typeof editInput.selectionEnd == 'number') {
                editInput.selectionStart = editInput.selectionEnd = editInputLen;
            }


            actionFun = function (e) {

                if (typeof e.keyCode === 'undefined' || e.keyCode == 13){


                    if (target.classList.contains('cell-editing')) {
                        target.classList.remove('cell-editing');

                    }else{
                        return false;
                    }

                    formatterVal = self.cellEditFormatter && self.cellEditFormatter(this.value,oldVal,rowIndex,rowData,field);

                    target.innerHTML = formatterVal && formatterVal.length > 0 ? formatterVal :this.value;

                    callback(this.value,oldVal)

                    utils.unbind(editInput, 'blur', actionFun);
                    utils.unbind(editInput, 'keydown',actionFun);
                }
            };


            utils.bind(editInput, 'blur', actionFun);
            utils.bind(editInput, 'keydown',actionFun);
        },

        // 单元格点击
        cellEditClick(e,isEdit,rowData,field,rowIndex){

            if (isEdit){

                let self = this;
                // 单元格内容变化后的回调
                let onCellEditCallBack = function (newValue,oldVal) {

                    self.cellEditDone(newValue,oldVal,rowIndex,rowData,field);
                }

                this.cellEdit(e,onCellEditCallBack,rowIndex,rowData,field)
            }
        },
    }
}