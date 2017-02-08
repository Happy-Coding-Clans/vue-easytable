<template>
        <ul class="et-page-ul">
            <span class="et-page-total">共 800 条</span>

            <li :class="[pageIndex=== 1 ? 'et-page-disabled' :'','et-page-li','et-page-prev']"><a><i class="et-icon icon-angle-left"></i></a></li>

            <li v-if="isShowFirstPage" class="et-page-li"><a>1</a></li>

            <li v-if="isShowFirstPage" :class="[pageIndex=== 1 ? 'disabled' :'','et-page-li','et-page-jump-prev']" :title="'向前 '+showPagingCount+' 页'">
                <a><i class="et-icon icon-angle-double-left"></i></a>
            </li>

            <li v-for="num in pagingCounts"  @click.stop.prevent="jumpPage(num)" class="et-page-li"><a>{{num}}</a></li>
          <!--  <li class="et-page-li"><a>77</a></li>
            <li class="et-page-li"><a>78</a></li>
            <li class="et-page-li"><a>79</a></li>-->
            <li class="et-page-li et-page-jump-next" title="向后 5 页"><a><i class="et-icon icon-angle-double-right"></i></a>
            <li class="et-page-li"><a>80</a></li>
            <li class="et-page-li et-page-next"><a><i class="et-icon icon-angle-right"></i></a></li>

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
        components:{
            VSelect
        },
        props:{
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
                require: true,
                default: 5
            },

            // 每页大小
            pageSize:{
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
            // 是否显示第一页按钮
            isShowFirstPage(){
                var vm = this

                // 总页数<=要显示的数字 || 当前页数<= 要显示数字/2+1
                if (vm.pageCount <= vm.showPagingCount || vm.pageIndex <= Math.floor(vm.showPagingCount / 2) + 1) {
                    return false
                }
                return true
            },

            // 是否显示最后一页按钮
            isShowLastPage(){
                var vm = this

                // 总页数 > 要显示的数字 && 总页数 > 当前页数+要显示数字/2+1
                if (vm.pageCount > vm.showPagingCount && vm.pageCount > vm.pageIndex + Math.floor(vm.showPagingCount / 2)) {
                    return true
                }
                return false
            },

            // 当前要显示的数字按钮集合
            pagingCounts(){
                var vm = this,
                    startNum, endNum,
                    result = []


                // 总页数<=要显示的数字 || 当前页数<= 要显示数字/2+1
                if (!vm.isShowFirstPage) {

                    startNum = 1
                    endNum = vm.pageCount < vm.showPagingCount ? vm.pageCount : vm.showPagingCount
                    for (var i = startNum; i <= endNum; i++) {
                        result.push(i)
                    }

                } else {

                    startNum = vm.pageIndex - Math.floor(vm.showPagingCount / 2)
                    endNum = vm.pageIndex + Math.floor(vm.showPagingCount / 2)

                    // endNum 不能大于总页数
                    endNum = endNum > vm.pageCount ? vm.pageCount : endNum
                    // startNum 不能大于 总页数-显示的页数
                    startNum = startNum > (vm.pageCount - vm.showPagingCount) ? (vm.pageCount - vm.showPagingCount + 1) : startNum

                    for (var i = startNum; i <= endNum; i++) {
                        result.push(i)
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
            },

            // 每页大小选择
            pageSizeTrigger(){
                var vm = this

                vm.pageSizeClass = vm.pageSizeClass === 'open' ? '' : 'open'
            },
            // 焦点离开
            pageSizeBlur(){
                var vm = this

                setTimeout(function () {
                    vm.pageSizeClass = ''
                }, 100)

            }
        },
        mounted(){
            console.log(this.pagingCounts)
        }

    }
</script>