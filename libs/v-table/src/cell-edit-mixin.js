'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _dom = require('../../src/utils/dom.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

            methods: {
                        cellEdit: function cellEdit(e, callback, rowIndex, rowData, field) {

                                    var target = e.target,
                                        self = this,
                                        oldVal = void 0,
                                        editInput = void 0,
                                        editInputLen = void 0,
                                        _actionFun = void 0,
                                        textAlign = void 0,
                                        formatterVal = '';

                                    while (target.className && target.className.indexOf('v-table-body-cell') === -1 || !target.className) {
                                                target = target.parentNode;
                                    }

                                    if ((0, _dom.hasClass)(target, 'cell-editing')) {
                                                return false;
                                    }

                                    (0, _dom.addClass)(target, 'cell-editing');

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

                                                if (typeof e.keyCode === 'undefined' || e.keyCode === 0 || e.keyCode == 13) {

                                                            if ((0, _dom.hasClass)(target, 'cell-editing')) {

                                                                        (0, _dom.removeClass)(target, 'cell-editing');
                                                            } else {
                                                                        return false;
                                                            }

                                                            formatterVal = self.cellEditFormatter && self.cellEditFormatter(editInput.value, oldVal, rowIndex, rowData, field);

                                                            target.innerHTML = formatterVal && formatterVal.length > 0 ? formatterVal : editInput.value;

                                                            callback(editInput.value, oldVal);

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

                                                            self.cellEditDone(newValue, oldVal, rowIndex, rowData, field);
                                                };

                                                this.cellEdit(e, onCellEditCallBack, rowIndex, rowData, field);
                                    }
                        }
            }
};