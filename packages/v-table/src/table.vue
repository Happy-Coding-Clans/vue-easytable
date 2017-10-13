<template>
    <div class="v-table-views v-table-class" :style="{'width': internalWidth+'px', 'height': getTableHeight+'px'}">
        <!--左列-->
        <template v-if="frozenCols.length > 0">
            <div class="v-table-leftview" :style="{'width':leftViewWidth+'px'}">
                <!--左列头-->
                <div class="v-table-header v-table-title-class"
                     :style="{'width': leftViewWidth+'px','background-color':titleBgColor}">
                    <div class="v-table-header-inner" style="display: block;">
                        <table class="v-table-htable" border="0" cellspacing="0" cellpadding="0">
                            <tbody>

                            <template v-if="frozenTitleCols.length > 0">
                                <tr v-for="row in frozenTitleCols">
                                    <td v-for="col in row"
                                        :class="[col.titleCellClassName]"
                                        :colspan="col.colspan" :rowspan="dealTitleRowspan(row,col.rowspan)"
                                        @mousemove.stop="handleTitleMouseMove($event,col.fields)"
                                        @mousedown.stop="handleTitleMouseDown($event)"
                                        @mouseout.stop="handleTitleMouseOut()">
                                        <div :class="['v-table-title-cell',showVerticalBorder?'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                             :style="{'width':titleColumnWidth(col.fields)+'px','height':titleColumnHeight(col.rowspan)+'px','text-align':col.titleAlign}">
                                            <span class="table-title">
                                                 <span v-html="col.title"></span>
                                                <span @click.stop="sortControl(col.fields[0],col.orderBy)"
                                                      class="v-table-sort-icon" v-if="enableSort(col.orderBy)">
                                                        <i :class='["v-icon-up-dir",col.orderBy ==="asc" ? "checked":""]'></i>
                                                        <i :class='["v-icon-down-dir",col.orderBy ==="desc" ? "checked":""]'></i>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </template>

                            <template v-else>
                                <tr class="v-table-header-row">
                                    <td v-for="col in frozenCols"
                                        :class="[col.titleCellClassName]"
                                        @mousemove.stop="handleTitleMouseMove($event,col.field)"
                                        @mousedown.stop="handleTitleMouseDown($event)"
                                        @mouseout.stop="handleTitleMouseOut()">
                                        <div :class="['v-table-title-cell',showVerticalBorder?'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                             :style="{'width':col.width+'px','height':titleRowHeight+'px','text-align':col.titleAlign}">
                                                <span class="table-title">
                                                     <span v-if="col.type === 'selection'">
                                                         <v-checkbox
                                                                 @change="handleCheckAll"
                                                                 :indeterminate="indeterminate"
                                                                 v-model="isAllChecked"
                                                                 :show-slot="false"
                                                                 label="check-all"
                                                         ></v-checkbox>
                                                    </span>
                                                    <span v-else v-html="col.title"></span>
                                                    <span @click.stop="sortControl(col.field,col.orderBy)"
                                                          class="v-table-sort-icon" v-if="enableSort(col.orderBy)">
                                                            <i :class='["v-icon-up-dir",col.orderBy ==="asc" ? "checked":""]'></i>
                                                            <i :class='["v-icon-down-dir",col.orderBy ==="desc" ? "checked":""]'></i>
                                                    </span>
                                                </span>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--左列内容-->
                <div class="v-table-body v-table-body-class"
                     :style="{'width': leftViewWidth+'px', 'height': bodyViewHeight+'px'}">
                    <div class="v-table-body-inner">
                        <v-checkbox-group v-model="checkboxGroupModel" @change="handleCheckGroupChange">
                            <table class="v-table-btable" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                <tr v-for="(item,rowIndex) in internalTableData" class="v-table-row"
                                    :style="[trBgColor(rowIndex+1),setRowHoverColor(item.__mouseenter__),setRowClickColor(item.__columnCellClick__)]"
                                    @mouseenter.stop="handleMouseEnter(rowIndex)"
                                    @mouseleave.stop="handleMouseOut(rowIndex)">
                                    <td v-if="cellMergeInit(rowIndex,col.field,item,true)"
                                        v-for="(col,colIndex) in frozenCols"
                                        :key="colIndex"
                                        :colSpan="setColRowSpan(rowIndex,col.field,item).colSpan"
                                        :rowSpan="setColRowSpan(rowIndex,col.field,item).rowSpan"
                                        :class="[setColumnCellClassName(rowIndex,col.field,item)]">
                                        <!--存在列合并-->
                                        <div v-if="isCellMergeRender(rowIndex,col.field,item)"
                                             :class="['v-table-body-cell',showVerticalBorder ? 'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                             :style="{'width':getRowWidthByColSpan(rowIndex,col.field,item)+'px','height': getRowHeightByRowSpan(rowIndex,col.field,item)+'px','line-height':getRowHeightByRowSpan(rowIndex,col.field,item)+'px','text-align':col.columnAlign}"
                                             :title="col.overflowTitle ?  overflowTitle(item,col) :''"
                                             @click.stop="onCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                        >
                                        <span v-if="cellMergeContentType(rowIndex,col.field,item).isComponent">
                                            <component :rowData="item" :field="col.field ? col.field : ''"
                                                       :index="rowIndex"
                                                       :is="cellMerge(rowIndex,item,col.field).componentName"></component>
                                        </span>
                                            <span v-else v-html="cellMerge(rowIndex,item,col.field).content"></span>
                                        </div>
                                        <!--不存在列合并-->
                                        <div v-else
                                             :class="['v-table-body-cell',showVerticalBorder ? 'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                             :style="{'width':col.width+'px','height': rowHeight+'px','line-height':rowHeight+'px','text-align':col.columnAlign}"
                                             :title="col.overflowTitle ?  overflowTitle(item,col) :''"
                                             @click.stop="onCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                        >
                                        <span v-if="typeof col.componentName ==='string' && col.componentName.length > 0">
                                            <component :rowData="item" :field="col.field ? col.field : ''"
                                                       :index="rowIndex" :is="col.componentName"></component>
                                        </span>
                                            <span v-else-if="typeof col.formatter==='function'"
                                                  v-html="col.formatter(item,rowIndex,pagingIndex,col.field)"></span>
                                            <span v-else-if="col.type === 'selection'">
                                            <v-checkbox @change="handleCheckChange(item)" :show-slot="false"
                                                        :disabled="item._disabled" :label="rowIndex"></v-checkbox>
                                        </span>
                                            <span v-else>
                                                {{item[col.field]}}
                                        </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </v-checkbox-group>
                    </div>
                </div>
            </div>
        </template>
        <!--右列-->
        <div class="v-table-rightview"
             :style="{'width': rightViewWidth+'px'}">
            <!--右列头-->
            <div class="v-table-header v-table-title-class"
                 :style="{'width': (rightViewWidth-1)+'px','background-color':titleBgColor}">
                <div class="v-table-header-inner" style="display: block;">
                    <table class="v-table-htable" border="0" cellspacing="0" cellpadding="0">
                        <tbody>

                        <template v-if="noFrozenTitleCols.length > 0">
                            <tr v-for="row in noFrozenTitleCols">
                                <td v-for="col in row"
                                    :class="[col.titleCellClassName]"
                                    :colspan="col.colspan" :rowspan="dealTitleRowspan(row,col.rowspan)"
                                    @mousemove.stop="handleTitleMouseMove($event,col.fields)"
                                    @mousedown.stop="handleTitleMouseDown($event)"
                                    @mouseout.stop="handleTitleMouseOut()">
                                    <div :class="['v-table-title-cell',showVerticalBorder?'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                         :style="{'width':titleColumnWidth(col.fields)+'px','height':titleColumnHeight(col.rowspan)+'px','text-align':col.titleAlign}">
                                        <span class="table-title">
                                            <span v-if="col.type === 'selection'"></span>
                                            <span v-else v-html="col.title"></span>
                                            <span @click.stop="sortControl(col.fields[0],col.orderBy)"
                                                  class="v-table-sort-icon" v-if="enableSort(col.orderBy)">
                                                        <i :class='["v-icon-up-dir",col.orderBy ==="asc" ? "checked":""]'></i>
                                                        <i :class='["v-icon-down-dir",col.orderBy ==="desc" ? "checked":""]'></i>
                                            </span>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <template v-else>
                            <tr class="v-table-header-row">
                                <td v-for="(col,colIndex) in noFrozenCols"
                                    :class="[col.titleCellClassName]"
                                    @mousemove.stop="handleTitleMouseMove($event,col.field)"
                                    @mousedown.stop="handleTitleMouseDown($event)"
                                    @mouseout.stop="handleTitleMouseOut()">
                                    <div :class="['v-table-title-cell',showVerticalBorder?'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                         :style="{'width':col.width+'px','height':titleRowHeight+'px','text-align':col.titleAlign}">
                                        <span class="table-title">
                                            <span v-if="col.type === 'selection'">
                                                 <v-checkbox
                                                         @change="handleCheckAll"
                                                         :indeterminate="indeterminate"
                                                         v-model="isAllChecked"
                                                         :show-slot="false"
                                                         label="check-all"
                                                 ></v-checkbox>
                                            </span>
                                            <span v-else v-html="col.title"></span>
                                            <span @click.stop="sortControl(col.field,col.orderBy)"
                                                  class="v-table-sort-icon"
                                                  v-if="enableSort(col.orderBy)">
                                                        <i :class='["v-icon-up-dir",col.orderBy ==="asc" ? "checked":""]'></i>
                                                        <i :class='["v-icon-down-dir",col.orderBy ==="desc" ? "checked":""]'></i>
                                            </span>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--右列内容-->
            <div :class="['v-table-body v-table-body-class',hasFrozenColumn ? '' : 'v-table-rightview-special-border']"
                 :style="{'width': rightViewWidth+'px', 'height': bodyViewHeight+'px'}">
                <v-checkbox-group v-model="checkboxGroupModel" @change="handleCheckGroupChange">
                    <table class="v-table-btable" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                        <tr :key="rowIndex" v-for="(item,rowIndex) in internalTableData" class="v-table-row"
                            :style="[trBgColor(rowIndex+1),setRowHoverColor(item.__mouseenter__),setRowClickColor(item.__columnCellClick__)]"
                            @mouseenter.stop="handleMouseEnter(rowIndex)"
                            @mouseleave.stop="handleMouseOut(rowIndex)"
                        >
                            <td v-if="cellMergeInit(rowIndex,col.field,item,false)"
                                v-for="(col,colIndex) in noFrozenCols"
                                :key="colIndex"
                                :colSpan="setColRowSpan(rowIndex,col.field,item).colSpan"
                                :rowSpan="setColRowSpan(rowIndex,col.field,item).rowSpan"
                                :class="[setColumnCellClassName(rowIndex,col.field,item)]">
                                <!--存在列合并-->
                                <div v-if="isCellMergeRender(rowIndex,col.field,item)"
                                     :class="['v-table-body-cell',showVerticalBorder ? 'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                     :style="{'width':getRowWidthByColSpan(rowIndex,col.field,item)+'px','height': getRowHeightByRowSpan(rowIndex,col.field,item)+'px','line-height':getRowHeightByRowSpan(rowIndex,col.field,item)+'px','text-align':col.columnAlign}"
                                     :title="col.overflowTitle ?  overflowTitle(item,col) :''"
                                     @click.stop="onCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                >
                                <span v-if="cellMergeContentType(rowIndex,col.field,item).isComponent">
                                    <component :rowData="item" :field="col.field ? col.field : ''" :index="rowIndex"
                                               :is="cellMerge(rowIndex,item,col.field).componentName"></component>
                                </span>
                                    <span v-else v-html="cellMerge(rowIndex,item,col.field).content">
                                </span>
                                </div>
                                <!--不存在列合并-->
                                <div v-else
                                     :class="['v-table-body-cell',showVerticalBorder ? 'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                     :style="{'width':col.width+'px','height': rowHeight+'px','line-height':rowHeight+'px','text-align':col.columnAlign}"
                                     :title="col.overflowTitle ?  overflowTitle(item,col) :''"
                                     @click.stop="onCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                >
                                <span v-if="typeof col.componentName ==='string' && col.componentName.length > 0">
                                    <component :rowData="item" :field="col.field ? col.field : ''" :index="rowIndex"
                                               :is="col.componentName"></component>
                                </span>
                                    <span v-else-if="typeof col.formatter==='function'"
                                          v-html="col.formatter(item,rowIndex,pagingIndex,col.field)">
                                </span>
                                    <span v-else-if="col.type === 'selection'">
                                        <v-checkbox @change="handleCheckChange(item)" :show-slot="false"
                                                    :disabled="item._disabled" :label="rowIndex"></v-checkbox>
                                </span>
                                    <span v-else>
                                     {{item[col.field]}}
                                </span>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </v-checkbox-group>
            </div>
        </div>

        <table-empty v-if="isTableEmpty"
                     :width="internalWidth"
                     :totalColumnsWidth="totalColumnsWidth"
                     :contentHeight="errorContentHeight"
                     :titleHeight="getTotalColumnsHeight()"
                     :errorContent="errorContent"
                     :isLoading="isLoading"
        ></table-empty>

        <loading
                v-if="isLoading"
                :loadingContent="loadingContent"
        ></loading>

        <!--列拖动时的线条-->
        <div v-show="isDragging" class="v-table-drag-line"></div>
    </div>
</template>

<script>

    import scrollControlMixin from './scroll-control-mixin.js'
    import frozenColumnsMixin from './frozen-columns-mixin.js'
    import tableResizeMixin from './table-resize-mixin.js'
    import sortControlMixin from './sort-control-mixin.js'
    import tableEmptyMixin from './table-empty-mixin.js'
    import dragWidthMixin from './drag-width-mixin.js'
    import cellEditMixin from './cell-edit-mixin.js'
    import bodyCellMergeMixin from './body-cell-merge-mixin.js'
    import titleCellMergeMixin from './title-cell-merge-mixin.js'
    import checkboxSelectionMixin from './checkbox-selection-mixin.js'

    import utils from '../../src/utils/utils.js'
    import deepClone from '../../src/utils/deepClone.js'

    import tableEmpty from './table-empty.vue'
    import loading from './loading.vue'
    import VCheckboxGroup from '../../v-checkbox-group/index.js'
    import VCheckbox from '../../v-checkbox/index.js'

    export default {
        name: 'v-table',
        mixins: [tableResizeMixin, frozenColumnsMixin, scrollControlMixin, sortControlMixin, tableEmptyMixin, dragWidthMixin, cellEditMixin, bodyCellMergeMixin, titleCellMergeMixin, checkboxSelectionMixin],
        components: {tableEmpty, loading, VCheckboxGroup, VCheckbox},
        data(){
            return {
                // 本地列表数据
                internalTableData: [],
                // 本地宽度
                internalWidth: 0,
                // 本地高度
                internalHeight: 0,
                // 本地列数据
                internalColumns: [],
                // 本地复杂表头数据
                internalTitleRows: [],
                errorMsg: ' V-Table error: ',
                // 最大宽度（当width:'max'时）
                maxWidth: 5000,
                hasFrozenColumn: false,// 是否拥有固定列（false时最后一列的右边border无边框）
                hasBindScrollEvent: false, // 是否绑定了滚动事件（防止多次注册）
            }
        },
        props: {
            width: [Number, String],
            minWidth: {
                type: Number,
                require: false,
                default: 50
            },
            height: {
                type: Number,
                require: false
            },
            minHeight: {
                type: Number,
                require: false,
                default: 50
            },
            titleRowHeight: {
                type: Number,
                require: false,
                default: 38
            },
            // 随着浏览器窗口改变，横向自适应
            isHorizontalResize: {
                type: Boolean,
                require: false,
                default: false
            },
            // 随着浏览器窗口改变，垂直自适应
            isVerticalResize: {
                type: Boolean,
                require: false,
                default: false
            },

            // 垂直自适应偏移量
            VerticalResizeOffset: {
                type: Number,
                default: 0
            },

            // 表头背景颜色
            titleBgColor: {
                type: String,
                require: false,
                default: '#fff'
            },

            // 奇数行颜色
            oddBgColor: {
                type: String,
                default: '#fff'
            },
            // 偶数行颜色
            evenBgColor: {
                type: String
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
                require: true,
                default: function () {
                    return []
                }
            },
            // 分页序号
            pagingIndex: Number,
            // 没数据时的html
            errorContent: {
                type: String,
                default: '暂无数据'
            },
            // 没数据时内容区域高度
            errorContentHeight: {
                type: Number,
                default: 50
            },
            // 是否正在加载,为false 则会显示错误信息（如果加载时间较长，最好设置为true,数据返回后设置为false）
            isLoading: {
                type: Boolean,
                default: false
            },
            loadingContent: {
                type: String,
                default: '<span><i class="v-icon-spin5 animate-loading-23" style="font-size: 28px;opacity:0.6;"></i></span>'
            },
            // 不设置则没有hover效果
            rowHoverColor: {
                type: String
            },
            rowClickColor: {
                type: String
            },
            showVerticalBorder: {
                type: Boolean,
                default: true
            },
            showHorizontalBorder: {
                type: Boolean,
                default: true
            },
            // 表体单元格样式回调
            columnCellClassName: Function,
            // 行点击回调
            onRowClick: Function,
            // 鼠标进入行的回调
            rowMouseEnter: Function,
            // 鼠标离开行的回调
            rowMouseLeave: Function,
            // 单元格编辑完成回调
            cellEditDone: Function,
            // 单元格编辑格式化
            cellEditFormatter: Function,
            // 单元格合并
            cellMerge: Function,
            // select all
            selectAll: Function,
            // 单个checkbox change event
            selectChange: Function,
            // checkbox-group change event
            selectGroupChange: Function
        },
        computed: {

            // 获取表格高度
            getTableHeight(){

                return this.isTableEmpty ? this.tableEmptyHeight : this.internalHeight;
            },

            // 左侧区域宽度
            leftViewWidth(){
                var result = 0
                if (this.frozenCols && this.frozenCols.length > 0) {
                    result = this.frozenCols.reduce((total, curr) => total + curr.width, 0);
                }
                return result
            },
            // 右侧区域宽度
            rightViewWidth(){
                return this.internalWidth - this.leftViewWidth - 2;
            },

            // 左侧、右侧区域高度
            bodyViewHeight(){
                if (this.internalTitleRows.length > 0) {
                    return this.internalHeight - this.titleRowHeight * (this.internalTitleRows.length + this.getTitleRowspanTotalCount);
                } else {
                    return this.internalHeight - this.titleRowHeight;
                }
            },

            // 将复杂表头配置数据简单化
            titleRowsToSortInfo(){
                var result = [], self = this;

                if (self.internalTitleRows.length > 0) {
                    self.internalTitleRows.filter(function (row) {
                        row.filter(function (column, index) {
                            if (typeof column.orderBy === 'string' && column.fields.length === 1) {
                                column.field = column.fields[0];
                                result.push(column);
                            }
                        })
                    })
                }
                return result;
            },


            // 所有列的总宽度
            totalColumnsWidth(){
                return this.internalColumns.reduce(function (total, curr) {
                    return curr.width ? (total + curr.width) : total;
                }, 0)
            },

            // 获取所有的字段
            getColumnsFields(){
                return this.internalColumns.map((item) => {
                    return item.field;
                })
            },

            // 获取非固定列的字段集合
            getNoFrozenColumnsFields(){
                return this.internalColumns.filter(x => !x.isFrozen).map((item) => {
                    return item.field;
                })
            },

            // 获取固定列的字段集合
            getFrozenColumnsFields(){
                return this.internalColumns.filter(x => x.isFrozen).map((item) => {
                    return item.field;
                })
            }
        },
        methods: {

            setRowHoverColor(isMouseenter){

                if (this.rowHoverColor && this.rowHoverColor.length > 0 && isMouseenter) {

                    return {'background-color': this.rowHoverColor};
                }
            },

            setRowClickColor(isColumnCellClick){

                if (this.rowClickColor && this.rowClickColor.length > 0 && isColumnCellClick) {

                    return {'background-color': this.rowClickColor};
                }
            },

            // 行颜色
            trBgColor(num){
                if ((this.evenBgColor && this.evenBgColor.length > 0) || (this.oddBgColor && this.oddBgColor.length > 0)) {
                    return num % 2 === 0 ? {'background-color': this.evenBgColor} : {'background-color': this.oddBgColor};
                }
            },

            handleMouseEnter(rowIndex){

                this.internalTableData[rowIndex].__mouseenter__ = true;
                this.rowMouseEnter && this.rowMouseEnter(rowIndex);
            },

            handleMouseOut(rowIndex){

                this.internalTableData[rowIndex].__mouseenter__ = false;
                this.rowMouseLeave && this.rowMouseLeave(rowIndex);
            },

            // 设置 column 列的样式
            setColumnCellClassName(rowIndex, field, rowData){

                return this.columnCellClassName && this.columnCellClassName(rowIndex, field, rowData);
            },

            //点击数据行时，回调点击事件
            onCellClick(rowIndex, rowData, column){
                if (Array.isArray(this.internalTableData) && this.internalTableData.length > 0) {

                    var clickCell = this.internalTableData.find(x => x.__columnCellClick__);

                    if (clickCell) {
                        clickCell.__columnCellClick__ = false;
                    }

                    this.internalTableData[rowIndex].__columnCellClick__ = true;
                }

                this.onRowClick && this.onRowClick(rowIndex, rowData, column);
            },

            // 获取每个表头列的宽度
            titleColumnWidth(fields){
                var result = 0;
                if (Array.isArray(fields)) {
                    var matchItems = this.internalColumns.filter((item, index) => {
                        return fields.some(x => x === item.field);
                    })

                    result = matchItems.reduce((total, curr) => total + curr.width, 0);
                } else {
                    console.error(this.errorMsg + 'the fields attribute must be a array in titleRows')
                }
                return result;
            },

            // 获取每个表头列的高度
            titleColumnHeight(rowspan){
                if (rowspan && rowspan > 0) {
                    return this.titleRowHeight * rowspan;
                } else {
                    return this.titleRowHeight;
                }
            },

            // 超出的title提示
            overflowTitle(row, col){
                var result = '';
                if (typeof col.formatter === 'function') {
                    var val = col.formatter(row, -1);
                    // 如果是html 不处理
                    if (utils.isHtml(val)) {
                        result = '';
                    } else {
                        result = val;
                    }
                } else {
                    result = row[col.field];
                }
                return result;
            },

            // 获取所有列的总高度
            getTotalColumnsHeight(){

                var titleTotalHeight = (this.internalTitleRows && this.internalTitleRows.length > 0) ? this.titleRowHeight * this.internalTitleRows.length : this.titleRowHeight
                return titleTotalHeight + this.internalTableData.length * this.rowHeight + 1;
            },


            // 初始化width
            initTableWidth(){

                this.internalWidth = this.isHorizontalResize ? this.maxWidth : this.width;

            },

            // 当宽度设置 && 非固定列未设置宽度时（列自适应）初始化列集合
            initColumns(){

                this.internalHeight = this.height;

                this.internalColumns = Array.isArray(this.columns) ? deepClone(this.columns) : [];

                this.internalTitleRows = Array.isArray(this.titleRows) ? deepClone(this.titleRows) : [];

                this.initResizeColumns();

                this.hasFrozenColumn = this.internalColumns.some(x => x.isFrozen);

                this.initTableWidth();


                var self = this, widthCountCheck = 0;

                if (self.internalWidth && self.internalWidth > 0) {
                    self.internalColumns.map(function (item) {
                        if (!(item.width && item.width > 0)) {

                            widthCountCheck++;
                            if (self.isHorizontalResize) {
                                console.error(self.errorMsg + "If you are using the isHorizontalResize property,Please set the value for each column's width");
                            } else {
                                item.width = self.internalWidth - self.totalColumnsWidth - 2;
                            }

                        }
                    })
                }

                if (widthCountCheck > 1) {
                    console.error(this.errorMsg + 'Only allow one column is not set width');
                }

            },


            // 当没设置宽度和高度时动态计算
            initView(){

                var self = this
                // 当没有设置宽度计算总宽度
                if (!(self.internalWidth && self.internalWidth > 0)) {

                    if (self.columns && self.columns.length > 0) {
                        self.internalWidth = self.columns.reduce((total, curr) => total + curr.width, 0) + 2;

                    }
                }

                var totalColumnsHeight = self.getTotalColumnsHeight();

                // 当没有设置高度时计算总高度
                if (!(self.height && self.height > 0)) {

                    self.internalHeight = totalColumnsHeight;

                } else if (self.height > totalColumnsHeight) {  // 设置的高度小于所有列高度之和时

                    if (self.$el) {

                        self.$nextTick(x => {

                            var rightViewBody = self.$el.querySelector('.v-table-rightview .v-table-body'),
                                rightViewContent = self.$el.querySelector('.v-table-rightview .v-table-body .v-table-btable'),
                                hasHorizontalScrollBar = rightViewBody.clientWidth + 2 < rightViewContent.clientWidth,
                                scrollbarWidth = 0;

                            if (hasHorizontalScrollBar) {

                                scrollbarWidth = utils.getScrollbarWidth();
                                totalColumnsHeight += scrollbarWidth;
                            }

                            self.internalHeight = totalColumnsHeight;
                        })
                    }
                } else if (self.height <= totalColumnsHeight) {

                    self.internalHeight = self.height;
                }
            },

            initInternalTableData(data){

                var result = Array.isArray(this.tableData) ? deepClone(this.tableData) : [];

                if (result.length > 0) {

                    result.map(x => {
                        x.__mouseenter__ = false;
                        x.__columnCellClick__ = false;
                    })
                }

                return result;
            },

            // 对外暴露（隐藏显示切换时）
            resize(){

                this.$nextTick(x => {

                    this.tableResize();

                })
            }
        },
        created(){

            this.internalTableData = this.initInternalTableData(this.tableData);

            this.updateCheckboxGroupModel();

            if (Array.isArray(this.columns) && this.columns.length > 0) {

                this.initColumns();
            }

            this.$nextTick(x => {
                this.initView();
            })

            this.resize();
        },
        mounted(){

            this.tableEmpty();

            if (Array.isArray(this.tableData) && this.tableData.length > 0) {

                this.scrollControl();
                this.hasBindScrollEvent = true;
            }

            this.singelSortInit();
        },
        watch: {

            // 重新跟新列信息
            'columns': function (newVal) {

                this.initColumns();
            },
            // 重新覆盖复杂表头信息
            'titleRows': function (newVal) {

                this.initColumns();
            },

            'tableData': function (newVal) {

                this.internalTableData = this.initInternalTableData(newVal);

                this.updateCheckboxGroupModel();

                this.tableEmpty();

                if (Array.isArray(newVal) && newVal.length > 0) {

                    this.initView();

                    if (!this.hasBindScrollEvent) {
                        this.scrollControl();
                    }
                }

                this.resize();
            }
        }
    }
</script>