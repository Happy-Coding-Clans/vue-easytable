import VTable from "./v-table/index";
import VPagination from "./v-pagination/index";


const install = function (Vue, opts = {}) {

    Vue.component(VTable.name, VTable);
    Vue.component(VPagination.name, VPagination);

}

module.exports = {
    VPagination,
    VTable
};
