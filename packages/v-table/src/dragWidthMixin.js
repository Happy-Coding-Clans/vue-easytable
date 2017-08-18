// 列宽度拖动
import utils from '../../../src/utils/utils.js'
export default {

    data(){
        return {

            draggingColumn: null, // 当前拖动的列
            isDragging: false, // 是否正在拖动
            draggingStartX: 0, // 拖动开始横坐标
            draggingEndX: 0, // 拖动结束横坐标
            minColumnWidth: 15 // 列允许拖动后的最小宽度
        }
    },

    methods: {

        handleTitleMouseMove(event, column){

            let target, rect;

            if (this.isDragging) {
                this.setDragLinePosition(event);
            }

            // 复杂表头，多列时不允许拖动
            if (Array.isArray(column)) {

                if (column.length > 1) {
                    return false;
                }
                else {
                    column = column[0];
                }
            }

            // 最后一列不允许拖动
            /*if (this.internalColumns[this.internalColumns.length - 1].field === column) {
                return false;
            }*/

            if (!this.showVerticalBorder) {
                return false;
            }

            target = event.target;

            while (target && target.className && target.className.indexOf('v-table-title-cell') === -1) {
                target = target.parentNode;
            }

            rect = target.getBoundingClientRect();

            const bodyStyle = document.body.style;
            if (rect.width >= this.minColumnWidth && rect.right - event.pageX < 10) {

                if (!this.isDragging) { // 拖动中不设置
                    this.draggingColumn = this.internalColumns.find(x => x.field === column);
                }

                bodyStyle.cursor = 'col-resize';
            } else {

                if (!this.isDragging) { // 拖动中不设置

                    this.draggingColumn = null;
                    bodyStyle.cursor = '';
                }
            }
        },

        handleTitleMouseOut(){

            if (!this.isDragging) {

                document.body.style.cursor = '';
            }
        },

        handleTitleMouseDown(event, column){

            if (!this.draggingColumn || !this.showVerticalBorder) {
                return false;
            }

            this.isDragging = true;

            this.draggingStartX = event.clientX;

            this.setDragLinePosition(event);

            document.onselectstart = function () {
                return false;
            };
            document.ondragstart = function () {
                return false;
            };

            utils.bind(document, 'mousemove', this.handleDragMouseMove);
            utils.bind(document, 'mouseup', this.handleDragMouseUp);
        },

        handleDragMouseMove(e){

            if (!this.isDragging) {
                return false;
            }

            this.setDragLinePosition(e);
        },

        setDragLinePosition(e){

            const tableLeft = utils.getViewportOffset(this.$el).left,
                dragLine = this.$el.querySelector('.v-table-drag-line'),
                clientX = e.clientX;

            if (this.draggingColumn.width + (clientX - this.draggingStartX) <= this.minColumnWidth) {
                return;
            }

            dragLine.style.left = (clientX - tableLeft) + 'px';
        },

        // 拖动时mouseup
        handleDragMouseUp(e){

            if (!this.isDragging) {
                return false;
            }

            this.draggingEndX = e.clientX;

            var differ = this.draggingEndX - this.draggingStartX;

            // 差值大于1才处理
            if (Math.abs(differ) > 1) {

                let draggingColumn = this.draggingColumn;

                if (draggingColumn.width + differ < this.minColumnWidth) {

                    draggingColumn.width = this.minColumnWidth;
                } else {

                    draggingColumn.width += differ;
                }
            }

            let rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body');
            if (this.totalColumnsWidth < this.internalWidth) {

                rightViewBody.style.overflowX = 'hidden';
                rightViewBody.classList.remove('v-table-rightview-special-border');

                //this.internalColumns[this.internalColumns.length - 1].width += this.internalWidth - this.totalColumnsWidth - 2;
            }else{

                rightViewBody.style.overflowX = 'scroll';

                if (!this.hasFrozenColumn){

                    rightViewBody.classList.add('v-table-rightview-special-border');
                }
            }

            this.draggingColumn = null;
            document.body.style.cursor = '';
            this.isDragging = false;

            utils.unbind(document, 'mousemove', this.handleDragMouseMove);
            utils.unbind(document, 'mouseup', this.handleDragMouseUp);
        }

    }

}