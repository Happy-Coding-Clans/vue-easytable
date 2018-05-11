'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _draggableTable = require('./src/draggable-table.vue');

var _draggableTable2 = _interopRequireDefault(_draggableTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_draggableTable2.default.install = function (Vue) {
    Vue.component(_draggableTable2.default.name, _draggableTable2.default);
};

exports.default = _draggableTable2.default;