<template>

    <div class="panel datagrid" :style="{'width':width+'px'}">
        <div class="datagrid-wrap panel-body" title="" :style="{'width':(width-2)+'px'}">
            <div class="datagrid-view" :style="{'width': (width-2)+'px', 'height': height+'px'}">
                <!--左列-->
                <template v-if="frozenCols.length > 0">
                    <div class="datagrid-view1" :style="{'width':leftViewWidth+'px'}">
                        <!--左列头-->
                        <div class="datagrid-header"
                             :style="{'width': leftViewWidth+'px', 'height':(titleHeight-1)+'px'}">
                            <div class="datagrid-header-inner" style="display: block;">
                                <table class="datagrid-htable" border="0" cellspacing="0" cellpadding="0"
                                       style="height: 25px;">
                                    <tbody>
                                    <tr class="datagrid-header-row">
                                        <td v-for="col in frozenCols" :field="col.fileld">
                                            <div class="datagrid-cell"
                                                 :style="{'width':tdWidth(col.width)+'px','text-align':col.align}">
                                                <span>{{col.title}} </span>
                                                <span class="datagrid-sort-icon"></span>
                                            </div>
                                        </td>

                                        <!-- <td field="productid" class="">
                                             <div class="datagrid-cell datagrid-cell-c1-productid"><span>ID</span><span
                                                     class="datagrid-sort-icon"></span></div>
                                         </td>
                                        -->
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--左列内容-->
                        <div class="datagrid-body"
                             :style="{'width': leftViewWidth+'px', 'margin-top': '0px', 'height': (height-titleHeight)+'px'}">
                            <div class="datagrid-body-inner">
                                <table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0">
                                    <tbody>
                                    <tr v-for="(item,index) in tableData" class="datagrid-row"
                                        :style="{'height': titleHeight+'px'}">
                                        <td v-for="col in frozenCols" :field="col.fileld">
                                            <div style="height:auto;" class="datagrid-cell"
                                                 :style="{'width':tdWidth(col.width)+'px','text-align':col.align}">
                                                {{item[col.fileld]}}
                                            </div>
                                        </td>
                                    </tr>

                                    <!--
                                    <tr id="datagrid-row-r1-1-0" datagrid-row-index="0" class="datagrid-row"
                                        style="height: 25px;">
                                        <td field="productid">
                                            <div style="height:auto;" class="datagrid-cell datagrid-cell-c1-productid">11
                                            </div>
                                        </td>
                                        <td field="itemid">
                                            <div style="height:auto;" class="datagrid-cell datagrid-cell-c1-itemid">aa</div>
                                        </td>
                                    </tr>
                                    -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </template>


                <!--右列-->
                <div class="datagrid-view2" :style="{'width': rightViewWidth+'px'}">
                    <!--右列头-->
                    <div class="datagrid-header"
                         :style="{'width': rightViewWidth+'px', 'height':(titleHeight-1)+'px'}">
                        <div class="datagrid-header-inner" style="display: block;">
                            <table class="datagrid-htable" border="0" cellspacing="0" cellpadding="0"
                                   :style="{'height':titleHeight+'px'}">
                                <tbody>
                                <tr class="datagrid-header-row">
                                    <td v-for="col in noFrozenCols" :field="col.fileld">
                                        <div class="datagrid-cell"
                                             :style="{'width':tdWidth(col.width)+'px','text-align':col.align}">
                                            <span>{{col.title}} </span>
                                            <span class="datagrid-sort-icon"></span>
                                        </div>
                                    </td>

                                    <!--
                                    <td field="listprice" class="">
                                         <div class="datagrid-cell datagrid-cell-c1-listprice"
                                              style="text-align: right;">
                                             <span>价格</span><span class="datagrid-sort-icon"></span></div>
                                     </td>
                                     -->
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--右列内容-->
                    <div class="datagrid-body"
                         :style="{'width': rightViewWidth+'px', 'margin-top': '0px', 'height': (height-titleHeight)+'px'}">
                        <table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr v-for="(item,index) in tableData" class="datagrid-row"
                                :style="{'height':titleHeight+'px'}">
                                <td v-for="col in noFrozenCols" :field="col.fileld">
                                    <div style="height:auto;" class="datagrid-cell"
                                         :style="{'width':tdWidth(col.width)+'px','text-align':col.align}">
                                        {{item[col.fileld]}}
                                    </div>
                                </td>
                            </tr>

                            <!--
                            <tr id="datagrid-row-r1-2-0" datagrid-row-index="0" class="datagrid-row"
                                style="height: 25px;">
                                <td field="listprice">
                                    <div style="text-align:right;height:auto;"
                                         class="datagrid-cell datagrid-cell-c1-listprice">36.5
                                    </div>
                                </td>
                             -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'vue-easyTable',
        data(){
          return {
              tableWidth:this.width,
              tableHeight:this.height
          }
        },
        props: {
            width: {
                type: Number,
                require: true
            },
            minWidth: {
                type: Number,
                require: false
            },
            height: {
                type: Number,
                require: true
            },
            minHeight: {
                type: Number,
                require: false
            },
            titleHeight: {
                type: Number,
                require: false
            },
            columns: {
                type: Array,
                require: true
            },
            tableData: {
                type: Array,
                require: true
            }
        },
        computed: {
            // 冻结的列集合
            frozenCols(){
                return this.columns.filter(x => x.isFrozen === true)
            },

            // 非冻结列集合
            noFrozenCols(){
                return this.columns.filter(x => x.isFrozen !== true)
            },

            // 左侧区域宽度
            leftViewWidth(){
                var result = 0
                if (this.frozenCols && this.frozenCols.length > 0) {
                    result = this.frozenCols.reduce((total, curr) => total + curr.width, 0)
                }
                return result
            },

            // 右侧区域宽度
            rightViewWidth(){
                return this.width - this.leftViewWidth - 2
            }
        },
        methods: {
            // 列宽 9=左右间距+border宽
            tdWidth(val){
                return val - 9
            },

            // 列表中滚动条控制
            scrollControl(){
                var $view1 = $(".datagrid-view1");
                var $view2 = $('.datagrid-view2');

                var $body1 = $view1.children("div.datagrid-body");
                var $body2 = $view2.children("div.datagrid-body");

                $body2.bind("scroll", function () {
                    $body1.scrollTop($(this).scrollTop());

                    var c1 = $body1.children(":first");
                    var c2 = $body2.children(":first");

                    if (c1.length && c2.length) {
                        var top1 = c1.offset().top;
                        var top2 = c2.offset().top;
                        if (top1 != top2) {
                            $body1.scrollTop($body1.scrollTop() + top1 - top2);
                        }
                    }

                    $view2.children("div.datagrid-header").scrollLeft($(this).scrollLeft())
                })
            },

            // 获取当前元素的left、top偏移
            getViewportOffset(){
                var $window = $(window),
                    scrollLeft = $window.scrollLeft(),
                    scrollTop = $window.scrollTop(),
                    offset = $('.datagrid').offset();
                return {
                    left: offset.left - scrollLeft,
                    top: offset.top - scrollTop
                }
            },


            // 随着窗口改变表格自适应
            tableResize(){
                var vm = this;

               /* var width = vm.width
                var height = vm.height*/

                var width = vm.tableWidth
                var height = vm.tableHeight

                var minWidth = vm.minWidth
                var minHeight = vm.minHeight

                var viewOffset = vm.getViewportOffset();

                var currentWidth = $('.datagrid').outerWidth();
                var currentHeight = $('.datagrid').outerHeight();

                var right = $(window).width() - currentWidth - viewOffset.left;
                var bottom = $(window).height() - currentHeight - viewOffset.top;

                // （窗口宽度缩小 && 当前宽度大于最小宽度） ||（窗口宽度扩大 && 当前宽度小于最大宽度）
                if ((right < 0 && currentWidth > minWidth) || (right > 0 && currentWidth < width)) {
                    currentWidth = currentWidth + right;

                    currentWidth = currentWidth > width ? width : currentWidth;
                    currentWidth = currentWidth < minWidth ? minWidth:currentWidth;



                    setTimeout(function () {
                        alert(currentWidth)
                        vm.width=currentWidth
                    },300)
                }

                // （窗口高度缩小 && 当前高度大于最小高度） || （窗口高度扩大 && 当前高度小于最大高度）
                if ((bottom < 0 && currentHeight > minHeight) || (bottom > 0 && currentHeight < height)) {
                    var currentHeight = currentHeight + bottom;

                    currentHeight = currentHeight > height ? height : currentHeight;
                    currentHeight = currentHeight < minHeight ? minHeight : currentHeight;

                    vm.height = currentHeight
                }
            },
        },
        mounted(){
            var vm = this;

            vm.tableResize()

            vm.scrollControl()

            window.onresize = function (event) {
                 vm.tableResize()
            }


        }
    }
</script>


<style>
    .panel {
        overflow-x: hidden;
        overflow-y: hidden;
        text-align: left;
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        border-top-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 0px;
        border-left-width: 0px;
        border-top-style: initial;
        border-right-style: initial;
        border-bottom-style: initial;
        border-left-style: initial;
        border-top-color: initial;
        border-right-color: initial;
        border-bottom-color: initial;
        border-left-color: initial;
        border-image-source: initial;
        border-image-slice: initial;
        border-image-width: initial;
        border-image-outset: initial;
        border-image-repeat: initial;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 0px;
    }

    .panel-header, .panel-body {
        border-top-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
        border-top-color: rgb(149, 184, 231);
        border-right-color: rgb(149, 184, 231);
        border-bottom-color: rgb(149, 184, 231);
        border-left-color: rgb(149, 184, 231);
    }

    .panel-body {
        overflow-x: auto;
        overflow-y: auto;
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        padding-left: 0px;
        background-color: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
        font-size: 12px;
    }

    .datagrid .panel-body {
        overflow-x: hidden;
        overflow-y: hidden;
        position: relative;
    }

    .datagrid-view {
        position: relative;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .datagrid-view1, .datagrid-view2 {
        position: absolute;
        overflow-x: hidden;
        overflow-y: hidden;
        top: 0px;
    }

    .datagrid-view1 {
        left: 0px;
    }

    .datagrid-header {
        overflow-x: hidden;
        overflow-y: hidden;
        cursor: default;
        border-top-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
        border-left-width: 0px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }

    .datagrid-header, .datagrid-td-rownumber {
        background-image: linear-gradient(rgb(249, 249, 249) 0px, rgb(239, 239, 239) 100%);
        background-position-x: initial;
        background-position-y: initial;
        background-size: initial;
        background-attachment: initial;
        background-origin: initial;
        background-clip: initial;
        background-color: initial;
        background-repeat-x: repeat;
        background-repeat-y: no-repeat;
    }

    .datagrid-header, .datagrid-toolbar, .datagrid-pager, .datagrid-footer-inner {
        border-top-color: rgb(221, 221, 221);
        border-right-color: rgb(221, 221, 221);
        border-bottom-color: rgb(221, 221, 221);
        border-left-color: rgb(221, 221, 221);
    }

    .datagrid-header-inner {
        float: left;
        width: 10000px;
    }

    .datagrid-htable, .datagrid-btable, .datagrid-ftable {
        color: rgb(0, 0, 0);
        border-collapse: separate;
    }

    .datagrid-header-row, .datagrid-row {
        height: 25px;
    }

    .datagrid-header td, .datagrid-body td, .datagrid-footer td {
        border-top-width: 0px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 0px;
        border-top-style: dotted;
        border-right-style: dotted;
        border-bottom-style: dotted;
        border-left-style: dotted;
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        padding-left: 0px;
        border-top-color: rgb(204, 204, 204);
        border-right-color: rgb(204, 204, 204);
        border-bottom-color: rgb(204, 204, 204);
        border-left-color: rgb(204, 204, 204);
    }

    .datagrid-cell, .datagrid-cell-group, .datagrid-header-rownumber, .datagrid-cell-rownumber {
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        padding-top: 0px;
        padding-right: 4px;
        padding-bottom: 0px;
        padding-left: 4px;
        white-space: nowrap;
        word-wrap: normal;
        overflow-x: hidden;
        overflow-y: hidden;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
    }

    .datagrid-header-rownumber, .datagrid-cell-rownumber {
        width: 30px;
        text-align: center;
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        padding-left: 0px;
    }

    .datagrid-header-rownumber {
        width: 29px;
    }

    .datagrid-header .datagrid-cell {
        height: auto;
    }

    .datagrid-header .datagrid-cell span {
        font-size: 12px;
    }

    .datagrid-sort-icon {
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        padding-left: 0px;
        display: none;
    }

    .datagrid-body {
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        padding-left: 0px;
        overflow-x: auto;
        overflow-y: auto;
        zoom: 1;
    }

    .datagrid-view1 .datagrid-body {
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .datagrid-view1 .datagrid-body-inner {
        padding-bottom: 20px;
    }

    .datagrid-cell-rownumber {
        color: rgb(0, 0, 0);
        width: 29px;
    }

    .datagrid-view2 {
        right: 0px;
    }
</style>