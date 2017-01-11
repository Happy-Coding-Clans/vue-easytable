import "babel-polyfill"
import Vue from "vue"
import APP from "./app.vue"
import router from './router.js'

import './css/app.css'
import '../src/css/basic.css'

new Vue({
    el: '#app',
    router,
    render: h => h(APP)
})