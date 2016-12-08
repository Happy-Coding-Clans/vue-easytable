import "babel-polyfill"
import Vue from "vue"
import APP from "./sort-by-single-columns.vue"


new Vue({
    el: '#app',
    render: h => h(APP)
})