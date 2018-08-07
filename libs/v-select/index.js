'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _select = require('./src/select.vue');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_select2.default.install = function (Vue) {
    Vue.component(_select2.default.name, _select2.default);
};

exports.default = _select2.default;