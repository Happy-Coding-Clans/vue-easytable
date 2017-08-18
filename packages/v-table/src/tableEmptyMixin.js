// 表格数据为空时的处理逻辑
import utils from '../../../src/utils/utils.js'
export default {

    data(){
        return {

            isTableEmpty: false,

            // 表格数据为空时表头的高度（若有滚动条会包含滚动条的宽度）
            //tableEmptyContentHeight: 50,

            // 表格数据为空时的总高度
            tableEmptyHeight: 0
        }
    },

    methods: {

        // table 数据为空的处理
        tableEmpty(){

            var tableData = this.internalTableData,
                tableEmptyHeight = 0;

            if (Array.isArray(tableData) && tableData.length > 0) {

                this.isTableEmpty = false;
                return false;
            }

            this.isTableEmpty = true;

            tableEmptyHeight = this.getTotalColumnsHeight() + this.errorContentHeight;

            this.tableEmptyHeight = tableEmptyHeight;

            this.$nextTick(x => {

                this.tableEmptyScroll();
            })

        },

        tableEmptyScrollEvent(e){

            var headerEle = this.$el.querySelector('.v-table-rightview .v-table-header'),
                tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');

            if (tableEmptyEle) {

                headerEle.scrollLeft = tableEmptyEle.scrollLeft;
            }

        },

        // 无数据时的滚动条控制
        tableEmptyScroll(){

            var tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');
            // 无数据时的滚动条控制
            utils.bind(tableEmptyEle, 'scroll', this.tableEmptyScrollEvent);
        },

    },

    beforeDestroy(){

        var tableEmptyEle = this.$el.querySelector('.v-table-empty .v-table-empty-scroll');
        // 无数据时的滚动条控制
        utils.unbind(tableEmptyEle, 'scroll', this.tableEmptyScrollEvent);
    }
}