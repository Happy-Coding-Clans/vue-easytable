import VTable from "../packages/v-table";
import VPagination from "../packages/v-pagination";


const install = function (Vue, opts = {}) {

    Vue.component(VTable.name, VTable);
    Vue.component(VPagination.name, VPagination);

}

module.exports = {
    version: '0.0.1',
    VPagination,
    VTable
};
