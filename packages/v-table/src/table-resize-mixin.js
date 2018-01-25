/*
 * 列自适应
 * */
import utils from '../../src/utils/utils.js'

export  default {

    data(){
        return {
            resizeColumns: [], // 所有需要自适应的列集合
            initTotalColumnsWidth: 0, // 所有列初始化时的总宽度
            hasContainerWidth: false, // 容器是否有宽度（display：none 时没有）
            containerWidthCheckTimer: null
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

        // 如果初始化时document上包含滚动条，渲染完document滚动条消失会造成表格宽度计算有误的问题
        containerWidthCheck(){

            this.containerWidthCheckTimer = setTimeout(x => {

                    let tableContainerWidth = this.$el.clientWidth;

            // 3为容错值
            if (tableContainerWidth - this.internalWidth > 3) {

                this.tableResize();
            }
        })
        },

        // 目前适用于有横向自适应功能的表格
        adjustHeight(hasScrollBar){

            if (!this.$el || this.isVerticalResize) {
                return false;
            }

            var totalColumnsHeight = this.getTotalColumnsHeight(),
                scrollbarWidth = this.scrollbarWidth;

            // 有footer 功能
            if (this.hasTableFooter) {

                if (hasScrollBar) {

                    if (this.footerTotalHeight === this.getFooterTotalRowHeight) {

                        this.footerTotalHeight += scrollbarWidth;

                        if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {
                            this.internalHeight += scrollbarWidth;
                        }
                    }
                } else if (!hasScrollBar) {

                    if (this.footerTotalHeight > this.getFooterTotalRowHeight) {

                        this.footerTotalHeight -= scrollbarWidth;

                        if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                            this.internalHeight -= scrollbarWidth;
                        }
                    }
                }
            }
            // 当没有设置高度时计算总高度 || 设置的高度大于所有列高度之和时
            else if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                if (hasScrollBar && this.internalHeight + 2 < totalColumnsHeight + scrollbarWidth) {

                    this.internalHeight += scrollbarWidth;

                } else if (!hasScrollBar) {

                    this.internalHeight = this.getTotalColumnsHeight();
                }
            }
        },

        // 随着窗口改变表格自适应
        tableResize(){

            if (!this.isHorizontalResize && !this.isVerticalResize) {
                return false;
            }

            var totalColumnsHeight = this.getTotalColumnsHeight(),
                maxWidth = this.maxWidth,
                maxHeight = (this.height && this.height > 0) ? this.height : totalColumnsHeight,
                minWidth = this.minWidth,
                minHeight = this.minHeight > totalColumnsHeight ? totalColumnsHeight : this.minHeight,
                view = this.$el,
                viewOffset = utils.getViewportOffset(view),
                currentWidth = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().width : view.clientWidth,
                currentHeight = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().height : view.clientHeight,
                //right = window.document.documentElement.clientWidth - currentWidth - viewOffset.left,
                bottom = window.document.documentElement.clientHeight - currentHeight - viewOffset.top - 2,
                bottom2 = viewOffset.bottom2,
                scrollbarWidth = this.scrollbarWidth;


            if (this.isHorizontalResize && this.internalWidth && this.internalWidth > 0 && currentWidth > 0) {

                currentWidth = currentWidth > maxWidth ? maxWidth : currentWidth;
                currentWidth = currentWidth < minWidth ? minWidth : currentWidth;

                this.internalWidth = currentWidth;
            }

            if (this.isVerticalResize && currentHeight > 0) {

                bottom -= this.verticalResizeOffset;

                currentHeight = currentHeight + bottom;// - this.VerticalResizeOffset;
                currentHeight = currentHeight > maxHeight ? maxHeight : currentHeight;
                currentHeight = currentHeight < minHeight ? minHeight : currentHeight;

                // 有横向滚动条
                if (currentWidth <= this.initTotalColumnsWidth && !this.isTableEmpty) {

                    bottom2 -= this.verticalResizeOffset;

                    let differ = bottom2 - totalColumnsHeight;

                    // 高度足够（table 顶部到文档底部的高度 > 表格高度+滚动条高度）
                    if (bottom2 > totalColumnsHeight + scrollbarWidth) {

                        currentHeight += scrollbarWidth;

                    }
                    else if (differ > 0 && differ < scrollbarWidth) {

                        currentHeight += differ;
                    }
                }

                this.internalHeight = currentHeight;
            }

            this.changeColumnsWidth(currentWidth);
        },

        // 改变所有需要自适应列的宽度
        changeColumnsWidth(currentWidth){

            var differ = currentWidth - this.totalColumnsWidth,
                initResizeWidths = this.initTotalColumnsWidth,
                rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');


            if (currentWidth <= initResizeWidths && !this.isTableEmpty) {// 排除表格无数据的影响

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'scroll';

                } else {

                    rightViewBody.style.overflowX = 'scroll';
                }

                this.adjustHeight(true);

            } else {
                // 防止最后一列右距中时内容显示不全
                if (this.getTotalColumnsHeight() > this.internalHeight) {

                    differ -= this.scrollbarWidth;
                }

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'hidden';
                } else {

                    rightViewBody.style.overflowX = 'hidden';
                }

                this.adjustHeight(false);
            }

            if (this.hasFrozenColumn) {

                differ -= 1;
            }

            if (currentWidth >= initResizeWidths || differ > 0) {

                this.setColumnsWidth(differ);

            } else { // 最小化有滚动条时

                this.columns.forEach((col, index) => {

                    if (col.isResize) {

                    this.internalColumns[index].width = col.width;
                }
            })
            }

            this.containerWidthCheck();
        },

        /*
         * 自适应时给列设置宽度
         * 备注：浏览器 px 必须精确多整数
         * */
        setColumnsWidth(differ){

            let resizeColumnsLen = this.resizeColumns.length,
                average = Math.floor(differ / resizeColumnsLen),
                totalAverage = average * resizeColumnsLen,
                leftAverage = differ - totalAverage,
                leftAverageFloor = Math.floor(leftAverage),
                averageColumnsWidthArr = (new Array(resizeColumnsLen)).fill(average),
                index = 0;

            // 剩余的宽度以整数的形式平均到每个列
            for (var i = 0; i < leftAverageFloor; i++) {

                averageColumnsWidthArr[i] += 1;
            }

            // 剩余的小数给最后一列
            averageColumnsWidthArr[resizeColumnsLen - 1] += (leftAverage - leftAverageFloor);

            this.internalColumns.map(item => {

                if (item.isResize) {

                item.width += averageColumnsWidthArr[index++];
            }

            return item;
        })
        }
    },

    mounted(){

        utils.bind(window, 'resize', this.tableResize);
    },
    beforeDestroy(){

        utils.unbind(window, 'resize', this.tableResize);
        clearTimeout(this.containerWidthCheckTimer);
    }

}