import "babel-polyfill"
import Vue from "vue"
import APP from "./sort-by-multiple-columns.vue"


new Vue({
    el: '#app',
    render: h => h(APP)
})