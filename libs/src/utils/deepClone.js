'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var clone = function () {
    'use strict';

    function _instanceof(obj, type) {
        return type != null && obj instanceof type;
    }

    var nativeMap;
    try {
        nativeMap = Map;
    } catch (_) {
        nativeMap = function nativeMap() {};
    }

    var nativeSet;
    try {
        nativeSet = Set;
    } catch (_) {
        nativeSet = function nativeSet() {};
    }

    var nativePromise;
    try {
        nativePromise = Promise;
    } catch (_) {
        nativePromise = function nativePromise() {};
    }

    function clone(parent, circular, depth, prototype, includeNonEnumerable) {
        if ((typeof circular === 'undefined' ? 'undefined' : _typeof(circular)) === 'object') {
            depth = circular.depth;
            prototype = circular.prototype;
            includeNonEnumerable = circular.includeNonEnumerable;
            circular = circular.circular;
        }

        var allParents = [];
        var allChildren = [];

        var useBuffer = typeof Buffer != 'undefined';

        if (typeof circular == 'undefined') circular = true;

        if (typeof depth == 'undefined') depth = Infinity;

        function _clone(parent, depth) {
            if (parent === null) return null;

            if (depth === 0) return parent;

            var child;
            var proto;
            if ((typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) != 'object') {
                return parent;
            }

            if (_instanceof(parent, nativeMap)) {
                child = new nativeMap();
            } else if (_instanceof(parent, nativeSet)) {
                child = new nativeSet();
            } else if (_instanceof(parent, nativePromise)) {
                child = new nativePromise(function (resolve, reject) {
                    parent.then(function (value) {
                        resolve(_clone(value, depth - 1));
                    }, function (err) {
                        reject(_clone(err, depth - 1));
                    });
                });
            } else if (clone.__isArray(parent)) {
                child = [];
            } else if (clone.__isRegExp(parent)) {
                child = new RegExp(parent.source, __getRegExpFlags(parent));
                if (parent.lastIndex) child.lastIndex = parent.lastIndex;
            } else if (clone.__isDate(parent)) {
                child = new Date(parent.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent)) {
                child = new Buffer(parent.length);
                parent.copy(child);
                return child;
            } else if (_instanceof(parent, Error)) {
                child = Object.create(parent);
            } else {
                if (typeof prototype == 'undefined') {
                    proto = Object.getPrototypeOf(parent);
                    child = Object.create(proto);
                } else {
                    child = Object.create(prototype);
                    proto = prototype;
                }
            }

            if (circular) {
                var index = allParents.indexOf(parent);

                if (index != -1) {
                    return allChildren[index];
                }
                allParents.push(parent);
                allChildren.push(child);
            }

            if (_instanceof(parent, nativeMap)) {
                parent.forEach(function (value, key) {
                    var keyChild = _clone(key, depth - 1);
                    var valueChild = _clone(value, depth - 1);
                    child.set(keyChild, valueChild);
                });
            }
            if (_instanceof(parent, nativeSet)) {
                parent.forEach(function (value) {
                    var entryChild = _clone(value, depth - 1);
                    child.add(entryChild);
                });
            }

            for (var i in parent) {
                var attrs;
                if (proto) {
                    attrs = Object.getOwnPropertyDescriptor(proto, i);
                }

                if (attrs && attrs.set == null) {
                    continue;
                }
                child[i] = _clone(parent[i], depth - 1);
            }

            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(parent);
                for (var i = 0; i < symbols.length; i++) {
                    var symbol = symbols[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
                    if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                        continue;
                    }
                    child[symbol] = _clone(parent[symbol], depth - 1);
                    if (!descriptor.enumerable) {
                        Object.defineProperty(child, symbol, {
                            enumerable: false
                        });
                    }
                }
            }

            if (includeNonEnumerable) {
                var allPropertyNames = Object.getOwnPropertyNames(parent);
                for (var i = 0; i < allPropertyNames.length; i++) {
                    var propertyName = allPropertyNames[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
                    if (descriptor && descriptor.enumerable) {
                        continue;
                    }
                    child[propertyName] = _clone(parent[propertyName], depth - 1);
                    Object.defineProperty(child, propertyName, {
                        enumerable: false
                    });
                }
            }

            return child;
        }

        return _clone(parent, depth);
    }

    clone.clonePrototype = function clonePrototype(parent) {
        if (parent === null) return null;

        var c = function c() {};
        c.prototype = parent;
        return new c();
    };

    function __objToStr(o) {
        return Object.prototype.toString.call(o);
    }
    clone.__objToStr = __objToStr;

    function __isDate(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Date]';
    }
    clone.__isDate = __isDate;

    function __isArray(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Array]';
    }
    clone.__isArray = __isArray;

    function __isRegExp(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object RegExp]';
    }
    clone.__isRegExp = __isRegExp;

    function __getRegExpFlags(re) {
        var flags = '';
        if (re.global) flags += 'g';
        if (re.ignoreCase) flags += 'i';
        if (re.multiline) flags += 'm';
        return flags;
    }
    clone.__getRegExpFlags = __getRegExpFlags;

    return clone;
}();

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    module.exports = clone;
}