import Vue from "vue";
import VueRouter from "vue-router";

const intro = r => require.ensure([], () => r(require('./doc/intro.md')), 'intro');
const install = r => require.ensure([], () => r(require('./doc/install.md')), 'install');
const start = r => require.ensure([], () => r(require('./doc/strart.md')), 'start');
const pagination = r => require.ensure([], () => r(require('./doc/pagination/Pagination.md')), 'pagination');
const table = r => require.ensure([], () => r(require('./doc/table/main.md')), 'table');
const checkbox = r => require.ensure([], () => r(require('./doc/checkbox/main.md')), 'checkbox');
const select = r => require.ensure([], () => r(require('./doc/select/main.vue')), 'select');
const dropdown = r => require.ensure([], () => r(require('./doc/dropdown/main.vue')), 'dropdown');



Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        { path: '/', redirect: '/intro' }, // 默认路由
        { path: '/intro', component: intro },
        { path: '/install', component: install },
        { path: '/start', component: start },
        { path: '/pagination', component: pagination },
        { path: '/table', component: table },
        { path: '/checkbox', component: checkbox },
        { path: '/select', component: select },
        { path: '/dropdown', component: dropdown },

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