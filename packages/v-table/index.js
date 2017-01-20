import VTable from './src/table.vue';

VTable.install = function(Vue) {
    Vue.component(VTable.name, VTable);
};

export default VTable;
