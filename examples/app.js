import "babel-polyfill"
import Vue from "vue"
import APP from "./app.vue"
import router from './router.js'

import './css/app.css'


import '../packages/themes/default/index.css'

/*引用table和分页*/

/*import {VTable} from '../src/index.js'*/
import {VTable} from 'vue-EasyTable'


/*只引用table*/
/*import VTable from '../packages/v-table'*/
/*import VTable from 'VTable'*/


Vue.component(VTable.name, VTable)

new Vue({
    el: '#app',
    router,
    render: h => h(APP)
})