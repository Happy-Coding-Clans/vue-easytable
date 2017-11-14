import settings from '../settings/settings'

export default {
    // 获取当前元素的left、top偏移
    getViewportOffset(element) {

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
        }
    },

    /*
     * 事件绑定
     *
     * @method bind
     * @param  {dom||window}   elem        需要绑定的dom节点或window对象
     * @param  {String}        event       绑定的事件名称
     * @param  {Function}      handler     事件处理方法
     */
    bind(elem, event, handler){
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? (document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll") : event;

            if (document.attachEvent) { //if IE (and Opera depending on user setting)

                elem.attachEvent("on" + event, handler);
            }
            else { //WC3 browsers

                elem.addEventListener(event, handler, false);
            }
        }
    },

    /*
     * 移除事件绑定
     *
     * @method unbind
     * @param  {dom||window}   elem         需要移除绑定的dom节点或window对象
     * @param  {String}        event        绑定的事件名称
     * @param  {Function||Array<Function>}  handler    事件处理方法，可以为数组
     */
    unbind(elem, event, handler){
        if (elem && elem !== 'undefined' && event && handler) {

            event = event === 'mousewheel' ? (document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll") : event;

            var handlers = [];
            if (Array.isArray(handler) && handler.length > 0) {
                handlers = handler;
            } else {
                handlers.push(handler);
            }

            if (document.removeEventListener) {

                handlers.forEach(e => {
                    elem.removeEventListener(event, e, false);
                })
            }
            else {

                handlers.forEach(e => {
                    elem.removeEventListener('on' + event, e);
                })
            }
        }
    },

    // 判断当前是否包含html元素
    isHtml(val){
        return /<[a-z][\s\S]*>/i.test(val);
    },

    // 获取当前dislpay值
    getDisplayValue(ele){

        if (ele) {
            return ele.currentStyle ? ele.currentStyle.display : getComputedStyle(ele, null).display;
        }

    },

    // 是否包含横向滚动条
    hasHorizontalScrollBar(ele){

        if (ele){

            return ele.scrollWidth > ele.clientWidth;
        }
    },

    // 是否包含纵向滚动条
    hasVerticalScrollBar(ele){

        if (ele){

            return ele.scrollHeight > ele.clientHeight;
        }
    },

    // 获取滚动条的宽度
    getScrollbarWidth(){

        const outer = document.createElement('div');
        outer.className = settings.scrollbarClass;
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        document.body.appendChild(outer);

        const widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';

        const inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);

        const widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;

    },

    // 获取父组件信息
    getParentCompByName(context,name){

        let parent = context.$parent;

        while (parent) {
            if (parent.$options.name !== name) {
                parent = parent.$parent;
            }else{
                return parent;
            }
        }

        return null;
    },

    // 获取多个符合条件的子组件信息
    getChildCompsByName(context,name){

        let result = [];

        let childrens = context.$children;

        while (childrens && childrens.length > 1) {

            childrens.forEach(child=>{

                childrens = child.$children ? child.$children : null;

                if (child.$options.name === name){

                    result.push(child);
                }

            })
        }

        return result;
    }

}