import Vue from 'vue'
import APP from './comp/App.vue'
import router from './router'

import NProgress from 'nprogress'; // Progress 进度条

import './css/index.css'
import './css/custom.css'

// Progress 进度条 样式
import 'nprogress/nprogress.css';
// highlight theme
import 'highlight.js/styles/color-brewer.css';

import demoBox from './comp/DemoBox.vue'
Vue.component('demo-box', demoBox);


import '../packages/themes-base/index.css'
import {VTable,VPagination} from '../packages/index.js'

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)



router.beforeEach((to, from, next) => {

    NProgress.start();

    next();

    NProgress.done();
})

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});

new Vue({
    el: '#app',
    router,
    render: h => h(APP)
})