import Vue from "vue";
import VueRouter from "vue-router";

const childRouterTpl = r => require.ensure([], () => r(require('./comp/child-router-tpl.vue')), 'childRouterTpl');

const intro = r => require.ensure([], () => r(require('./doc/intro.md')), 'intro');
const install = r => require.ensure([], () => r(require('./doc/install.md')), 'install');
const start = r => require.ensure([], () => r(require('./doc/strart.md')), 'start');
const pagination = r => require.ensure([], () => r(require('./doc/pagination/Pagination.md')), 'pagination');
/*const table = r => require.ensure([], () => r(require('./doc/table/main.md')), 'table');*/
const checkbox = r => require.ensure([], () => r(require('./doc/checkbox/main.md')), 'checkbox');
const select = r => require.ensure([], () => r(require('./doc/select/main.vue')), 'select');
const dropdown = r => require.ensure([], () => r(require('./doc/dropdown/main.vue')), 'dropdown');

const basic =  r => require.ensure([], () => r(require('./doc/table/basic/main.md')), 'basic');
const horizontalResize =  r => require.ensure([], () => r(require('./doc/table/horizontal-resize/main.md')), 'horizontalResize');
const verticalResize =  r => require.ensure([], () => r(require('./doc/table/vertical-resize/main.md')), 'verticalResize');
const customColumns =  r => require.ensure([], () => r(require('./doc/table/customColumns/main.md')), 'customColumns');
const cellStyle =  r => require.ensure([], () => r(require('./doc/table/cell-style/main.md')), 'cellStyle');
const columnWidthDrag =  r => require.ensure([], () => r(require('./doc/table/column-width-drag/main.md')), 'columnWidthDrag');
const selection =  r => require.ensure([], () => r(require('./doc/table/selection/main.md')), 'selection');
const cellEdit =  r => require.ensure([], () => r(require('./doc/table/cell-edit/main.md')), 'cellEdit');
const cellMerge =  r => require.ensure([], () => r(require('./doc/table/rowspan-colspan/main.md')), 'cellMerge');
const conditionFilters =  r => require.ensure([], () => r(require('./doc/table/condition-filters/main.md')), 'conditionFilters');
const footerSummary =  r => require.ensure([], () => r(require('./doc/table/footer-summary/main.md')), 'footerSummary');
const loading =  r => require.ensure([], () => r(require('./doc/table/loading/main.md')), 'loading');
const sort =  r => require.ensure([], () => r(require('./doc/table/sort/main.md')), 'sort');
const fixedColumnsTitle =  r => require.ensure([], () => r(require('./doc/table/fixed-columns-title/main.md')), 'fixedColumnsTitle');
const hideTable =  r => require.ensure([], () => r(require('./doc/table/hide-table/main.md')), 'hideTable');
const combinedPaging =  r => require.ensure([], () => r(require('./doc/table/combined-paging/main.md')), 'combinedPaging');
const api =  r => require.ensure([], () => r(require('./doc/table/api/main.md')), 'api');

const draggableTable = r => require.ensure([], () => r(require('./doc/draggable-table/basic/main.md')), 'draggableTable');

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        { path: '/', redirect: '/intro',name:'简介' }, // 默认路由
        { path: '/intro', component: intro ,name:'简介'},
        { path: '/install', component: install ,name:'安装'},
        { path: '/start', component: start ,name:'开始'},
        { path: '/pagination', component: pagination ,name:'分页'},
        { path: '/draggable_table', component: draggableTable ,name:'拖拽表格'},
        { path: '/table',name:'表格', component: childRouterTpl ,redirect:'/table/basic',
            children : [
                {path : 'basic', component :basic, name : '基础表格'},
                {path : 'horizontalResize', component :horizontalResize, name : '表格横向自适应'},
                {path : 'verticalResize', component :verticalResize, name : '表格纵向自适应'},
                {path : 'customColumns', component :customColumns, name : '自定义列'},
                {path : 'cellStyle', component :cellStyle, name : '单元格样式'},
                {path : 'columnWidthDrag', component :columnWidthDrag, name : '列宽拖动'},
                {path : 'selection', component :selection, name : '多选功能'},
                {path : 'cellEdit', component :cellEdit, name : '单元格编辑'},
                {path : 'cellMerge', component :cellMerge, name : '行列合并'},
                {path : 'conditionFilters', component :conditionFilters, name : '条件筛选'},
                {path : 'footerSummary', component :footerSummary, name : 'footer 汇总'},
                {path : 'loading', component :loading, name : 'loading 以及错误提示'},
                {path : 'sort', component :sort, name : '排序'},
                {path : 'fixedColumnsTitle', component :fixedColumnsTitle, name : '固定表头固定列'},
                {path : 'hideTable', component :hideTable, name : '隐藏表格'},
                {path : 'combinedPaging', component :combinedPaging, name : '表格结合分页'},
                {path : 'api', component :api, name : 'api'}
            ]},
        { path: '/checkbox', component: checkbox,name:'多选' },
        { path: '/select', component: select,name:'选择' },
        { path: '/dropdown', component: dropdown,name:'下拉' },

        {
            path: '*',
            redirect: '/intro'
        }
        /*  {
         path: '*', component: {
         template: '<div>抱歉，没有您要的页面。</div>'
         }
         }*/
    ]
})