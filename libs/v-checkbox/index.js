'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkbox = require('./src/checkbox.vue');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkbox2.default.install = function (Vue) {
    Vue.component(_checkbox2.default.name, _checkbox2.default);
};

exports.default = _checkbox2.default;