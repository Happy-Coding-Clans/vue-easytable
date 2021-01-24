/*
暂未使用
*/


import Vue from "vue";

// store
export const store = Vue.observable({
    cloneTableData: [],
    cloneColumns: []
});

// mutation
export const mutations = {
    initStoreData({ cloneTableData, cloneColumns }) {
        store.cloneTableData = cloneTableData;
        store.cloneColumns = cloneColumns;
    }
};
