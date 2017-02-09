<template>
    <ul class="et-page-ul">
        <span class="et-page-total">共 800 条</span>

        <li @click.stop.prevent="prevPage()" :class="[pageIndex=== 1 ? 'et-page-disabled' :'','et-page-li','et-page-prev']"><a><i
                class="et-icon icon-angle-left"></i></a></li>

        <li @click.stop.prevent="jumpPage(1)" :class='[pageIndex === 1 ? "et-page-li-active":"","et-page-li"]'><a>1</a></li>

        <li @click.stop.prevent="jumpPage(pageIndex - showPagingCount)" v-if="showJumpPrev" :class="[pageIndex=== 1 ? 'disabled' :'','et-page-li','et-page-jump-prev']"
            :title="'向前 '+showPagingCount+' 页'">
            <a><i class="et-icon icon-angle-double-left"></i></a>
        </li>

        <li v-for="num in pagingCounts" @click.stop.prevent="jumpPage(num)"
            :class='[num === pageIndex ? "et-page-li-active":"","et-page-li"]'><a>{{num}}</a></li>

        <li @click.stop.prevent="jumpPage(pageIndex + showPagingCount)" v-if="showJumpNext" class="et-page-li et-page-jump-next" :title="'向后 '+showPagingCount+' 页'"><a><i class="et-icon icon-angle-double-right"></i></a>

        <li @click.stop.prevent="jumpPage(pageCount)" :class='[pageIndex === pageCount ? "et-page-li-active":"","et-page-li"]'><a>{{pageCount}}</a></li>

        <li @click.stop.prevent="nextPage()" :class="[pageIndex=== pageCount ? 'et-page-disabled' :'','et-page-li','et-page-next']"><a><i class="et-icon icon-angle-right"></i></a></li>

        <v-select class="et-page-select"
                  :labels="pageSizeOption"
                  :currentLabel="pageSize"
        ></v-select>
        <span class="et-page-goto">前往 <input class="et-page-goto-input" type="input"></span> 页
    </ul>
</template>

<script>
    import VSelect from '../../v-select/index'

    export default{
        name: 'v-pagination',
        components: {
            VSelect
        },
        props: {
            // 当前页
            pageIndex: {
                type: Number,
                require: true
            },
            // 总页数
            pageCount: {
                type: Number,
                require: true
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
                require: false,
                default: function () {
                    return [10, 20, 30]
                }
            }
        },
        data(){
            return {

            }
        },
        computed: {

            numOffset(){
                return Math.floor((this.showPagingCount+2) / 2) - 1;
            },

            showJumpPrev(){
                if (this.pageCount > this.showPagingCount + 2) {
                    if (this.pageIndex > this.showPagingCount) {
                        return true
                    }
                }
                return false
            },

            showJumpNext(){
                if (this.pageCount > this.showPagingCount + 2) {
                    if (this.pageIndex < this.pageCount - this.numOffset) {
                        return true
                    }
                }
                return false
            },


            // 当前要显示的数字按钮集合
            pagingCounts(){
                let vm = this,
                    startNum,
                    result = [],
                    showJumpPrev = vm.showJumpPrev,
                    showJumpNext = vm.showJumpNext;


                if (showJumpPrev && !showJumpNext) {
                    startNum = vm.pageCount - vm.showPagingCount;
                    for (let i = startNum; i < vm.pageCount; i++) {
                        result.push(i);
                    }
                }else if (!showJumpPrev && showJumpNext) {
                    for (let i = 2; i < vm.showPagingCount+2; i++) {
                        result.push(i);
                    }
                } else if (showJumpPrev && showJumpNext) {
                    /*let offset = Math.floor((vm.showPagingCount+2) / 2) - 1;*/
                    for (let i = vm.pageIndex - vm.numOffset ; i <= vm.pageIndex + vm.numOffset; i++) {
                        result.push(i);
                    }
                } else {
                    for (let i = 2; i < vm.pageCount; i++) {
                        result.push(i);
                    }
                }

                return result
            }
        },
        methods: {
            //
            jumpPage(pageIndex){
                this.$emit('pagingCallBack', pageIndex)
            },


            // 上一页
            prevPage(){
                if (this.pageIndex > 1) {
                    var pageIndex = this.pageIndex - 1
                    this.$emit('pagingCallBack', pageIndex)
                }
            },

            // 下一页
            nextPage(){
                if (this.pageIndex < this.pageCount) {
                    var pageIndex = this.pageIndex + 1
                    this.$emit('pagingCallBack', pageIndex)
                }
            },

            // 改变页面大小
            changePageSize(pageSize){
                this.pageSize = pageSize
                this.$emit('pagingCallBack', 1, pageSize)
            }

        },
        mounted(){

        }

    }
</script>