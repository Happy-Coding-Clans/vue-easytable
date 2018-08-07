import utils from '../../src/utils/utils.js'
import {hasClass, addClass, removeClass} from '../../src/utils/dom.js'

export default {

    methods: {
        // cell edit
        cellEdit(e, callback, rowIndex, rowData, field){

            let target = e.target,
                self = this,
                oldVal,
                editInput,
                editInputLen,
                actionFun,
                textAlign,
                childTarget;

            while ((target.className && target.className.indexOf('v-table-body-cell') === -1) || !target.className) {
                target = target.parentNode;
            }

            // 子节点（span节点）
            childTarget = target.children[0];

            // 把子节点影藏掉
            childTarget.style.display = 'none';

            if (hasClass(target, 'cell-editing')) {
                return false
            }

            addClass(target, 'cell-editing');

            oldVal = childTarget.innerText.trim();

            if (target.style.textAlign) {

                textAlign = target.style.textAlign;
            }

            editInput = document.createElement('input');
            editInput.value = oldVal;
            editInput.className = 'cell-edit-input';
            editInput.style.textAlign = textAlign;
            editInput.style.width = '100%';
            editInput.style.height = '100%';
            //editInput.style = `width:100%;height: 100%;text-align: ${textAlign};`;

            target.appendChild(editInput);

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

                if (typeof e.keyCode === 'undefined' || e.keyCode === 0 || e.keyCode == 13) {

                    if (hasClass(target, 'cell-editing')) {

                        removeClass(target, 'cell-editing');
                    } else {
                        return false;
                    }

                    childTarget.style.display = '';

                    // fixed this.value bug in IE9
                    callback(editInput.value, oldVal);

                    utils.unbind(editInput, 'blur', actionFun);
                    utils.unbind(editInput, 'keydown', actionFun);

                    target.removeChild(editInput);
                }
            };


            utils.bind(editInput, 'blur', actionFun);
            utils.bind(editInput, 'keydown', actionFun);
        },

        // 单元格点击
        cellEditClick(e, isEdit, rowData, field, rowIndex){
            if (isEdit) {

                let self = this;
                // 单元格内容变化后的回调
                let onCellEditCallBack = function (newValue, oldVal) {

                    self.cellEditDone && self.cellEditDone(newValue, oldVal, rowIndex, rowData, field);
                }

                this.cellEdit(e, onCellEditCallBack, rowIndex, rowData, field)
            }
        },
    }
}