import { createI18N } from "../locale/index";

/*
 * @createLocale
 * @desc create namespace by comp name
 * @param {string} compName
 * @return {function}
 */
export function createLocale(compName) {
    return createI18N(compName);
}

/*
 * @isEmptyArray
 * @desc  is empty array
 * @param {array} arr
 */
export function isEmptyArray(arr) {
    return !(Array.isArray(arr) && arr.length > 0);
}

/*
 * @isEmptyValue
 * @desc  is empty value
 * @param {array} arr
 */
export function isEmptyValue(value) {
    return !(value !== "" && value !== undefined && value !== null);
}

/*
 * @isDefined
 * @desc is defined
 * @param {any} val
 */
export function isDefined(val) {
    return val !== undefined && val !== null;
}

/*
 * @isObject
 * @desc is object
 * @param {any} val
 */
export function isObject(val) {
    return val !== null && typeof val === "object";
}

/*
 * @isFunction
 * @desc is function
 * @param {any} val
 */
export function isFunction(val) {
    return typeof val === "function";
}

/*
 * @isBoolean
 * @desc is boolean
 * @param {any} val
 */
export function isBoolean(val) {
    return typeof val === "boolean";
}

/*
 * @isNumber
 * @desc is number
 * @param {any} val
 */
export function isNumber(val) {
    return typeof val === "number";
}

/*
 * @isTrue
 * @desc is equal true
 * @param {any} val
 */
export function isTrue(val) {
    return isBoolean(val) && val;
}

/*
 * @isFalse
 * @desc is equal false
 * @param {any} val
 */
export function isFalse(val) {
    return isBoolean(val) && !val;
}

/*
 * @getValByUnit
 * @desc  get value by unit
 * @param {number|string} width - 宽度
 */
export function getValByUnit(width) {
    return typeof width === "number" ? width + "px" : width;
}

/*
 * @getParentCompByName
 * @desc  get parent comp by name
 * @param {object} context
 * @param {string} name - parent comp name
 */
export function getParentCompByName(context, name) {
    let parent = context.$parent;

    while (parent) {
        if (parent.$options.name !== name) {
            parent = parent.$parent;
        } else {
            return parent;
        }
    }

    return null;
}

/*
 * @getChildCompsByName
 * @desc  get child comps by name
 * @param {object} context
 * @param {string} name - child comp name
 */
export function getChildCompsByName(context, name) {
    let result = [];

    let childrens = context.$children;

    while (childrens && childrens.length > 0) {
        childrens.forEach((child) => {
            childrens = child.$children ? child.$children : null;

            if (child.$options.name === name) {
                result.push(child);
            }
        });
    }

    return result;
}

/*
 * @scrollTo
 * @desc element scrollTo https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo
 * @param {element} el - element
 * @param {object} option - scroll option
 */
export function scrollTo(el, option) {
    if (isFunction(el.scrollTo)) {
        el.scrollTo(option);
    } else {
        const { top, left } = option;
        el.scrollTop = top;
        el.scrollLeft = left;
    }
}
