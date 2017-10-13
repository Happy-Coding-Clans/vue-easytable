import Vue from "vue";
import VueRouter from "vue-router";

const start = r => require.ensure([], () => r(require('./doc/strart.md')), 'start');
const pagination = r => require.ensure([], () => r(require('./doc/pagination/Pagination.md')), 'pagination');
const table = r => require.ensure([], () => r(require('./doc/table/main.md')), 'table');
const checkbox = r => require.ensure([], () => r(require('./doc/checkbox/main.md')), 'checkbox');



Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        { path: '/', redirect: '/start' }, // 默认路由
        { path: '/start', component: start },
        { path: '/pagination', component: pagination },
        { path: '/table', component: table },
        { path: '/checkbox', component: checkbox },

        {
            path: '*',
            redirect: '/start'
        }
        /*  {
              path: '*', component: {
              template: '<div>抱歉，没有您要的页面。</div>'
               }
          }*/
    ]
})