import utils from '../../src/utils/utils.js'
export default {

    data(){

        return {

            scrollbarWidth:0
        }
    },

    methods: {
        // 如果存在footer 则横向滚动条体现在footer上
        controlScrollBar(){

            if (this.hasTableFooter) {

                var body = this.$el.querySelector('.v-table-rightview .v-table-body');
                body.style.overflowX = 'hidden';
            }
        },

        setScrollbarWidth(){

            this.scrollbarWidth = utils.getScrollbarWidth();
        }
    }

}