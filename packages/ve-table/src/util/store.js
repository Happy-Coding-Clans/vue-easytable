import Vue from "vue";

// store
export const store = Vue.observable({
    /*
    table view port width except scroll bar width
    */
    tableViewportWidth: 0
});

// mutation
export const mutations = {
    // set store
    setStore(payload) {
        Object.assign(store, payload);
    }
};
