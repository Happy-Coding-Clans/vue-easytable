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

    // 添加鼠标滚动事件
    addWheelListener(elem,callback){
        if (!elem || elem === 'undefined'){return false;}

        var supportEvent;

        // detect available wheel event
        supportEvent = document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

        if (document.attachEvent){ //if IE (and Opera depending on user setting)

            elem.attachEvent("on"+supportEvent,callback)
        }
        else if (document.addEventListener){ //WC3 browsers

            elem.addEventListener(supportEvent, callback, false)
        }
    },

    // 添加滚动事件
    addScrollListener(elem,callback){
        if (!elem || elem === 'undefined'){return false;}

        if (document.attachEvent){ //if IE (and Opera depending on user setting)

            elem.attachEvent("onscroll",callback)
        }
        else if (document.addEventListener){ //WC3 browsers

            elem.addEventListener("scroll", callback, false)
        }
    },

    isHtml(val){
        return /<[a-z][\s\S]*>/i.test(val);
    }
}