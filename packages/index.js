// This file is auto gererated by build/build-entry.js

import VeCheckbox from './ve-checkbox';
import VeCheckboxGroup from './ve-checkbox-group';
import VeContextmenu from './ve-contextmenu';
import VeDropdown from './ve-dropdown';
import VeIcon from './ve-icon';
import VeLoading from './ve-loading';
import VeLocale from './ve-locale';
import VePagination from './ve-pagination';
import VeRadio from './ve-radio';
import VeSelect from './ve-select';
import VeTable from './ve-table';


const version = '2.17.3';
const components = [
  VeCheckbox,
  VeCheckboxGroup,
  VeContextmenu,
  VeDropdown,
  VeIcon,
  VeLoading,
  VeLocale,
  VePagination,
  VeRadio,
  VeSelect,
  VeTable
];

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });

  Vue.prototype.$veLoading = VeLoading;
  Vue.prototype.$veLocale = VeLocale;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  VeCheckbox,
  VeCheckboxGroup,
  VeContextmenu,
  VeDropdown,
  VeIcon,
  VeLoading,
  VeLocale,
  VePagination,
  VeRadio,
  VeSelect,
  VeTable
};

export default {
  install,
  version,
  VeCheckbox,
  VeCheckboxGroup,
  VeContextmenu,
  VeDropdown,
  VeIcon,
  VeLoading,
  VeLocale,
  VePagination,
  VeRadio,
  VeSelect,
  VeTable
};
