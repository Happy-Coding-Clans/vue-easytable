
// has class
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

// add class
export function addClass(el, cls) {
    if (!el || !cls) return;

    if (el.classList) {
        el.classList.add(cls);

    }else{

        var clsArr =  el.className.split(" ");

        if (clsArr.indexOf(cls) === -1) {
            el.className += " " + cls;
        }
    }
};

// remove class
export function removeClass(el, cls) {
    if (!el || !cls) return;

    if (el.classList) {
        el.classList.remove(cls);
    } else {

        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' '); // For IE9 and earlier
    }
};