import Vue from "vue";

// store
export const store = Vue.observable({
    /*
    table viewport width except scroll bar width
    */
    tableViewportWidth: 0,
    /* 
    editing cells
    [
        {
            rowKey:"",
            colKey:""
        }
    ]
    */
    editingCells: [],
    /*
    editing focus cell
    {
        rowKey:"",
        colKey:""
    }
    */
    editingFocusCell: null,
});

// mutation
export const mutations = {
    // set store
    setStore(payload) {
        Object.assign(store, payload);
    },
};
