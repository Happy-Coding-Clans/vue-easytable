import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";

describe("veTable row radio", () => {
    const TABLE_DATA = [
        {
            rowKey: 1001,
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
        },
        {
            rowKey: 1002,
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Beijing",
        },
        {
            rowKey: 1003,
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
        },
        {
            rowKey: 1004,
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
        },
        {
            rowKey: 1005,
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
        },
    ];

    const COLUMNS = [
        {
            field: "",
            key: "a",
            // type=radio
            type: "radio",
            title: "",
            width: 50,
            align: "center",
        },
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
                radioOption: {
                    // 行选择改变事件
                    selectedRowChange: ({ row }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("has radio", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                radioOption: {
                    // 行选择改变事件
                    selectedRowChange: ({ row }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.find(".ve-radio").exists()).toBe(true);
    });

    it("check default selected key", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                radioOption: {
                    defaultSelectedRowKey: 1003,
                    // 行选择改变事件
                    selectedRowChange: ({ row }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(2)
                .find(".ve-radio-checked")
                .exists(),
        ).toBe(true);
    });

    it("check disable selected keys", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                radioOption: {
                    defaultSelectedRowKey: 1003,
                    disableSelectedRowKeys: [1003, 1005],
                    // 行选择改变事件
                    selectedRowChange: ({ row }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(2)
                .find(".ve-radio-checked.ve-radio-disabled")
                .exists(),
        ).toBe(true);

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(4)
                .find(".ve-radio-disabled")
                .exists(),
        ).toBe(true);
    });

    it("controllable attr selectedRowKey", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                radioOption: {
                    selectedRowKey: "",
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.find(".ve-radio-checked").exists()).toBe(false);

        wrapper.setProps({
            radioOption: {
                selectedRowKey: 1003,
            },
        });

        await later();

        expect(wrapper.find(".ve-radio-checked").exists()).toBe(true);
    });

    it("radioOption selectedRowChange event", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                radioOption: {
                    selectedRowChange: ({ row }) => {
                        mockFn(row);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0)
            .find(".ve-radio")
            .trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(TABLE_DATA[0]);
    });
});
