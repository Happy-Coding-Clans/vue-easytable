export default {
    pagination: {
        goto: "이동",
        page: "페이지",
        itemsPerPage: " / 페이지",
        total: (total) => `총 ${total}`,
        prev5: "5페이지 뒤로 이동",
        next5: "5페이지 앞으로 이동",
    },
    table: {
        confirmFilter: "확인",
        resetFilter: "초기화",
        // contextmenu event
        cut: "잘라내다",
        copy: "복사하다",
        insertRowAbove: "위에 행 삽입",
        insertRowBelow: "아래에 행 삽입",
        removeRow: "$1 행 제거",
        emptyRow: "$1 행 비우기",
        //removeColumn: "열 제거",
        emptyColumn: "$1 열 비우기",
        //hideColumn: "열 숨기기",
        emptyCell: "셀을 비우다",
        leftFixedColumnTo: "왼쪽 고정 열을",
        cancelLeftFixedColumnTo: "왼쪽 고정 열 취소",
        rightFixedColumnTo: "오른쪽 고정 열",
        cancelRightFixedColumnTo: "오른쪽 고정 열 취소",
    },
};
