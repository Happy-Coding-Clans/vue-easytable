/*
 * 鼠标滚动，滚动条改变
 * */

import utils from '../../src/utils/utils.js'
export default {
    methods: {
        body1Mousewheel(e){

            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            var e1 = e.originalEvent || window.event || e;
            var scrollHeight = e1.wheelDelta || e1.detail * (-1);
            body2.scrollTop = (body2.scrollTop - scrollHeight);
        },

        body2Scroll(e){

            var view2 = this.$el.querySelector('.v-table-rightview');
            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            if (body1) {
                body1.scrollTop = body2.scrollTop;
            }


            view2.querySelector('.v-table-header').scrollLeft = body2.scrollLeft;
        },

        rightViewFooterScroll(){

            var view2 = this.$el.querySelector('.v-table-rightview');

            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            view2.querySelector('.v-table-header').scrollLeft = rightViewFooter.scrollLeft;
            view2.querySelector('.v-table-body').scrollLeft = rightViewFooter.scrollLeft;

        },

        // 列表中滚动条控制
        scrollControl(){

            this.unbindEvents();

            // 修复左侧固定列绑定滚动事件失效的问题
            setTimeout(x => {

                var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
                var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
                var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

                utils.bind(body1, 'mousewheel', this.body1Mousewheel);
                utils.bind(body2, 'scroll', this.body2Scroll);
                utils.bind(rightViewFooter, 'scroll', this.rightViewFooterScroll);
            })
        },

        unbindEvents(){

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            utils.unbind(body1, 'mousewheel', this.body1Mousewheel);
            utils.unbind(body2, 'scroll', this.body2Scroll);
            utils.unbind(rightViewFooter, 'scroll', this.rightViewFooterScroll);
        }
    },

    beforeDestroy(){

        this.unbindEvents();
    }
}