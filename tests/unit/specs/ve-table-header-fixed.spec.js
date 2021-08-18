import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";

describe("veTable header fixed", () => {
    const TABLE_DATA = [
        {
            rowkey: 0,
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            rowkey: 1,
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
        },
        {
            rowkey: 2,
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
        },
        {
            rowkey: 3,
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
        },
        {
            rowkey: 4,
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
        },
        {
            rowkey: 5,
            name: "Jami2",
            date: "2020-09-10",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
        },
    ];

    const TABLE_COLUMNS = [
        {
            field: "name",
            key: "a",
            title: "Name",
            align: "center",
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
            align: "center",
        },
        { field: "address", key: "d", title: "Address", align: "left" },
    ];

    it("render", () => {
        const wrapper = mount(veTable, {
            propsData: {
                maxHeight: 200,
                fixedHeader: true,
                columns: TABLE_COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("maxHeight props", () => {
        const wrapper = mount(veTable, {
            propsData: {
                maxHeight: 200,
                fixedHeader: true,
                columns: TABLE_COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        expect(wrapper.find(".ve-table-container").attributes("style")).toBe(
            "max-height: 200px;",
        );
    });

    it("fixedHeader props", () => {
        const wrapper = mount(veTable, {
            propsData: {
                maxHeight: 200,
                fixedHeader: true,
                columns: TABLE_COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowkey",
            },
        });

        expect(wrapper.find(".ve-table-fixed-header").exists()).toBe(true);
    });
});
