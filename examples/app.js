import "babel-polyfill"
import Vue from "vue"
import APP from "./app.vue"
import router from './router.js'


new Vue({
    el: '#app',
    router,
    render: h => h(APP)
})