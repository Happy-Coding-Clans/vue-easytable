import "babel-polyfill"
import Vue from "vue"
import APP from "./customColumns.vue"


new Vue({
    el: '#app',
    render: h => h(APP)
})