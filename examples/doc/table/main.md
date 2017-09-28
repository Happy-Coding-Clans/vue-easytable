:::demo
```html
<template>
    <div>
        <div class="mt30">
            <h1>Table 表格</h1>
            <div>主要包含以下功能：</div>
            <div>1、自适应，可以随着浏览器窗口改变自动适应</div>
            <div>2、固定列，表头固定</div>
            <div>3、列宽拖动（默认支持）</div>
            <div>4、排序，支持单个、多个字段排序</div>
            <div>5、自定义列、自定义单元格样式、loading效果等</div>
            <div>6、自带分页组件</div>
            <div>7、单元格编辑</div>
        </div>


        <div class="mt30">
            <h3>基础用法</h3>

            <div class="mt30">
                <div class="bold">
                <a  class="anchor" id="table-basic-set-table-width" @click.stop="goAnchor('table-basic-set-table-width')">#</a>
                设置表格宽度，最后一列不设置</div>
                <basic-set-table-width></basic-set-table-width>
            </div>
            <div class="mt30">
                <div class="bold">
                <a  class="anchor" id="table-basic-no-table-width" @click.stop="goAnchor('table-basic-no-table-width')">#</a>
                不设置表格总体宽度，只设置每列的宽度</div>
                <basic-no-table-width></basic-no-table-width>
            </div>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-set-cell-class-name" @click.stop="goAnchor('table-set-cell-class-name')">#</a>
                给单元格设置样式</div>
                <set-cell-class-name></set-cell-class-name>
            </div>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-custom-columns" @click.stop="goAnchor('table-custom-columns')">#</a>
                自定义列</div>
                <custom-columns></custom-columns>
            </div>

        </div>

        <div class="mt30">
            <h3>单元格编辑</h3>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-cell-edit" @click.stop="goAnchor('table-cell-edit')">#</a>
                支持单元格编辑</div>
                <cell-edit></cell-edit>
            </div>
        </div>

        <div class="mt30">
            <h3>表格排序</h3>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-sort-by-single-columns" @click.stop="goAnchor('table-sort-by-single-columns')">#</a>
                根据一个字段排序</div>
                <sort-by-single-columns></sort-by-single-columns>
            </div>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-sort-by-multiple-columns" @click.stop="goAnchor('table-sort-by-multiple-columns')">#</a>
                根据多个字段排序</div>
                <sort-by-multiple-columns></sort-by-multiple-columns>
            </div>
        </div>

        <div class="mt30">
            <h3>固定列、固定表头、复杂表头</h3>


            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-frozen-title-columns" @click.stop="goAnchor('table-frozen-title-columns')">#</a>
                固定表头+固定列</div>
                <frozen-title-columns></frozen-title-columns>
            </div>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-complex-header-fixed-column" @click.stop="goAnchor('table-complex-header-fixed-column')">#</a>
                固定复杂表头+固定列</div>
                <complex-header-fixed-column></complex-header-fixed-column>
            </div>
        </div>

        <div class="mt30 mb30">
            <h3>表格自适应（改变浏览器窗口大小试试看）</h3>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-simple-table-resize" @click.stop="goAnchor('table-simple-table-resize')">#</a>
                简单表格自适应</div>
                <simple-table-resize></simple-table-resize>
            </div>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-complex-table-resize" @click.stop="goAnchor('table-complex-table-resize')">#</a>
                复杂表格自适应，设置方式同上</div>
                <complex-table-resize></complex-table-resize>

            </div>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-hide-table-resize" @click.stop="goAnchor('table-hide-table-resize')">#</a>
                自适应的显示隐藏切换</div>
                <hide-table-resize></hide-table-resize>
            </div>


            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-container-resize" @click.stop="goAnchor('table-container-resize')">#</a>
                容器中自适应</div>
                <container-resize></container-resize>

            </div>
        </div>

        <div class="mt30 mb30">
            <h3>设置loading 和 暂无数据</h3>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-loading-and-error-content" @click.stop="goAnchor('table-loading-and-error-content')">#</a>
                开启loading效果</div>
                <set-loading-and-error-content></set-loading-and-error-content>
            </div>

            <div class="mt30">
                <div class="bold">
                <a class="anchor" id="table-custom-set-loading-and-error-content" @click.stop="goAnchor('table-custom-set-loading-and-error-content')">#</a>
                自定义loading 以及 错误信息</div>
                <custom-set-loading-and-error-content></custom-set-loading-and-error-content>
            </div>

        </div>

        <div class="mt30 mb30">
                <h3>
                <a class="anchor" id="table-combined-paging" @click.stop="goAnchor('table-combined-paging')">#</a>
                结合分页的完整实例</h3>
                <combined-paging></combined-paging>
        </div>

        <!--api-->
        <h3>
         <a class="anchor" id="table-api" @click.stop="goAnchor('table-api')">#</a>
         API
        </h3>

        <api></api>
    </div>
</template>

<script>

    import anchorMixin from '../../mixin/anchor-mixin.js'

    import basicSetTableWidth from './basic-set-table-width.md'
    import basicNoTableWidth from './basic-no-table-width.md'
    import setCellClassName from './set-cell-class-name.md'
    import customColumns from './custom-columns.md'

    import cellEdit from './cell-edit.md'

    import sortBySingleColumns from './sort-by-single-columns.md'
    import sortByMultipleColumns from './sort-by-multiple-columns.md'

    import frozenTitleColumns from './frozen-title-columns.md'
    import complexHeaderFixedColumn from './complex-header-fixed-column.md'

    import simpleTableResize from './simple-table-resize.md'
    import complexTableResize from './complex-table-resize.md'

    import hideTableResize from './hide-table-resize.md'
    import containerResize from './container-resize.md'

    import customSetLoadingAndErrorContent from './custom-set-loading-and-error-content.md'
    import setLoadingAndErrorContent from './set-loading-and-error-content.md'

    import combinedPaging from './combinedPaging.md'


    import api from './api.md'


    export default{
        name: "Table",
        mixins:[anchorMixin],
        components: {
            basicSetTableWidth,
            basicNoTableWidth,
            setCellClassName,
            customColumns,

            complexHeaderFixedColumn,
            frozenTitleColumns,

            cellEdit,

            sortByMultipleColumns,
            sortBySingleColumns,

            simpleTableResize,
            complexTableResize,
            containerResize,
            hideTableResize,

            setLoadingAndErrorContent,
            customSetLoadingAndErrorContent,

            combinedPaging,

            api
        },
        data() {
            return {}
        },
    }
</script>

```
:::