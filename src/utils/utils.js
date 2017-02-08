export default {
    // 获取当前元素的left、top偏移
    getViewportOffset(element) {

        var doc = document.documentElement,
            box = typeof element.getBoundingClientRect !== "undefined" ? element.getBoundingClientRect() : 0,
            scrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
            offsetLeft = box.left + window.pageXOffset,
            offsetTop = box.top + window.pageYOffset;

        return {
            left: offsetLeft - scrollLeft,
            top: offsetTop - scrollTop
        }
    },

    //
    bind(elem, event, handler){
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? (document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll") : event

            if (document.attachEvent) { //if IE (and Opera depending on user setting)

                elem.attachEvent("on" + event, handler)
            }
            else { //WC3 browsers

                elem.addEventListener(event, handler, false)
            }
        }
    },

    unbind(elem, event, handler){
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? (document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll") : event

            if (document.removeEventListener) {

                elem.removeEventListener(event, handler, false)
            }
            else{

                elem.detachEvent('on' + event, handler)
            }
        }
    },

    isHtml(val){
        return /<[a-z][\s\S]*>/i.test(val);
    }
}