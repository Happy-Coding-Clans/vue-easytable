import "babel-polyfill"
import Vue from "vue"
import APP from "./basic.vue"


new Vue({
    el: '#app',
    render: h => h(APP)
})