export default {

    methods: {
        // 如果存在footer 则横向滚动条体现在footer上
        controlScrollBar(){

            if (this.hasTableFooter) {

                var body = this.$el.querySelector('.v-table-rightview .v-table-body');
                body.style.overflowX = 'hidden';
            }
        },

        // 判断右侧区域是否有横向滚动条
        hasBodyHorizontalScrollBar(){

            return this.rightViewWidth < this.totalNoFrozenColumnsWidth;

           /* var rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                rightViewContent = this.$el.querySelector('.v-table-rightview .v-table-body .v-table-btable');

            return rightViewBody.clientWidth + 2 < rightViewContent.clientWidth;*/
        }
    }

}