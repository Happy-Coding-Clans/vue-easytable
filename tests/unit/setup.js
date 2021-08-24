import Vue from "vue";
import { Wrapper } from "@vue/test-utils";
import vueEasytable from "../../packages/index";

Vue.use(vueEasytable);

// add Wrapper prototype
Object.assign(Wrapper.prototype, {
    findResizeObserver() {
        return this.findComponent({ name: "vue-dom-resize-observer" });
    },
    triggerResizeObserver({ width = 0, height = 0 }) {
        const ob = this.findResizeObserver();
        ob.vm.resizeListener({ width, height });
    },
});
