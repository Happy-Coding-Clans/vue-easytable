import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable row style", () => {
    const TABLE_DATA = [
        {
            rowKey: 0,
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            rowKey: 1,
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Beijing",
        },
        {
            rowKey: 2,
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
        },
        {
            rowKey: 3,
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
        },
        {
            rowKey: 4,
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
        },
    ];

    const COLUMNS = [
        {
            field: "name",
            key: "b",
            title: "Name",
            width: 200,
            align: "left",
        },
        {
            field: "hobby",
            key: "c",
            title: "Hobby",
            width: 300,
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

    it("render", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowStyleOption: {
                    stripe: true,
                    hoverHighlight: true,
                    clickHighlight: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("rowStyleOption", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowStyleOption: {
                    stripe: true,
                    hoverHighlight: true,
                    clickHighlight: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.findAll(".ve-table-stripe").exists()).toBe(true);
        expect(wrapper.findAll(".ve-table-row-hover").exists()).toBe(true);
        expect(wrapper.findAll(".ve-table-row-highlight").exists()).toBe(true);
    });

    it("row click highlight ", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowStyleOption: {
                    stripe: true,
                    hoverHighlight: true,
                    clickHighlight: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });

        const firstTr = wrapper.findAll(".ve-table-body-tr").at(0);

        firstTr.trigger("click");

        await later();

        expect(firstTr.classes()).toContain("ve-table-tr-highlight");
    });

    it("row highlight by setHighlightRow method", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowStyleOption: {
                    stripe: true,
                    hoverHighlight: true,
                    clickHighlight: true,
                },
                rowKeyFieldName: "rowKey",
            },
        });

        wrapper.vm.setHighlightRow({ rowKey: 2 });

        await later();

        const highlightRow = wrapper.findAll(".ve-table-body-tr").at(2);

        expect(highlightRow.classes()).toContain("ve-table-tr-highlight");
    });
});
