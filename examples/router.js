import Vue from "vue";
import VueRouter from "vue-router";

const updateLog = r => require.ensure([], () => r(require('./doc/strart.md')), 'updateLog');
/*const updateLog = r => require.ensure([], () => r(require('./architecture/UpdateLog.vue')), 'updateLog');*/
const pagination = r => require.ensure([], () => r(require('./doc/pagination/Pagination.md')), 'pagination');
const table = r => require.ensure([], () => r(require('./doc/table/main.md')), 'table');



Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        { path: '/', redirect: '/updateLog' }, // 默认路由
        { path: '/updateLog', component: updateLog },
        { path: '/pagination', component: pagination },
        { path: '/table', component: table },

        {
            path: '*',
            redirect: '/updateLog'
        }
        /*  {
              path: '*', component: {
              template: '<div>抱歉，没有您要的页面。</div>'
               }
          }*/
    ]
})