/*
 * 列自适应
 * */
import utils from '../../src/utils/utils.js'

export  default {

    data(){
        return {
            resizeColumns: [], // 所有需要自适应的列集合
            initTotalColumnsWidth: 0, // 所有列初始化时的总宽度
            hasContainerWidth: false // 容器是否有宽度（display：none 时没有）
        }
    },

    methods: {
        // 获取所有自适应列的集合
        getResizeColumns(){

            var result = [];

            this.internalColumns.forEach(item => {

                if (item.isResize) {
                    result.push({width: item.width, field: item.field});
                }

            })

            this.resizeColumns = result;
        },

        // 初始化
        initResizeColumns(){

            this.initTotalColumnsWidth = this.totalColumnsWidth;
            this.getResizeColumns();
        },

        // 随着窗口改变表格自适应
        tableResize(){

            if (!this.isHorizontalResize && !this.isVerticalResize) {
                return false;
            }

            var self = this,
                maxWidth = self.maxWidth,
                maxHeight = (self.height && self.height > 0) ? self.height : this.getTotalColumnsHeight(),
                minWidth = self.minWidth,
                minHeight = self.minHeight,
                view = this.$el,
                viewOffset = utils.getViewportOffset(view),
                currentWidth = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().width : (view.clientWidth + 2),
                currentHeight = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().height : (view.clientHeight + 2),
                right = window.document.documentElement.clientWidth - currentWidth - viewOffset.left,
                bottom = window.document.documentElement.clientHeight - currentHeight - viewOffset.top - 2; //


            if (self.isVerticalResize && self.internalHeight && self.internalHeight > 0 && currentHeight > 0) {
                // （窗口高度缩小 && 当前高度大于最小高度） || （窗口高度扩大 && 当前高度小于最大高度）
                bottom -=self.VerticalResizeOffset;
                if ((bottom < 0 && currentHeight > minHeight) || (bottom > 0 && currentHeight < maxHeight)) {
                    var currentHeight = currentHeight + bottom;// - self.VerticalResizeOffset;
                    currentHeight = currentHeight > maxHeight ? maxHeight : currentHeight;
                    currentHeight = currentHeight < minHeight ? minHeight : currentHeight;
                    self.internalHeight = currentHeight;
                }
            }

            if (self.isHorizontalResize && self.internalWidth && self.internalWidth > 0 && currentWidth > 0) {

                var newTableWidth = this.$el.clientWidth;

                // （窗口宽度缩小 && 当前宽度大于最小宽度） ||（窗口宽度扩大 && 当前宽度小于最大宽度）
                if ((right <= 0 && newTableWidth > minWidth) || (right >= 0 && newTableWidth < maxWidth)) {

                    newTableWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
                    newTableWidth = newTableWidth < minWidth ? minWidth : newTableWidth;

                    self.internalWidth = newTableWidth;
                    self.changeColumnsWidth(newTableWidth);
                }
            }
        },

        // 改变所有需要自适应列的宽度
        changeColumnsWidth(currentWidth){

            var differ = currentWidth - 2 - this.totalColumnsWidth,
                initResizeWidths = this.initTotalColumnsWidth,
                rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body');


            if (currentWidth <= initResizeWidths && !this.isTableEmpty) {// 排除表格无数据的影响

                rightViewBody.style.overflowX = 'scroll';

            } else {
                // 防止最后一列右距中时内容显示不全
                if (this.getTotalColumnsHeight() > this.internalHeight) {

                    differ -= (utils.getScrollbarWidth()+1);
                }

                rightViewBody.style.overflowX = 'hidden';
            }

            if (currentWidth >= initResizeWidths || differ > 0) {

                var average = differ / this.resizeColumns.length;

                this.internalColumns.map(item => {

                    if (item.isResize) {
                        item.width += average;
                    }

                    return item;
                })

            }
        }
    },

    mounted(){

        utils.bind(window,'resize',this.tableResize);
    },
    beforeDestroy(){

        utils.unbind(window,'resize',this.tableResize);
    }

}