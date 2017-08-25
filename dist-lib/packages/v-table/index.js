'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _table = require('./src/table.vue');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_table2.default.install = function (Vue) {
    Vue.component(_table2.default.name, _table2.default);
};

exports.default = _table2.default;