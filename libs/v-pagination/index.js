'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pagination = require('./src/pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pagination2.default.install = function (Vue) {
    Vue.component(_pagination2.default.name, _pagination2.default);
};

exports.default = _pagination2.default;