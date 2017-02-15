<template>
    <span class="et-page-pager">
        <li @click.stop.prevent="jumpPage(1)" :class='[pageIndex === 1 ? "et-page-li-active":"","et-page-li"]'><a>1</a></li>

        <li @click.stop.prevent="jumpPage(pageIndex - showPagingCount)" v-if="showJumpPrev"
            :class="[pageIndex=== 1 ? 'disabled' :'','et-page-li','et-page-jump-prev']"
            :title="'向前 '+showPagingCount+' 页'">
            <a><i class="et-icon icon-angle-double-left"></i></a>
        </li>

        <li v-for="num in pagingCounts" @click.stop.prevent="jumpPage(num)"
            :class='[num === pageIndex ? "et-page-li-active":"","et-page-li"]'><a>{{num}}</a></li>

        <li @click.stop.prevent="jumpPage(pageIndex + showPagingCount)" v-if="showJumpNext"
            class="et-page-li et-page-jump-next" :title="'向后 '+showPagingCount+' 页'"><a><i
                class="et-icon icon-angle-double-right"></i></a>

        <li v-if="pageCount >1" @click.stop.prevent="jumpPage(pageCount)"
            :class='[pageIndex === pageCount ? "et-page-li-active":"","et-page-li"]'><a>{{pageCount}}</a></li>
    </span>
</template>

<script>
    export default{
        props: {
            pageCount: Number,
            pageIndex: Number,
            showPagingCount: Number
        },
        computed: {
            numOffset(){
                return Math.floor((this.showPagingCount + 2) / 2) - 1;
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
                } else if (!showJumpPrev && showJumpNext) {
                    for (let i = 2; i < vm.showPagingCount + 2; i++) {
                        result.push(i);
                    }
                } else if (showJumpPrev && showJumpNext) {
                    for (let i = vm.pageIndex - vm.numOffset; i <= vm.pageIndex + vm.numOffset; i++) {
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
            jumpPage(pageIndex){
                this.$emit('jumpPageHandler', pageIndex)
            },
        },
        created(){

        }
    }
</script>