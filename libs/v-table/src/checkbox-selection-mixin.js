'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});
exports.default = {
            data: function data() {
                        return {
                                    isAllChecked: false,

                                    checkboxGroupModel: [],

                                    indeterminate: false

                        };
            },


            computed: {
                        disabledUnChecked: function disabledUnChecked() {

                                    var result = [];

                                    this.internalTableData.filter(function (item, index) {

                                                if (item._disabled && !item._checked) {
                                                            result.push(index);
                                                }
                                    });
                                    return result;
                        },
                        getCheckedTableRow: function getCheckedTableRow() {
                                    var _this = this;

                                    return this.internalTableData.filter(function (item, index) {

                                                return _this.checkboxGroupModel.indexOf(index) > -1;
                                    });
                        },
                        hasSelectionColumns: function hasSelectionColumns() {

                                    return this.internalColumns.some(function (x) {

                                                return x.type && x.type === 'selection';
                                    });
                        }
            },

            methods: {
                        disabledChecked: function disabledChecked() {

                                    var result = [];

                                    this.internalTableData.filter(function (item, index) {

                                                if (item._disabled && item._checked) {
                                                            result.push(index);
                                                }
                                    });
                                    return result;
                        },
                        handleCheckAll: function handleCheckAll() {

                                    if (this.isAllChecked) {

                                                this.checkboxGroupModel = [];

                                                var allLen = this.internalTableData.length;

                                                if (allLen > 0) {

                                                            for (var i = 0; i < allLen; i++) {

                                                                        if (this.disabledUnChecked.indexOf(i) === -1) {

                                                                                    this.checkboxGroupModel.push(i);
                                                                        }
                                                            }
                                                }

                                                this.selectAll && this.selectAll(this.getCheckedTableRow);
                                    } else {

                                                this.checkboxGroupModel = this.disabledChecked();
                                    }

                                    this.setIndeterminateState();
                        },
                        handleCheckChange: function handleCheckChange(rowData) {
                                    var _this2 = this;

                                    this.$nextTick(function (x) {
                                                _this2.selectChange && _this2.selectChange(_this2.getCheckedTableRow, rowData);
                                    });
                        },
                        handleCheckGroupChange: function handleCheckGroupChange() {

                                    this.selectGroupChange && this.selectGroupChange(this.getCheckedTableRow);

                                    this.setCheckState();
                        },
                        setIndeterminateState: function setIndeterminateState() {

                                    var checkedLen = this.checkboxGroupModel.length,
                                        allLen = this.internalTableData.length;

                                    if (checkedLen > 0 && checkedLen === allLen) {

                                                this.indeterminate = false;
                                    } else if (checkedLen > 0 && checkedLen < allLen) {

                                                this.indeterminate = true;
                                    } else {

                                                this.indeterminate = false;
                                    }
                        },
                        setCheckState: function setCheckState() {

                                    var checkedLen = this.checkboxGroupModel.length,
                                        allLen = this.internalTableData.length;

                                    if (checkedLen > 0 && checkedLen === allLen) {

                                                this.indeterminate = false;

                                                this.isAllChecked = true;
                                    } else if (checkedLen > 0 && checkedLen < allLen) {

                                                this.isAllChecked = false;

                                                this.indeterminate = true;
                                    } else {

                                                this.indeterminate = false;

                                                this.isAllChecked = false;
                                    }
                        },
                        updateCheckboxGroupModel: function updateCheckboxGroupModel() {
                                    var _this3 = this;

                                    if (!this.hasSelectionColumns) {
                                                return false;
                                    }

                                    this.checkboxGroupModel = [];

                                    this.internalTableData.filter(function (item, index) {

                                                if (item._checked) {

                                                            _this3.checkboxGroupModel.push(index);
                                                }
                                    });

                                    this.setCheckState();
                        }
            }
};