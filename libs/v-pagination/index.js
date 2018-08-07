import VPagination from './src/pagination.js';

VPagination.install = function(Vue) {
    Vue.component(VPagination.name, VPagination);
};

export default VPagination;