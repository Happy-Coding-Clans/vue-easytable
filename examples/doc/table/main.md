:::demo
```html
<template>
    <div>
        <div class="mt30">
            <h1>Table 表格</h1>
        </div>

        <div class="mt30">
            <h3>基础用法</h3>

            <div class="mt30">
                <anchor id="table-basic-set-table-width" label="基础用法，最后一列不设置" h4 ></anchor>
                <basic-set-table-width></basic-set-table-width>
            </div>
            <div class="mt30">
                <anchor id="table-basic-no-table-width" label="基础用法，只设置每列的宽度" h4 ></anchor>
                <basic-no-table-width></basic-no-table-width>
            </div>

            <div class="mt30">
                <anchor id="table-simple-table-resize" label="简单表格自适应" h4 ></anchor>
                <simple-table-resize></simple-table-resize>
            </div>
        </div>

        <div class="mt30">
            <h3>自定义单元格、自定义列</h3>

            <div class="mt30">
                <anchor id="table-set-cell-class-name" label="给单元格设置样式" h4 ></anchor>
                <set-cell-class-name></set-cell-class-name>
            </div>

            <div class="mt30">
                <anchor id="table-custom-columns" label="自定义列" h4 ></anchor>
                <custom-columns></custom-columns>
            </div>
        </div>

        <div class="mt30">
             <h3>列宽拖动</h3>

             <div class="mt30">
                 <anchor id="table-column-width-drag" label="列宽拖动" h4 ></anchor>
                 <column-width-drag></column-width-drag>
             </div>

        </div>

        <div class="mt30">
             <h3>selection 多选</h3>

             <div class="mt30">
                 <anchor id="table-selection-simple" label="简单的多选功能" h4 ></anchor>
                 <selection-simple></selection-simple>
             </div>

             <div class="mt30">
                 <anchor id="table-selection-advanced" label="多选功能高级用法" h4 ></anchor>
                 <selection-advanced></selection-advanced>
             </div>
        </div>

        <div class="mt30">
            <h3>单元格编辑</h3>

            <div class="mt30">
                <anchor id="table-cell-edit-advanced" label="单元格编辑用法" h4 ></anchor>
                <cell-edit-advanced></cell-edit-advanced>
            </div>
        </div>

        <div class="mt30">
            <h3>表格排序</h3>

            <div class="mt30">
                <anchor id="table-sort-by-single-columns" label="单个字段排序" h4 ></anchor>
                <sort-by-single-columns></sort-by-single-columns>
            </div>

            <div class="mt30">
                <anchor id="table-sort-by-multiple-columns" label="多个字段排序" h4 ></anchor>
                <sort-by-multiple-columns></sort-by-multiple-columns>
            </div>
        </div>

         <div class="mt30">
            <h3>数据筛选</h3>

            <div class="mt30">
                <anchor id="table-filters" label="数据筛选功能" h4 ></anchor>
                <filters></filters>
            </div>

             <div class="mt30">
                <anchor id="table-complex-header-filters" label="复杂表头中使用筛选功能" h4 ></anchor>
                <complex-header-filters></complex-header-filters>
            </div>

        </div>

       <div class="mt30">
            <h3>footer 汇总功能</h3>

            <div class="mt30">
                <anchor id="table-footer-summary" label="footer 汇总功能" h4 ></anchor>
                <footer-summary></footer-summary>
            </div>
        </div>

        <div class="mt30">
            <h3>固定列、固定表头、复杂表头</h3>

            <div class="mt30">
                <anchor id="table-frozen-title-columns" label="固定表头和固定列" h4 ></anchor>
                <frozen-title-columns></frozen-title-columns>
            </div>

            <div class="mt30">
                <anchor id="table-complex-header-fixed-column" label="固定复杂表头和固定列" h4 ></anchor>
                <complex-header-fixed-column></complex-header-fixed-column>
            </div>
        </div>

         <div class="mt30">
                <h3>单元格合并</h3>

                <div class="mt30">
                    <anchor id="table-cell-merge" label="支持 rowSpan、colSpan" h4 ></anchor>
                    <cell-merge></cell-merge>
                </div>
         </div>

        <div class="mt30 mb30">
            <h3>表格自适应（改变浏览器窗口大小试试看）</h3>

            <div class="mt30">
                <anchor id="table-complex-table-resize" label="复杂表格自适应" h4 ></anchor>
                <complex-table-resize></complex-table-resize>

            </div>

            <div class="mt30">
                <anchor id="table-hide-table-resize" label="自适应的显示隐藏切换" h4 ></anchor>
                <hide-table-resize></hide-table-resize>
            </div>


            <div class="mt30">
                <anchor id="table-container-resize" label="容器中自适应" h4 ></anchor>
                <container-resize></container-resize>

            </div>
        </div>

        <div class="mt30 mb30">
            <h3>设置loading 和 暂无数据</h3>

            <div class="mt30">
                <anchor id="table-loading-and-error-content" label="开启loading效果" h4 ></anchor>
                <set-loading-and-error-content></set-loading-and-error-content>
            </div>

            <div class="mt30">
                <anchor id="table-custom-set-loading-and-error-content" label="自定义loading 以及 错误信息" h4 ></anchor>
                <custom-set-loading-and-error-content></custom-set-loading-and-error-content>
            </div>

        </div>

        <div class="mt30 mb30">
                <anchor id="table-combined-paging" label="结合分页的完整实例" h4 ></anchor>
                <combined-paging></combined-paging>
        </div>

        <!--api-->
        <anchor id="table-api" label="API" h3 ></anchor>
        <api></api>
    </div>
</template>

<script>

    import basicSetTableWidth from './basic-set-table-width.md'
    import basicNoTableWidth from './basic-no-table-width.md'
    import setCellClassName from './set-cell-class-name.md'
    import customColumns from './custom-columns.md'

    import cellEditAdvanced from './cell-edit-advanced.md'

    import sortBySingleColumns from './sort-by-single-columns.md'
    import sortByMultipleColumns from './sort-by-multiple-columns.md'

    import frozenTitleColumns from './frozen-title-columns.md'
    import complexHeaderFixedColumn from './complex-header-fixed-column.md'

    import cellMerge from './cell-merge.md'

    import simpleTableResize from './simple-table-resize.md'
    import complexTableResize from './complex-table-resize.md'

    import hideTableResize from './hide-table-resize.md'
    import containerResize from './container-resize.md'

    import customSetLoadingAndErrorContent from './custom-set-loading-and-error-content.md'
    import setLoadingAndErrorContent from './set-loading-and-error-content.md'

    import selectionSimple from './selection-simple.md'
    import selectionAdvanced from './selection-advanced.md'

    import combinedPaging from './combinedPaging.md'

    import footerSummary from './footer-summary.md'

    import columnWidthDrag from './column-width-drag.md'

    import filters from './filters.md'
    import complexHeaderFilters from './complex-header-filters.md'


    import api from './api.md'


    export default{
        name: "Table",
        components: {
            basicSetTableWidth,
            basicNoTableWidth,
            setCellClassName,
            customColumns,

            complexHeaderFixedColumn,
            frozenTitleColumns,

            cellMerge,

            cellEditAdvanced,

            sortByMultipleColumns,
            sortBySingleColumns,

            simpleTableResize,
            complexTableResize,
            containerResize,
            hideTableResize,

            setLoadingAndErrorContent,
            customSetLoadingAndErrorContent,

            selectionSimple,
            selectionAdvanced,

            combinedPaging,

            footerSummary,

            columnWidthDrag,

            filters,
            complexHeaderFilters,

            api
        },
        data() {
            return {}
        },
    }
</script>

```
:::