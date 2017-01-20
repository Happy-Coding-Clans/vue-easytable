import VPagination from './src/pagination.vue';

VPagination.install = function(Vue) {
    Vue.component(VPagination.name, VPagination);
};

export default VPagination;