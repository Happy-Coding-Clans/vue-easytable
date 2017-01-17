import "babel-polyfill"
import Vue from "vue"
import APP from "./app.vue"
import router from './router.js'

import './css/app.css'
import '../src/css/basic.css'

import EasyTable from 'easyTable'
Vue.component(EasyTable.name, EasyTable)

new Vue({
    el: '#app',
    router,
    render: h => h(APP)
})