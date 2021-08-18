import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable cell style", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Beijing",
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
        },
        {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
        },
    ];

    const FOOTER_DATA = [
        {
            rowkey: 0,
            name: "平均值",
            date: 213,
            hobby: 355,
            address: 189,
        },
        {
            rowkey: 1,
            name: "汇总值",
            date: 1780,
            hobby: 890,
            address: 2988,
        },
    ];

    const COLUMNS = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "left",
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "left",
        },
        {
            field: "address",
            key: "d",
            title: "Address",
            width: "",
            align: "left",
        },
    ];

    const wrapper = mount(veTable, {
        propsData: {
            columns: COLUMNS,
            tableData: TABLE_DATA,
            footerData: FOOTER_DATA,
            rowKeyFieldName: "rowkey",
            cellStyleOption: {
                headerCellClass: ({ column, rowIndex }) => {
                    if (column.field === "hobby") {
                        return "table-header-cell-class";
                    }
                },
                bodyCellClass: ({ row, column, rowIndex }) => {
                    if (column.field === "hobby") {
                        return "table-body-cell-class1";
                    }

                    if (column.field === "name" && rowIndex === 2) {
                        return "table-body-cell-class2";
                    }
                },
                footerCellClass: ({ row, column, rowIndex }) => {
                    if (column.field === "address") {
                        return "table-footer-cell-class1";
                    }

                    if (column.field === "date" && rowIndex === 1) {
                        return "table-footer-cell-class2";
                    }
                },
            },
        },
    });

    it("render", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("cell style", () => {
        // header
        expect(wrapper.find(".table-header-cell-class").exists()).toBe(true);

        // body
        expect(wrapper.find(".table-body-cell-class2").exists()).toBe(true);

        // footer
        expect(wrapper.find(".table-footer-cell-class2").exists()).toBe(true);
    });
});
