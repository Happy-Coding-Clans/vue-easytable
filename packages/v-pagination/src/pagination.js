import pager from "./pager.vue";
import VSelect from "../../v-select/index";
import settings from '../../../src/settings/settings.js'

export default{
    name: 'v-pagination',
    props: {
        layout: {
            type: Array,
            default(){
                return ['total', 'prev', 'pager', 'next', 'sizer', 'jumper']
            }
        },

        size: {
            type: String
        },

        // 总条数
        total: {
            type: Number,
            require: true
        },

        // 当前页
        pageIndex: {
            type: Number
        },

        // 最多显示几个数字按钮
        showPagingCount: {
            type: Number,
            default: 5
        },

        // 每页大小
        pageSize: {
            type: Number,
            default: 10
        },

        // 每页大小下拉配置
        pageSizeOption: {
            type: Array,
            default: function () {
                return [10, 20, 30]
            }
        }
    },
    data(){
        return {
            newPageIndex: (this.pageIndex && this.pageIndex > 0) ? parseInt(this.pageIndex) : 1,

            newPageSize: this.pageSize
        }
    },

    computed: {
        pageCount(){
            return Math.ceil(this.total / this.newPageSize)
        }
    },

    render(h){
        let template = <ul class="et-page-ul"></ul>;

        var comps = {
            //'total','prev','pager','next','sizer','jumper'
            'total': <total></total>,
            'prev': <prev></prev>,
            'pager': <pager pageCount={this.pageCount} pageIndex={this.newPageIndex}
                            showPagingCount={this.showPagingCount}
                            onJumpPageHandler={this.jumpPageHandler}></pager>,
            'next': <next></next>,
            'sizer': <sizer></sizer>,
            'jumper': <jumper onJumpPageHandler={this.jumpPageHandler}></jumper>
        }

        this.layout.forEach(item => {
            template.children.push(comps[item]);
        })

        let size = settings.sizeMaps[this.size] || settings.sizeMapDefault
        let sizeClass = size === settings.sizeMaps['large'] ? ' et-page--large' :(size === settings.sizeMaps['middle'] ? ' et-page--middle' :' et-page--small')

        template.data.class += sizeClass;

        return template

    },

    components: {


        Total: {
            render(h){
                return (
                    <span class="et-page-total">&nbsp;共&nbsp;{this.$parent.total}&nbsp;条&nbsp;</span>
                )
            }
        },

        Prev: {
            render(h){
                return (<li on-click={ this.$parent.prevPage }
                            class={[this.$parent.newPageIndex === 1 ? 'et-page-disabled' : '', 'et-page-li', 'et-page-prev']}
                >
                    <a><i class="et-icon icon-angle-left"></i></a></li>)
            }
        },

        pager,

        Next: {
            render(h){
                return (
                    <li on-click={this.$parent.nextPage}
                        class={[this.$parent.newPageIndex === this.$parent.pageCount ? 'et-page-disabled' : '', 'et-page-li', 'et-page-next']}
                    >
                        <a><i class="et-icon icon-angle-right"></i></a></li>
                )
            }
        },

        Sizer: {
            components: {
                VSelect
            },
            render(h){
                return (
                    <v-select size={this.$parent.size} onSelectChangeHandler={this.$parent.pageSizeChangeHandler} class="et-page-select"
                              labels={this.$parent.pageSizeOption}
                              currentLabel={this.$parent.pageSize}></v-select>
                )
            }
        },

        Jumper: {
            methods: {
                jumperEnter(event){
                    if (event.keyCode !== 13) return

                    var val = this.$parent.getValidNum(event.target.value)

                    this.$parent.newPageIndex = val

                    this.$emit('jumpPageHandler', val)
                }
            },
            render(h){
                return (
                    <span class="et-page-goto">&nbsp;前往&nbsp;<input
                        class="et-page-goto-input"
                        domProps-value={this.$parent.newPageIndex}
                        on-keyup={this.jumperEnter}
                        type="input"
                    />&nbsp;页&nbsp;</span>
                )
            }
        }
    },

    methods: {

        getValidNum(value){
            let result = 1

            value = parseInt(value, 10);

            if (isNaN(value) || value < 1) {
                result = 1
            } else {
                if (value < 1) {
                    result = 1;
                } else if (value > this.pageCount) {
                    result = this.pageCount;
                } else {
                    result = value
                }
            }
            return result
        },

        jumpPageHandler(newPageIndex){
            this.newPageIndex = newPageIndex
            this.$emit('page-change', this.newPageIndex)
        },


        // 上一页
        prevPage(){
            if (this.newPageIndex > 1) {
                this.newPageIndex = this.newPageIndex - 1
                this.$emit('page-change', this.newPageIndex)
            }
        },

        // 下一页
        nextPage(){
            if (this.newPageIndex < this.pageCount) {
                this.newPageIndex = this.newPageIndex + 1
                this.$emit('page-change', this.newPageIndex)
            }
        },

        // 改变页面大小
        pageSizeChangeHandler(newPageSize){
            this.newPageSize = newPageSize
            this.newPageIndex = 1
            this.$emit('page-size-change', this.newPageSize)
        }

    },
    watch:{
        pageIndex:function (newVal, oldVal) {
            this.newPageIndex = newVal;
        },

        pageSize:function (newVal, oldVal) {
            this.newPageSize = newVal;
        }
    },
    created(){

    },
    mounted(){
    }

}