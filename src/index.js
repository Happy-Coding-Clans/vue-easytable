/*import EasyPagination from '../packages/easy-pagination';*/
import VTable from '../packages/v-table';

const install = function(Vue, opts = {}) {
/*    Vue.component(EasyPagination.name, EasyPagination);*/
    Vue.component(VTable.name, VTable);
}

module.exports = {
    version: '0.0.1',
/*    EasyPagination,*/
    VTable
};
