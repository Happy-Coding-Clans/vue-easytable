"use strict";

var _index = require("./v-table/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./v-pagination/index");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    Vue.component(_index2.default.name, _index2.default);
    Vue.component(_index4.default.name, _index4.default);
};

module.exports = {
    VPagination: _index4.default,
    VTable: _index2.default
};