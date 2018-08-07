import VSelect from './src/select.vue';

VSelect.install = function(Vue) {
    Vue.component(VSelect.name, VSelect);
};

export default VSelect;