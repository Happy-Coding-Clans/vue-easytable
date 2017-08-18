import Vue from "vue";
import VueRouter from "vue-router";

const start = r => require.ensure([], () => r(require('./doc/strart.md')), 'start');
const pagination = r => require.ensure([], () => r(require('./doc/pagination/Pagination.md')), 'pagination');
const table = r => require.ensure([], () => r(require('./doc/table/main.md')), 'table');



Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        { path: '/', redirect: '/start' }, // 默认路由
        { path: '/start', component: start },
        { path: '/pagination', component: pagination },
        { path: '/table', component: table },

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