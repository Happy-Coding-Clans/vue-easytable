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
                                <draggable  class="v-table-tbody" v-model="internalTableData" :options="draggableOption" element="tbody"  @start="startDrag" @end="endLeftDrag">
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
                                </draggable>
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
                        <draggable  class="v-table-tbody" v-model="internalTableData" :options="draggableOption" element="tbody"  @start="startDrag" @end="endDrag">
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
                        </draggable>
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
    import draggable from 'vuedraggable'
    import tableMixin from '../../v-table/src/table-mixin.js'
    export default {
        mixins: [tableMixin],
        name: 'v-draggable-table',
        components: {draggable},
        props: {
            dragOptions: {
                type: Object,
                default: function () {
                    return  {
                    }
                }
            }
        },
        computed: {
            // 获取拖拽参数
            draggableOption () {
                return Object.assign({}, this.dragOptions, {
                    draggable: '.v-table-row'
                })
            }
        },
        methods: {
            // 开始拖动
            startDrag () {
                this.$emit('start',this.internalTableData )
            },
            endLeftDrag () {
                this.endDrag()
                var body1 = this.$el.querySelector('.v-table-leftview .v-table-body')
                var body2 = this.$el.querySelector('.v-table-rightview .v-table-body')
                if (body1) {
                    body2.scrollTop = body1.scrollTop
                }
            },
            // 结束拖动
            endDrag () {
                this.$emit('end',this.internalTableData )
            }

        }
    }
</script>