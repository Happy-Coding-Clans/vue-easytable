'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = require('../settings/settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getViewportOffset: function getViewportOffset(element) {

        var doc = document.documentElement,
            box = typeof element.getBoundingClientRect !== "undefined" ? element.getBoundingClientRect() : 0,
            scrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
            offsetLeft = box.left + window.pageXOffset,
            offsetTop = box.top + window.pageYOffset;

        var left = offsetLeft - scrollLeft,
            top = offsetTop - scrollTop;

        return {
            left: left,
            top: top,
            right: window.document.documentElement.clientWidth - box.width - left,
            bottom: window.document.documentElement.clientHeight - box.height - top
        };
    },
    bind: function bind(elem, event, handler) {
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll" : event;

            if (document.attachEvent) {

                elem.attachEvent("on" + event, handler);
            } else {

                elem.addEventListener(event, handler, false);
            }
        }
    },
    unbind: function unbind(elem, event, handler) {
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll" : event;

            var handlers = [];
            if (Array.isArray(handler) && handler.length > 0) {
                handlers = handler;
            } else {
                handlers.push(handler);
            }

            if (document.removeEventListener) {

                handlers.forEach(function (e) {
                    elem.removeEventListener(event, e, false);
                });
            } else {

                handlers.forEach(function (e) {
                    elem.removeEventListener('on' + event, e);
                });
            }
        }
    },
    isHtml: function isHtml(val) {
        return (/<[a-z][\s\S]*>/i.test(val)
        );
    },
    getDisplayValue: function getDisplayValue(ele) {

        if (ele) {
            return ele.currentStyle ? ele.currentStyle.display : getComputedStyle(ele, null).display;
        }
    },
    hasHorizontalScrollBar: function hasHorizontalScrollBar(ele) {

        if (ele) {

            return ele.scrollWidth > ele.clientWidth;
        }
    },
    hasVerticalScrollBar: function hasVerticalScrollBar(ele) {

        if (ele) {

            return ele.scrollHeight > ele.clientHeight;
        }
    },
    getScrollbarWidth: function getScrollbarWidth() {

        var outer = document.createElement('div');
        outer.className = _settings2.default.scrollbarClass;
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';

        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    },
    getParentCompByName: function getParentCompByName(context, name) {

        var parent = context.$parent;

        while (parent) {
            if (parent.$options.name !== name) {
                parent = parent.$parent;
            } else {
                return parent;
            }
        }

        return null;
    },
    getChildCompsByName: function getChildCompsByName(context, name) {

        var result = [];

        var childrens = context.$children;

        while (childrens && childrens.length > 1) {

            childrens.forEach(function (child) {

                childrens = child.$children ? child.$children : null;

                if (child.$options.name === name) {

                    result.push(child);
                }
            });
        }

        return result;
    }
};