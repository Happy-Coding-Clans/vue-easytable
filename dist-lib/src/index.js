"use strict";

var _vTable = require("../packages/v-table");

var _vTable2 = _interopRequireDefault(_vTable);

var _vPagination = require("../packages/v-pagination");

var _vPagination2 = _interopRequireDefault(_vPagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    Vue.component(_vTable2.default.name, _vTable2.default);
    Vue.component(_vPagination2.default.name, _vPagination2.default);
};

module.exports = {
    VPagination: _vPagination2.default,
    VTable: _vTable2.default
};