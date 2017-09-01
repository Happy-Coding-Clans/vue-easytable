'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _utils = require('../../src/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
            data: function data() {
                        return {

                                    isTableEmpty: false,

                                    tableEmptyHeight: 0
                        };
            },


            methods: {
                        tableEmpty: function tableEmpty() {
                                    var _this = this;

                                    var tableData = this.internalTableData,
                                        tableEmptyHeight = 0;

                                    if (Array.isArray(tableData) && tableData.length > 0) {

                                                this.isTableEmpty = false;
                                                return false;
                                    }

                                    this.isTableEmpty = true;

                                    tableEmptyHeight = this.getTotalColumnsHeight() + this.errorContentHeight;

                                    this.tableEmptyHeight = tableEmptyHeight;

                                    this.$nextTick(function (x) {

                                                _this.tableEmptyScroll();
                                    });
                        },
                        tableEmptyScrollEvent: function tableEmptyScrollEvent(e) {

                                    var headerEle = this.$el.querySelector('.v-table-rightview .v-table-header'),
                                        tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');

                                    if (tableEmptyEle) {

                                                headerEle.scrollLeft = tableEmptyEle.scrollLeft;
                                    }
                        },
                        tableEmptyScroll: function tableEmptyScroll() {

                                    var tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');

                                    _utils2.default.bind(tableEmptyEle, 'scroll', this.tableEmptyScrollEvent);
                        }
            },

            beforeDestroy: function beforeDestroy() {

                        var tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');

                        _utils2.default.unbind(tableEmptyEle, 'scroll', this.tableEmptyScrollEvent);
            }
};