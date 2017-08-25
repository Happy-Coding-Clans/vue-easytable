'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __autoAdjustment__events__ = [];

exports.default = {
            methods: {
                        layerAdjustmentOnce: function layerAdjustmentOnce(layerElement, targetElement, distance) {

                                    var viewportOffset = _utils2.default.getViewportOffset(targetElement),
                                        layerElemHeight = typeof layerElement.getBoundingClientRect !== "undefined" ? layerElement.getBoundingClientRect().height : layerElement.clientHeight;

                                    if (viewportOffset.bottom < layerElemHeight) {

                                                layerElement.style.top = viewportOffset.top - layerElemHeight - distance + 'px';
                                    } else {

                                                layerElement.style.top = viewportOffset.top + targetElement.clientHeight + distance + 'px';
                                    }

                                    layerElement.style.left = viewportOffset.left + 'px';
                        },
                        layerAdjustmentBind: function layerAdjustmentBind(layerElement, targetElement, distance) {
                                    var _this = this;

                                    var handler = function handler(e) {

                                                _this.layerAdjustmentOnce(layerElement, targetElement, distance);
                                    };

                                    __autoAdjustment__events__.push(handler);
                                    _utils2.default.bind(window, 'scroll', handler);
                        }
            },
            beforeDestroy: function beforeDestroy() {

                        _utils2.default.unbind(window, 'scroll', __autoAdjustment__events__);
            }
};