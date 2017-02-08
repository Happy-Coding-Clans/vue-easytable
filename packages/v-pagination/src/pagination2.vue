<template>
    <div>
        <!--<span :class="['sui-dropdown dropdown-bordered dropdown-large showNum',pageSizeClass]"
        >
               <span class="dropdown-inner">
                   <a @click.stop.prevent="pageSizeTrigger()" @blur="pageSizeBlur()" role="button" data-toggle="dropdown"
                      href="javascript:void(0);"
                      class="dropdown-toggle">显示{{pageSize}}条每页<i class=""></i></a>
                  <ul role="menu" aria-labelledby="drop2" class="sui-dropdown-menu">
                      <li @click.stop.prevent="changePageSize(item)" v-for="item in pagingSizes" :class="[item===pageSize ? 'active' :'']"><a
                              href="javascript:void(0);">显示{{item}}条每页</a></li>
                  </ul>
               </span>
           </span>-->

        <div class="fr">
            <div class="pageTurn st2">
                <ul>
                    <li @click.stop.prevent="jumpPage(1)"><a :class="[pageIndex=== 1 ? 'disabled' :'','ficon']"
                                                             href="javascript:void(0);">|&lt;</a></li>

                    <li><a @click="prevPage()" href="javascript:void(0);"
                           :class="[pageIndex=== 1 ? 'disabled' :'','ficon']">&lt;</a></li>

                    <li @click.stop.prevent="jumpPage(num)" :class="[num===pageIndex ? 'active':'']"
                        v-for="num in pagingCounts"><a href="javascript:javascript:void(0);">{{num}}</a></li>


                    <li><a @click="nextPage()" href="javascript:void(0);"
                           :class="[pageIndex === pageCount ? 'disabled' :'','ficon']">&gt;</a></li>

                    <li @click.stop.prevent="jumpPage(pageCount)"><a
                            :class="[pageIndex === pageCount ? 'disabled' :'','ficon']" href="javascript:void(0);">
                        &gt;|</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>



<script>

    export default{
        name: 'v-pagination',
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
                require: true,
                default: 5
            },

            // 每页大小
            pagingSizes: {
                type: Array,
                require: false,
                default: function () {
                    return [10, 20, 30]
                }
            }

        },
        data(){
            return {
                pageSizeClass: '',
                pageSize: 10
            }
        },
        computed: {
            // 是否显示第一页
            isShowFirstPage(){
                var vm = this

                // 总页数<=要显示的数字 || 当前页数<= 要显示数字/2+1
                if (vm.pageCount <= vm.showPagingCount || vm.pageIndex <= Math.floor(vm.showPagingCount / 2) + 1) {
                    return false
                }
                return true
            },

            // 是否显示最后一页
            /* isShowLastPage(){
             var vm = this

             // 总页数 > 要显示的数字 && 总页数 > 当前页数+要显示数字/2+1
             if (vm.pageCount > vm.showPagingCount && vm.pageCount > vm.pageIndex + Math.floor(vm.showPagingCount / 2)) {
             return true
             }
             return false
             },*/

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
            console.log(this.pageCount)
        }
    }
</script>