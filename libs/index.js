"use strict";

var _index = require("./v-table/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./v-pagination/index");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("./v-checkbox/index");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("./v-checkbox-group/index");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    Vue.component(_index2.default.name, _index2.default);
    Vue.component(_index4.default.name, _index4.default);
    Vue.component(_index6.default.name, _index6.default);
    Vue.component(_index8.default.name, _index8.default);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    VPagination: _index4.default,
    VTable: _index2.default,
    VCheckbox: _index6.default,
    VCheckboxGroup: _index8.default
};