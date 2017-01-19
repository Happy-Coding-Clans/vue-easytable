import VTable from './src/table.vue';

/* istanbul ignore next */
VTable.install = function(Vue) {
    Vue.component(VTable.name, VTable);
};

export default VTable;
