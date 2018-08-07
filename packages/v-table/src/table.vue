<template>
    <div class="v-table-views v-table-class"
         :style="{'width': internalWidth+'px', 'height': getTableHeight+'px','background-color':tableBgColor}">
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
                                        :colspan="col.colspan" :rowspan="col.rowspan"

                                        @mousemove.stop="handleTitleMouseMove($event,col.fields)"
                                        @mousedown.stop="handleTitleMouseDown($event)"
                                        @mouseout.stop="handleTitleMouseOut()"
                                        @click.stop="titleCellClick(col.fields,col.title);"
                                        @dblclick.stop="titleCellDblClick(col.fields,col.title)">
                                        <div :class="['v-table-title-cell',showVerticalBorder?'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                             :style="{'width':titleColumnWidth(col.fields)+'px','height':titleColumnHeight(col.rowspan)+'px','text-align':col.titleAlign}">
                                            <span class="table-title">
                                               <span v-if="isSelectionCol(col.fields)">
                                                     <v-checkbox
                                                             @change="handleCheckAll"
                                                             :indeterminate="indeterminate"
                                                             v-model="isAllChecked"
                                                             :show-slot="false"
                                                             label="check-all"
                                                     ></v-checkbox>
                                                </span>
                                                <span v-else v-html="col.title"></span>
                                                <span @click.stop="sortControl(col.fields[0])"
                                                      class="v-table-sort-icon" v-if="enableSort(col.orderBy)">
                                                        <i :class='["v-icon-up-dir",getCurrentSort(col.fields[0]) ==="asc" ? "checked":""]'></i>
                                                        <i :class='["v-icon-down-dir",getCurrentSort(col.fields[0]) ==="desc" ? "checked":""]'></i>
                                                </span>
                                            </span>
                                            <!--filters-->
                                            <v-dropdown class="v-table-dropdown" v-if="enableFilters(col.filters,col.fields)"
                                                        v-model="col.filters"
                                                        :show-operation="col.filterMultiple"
                                                        :is-multiple="col.filterMultiple"
                                                        @on-filter-method="filterEvent"
                                                        @change="filterConditionChange(col.filterMultiple)"
                                            >
                                                <i :class="['v-table-filter-icon',vTableFiltersIcon(col.filters)]"></i>
                                            </v-dropdown>
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
                                        @mouseout.stop="handleTitleMouseOut()"
                                        @click.stop="titleCellClick(col.field,col.title);"
                                        @dblclick.stop="titleCellDblClick(col.field,col.title)">
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
                                                    <span @click.stop="sortControl(col.field)"
                                                          class="v-table-sort-icon" v-if="enableSort(col.orderBy)">
                                                            <i :class='["v-icon-up-dir",getCurrentSort(col.field) ==="asc" ? "checked":""]'></i>
                                                            <i :class='["v-icon-down-dir",getCurrentSort(col.field) ==="desc" ? "checked":""]'></i>
                                                    </span>
                                                </span>
                                                <!--filters-->
                                                <v-dropdown class="v-table-dropdown" v-if="enableFilters(col.filters)"
                                                            v-model="col.filters"
                                                            :show-operation="col.filterMultiple"
                                                            :is-multiple="col.filterMultiple"
                                                            @on-filter-method="filterEvent"
                                                            @change="filterConditionChange(col.filterMultiple)"
                                                >
                                                    <i :class="['v-table-filter-icon',vTableFiltersIcon(col.filters)]"></i>
                                                </v-dropdown>
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
                    <div :class="['v-table-body-inner',vTableBodyInner]">
                        <v-checkbox-group v-model="checkboxGroupModel" @change="handleCheckGroupChange">
                            <table class="v-table-btable" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                <tr v-for="(item,rowIndex) in internalTableData" class="v-table-row"
                                    :style="[trBgColor(rowIndex+1)]"
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
                                             :title="col.overflowTitle ?  overflowTitle(item,rowIndex,col) :''"
                                             @click.stop="rowCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                             @dblclick.stop="rowCellDbClick(rowIndex,item,col)"
                                        >
                                        <span v-if="cellMergeContentType(rowIndex,col.field,item).isComponent">
                                            <component :rowData="item" :field="col.field ? col.field : ''"
                                                       :index="rowIndex"
                                                       :is="cellMerge(rowIndex,item,col.field).componentName"
                                                       @on-custom-comp="customCompFunc"></component>
                                        </span>
                                            <span v-else v-html="cellMerge(rowIndex,item,col.field).content"></span>
                                        </div>
                                        <!--不存在列合并-->
                                        <div v-else
                                             :class="['v-table-body-cell',showVerticalBorder ? 'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                             :style="{'width':col.width+'px','height': rowHeight+'px','line-height':rowHeight+'px','text-align':col.columnAlign}"
                                             :title="col.overflowTitle ?  overflowTitle(item,rowIndex,col) :''"
                                             @click.stop="rowCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                             @dblclick.stop="rowCellDbClick(rowIndex,item,col)"
                                        >
                                        <span v-if="typeof col.componentName ==='string' && col.componentName.length > 0">
                                            <component :rowData="item" :field="col.field ? col.field : ''"
                                                       :index="rowIndex" :is="col.componentName"
                                                       @on-custom-comp="customCompFunc"></component>
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

                <!--footer-->
                <div v-if="frozenFooterCols.length > 0"
                     :class="['v-table-footer','v-table-footer-class']"
                     :style="{'width': leftViewWidth+'px','height':footerTotalHeight}">
                    <table class="v-table-ftable" cellspacing="0" cellpadding="0" border="0">
                        <tr class="v-table-row" v-for="(item,rowIndex) in frozenFooterCols">
                            <td v-for="(col,colIndex) in item"
                                :class="setFooterCellClassName(true,rowIndex,colIndex,col.content)">
                                <div :style="{'height':footerRowHeight+'px','line-height':footerRowHeight+'px','width':col.width+'px','text-align':col.align}"
                                     :class="['v-table-body-cell',vTableBodyCell]"
                                     v-html="col.content"></div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </template>
        <!--右列-->
        <div class="v-table-rightview"
             :style="{'width': rightViewWidth+'px','left': leftViewWidth+'px'}">
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
                                    :colspan="col.colspan" :rowspan="col.rowspan"
                                    @mousemove.stop="handleTitleMouseMove($event,col.fields)"
                                    @mousedown.stop="handleTitleMouseDown($event)"
                                    @mouseout.stop="handleTitleMouseOut()"
                                    @click.stop="titleCellClick(col.fields,col.title);"
                                    @dblclick.stop="titleCellDblClick(col.fields,col.title)">
                                    <div :class="['v-table-title-cell',showVerticalBorder?'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                         :style="{'width':titleColumnWidth(col.fields)+'px','height':titleColumnHeight(col.rowspan)+'px','text-align':col.titleAlign}">
                                        <span class="table-title">
                                          <span v-if="isSelectionCol(col.fields)">
                                                 <v-checkbox
                                                         @change="handleCheckAll"
                                                         :indeterminate="indeterminate"
                                                         v-model="isAllChecked"
                                                         :show-slot="false"
                                                         label="check-all"
                                                 ></v-checkbox>
                                            </span>
                                            <span v-else v-html="col.title"></span>
                                            <span @click.stop="sortControl(col.fields[0])"
                                                  class="v-table-sort-icon" v-if="enableSort(col.orderBy)">
                                                        <i :class='["v-icon-up-dir",getCurrentSort(col.fields[0]) ==="asc" ? "checked":""]'></i>
                                                        <i :class='["v-icon-down-dir",getCurrentSort(col.fields[0]) ==="desc" ? "checked":""]'></i>
                                            </span>
                                        </span>
                                        <!--filters-->
                                        <v-dropdown class="v-table-dropdown" v-if="enableFilters(col.filters,col.fields)"
                                                    v-model="col.filters"
                                                    :show-operation="col.filterMultiple"
                                                    :is-multiple="col.filterMultiple"
                                                    @on-filter-method="filterEvent"
                                                    @change="filterConditionChange(col.filterMultiple)"
                                        >
                                            <i :class="['v-table-filter-icon',vTableFiltersIcon(col.filters)]"></i>
                                        </v-dropdown>
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
                                    @mouseout.stop="handleTitleMouseOut()"
                                    @click.stop="titleCellClick(col.field,col.title);"
                                    @dblclick.stop="titleCellDblClick(col.field,col.title)">
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
                                            <span @click.stop="sortControl(col.field)"
                                                  class="v-table-sort-icon"
                                                  v-if="enableSort(col.orderBy)">
                                                        <i :class='["v-icon-up-dir",getCurrentSort(col.field) ==="asc" ? "checked":""]'></i>
                                                        <i :class='["v-icon-down-dir",getCurrentSort(col.field) ==="desc" ? "checked":""]'></i>
                                            </span>
                                            <!--filters-->
                                            <v-dropdown class="v-table-dropdown" v-if="enableFilters(col.filters)"
                                                        v-model="col.filters"
                                                        :show-operation="col.filterMultiple"
                                                        :is-multiple="col.filterMultiple"
                                                        @on-filter-method="filterEvent"
                                                        @change="filterConditionChange(col.filterMultiple)"
                                            >
                                                 <i :class="['v-table-filter-icon',vTableFiltersIcon(col.filters)]"></i>
                                            </v-dropdown>
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
            <div :class="['v-table-body v-table-body-class',vTableRightBody]"
                 :style="{'width': rightViewWidth+'px', 'height': bodyViewHeight+'px'}">
                <v-checkbox-group v-model="checkboxGroupModel" @change="handleCheckGroupChange">
                    <table class="v-table-btable" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                        <tr :key="rowIndex" v-for="(item,rowIndex) in internalTableData" class="v-table-row"
                            :style="[trBgColor(rowIndex+1)]"
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
                                     :title="col.overflowTitle ?  overflowTitle(item,rowIndex,col) :''"
                                     @click.stop="rowCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                     @dblclick.stop="rowCellDbClick(rowIndex,item,col)"
                                >
                                <span v-if="cellMergeContentType(rowIndex,col.field,item).isComponent">
                                    <component :rowData="item" :field="col.field ? col.field : ''" :index="rowIndex"
                                               :is="cellMerge(rowIndex,item,col.field).componentName"
                                               @on-custom-comp="customCompFunc"></component>
                                </span>
                                    <span v-else v-html="cellMerge(rowIndex,item,col.field).content">
                                </span>
                                </div>
                                <!--不存在列合并-->
                                <div v-else
                                     :class="['v-table-body-cell',showVerticalBorder ? 'vertical-border':'',showHorizontalBorder?'horizontal-border':'']"
                                     :style="{'width':col.width+'px','height': rowHeight+'px','line-height':rowHeight+'px','text-align':col.columnAlign}"
                                     :title="col.overflowTitle ?  overflowTitle(item,rowIndex,col) :''"
                                     @click.stop="rowCellClick(rowIndex,item,col);cellEditClick($event,col.isEdit,item,col.field,rowIndex)"
                                     @dblclick.stop="rowCellDbClick(rowIndex,item,col)"
                                >
                                <span v-if="typeof col.componentName ==='string' && col.componentName.length > 0">
                                    <component :rowData="item" :field="col.field ? col.field : ''" :index="rowIndex"
                                               :is="col.componentName" @on-custom-comp="customCompFunc"></component>
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

            <!--footer-->
            <div v-if="noFrozenFooterCols.length > 0"
                 :class="['v-table-footer','v-table-footer-class',vTableFooter]"
                 :style="{'width': rightViewWidth+'px','height':footerTotalHeight}">
                <table class="v-table-ftable" cellspacing="0" cellpadding="0" border="0">
                    <tr class="v-table-row" v-for="(item,rowIndex) in noFrozenFooterCols">
                        <td v-for="(col,colIndex) in item"
                            :class="setFooterCellClassName(false,rowIndex,colIndex,col.content)">
                            <div :style="{'height':footerRowHeight+'px','line-height':footerRowHeight+'px','width':col.width+'px','text-align':col.align}"
                                 :class="['v-table-body-cell',vTableBodyCell]"
                                 v-html="col.content"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 固定操作列 -->
        <div class="v-table-actionview"
             :style="{'width': actionViewWidth+'px'}">
            <div class="v-table-header v-table-title-class"
                 :style="{'width': (actionViewWidth-1)+'px','background-color':titleBgColor}">
                <div class="v-table-header-inner" style="display: block;">
                    <table class="v-table-htable" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr>
                            <td>
                                <div :class="['v-table-title-cell','horizontal-border','vertical-border-left']"
                                     :style="{'width':actionViewWidth+'px','height':titleColumnHeight()+'px','lineHeight':titleColumnHeight()+'px','text-align':'center'}">
                                    操作
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div :class="['v-table-body v-table-body-class',vTableRightBody]"
                 :style="{'width': actionViewWidth+'px', 'height': bodyViewHeight+'px'}">
                <table class="v-table-btable" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                    <tr :key="rowIndex" v-for="(item,rowIndex) in internalTableData" class="v-table-row">
                        <td style="text-align: center;">
                            <div :class="['v-table-body-cell','horizontal-border','vertical-border-left']"
                                 :style="{'width':actionViewWidth+'px','height': rowHeight+'px','line-height':rowHeight+'px'}">
                                <!-- 渲染操作按钮 -->
                                <button v-for="(action, i) in actions" :key="i"
                                        :class="['v-table-btn', action.class]" @click="doAction(action.key, item)">
                                    <span style="padding: 0px 2px;">
                                    {{action.text}}
                                    </span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <table-empty v-if="isTableEmpty"
                     :width="internalWidth"
                     :total-columns-width="totalColumnsWidth"
                     :content-height="errorContentHeight"
                     :title-height="getTotalColumnsHeight()"
                     :error-content="errorContent"
                     :is-loading="isLoading"
        ></table-empty>

        <loading
                v-if="isLoading"
                :loading-content="loadingContent"
                :title-rows="internalTitleRows"
                :title-row-height="titleRowHeight"
                :columns="internalColumns"
                :loading-opacity="loadingOpacity"
        ></loading>

        <!--列拖动时的线条-->
        <div v-show="isDragging" class="v-table-drag-line"></div>
    </div>
</template>

<script>

    import classesMixin from './classes-mixin.js'
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
    import tableFooterMixin from './table-footer-mixin.js'
    import scrollBarControlMixin from './scroll-bar-control-mixin.js'
    import tableRowMouseEventsMixin from './table-row-mouse-events-mixin'
    import tableFiltersMixin from './table-filters-mixin'

    import utils from '../../src/utils/utils.js'
    import deepClone from '../../src/utils/deepClone.js'

    import tableEmpty from './table-empty.vue'
    import loading from './loading.vue'
    import VCheckboxGroup from '../../v-checkbox-group/index.js'
    import VCheckbox from '../../v-checkbox/index.js'
    import VDropdown from '../../v-dropdown/index.js'


    export default {
        name: 'v-table',
        mixins: [classesMixin, tableResizeMixin, frozenColumnsMixin, scrollControlMixin, sortControlMixin, tableEmptyMixin, dragWidthMixin, cellEditMixin, bodyCellMergeMixin, titleCellMergeMixin, checkboxSelectionMixin, tableFooterMixin, scrollBarControlMixin, tableRowMouseEventsMixin, tableFiltersMixin],
        components: {tableEmpty, loading, VCheckboxGroup, VCheckbox, VDropdown},
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
                resizeTimer: null
            }
        },
        props: {
            width: [Number, String],
            minWidth: {
                type: Number,
                default: 50
            },
            height: {
                type: Number,
                require: false
            },
            minHeight: {
                type: Number,
                default: 50
            },
            titleRowHeight: {
                type: Number,
                default: 38
            },
            // 随着浏览器窗口改变，横向自适应
            isHorizontalResize: {
                type: Boolean,
                default: false
            },
            // 随着浏览器窗口改变，垂直自适应
            isVerticalResize: {
                type: Boolean,
                default: false
            },

            // 垂直自适应偏移量
            verticalResizeOffset: {
                type: Number,
                default: 0
            },

            tableBgColor: {
                type: String,
                default: '#fff'
            },

            // 表头背景颜色
            titleBgColor: {
                type: String,
                default: '#fff'
            },

            // 奇数行颜色
            oddBgColor: {
                type: String,
                default: ''
            },
            // 偶数行颜色
            evenBgColor: {
                type: String,
                default: ''
            },
            // 内容行高
            rowHeight: {
                type: Number,
                default: 40
            },
            // 多列排序
            multipleSort: {
                type: Boolean,
                default: true
            },
            // 只在 升序和倒序切换
            sortAlways: {
                type: Boolean,
                default: false
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
            footer: {
                type: Array,
                default: function () {
                    return []
                }
            },
            footerRowHeight: {
                type: Number,
                default: 40
            },
            columnWidthDrag: {
                type: Boolean,
                default: false
            },
            loadingOpacity: {
                type: Number,
                default: 0.6
            },
            // 表体单元格样式回调
            columnCellClassName: Function,
            // footer单元格样式回调
            footerCellClassName: Function,
            // 行单击回调
            rowClick: Function,
            // 行双击回调
            rowDblclick: Function,
            // 表头单元格单击回调
            titleClick: Function,
            // 表头单元格双击回调
            titleDblclick: Function,
            // 鼠标进入行的回调
            rowMouseEnter: Function,
            // 鼠标离开行的回调
            rowMouseLeave: Function,
            // 单元格编辑完成回调
            cellEditDone: Function,
            // 单元格合并
            cellMerge: Function,
            // select all
            selectAll: Function,
            // 单个checkbox change event
            selectChange: Function,
            // checkbox-group change event
            selectGroupChange: Function,
            // filter event
            filterMethod: Function,
            // actions
            // {
            //      key: '',    // 回调方法关键字参数
            //      text: '',   // 按钮显示文本
            //      class: '',  // 样式：info,success,warn,error
            // }
            actions: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        computed: {

            // 是否是复杂表头
            isComplexTitle(){

                return (Array.isArray(this.internalTitleRows) && this.internalTitleRows.length > 0);
            },

            // 获取表格高度
            getTableHeight(){

                return this.isTableEmpty ? this.tableEmptyHeight : this.internalHeight;
            },

            // 左侧区域宽度
            leftViewWidth(){
                var result = 0
                if (this.hasFrozenColumn) {
                    result = this.frozenCols.reduce((total, curr) => total + curr.width, 0);
                }
                return result
            },
            // 右侧区域宽度
            rightViewWidth(){

                let result = this.internalWidth - this.leftViewWidth - this.actionViewWidth;

                return this.hasFrozenColumn ? result - 2 : result;
            },
            // 操作列宽度
            actionViewWidth() {
                if (this.actions.length > 0) {
                    return 60 + this.actions.length * 40;
                }
                return 0;
            },

            // 左侧、右侧区域高度
            bodyViewHeight(){
                var result;
                if (this.internalTitleRows.length > 0) {

                    result = this.internalHeight - this.titleRowHeight * (this.internalTitleRows.length + this.getTitleRowspanTotalCount);
                } else {
                    result = this.internalHeight - this.titleRowHeight;
                }

                // 1px: 当有滚动条时，使滚动条显示全
                result -= (this.footerTotalHeight + 1);

                return result;
            },

            // 所有列的总宽度
            totalColumnsWidth(){
                return this.internalColumns.reduce(function (total, curr) {
                    return curr.width ? (total + curr.width) : total;
                }, 0)
            },

            // 获取未固定列的总宽度
            totalNoFrozenColumnsWidth(){

                return this.noFrozenCols.reduce(function (total, curr) {
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
            // custom columns component event
            customCompFunc(params){

                this.$emit('on-custom-comp', params);
            },

            // 行颜色
            trBgColor(num){
                if ((this.evenBgColor && this.evenBgColor.length > 0) || (this.oddBgColor && this.oddBgColor.length > 0)) {
                    return num % 2 === 0 ? {'background-color': this.evenBgColor} : {'background-color': this.oddBgColor};
                }
            },

            // 设置 column 列的样式
            setColumnCellClassName(rowIndex, field, rowData){

                return this.columnCellClassName && this.columnCellClassName(rowIndex, field, rowData);
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
            overflowTitle(row, rowIndex, col){

                var result = '';
                if (typeof col.formatter === 'function') {
                    var val = col.formatter(row, rowIndex, this.pagingIndex, col.field);
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

                var titleTotalHeight = (this.internalTitleRows && this.internalTitleRows.length > 0) ? this.titleRowHeight * this.internalTitleRows.length : this.titleRowHeight;

                titleTotalHeight += this.footerTotalHeight;

                return titleTotalHeight + this.internalTableData.length * this.rowHeight + 1;
            },


            // 初始化width
            initTableWidth(){

                this.internalWidth = this.isHorizontalResize ? this.maxWidth : this.width;

            },

            // 当宽度设置 && 非固定列未设置宽度时（列自适应）初始化列集合
            initColumns(){

                this.internalHeight = this.height;

                this.footerTotalHeight = this.getFooterTotalRowHeight;

                this.internalColumns = Array.isArray(this.columns) ? deepClone(this.columns) : [];

                this.internalTitleRows = Array.isArray(this.titleRows) ? deepClone(this.titleRows) : [];

                this.initColumnsFilters();

                this.initResizeColumns();

                this.hasFrozenColumn = this.internalColumns.some(x => x.isFrozen);

                this.initTableWidth();

                this.setSortColumns();


                var self = this, widthCountCheck = 0;

                if (self.internalWidth && self.internalWidth > 0) {
                    self.internalColumns.map(function (item) {
                        if (!(item.width && item.width > 0)) {

                            widthCountCheck++;
                            if (self.isHorizontalResize) {
                                console.error(self.errorMsg + "If you are using the isHorizontalResize property,Please set the value for each column's width");
                            } else {
                                item.width = self.internalWidth - self.totalColumnsWidth;
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

                // 当没有设置宽度计算总宽度
                if (!(this.internalWidth && this.internalWidth > 0)) {

                    if (this.columns && this.columns.length > 0) {
                        this.internalWidth = this.columns.reduce((total, curr) => total + curr.width, 0);

                    }
                }

                var totalColumnsHeight = this.getTotalColumnsHeight();

                // 当没有设置高度时计算总高度 || 设置的高度大于所有列高度之和时
                if (!(this.height && this.height > 0) || this.height > totalColumnsHeight) {

                    if (!this.isVerticalResize) {

                        this.internalHeight = totalColumnsHeight;
                    }

                } else if (this.height <= totalColumnsHeight) {

                    this.internalHeight = this.height;
                }
            },

            initInternalTableData(){

                return Array.isArray(this.tableData) ? deepClone(this.tableData) : [];
            },

            // 对外暴露（隐藏显示切换时）
            resize(){
                // fixed bug in IE9 #17
                this.resizeTimer = setTimeout(x => {

                    this.tableResize();
                })
            },

            // 触发table中声明的@do-action方法
            doAction(key, row) {
                this.$emit('do-action', key, row);
            }
        },
        created(){

            this.internalTableData = this.initInternalTableData(this.tableData);

            if (Array.isArray(this.columns) && this.columns.length > 0) {

                this.initColumns();
            }

            this.updateCheckboxGroupModel();

            this.initView();
        },
        mounted(){

            this.setScrollbarWidth();

            this.tableEmpty();

            this.tableResize();

            if (Array.isArray(this.tableData) && this.tableData.length > 0) {

                this.scrollControl();
            }

            this.controlScrollBar();
        },
        watch: {

            // 重新跟新列信息
            'columns': {
                handler: function (newVal) {

                    this.initColumns();
                },
                deep: true
            },
            // 重新覆盖复杂表头信息
            'titleRows': {
                handler: function (newVal) {

                    this.initColumns();
                },
                deep: true
            },

            // deep watch
            'tableData': {

                handler: function (newVal) {

                    this.skipRenderCells = [];

                    this.internalTableData = this.initInternalTableData(newVal);

                    this.updateCheckboxGroupModel();

                    this.tableEmpty();

                    if (Array.isArray(newVal) && newVal.length > 0) {

                        this.initView();

                        this.scrollControl();
                    }

                    this.resize();
                },
                deep: true
            },
            'pagingIndex': {

                handler: function () {

                    this.clearCurrentRow();

                    this.bodyScrollTop();
                }
            }
        },
        beforeDestroy(){

            clearTimeout(this.resizeTimer);
        }
    }
</script>