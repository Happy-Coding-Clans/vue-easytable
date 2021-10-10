import Vue from "vue";

// store states
export const storeStates = Vue.observable({
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

// store mutation
export const storeMutations = {
    // set store
    setStore(payload) {
        Object.assign(storeStates, payload);
    },
};
