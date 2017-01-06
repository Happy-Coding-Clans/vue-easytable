import "babel-polyfill"
import Vue from "vue"
import APP from "./frozen-title-columns.vue"


new Vue({
    el: '#app',
    render: h => h(APP)
})