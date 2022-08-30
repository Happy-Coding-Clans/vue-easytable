// prefix
export const PREFIX_CLS = "ve-table-";

// locale comp name
export const LOCALE_COMP_NAME = "table";

// column types
export const COLUMN_TYPES = {
    // expand row
    EXPAND: "expand",
    // checkbox
    CHECKBOX: "checkbox",
    // radio
    RADIO: "radio",
};

// column fixed type
export const COLUMN_FIXED_TYPE = {
    LEFT: "left",
    RIGHT: "right",
};

// expand row trigger types
export const EXPAND_TRIGGER_TYPES = {
    // trigger by click icon
    ICON: "icon",
    // trigger by click cell(td)
    CELL: "cell",
    // trigger by click row
    ROW: "row",
};

// cell selection direction
export const CELL_SELECTION_DIRECTION = {
    UP: "up",
    RIGHT: "right",
    DOWN: "down",
    LEFT: "left",
};

// autofilling direction
export const AUTOFILLING_DIRECTION = {
    UP: "up",
    RIGHT: "right",
    DOWN: "down",
    LEFT: "left",
};

// current cell selection types
export const CURRENT_CELL_SELECTION_TYPES = {
    SINGLE: "single",
    RANGE: "range",
};

// emit events
export const EMIT_EVENTS = {
    // body-cell-width-change
    BODY_CELL_WIDTH_CHANGE: "on-body-cell-width-change",
    // header-row-height-change
    HEADER_ROW_HEIGHT_CHANGE: "on-header-row-height-change",
    // footer-row-height-change
    FOOTER_ROW_HEIGHT_CHANGE: "on-footer-row-height-change",
    // body-row-height-change
    BODY_ROW_HEIGHT_CHANGE: "on-body-row-height-change",
    // body tr click
    BODY_TR_CLICK: "on-body-tr-click",
    // body td click
    BODY_TD_CLICK: "on-body-td-click",
    // body td mouseover
    BODY_TD_MOUSEOVER: "on-body-td-mouseover",
    // body td mousedown
    BODY_TD_MOUSEDOWN: "on-body-td-mousedown",
    // body td mouseup
    BODY_TD_MOUSEUP: "on-body-td-mouseup",
    // body td double click
    BODY_TD_DOUBLE_CLICK: "on-body-td-double-click",
    // body td contextmenu
    BODY_TD_CONTEXTMENU: "on-body-td-contextmenu",
    // expand row change
    EXPAND_ROW_CHANGE: "on-expand-row-change",
    // checkbox selected row change
    CHECKBOX_SELECTED_ROW_CHANGE: "on-checkbox-selected-row-change",
    // checkbox selected all change
    CHECKBOX_SELECTED_ALL_CHANGE: "on-checkbox-selected-all-change",
    // checkbox selected all ino
    CHECKBOX_SELECTED_ALL_INFO: "on-checkbox-selected-all-info",
    // radio selected row change
    RADIO_SELECTED_ROW_CHANGE: "on-radio-selected-row-change",
    // sort change
    SORT_CHANGE: "on-sort-change",
    // on-cell-selection-key-change
    CELL_SELECTION_KEY_CHANGE: "on-cell-selection-key-change",
    // on-cell-selection-range-data-change
    CELL_SELECTION_RANGE_DATA_CHANGE: "on-cell-selection-range-data-change",
    // header filter confirm
    HEADER_FILTER_CONFIRM: "on-filter-confirm",
    // header filter reset
    HEADER_FILTER_RESET: "on-filter-reset",
    // header cell contextmenu
    HEADER_CELL_CONTEXTMENU: "on-header-cell-contextmenu",
    // highlight row change
    HIGHLIGHT_ROW_CHANGE: "on-highlight-row-change",

    // edit input clicked
    EDIT_INPUT_CLICK: "on-edit-input-click",
    // edit input blur
    EDIT_INPUT_BLUR: "on-edit-input-blur",
    // edit input value change
    EDIT_INPUT_VALUE_CHANGE: "on-edit-input-value-change",
    // edit input copy
    EDIT_INPUT_COPY: "on-edit-input-copy",
    // edit input paste
    EDIT_INPUT_PASTE: "on-edit-input-paste",
    // edit input cut
    EDIT_INPUT_CUT: "on-edit-input-cut",

    // selection corner mousedown
    SELECTION_CORNER_MOUSEDOWN: "selection-corner-mousedown",
    // selection corner mouseup
    SELECTION_CORNER_MOUSEUP: "selection-corner-mouseup",
    // autofilling direction change
    AUTOFILLING_DIRECTION_CHANGE: "autofilling-direction-change",
};

// hooks name
export const HOOKS_NAME = {
    //table container scroll
    TABLE_CONTAINER_SCROLL: "table-container-scroll",
    // table size change
    TABLE_SIZE_CHANGE: "table-size-change",
    // table td width change
    TABLE_TD_WIDTH_CHANGE: "table-td-width-change",
    /*
    clipboard cell value change
    可能导致单元格高度变化，需要重新修改区域选择的定位信息
    */
    CLIPBOARD_CELL_VALUE_CHANGE: "clipboard-cell-value-change",
};

// comps name
export const COMPS_NAME = {
    VE_TABLE: "VeTable",

    VE_TABLE_THADER: "VeTableHeader",
    VE_TABLE_THADER_TR: "VeTableHeaderTr",
    VE_TABLE_THADER_Th: "VeTableHeaderTh",
    VE_TABLE_HEADER_CHECKBOX_CONTENT: "VeTableHeaderCheckboxContent",
    VE_TABLE_HEADER_FILTER_CONTENT: "VeTableHeaderFilterContent",
    VE_TABLE_HEADER_FILTER_CUSTOM_CONTENT: "VeTableHeaderFilterCustomContent",

    VE_TABLE_BODY: "VeTableBody",
    VE_TABLE_BODY_TR: "VeTableBodyTr",
    VE_TABLE_BODY_TR_SCROLLING: "VeTableBodyTrScrolling",
    VE_TABLE_BODY_CHECKBOX_CONTENT: "VeTableBodyCheckboxContent",
    VE_TABLE_BODY_RADIO_CONTENT: "VeTableBodyRadioContent",
    VE_TABLE_BODY_TD: "VeTableBodyTd",

    VE_TABLE_COLGROUP: "VeTableColgroup",
    VE_TABLE_FOOTER: "VeTableFooter",

    VE_TABLE_EXPAND_TR: "VeTableExpandTr",
    VE_TABLE_EXPAND_TR_ICON: "VeTableExpandTrIcon",

    VE_TABLE_EDIT_INPUT: "VeTableEditInput",

    VE_TABLE_SELECTION: "VeTableSelection",
};

// comps custom attrs
export const COMPS_CUSTOM_ATTRS = {
    // body row key
    BODY_ROW_KEY: "row-key",
    // body column key
    BODY_COLUMN_KEY: "col-key",
};

// instance methods
export const INSTANCE_METHODS = {
    // scroll to pixels
    SCROLL_TO: "scrollTo",
    // scroll to rowKey
    SCROLL_TO_ROW_KEY: "scrollToRowKey",
    // scroll to colKey
    SCROLL_TO_COL_KEY: "scrollToColKey",
    // start editing cell
    START_EDITING_CELL: "startEditingCell",
    // stop editing cell
    STOP_EDITING_CELL: "stopEditingCell",
    // set highlight row
    SET_HIGHLIGHT_ROW: "setHighlightRow",
    // set cell selection
    SET_CELL_SELECTION: "setCellSelection",
    // hide columns by keys
    HIDE_COLUMNS_BY_KEYS: "hideColumnsByKeys",
    // show columns by keys
    SHOW_COLUMNS_BY_KEYS: "showColumnsByKeys",
};

// contextmenu types
export const CONTEXTMENU_TYPES = {
    // separator
    SEPARATOR: "SEPARATOR",
    // insert row above
    INSERT_ROW_ABOVE: "INSERT_ROW_ABOVE",
    // insert row below
    INSERT_ROW_BELOW: "INSERT_ROW_BELOW",
    // remove row
    REMOVE_ROW: "REMOVE_ROW",
    // hide column
    HIDE_COLUMN: "HIDE_COLUMN",
};
