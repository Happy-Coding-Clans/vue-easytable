export default {
    pagination: {
        goto: "前往",
        page: "頁",
        itemsPerPage: " 筆/頁",
        total: (total) => `共 ${total} 筆`,
        prev5: "往前 5 頁",
        next5: "往後 5 頁",
    },
    table: {
        confirmFilter: "篩選",
        resetFilter: "置",
        // contextmenu
        cut: "剪切",
        copy: "複製",
        insertRowAbove: "上方插入行",
        insertRowBelow: "下方插入行",
        removeRow: "删除 $1 行",
        emptyRow: "清空 $1 行",
        //removeColumn: "删除列",
        emptyColumn: "清空 $1 列",
        //hideColumn: "隱藏列",
        emptyCell: "清空儲存格",
        leftFixedColumnTo: "左列凍結至該列",
        cancelLeftFixedColumnTo: "取消左列凍結",
        rightFixedColumnTo: "右列凍結至該列",
        cancelRightFixedColumnTo: "取消右列凍結",
    },
};
