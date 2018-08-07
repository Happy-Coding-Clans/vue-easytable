import pager from "./pager.vue";
import VSelect from "../../v-select/index";
import settings from '../../src/settings/settings.js'

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

            newPageSize: this.pageSize,

            // select 配置项
            newPageSizeOption:[]
        }
    },

    computed: {
        pageCount(){
            return Math.ceil(this.total / this.newPageSize)
        }
    },

    render(h){
        let template = <ul class="v-page-ul"></ul>;

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

        // https://github.com/ElemeFE/element/issues/10033
        // https://github.com/ElemeFE/element/issues/9587
        template.children = template.children || [];

        this.layout.forEach(item => {
            template.children.push(comps[item]);
        })

        let size = settings.sizeMaps[this.size] || settings.sizeMapDefault
        let sizeClass = size === settings.sizeMaps['large'] ? ' v-page--large' :(size === settings.sizeMaps['middle'] ? ' v-page--middle' :' v-page--small')

        template.data.class += sizeClass;

        return template

    },

    components: {


        Total: {
            render(h){
                return (
                    <span class="v-page-total">&nbsp;共&nbsp;{this.$parent.total}&nbsp;条&nbsp;</span>
                )
            }
        },

        Prev: {
            render(h){
                return (<li on-click={ this.$parent.prevPage }
                            class={[this.$parent.newPageIndex === 1 ? 'v-page-disabled' : '', 'v-page-li', 'v-page-prev']}
                >
                    <a><i class="v-icon-angle-left"></i></a></li>)
            }
        },

        pager,

        Next: {
            render(h){
                return (
                    <li on-click={this.$parent.nextPage}
                        class={[this.$parent.newPageIndex === this.$parent.pageCount ? 'v-page-disabled' : '', 'v-page-li', 'v-page-next']}
                    >
                        <a><i class="v-icon-angle-right"></i></a></li>
                )
            }
        },

        Sizer: {
            components: {
                VSelect
            },

            render(h){
                return (
                    <v-select size={this.$parent.size} class="v-page-select"
                               value={this.$parent.newPageSizeOption}
                               on-input={this.handleChange}
                               v-model={this.$parent.newPageSizeOption}></v-select>
                )
            },

            methods:{
                handleChange(items){

                    if (Array.isArray(items) && items.length > 0){
                        let item = items.find(x => x.selected);
                        if (item){
                            this.$parent.pageSizeChangeHandler(item.value);
                        }
                    }
                }
            },

            created(){

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
                    <span class="v-page-goto">&nbsp;前往&nbsp;<input
                        class="v-page-goto-input"
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
        pageSizeChangeHandler(){
            let item = this.newPageSizeOption.find(x=>x.selected);

            if (item){
                this.newPageSize = item.value
                this.newPageIndex = 1
                this.$emit('page-size-change', this.newPageSize)
            }

        },

        // 初始化select 选项
        initSelectOption(){

            this.newPageSizeOption = this.pageSizeOption.map(x=> {
                var temp = {};

                temp.value = x;
                temp.label = x+' 条/页'
                if (this.newPageSize == x){
                    temp.selected = true;
                }

                return temp;
            })
        },

        // 回到初始页码
        goBackPageIndex(){

            this.newPageIndex = (this.pageIndex && this.pageIndex > 0) ? parseInt(this.pageIndex) : 1;
        },

        // 还原每页大小
        goBackPageSize(){

            if (this.pageSize > 0){

                this.newPageSize = this.pageSize;
                this.initSelectOption();
            }
        }

    },
    watch:{
        pageIndex:function (newVal, oldVal) {
            this.newPageIndex = newVal;
        },

        pageSize:function (newVal, oldVal) {
            this.newPageSize = newVal;
            this.initSelectOption();
        }
    },
    created(){
        this.initSelectOption();
    }
}