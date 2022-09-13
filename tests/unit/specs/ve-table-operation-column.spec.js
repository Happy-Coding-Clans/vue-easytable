import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";
import { KEY_CODES } from "../constant";

describe("veTable operation column", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
            rowKey: "1",
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Beijing",
            rowKey: "2",
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
            rowKey: "3",
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
            rowKey: "4",
        },
        {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
            rowKey: "5",
        },
    ];

    const COLUMNS = [
        {
            field: "index",
            key: "index",
            operationColumn: true,
            title: "#",
            width: 50,
            align: "center",
            renderBodyCell: ({ row, column, rowIndex }, h) => {
                return ++rowIndex;
            },
            edit: true,
        },
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "left",
            width: "20%",
        },
        {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
            width: "20%",
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "center",
            width: "30%",
        },
        { field: "address", key: "d", title: "Address", width: "30%" },
    ];

    it("render", () => {
        const WRAPPER = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                cellSelectionOption: {
                    // default true
                    enable: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });
        expect(WRAPPER.html()).toMatchSnapshot();
    });

    it("operation column", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
            },
        });

        await later();

        const selectionTd = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(selectionTd.classes()).toContain("ve-table-operation-col");
    });
});
