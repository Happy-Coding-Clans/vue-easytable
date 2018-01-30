import VDropdown from './src/dropdown.vue';

VDropdown.install = function(Vue) {
    Vue.component(VDropdown.name, VDropdown);
};

export default VDropdown;