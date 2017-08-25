import utils from '../utils/utils'

var __autoAdjustment__events__ = [];

export default {
    methods: {

        /*
         * 自动调整浮层（不绑定事件）
         *
         * @method layerAdjustmentBind
         * @param  {Dom}        layerElement        浮层元素
         * @param  {Dom}        targetElement       控制元素
         * @param  {Number}     distance            浮层元素和控制元素的上下间距
         */
        layerAdjustmentOnce(layerElement, targetElement, distance){

            var viewportOffset = utils.getViewportOffset(targetElement),
                layerElemHeight = typeof layerElement.getBoundingClientRect !== "undefined" ? layerElement.getBoundingClientRect().height : layerElement.clientHeight;

            if (viewportOffset.bottom < layerElemHeight) {

                layerElement.style.top = (viewportOffset.top - layerElemHeight - distance) + 'px';
            } else {

                layerElement.style.top = (viewportOffset.top + targetElement.clientHeight + distance) + 'px';
            }

            layerElement.style.left = viewportOffset.left + 'px';
        },

        /*
         * 滚动时自动调整浮层
         *
         * @method layerAdjustmentBind
         * @param  {Dom}        layerElement        浮层元素
         * @param  {Dom}        targetElement       控制元素
         * @param  {Number}     distance            浮层元素和控制元素的上下间距
         */
        layerAdjustmentBind(layerElement, targetElement, distance) {

            var handler = (e) => {

                this.layerAdjustmentOnce(layerElement, targetElement, distance);
            }

            __autoAdjustment__events__.push(handler);
            utils.bind(window,'scroll',handler);

        }
    },
    beforeDestroy(){

        utils.unbind(window, 'scroll', __autoAdjustment__events__);

    }
}