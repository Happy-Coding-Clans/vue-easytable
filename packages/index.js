import VTable from "./v-table/index";
import VPagination from "./v-pagination/index";
import VCheckbox from './v-checkbox/index'
import VCheckboxGroup from './v-checkbox-group/index'


const install = function (Vue, opts = {}) {

    Vue.component(VTable.name, VTable);
    Vue.component(VPagination.name, VPagination);
    Vue.component(VCheckbox.name, VCheckbox);
    Vue.component(VCheckboxGroup.name, VCheckboxGroup);

}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    VPagination,
    VTable,
    VCheckbox,
    VCheckboxGroup
};
