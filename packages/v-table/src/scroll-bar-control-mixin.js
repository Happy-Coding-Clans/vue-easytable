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

            if (this.$el){

                let rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                    rightColumnsWidth = Math.round(this.totalNoFrozenColumnsWidth);

                return rightViewBody.clientWidth + 2 < rightColumnsWidth;
            }

            return false;
        }
    }

}