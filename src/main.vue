<template>
    <div class="easytable-views" :style="{'width': newWidth+'px', 'height': newHeight+'px'}">
        <!--左列-->
        <template v-if="frozenCols.length > 0">
            <div class="easytable-leftview" :style="{'width':leftViewWidth+'px'}">
                <!--左列头-->
                <div class="easytable-header"
                     :style="{'width': leftViewWidth+'px','background-color':titleBgColor}">
                    <div class="easytable-header-inner" style="display: block;">
                        <table class="easytable-htable" border="0" cellspacing="0" cellpadding="0">
                            <tbody>

                            <template v-if="frozenTitleCols.length > 0">
                                <tr v-for="row in frozenTitleCols">
                                    <td v-for="col in row"
                                        :class="[enableSort(col.orderBy) ? 'cursorPointer':'']"
                                        :colspan="col.colspan" :rowspan="col.rowspan"
                                        @click.stop="sortControl(col.fields[0],col.orderBy)">
                                        <div class="easytable-cell"
                                             :style="{'width':titleColumnWidth(col.fields)+'px','height':titleColumnHeight(col.rowspan)+'px','line-height':titleColumnHeight(col.rowspan)+'px','text-align':col.align}">
                                            <span class="table-title">{{col.title}} </span>
                                            <span v-if="enableSort(col.orderBy)"
                                                  :class="['easytable-sort-icon', col.orderBy]"></span>
                                        </div>
                                    </td>
                                </tr>
                            </template>

                            <template v-else>
                                <tr class="easytable-header-row">
                                    <td v-for="col in frozenCols"
                                        :class="[enableSort(col.orderBy) ? 'cursorPointer':'']"
                                        @click.stop="sortControl(col.field,col.orderBy)">
                                        <div class="easytable-cell"
                                             :style="{'width':col.width+'px','height':titleRowHeight+'px','line-height':titleRowHeight+'px','text-align':col.align}">
                                            <span class="table-title">{{col.title}} </span>
                                            <span v-if="enableSort(col.orderBy)"
                                                  :class="['easytable-sort-icon', col.orderBy]"></span>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--左列内容-->
                <div class="easytable-body"
                     :style="{'width': leftViewWidth+'px', 'margin-top': '0px', 'height': bodyViewHeight+'px'}">
                    <div class="easytable-body-inner">
                        <table class="easytable-btable" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr v-for="(item,index) in tableData" class="easytable-row">
                                <td v-for="col in frozenCols">
                                    <div class="easytable-cell"
                                         :style="{'width':col.width+'px','height': rowHeight+'px','line-height':rowHeight+'px','text-align':col.align}">
                                        <template v-if="typeof col.componentName ==='string'">
                                            <component :rowData="item" :is="col.componentName"></component>
                                        </template>
                                        <template v-else>
                                                   <span v-if="typeof col.format==='function'"
                                                         v-html="col.format(item)">
                                                    </span>
                                            <span v-else>
                                                        {{item[col.field]}}
                                                    </span>
                                        </template>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
        <!--右列-->
        <div class="easytable-rightview" :style="{'width': rightViewWidth+'px'}">
            <!--右列头-->
            <div class="easytable-header"
                 :style="{'width': rightViewWidth+'px','background-color':titleBgColor}">
                <div class="easytable-header-inner" style="display: block;">
                    <table class="easytable-htable" border="0" cellspacing="0" cellpadding="0">
                        <tbody>

                        <template v-if="noFrozenTitleCols.length > 0">
                            <tr v-for="row in noFrozenTitleCols">
                                <td v-for="col in row" :class="[enableSort(col.orderBy) ? 'cursorPointer':'']"
                                    :colspan="col.colspan" :rowspan="col.rowspan"
                                    @click.stop="sortControl(col.fields[0],col.orderBy)">
                                    <div class="easytable-cell"
                                         :style="{'width':titleColumnWidth(col.fields)+'px','height':titleColumnHeight(col.rowspan)+'px','line-height':titleColumnHeight(col.rowspan)+'px','text-align':col.align}">
                                        <span class="table-title">{{col.title}} </span>
                                        <span v-if="enableSort(col.orderBy)"
                                              :class="['easytable-sort-icon', col.orderBy]"></span>
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <template v-else>
                            <tr class="easytable-header-row">
                                <td v-for="col in noFrozenCols"
                                    :class="[enableSort(col.orderBy) ? 'cursorPointer':'']"
                                    @click.stop="sortControl(col.field,col.orderBy)">
                                    <div class="easytable-cell"
                                         :style="{'width':col.width+'px','height':titleRowHeight+'px','line-height':titleRowHeight+'px','text-align':col.align}">
                                        <span class="table-title">{{col.title}} </span>
                                        <span v-if="enableSort(col.orderBy)"
                                              :class="['easytable-sort-icon', col.orderBy]"></span>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--右列内容-->
            <div class="easytable-body"
                 :style="{'width': rightViewWidth+'px', 'margin-top': '0px', 'height': bodyViewHeight+'px'}">
                <table class="easytable-btable" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                    <tr v-for="(item,index) in tableData" class="easytable-row">
                        <td v-for="col in noFrozenCols">
                            <div class="easytable-cell"
                                 :style="{'width':col.width+'px','height': rowHeight+'px','line-height':rowHeight+'px','text-align':col.align}">
                                <template v-if="typeof col.componentName ==='string'">
                                    <component :rowData="item" :is="col.componentName"></component>
                                </template>
                                <template v-else>
                                           <span v-if="typeof col.format==='function'"
                                                 v-html="col.format(item)">
                                            </span>
                                    <span v-else>
                                                {{item[col.field]}}
                                            </span>
                                </template>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
    import './css/main.css'
    export default {
        name: 'vue-easyTable',
        data(){
            return {
                // 本地宽度
                newWidth: this.width,
                // 本地高度
                newHeight: this.height,
                // 本地列数据
                newColumns: Object.assign([], this.columns),
                // 本地复杂表头数据
                newTitleRows: Object.assign([], this.titleRows),
            }
        },
        props: {
            isFrozenTitle: {},
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
            titleRowHeight: {
                type: Number,
                require: false,
                default: 38
            },
            titleBgColor: {
                type: String,
                require: false,
                default: '#fff'
            },
            // 内容行高
            rowHeight: {
                type: Number,
                require: false,
                default: 40
            },
            // 多列排序
            multipleSort: {
                type: Boolean,
                require: false,
                default: true
            },
            columns: {
                type: Array,
                require: true
            },

            // 特殊表头
            titleRows: {
                type: Array,
                require: true,
                default: function () {
                    return []
                }
            },
            tableData: {
                type: Array,
                require: true
            }
        },
        computed: {
            // 冻结的列集合
            frozenCols(){
                return this.newColumns.filter(x => x.isFrozen === true)
            },
            // 非冻结列集合
            noFrozenCols(){
                return this.newColumns.filter(x => x.isFrozen !== true)
            },
            // 冻结的表头列集合
            frozenTitleCols(){
                var frozenTitleCols = []

                if (this.newTitleRows.length > 0) {

                    // 获取当前锁定的字段集合
                    var frozenFields = this.frozenCols.map(x => x.field)

                    this.newTitleRows.forEach(function (rows) {

                        var frozenTitleRows = rows.filter(function (row) {
                            if (Array.isArray(row.fields)) {
                                if (row.fields.every(field => frozenFields.indexOf(field) !== -1)) {
                                    return true
                                }
                            }
                        })
                        if (frozenTitleRows.length > 0) {
                            frozenTitleCols.push(frozenTitleRows)
                        }
                    })
                }
                return frozenTitleCols
            },
            // 未的表头列集合
            noFrozenTitleCols(){
                var noFrozenTitleCols = []

                if (this.newTitleRows.length > 0) {

                    // 获取当前未锁定的字段集合
                    var noFrozenFields = this.noFrozenCols.map(x => x.field)

                    this.newTitleRows.forEach(function (rows) {

                        var noFrozenTitleRows = rows.filter(function (row) {
                            if (Array.isArray(row.fields)) {
                                return row.fields.every(field => noFrozenFields.indexOf(field) !== -1)
                            }
                        })

                        if (noFrozenTitleRows.length > 0) {
                            noFrozenTitleCols.push(noFrozenTitleRows)
                        }
                    })
                }
                return noFrozenTitleCols
            },
            // 左侧区域宽度
            leftViewWidth(){
                var result = 0
                if (this.frozenCols && this.frozenCols.length > 0) {
                    result = this.frozenCols.reduce((total, curr) => total + curr.width, 0)
                }
                return result
            },
            // 右侧区域宽度(2:外边框的宽度)
            rightViewWidth(){
                return this.newWidth - this.leftViewWidth - 2
            },

            // 左侧、右侧区域高度
            bodyViewHeight(){
                if (this.newTitleRows.length > 0) {
                    return this.newHeight - this.titleRowHeight * this.newTitleRows.length
                } else {
                    return this.newHeight - this.titleRowHeight
                }
            },

            // 将复杂表头配置数据简单化
            titleRowsToSortInfo(){
                var result = [], vm = this

                if (vm.newTitleRows.length > 0) {
                    vm.newTitleRows.filter(function (row) {
                        row.filter(function (column, index) {
                            if (typeof column.orderBy === 'string' && column.fields.length === 1) {
                                column.field = column.fields[0]
                                result.push(column)
                            }
                        })
                    })
                }
                return result
            }
        },
        methods: {
            // 是否允许排序
            enableSort(val){
                return typeof val === 'string' ? true : false
            },
            // 允许排序的列集合
            sortColumns(){
                var vm = this, sortColumns = {},
                    collection = vm.titleRowsToSortInfo.length > 0 ? vm.titleRowsToSortInfo : vm.newColumns

                collection.filter(function (item, index) {
                    if (vm.enableSort(item.orderBy)) {
                        sortColumns[item.field] = item.orderBy
                    }
                })

                return sortColumns
            },
            sortControl(field, orderBy){
                var vm = this,
                    collection = vm.titleRowsToSortInfo.length > 0 ? vm.titleRowsToSortInfo : vm.newColumns

                if (vm.enableSort(orderBy)) {
                    collection.filter(function (column, index) {

                        if (vm.enableSort(column.orderBy) && column.field === field) {
                            column.orderBy = column.orderBy === 'asc' ? 'desc' :
                                (column.orderBy === 'desc' ? '' : 'asc')
                        }

                        if (!vm.multipleSort) {
                            if (column.field !== field && vm.enableSort(column.orderBy)) {
                                column.orderBy = ''
                            }
                        }
                    })
                    vm.$emit('actionCallBack', vm.sortColumns())
                }
            },
            // 只允许保留第一个排序规则（‘asc’或者‘desc’）
            singelSortInit(){
                var vm = this,
                    result = false,
                    collection
                if (!vm.multipleSort) {
                    collection = vm.titleRowsToSortInfo.length > 0 ? vm.titleRowsToSortInfo : vm.newColumns
                    collection.filter(function (item, index) {
                        if (vm.enableSort(item.orderBy) && item.orderBy !== '') {
                            if (result) {
                                item.orderBy = ''
                            }
                            result = true
                        }
                    })
                }
            },

            // 获取每个表头列的宽度
            titleColumnWidth(fields){
                var result = 0;
                if (Array.isArray(fields)) {
                    var matchItems = this.newColumns.filter((item, index) => {
                        return fields.some(x => x === item.field)
                    })

                    result = matchItems.reduce((total, curr) => total + curr.width, 0)
                } else {
                    console.error('the fields attribute must be a array in titleRows')
                }
                return result
            },

            // 获取每个表头列的高度
            titleColumnHeight(rowspan){
                if (rowspan && rowspan > 0) {
                    return this.titleRowHeight * rowspan
                } else {
                    return this.titleRowHeight
                }
            },

            // 列表中滚动条控制
            scrollControl(){
                var $view1 = $(".easytable-leftview");
                var $view2 = $('.easytable-rightview');
                var $body1 = $view1.children("div.easytable-body");
                var $body2 = $view2.children("div.easytable-body");

                $body1.bind("mousewheel DOMMouseScroll", function (e) {
                    e.preventDefault();
                    var e1 = e.originalEvent || window.event;
                    var scrollHeight = e1.wheelDelta || e1.detail * (-1);
                    $body2.scrollTop($body2.scrollTop() - scrollHeight);
                });

                $body2.bind("scroll", function () {
                    $body1.scrollTop($(this).scrollTop());
                    var c1 = $body1.children(":first");
                    var c2 = $body2.children(":first");
                    if (c1.length && c2.length) {
                        var top1 = c1.offset().top;
                        var top2 = c2.offset().top;
                        if (top1 != top2) {
                            console.log($body1.scrollTop())
                            console.log(top1)
                            console.log(top2)

                            $body1.scrollTop($body1.scrollTop() + top1 - top2);
                        }
                    }
                    $view2.children("div.easytable-header").scrollLeft($(this).scrollLeft())
                })
            },
            // 获取当前元素的left、top偏移
            getViewportOffset(){
                var $window = $(window),
                    scrollLeft = $window.scrollLeft(),
                    scrollTop = $window.scrollTop(),
                    offset = $('.easytable').offset();
                return {
                    left: offset.left - scrollLeft,
                    top: offset.top - scrollTop
                }
            },
            // 随着窗口改变表格自适应
            tableResize(){
                var vm = this;
                var width = vm.width
                var height = vm.height
                var minWidth = vm.minWidth
                var minHeight = vm.minHeight
                var viewOffset = vm.getViewportOffset();
                var currentWidth = $('.easytable').outerWidth();
                var currentHeight = $('.easytable').outerHeight();
                var right = $(window).width() - currentWidth - viewOffset.left;
                var bottom = $(window).height() - currentHeight - viewOffset.top - 10; // -10 防止浏览器出垂直滚动条
                // （窗口宽度缩小 && 当前宽度大于最小宽度） ||（窗口宽度扩大 && 当前宽度小于最大宽度）
                if ((right < 0 && currentWidth > minWidth) || (right > 0 && currentWidth < width)) {
                    currentWidth = currentWidth + right;
                    currentWidth = currentWidth > width ? width : currentWidth;
                    currentWidth = currentWidth < minWidth ? minWidth : currentWidth;
                    vm.newWidth = currentWidth
                }
                // （窗口高度缩小 && 当前高度大于最小高度） || （窗口高度扩大 && 当前高度小于最大高度）
                if ((bottom < 0 && currentHeight > minHeight) || (bottom > 0 && currentHeight < height)) {
                    var currentHeight = currentHeight + bottom;
                    currentHeight = currentHeight > height ? height : currentHeight;
                    currentHeight = currentHeight < minHeight ? minHeight : currentHeight;
                    vm.newHeight = currentHeight
                }
            },
        },
        mounted(){
            var vm = this;
            //vm.tableResize()
            vm.scrollControl()
            vm.singelSortInit()
            window.onresize = function (event) {
                //vm.tableResize()
            }

        },
        watch: {
            // 重新跟新列信息
            'columns': function (newVal) {
                this.newColumns = Object.assign([], newVal)
            },
            // 重新覆盖复杂表头信息
            'titleRows': function (newVal) {
                this.newTitleRows = Object.assign([], newVal)
            }
        }
    }
</script>