import Vue from "vue";
import VueRouter from "vue-router";

const basic = r => require.ensure([], () => r(require('./01-basic.vue')), 'basic')
const custom_columns = r => require.ensure([], () => r(require('./02-custom-columns.vue')), 'custom-columns')
const custom_columns_advanced = r => require.ensure([], () => r(require('./03-custom-columns-advanced.vue')), 'custom-columns-advanced')
const sort_by_multiple_columns = r => require.ensure([], () => r(require('./04-sort-by-multiple-columns.vue')), 'sort-by-multiple-columns')
const sort_by_single_columns = r => require.ensure([], () => r(require('./05-sort-by-single-columns.vue')), 'sort-by-single-columns')
const frozen_title_columns = r => require.ensure([], () => r(require('./06-frozen-title-columns.vue')), 'frozen-title-columns')
const frozen_title_columns_advanced = r => require.ensure([], () => r(require('./07-frozen-title-columns-advanced.vue')), 'frozen-title-columns-advanced')
const complex_title = r => require.ensure([], () => r(require('./08-complex-title.vue')), 'complex-title')

const pagination = r => require.ensure([], () => r(require('./21-pagination.vue')), 'pagination')

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        {path: '/', redirect: '/basic'}, // 默认路由
        {path: '/basic', component: basic},
        {path: '/custom_columns', component: custom_columns},
        {path: '/custom_columns_advanced', component: custom_columns_advanced},
        {path: '/sort_by_multiple_columns', component: sort_by_multiple_columns},
        {path: '/sort_by_single_columns', component: sort_by_single_columns},
        {path: '/frozen_title_columns', component: frozen_title_columns},
        {path: '/frozen_title_columns_advanced', component: frozen_title_columns_advanced},
        {path: '/complex_title', component: complex_title},

        {path: '/pagination', component: pagination},
        {
            path: '*', redirect: '/basic'
        }
       /* {
            path: '*', component: {
            template: '<div>抱歉，没有您要的页面。</div>'
        }
        }*/
    ]
})
