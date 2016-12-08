import "babel-polyfill"
import Vue from "vue"
import APP from "./custom-columns-advanced.vue"


new Vue({
    el: '#app',
    render: h => h(APP)
})