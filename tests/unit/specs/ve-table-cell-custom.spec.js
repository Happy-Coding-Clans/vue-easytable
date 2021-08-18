import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable cell custom", () => {
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
            renderHeaderCell: ({ column }, h) => {
                return (
                    <span
                        class="header-cell-custom-class-test"
                        style="color:#1890ff;"
                    >
                        {column.name}
                    </span>
                );
            },
            renderBodyCell: ({ row, column, rowIndex }, h) => {
                return (
                    <span
                        class="body-cell-custom-class-test"
                        style="color:#1890ff;"
                    >
                        {++rowIndex}
                    </span>
                );
            },
            renderFooterCell: ({ row, column, rowIndex }, h) => {
                return (
                    <span class="footer-cell-custom-class-test" style="">
                        {row.name}
                    </span>
                );
            },
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
        },
    });

    it("render", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("cell custom", () => {
        // header
        expect(wrapper.find(".header-cell-custom-class-test").exists()).toBe(
            true,
        );

        // body
        expect(wrapper.find(".body-cell-custom-class-test").exists()).toBe(
            true,
        );

        // footer
        expect(wrapper.find(".footer-cell-custom-class-test").exists()).toBe(
            true,
        );
    });
});
