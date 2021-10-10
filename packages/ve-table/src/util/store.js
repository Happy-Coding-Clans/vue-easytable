import Vue from "vue";

// store states
export const storeStates = Vue.observable({
    /*
    table viewport width except scroll bar width
    */
    tableViewportWidth: 0,
    /* 
    editing cells
    1、full row edit:
    [
        {
            rowKey:"",
            row:null,
        }
    ]
    2、not full row wdit:
    [
        {
            rowKey:"",
            colKey:"",
            row:null,
            column:null
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
