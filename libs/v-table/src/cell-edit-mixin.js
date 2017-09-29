'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

            methods: {
                        cellEdit: function cellEdit(e, callback) {

                                    var target = e.target,
                                        oldVal = void 0,
                                        editInput = void 0,
                                        editInputLen = void 0,
                                        _actionFun = void 0,
                                        textAlign = void 0;

                                    while (target.className && target.className.indexOf('v-table-body-cell') === -1 || !target.className) {
                                                target = target.parentNode;
                                    }

                                    if (target.classList.contains('cell-editing')) {
                                                return false;
                                    }

                                    target.classList.add('cell-editing');

                                    oldVal = target.innerText;

                                    if (target.style.textAlign) {

                                                textAlign = target.style.textAlign;
                                    }

                                    target.innerHTML = '<input type=\'text\' value="' + oldVal + '" class=\'cell-edit-input\' style=\'width:100%;height: 100%;text-align: ' + textAlign + ';\'>';

                                    editInput = target.querySelector('.cell-edit-input');
                                    editInput.focus();

                                    editInputLen = editInput.value.length;
                                    if (document.selection) {
                                                var ctr = editInput.createTextRange();
                                                ctr.moveStart('character', editInputLen);
                                                ctr.collapse();
                                                ctr.select();
                                    } else if (typeof editInput.selectionStart == 'number' && typeof editInput.selectionEnd == 'number') {
                                                editInput.selectionStart = editInput.selectionEnd = editInputLen;
                                    }

                                    _actionFun = function actionFun(e) {

                                                if (typeof e.keyCode === 'undefined' || e.keyCode == 13) {

                                                            if (target.classList.contains('cell-editing')) {
                                                                        target.classList.remove('cell-editing');
                                                            } else {
                                                                        return false;
                                                            }

                                                            target.innerText = this.value;

                                                            callback(this.value, oldVal);

                                                            _utils2.default.unbind(editInput, 'blur', _actionFun);
                                                            _utils2.default.unbind(editInput, 'keydown', _actionFun);
                                                }
                                    };

                                    _utils2.default.bind(editInput, 'blur', _actionFun);
                                    _utils2.default.bind(editInput, 'keydown', _actionFun);
                        },
                        cellEditClick: function cellEditClick(e, isEdit, rowData, field, rowIndex) {

                                    if (isEdit) {

                                                var self = this;

                                                var onCellEditCallBack = function onCellEditCallBack(newValue, oldVal) {

                                                            self.cellEditDone(newValue, oldVal, rowData, field, rowIndex);
                                                };

                                                this.cellEdit(e, onCellEditCallBack);
                                    }
                        }
            }
};