import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";
import { KEY_CODES } from "../constant";

describe("veTable cell edit", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
            rowKey: 0,
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
            rowKey: 1,
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
            rowKey: 2,
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
            rowKey: 3,
        },
        {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
            rowKey: 4,
        },
    ];

    const COLUMNS = [
        {
            field: "name",
            key: "name",
            title: "Name",
            align: "left",
            width: "15%",
            edit: true,
        },
        {
            field: "date",
            key: "date",
            title: "Date",
            align: "left",
            width: "15%",
            edit: true,
        },
        {
            field: "hobby",
            key: "hobby",
            title: "Hobby",
            align: "center",
            width: "30%",
            edit: true,
        },
        {
            field: "address",
            key: "address",
            title: "Address",
            align: "left",
            width: "40%",
            edit: true,
        },
    ];

    it("double click edit", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    doubleClickEdit: true,
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // first cell
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );

        firstCell.trigger("dblclick");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        // second cell
        const secondCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(1);

        secondCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );
    });

    it("single click edit", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    doubleClickEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // td
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );

        firstCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        // second cell
        const secondCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(1);

        secondCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );
    });

    it("full row edit", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    doubleClickEdit: true,
                    fullRowEdit: true,
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // first cell
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );

        firstCell.trigger("dblclick");

        await later();

        expect(wrapper.findAll(".ve-table-body-td-edit-input").length).toBe(4);

        // second row cell
        const firstRowCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(1);

        firstRowCell.trigger("click");

        await later();

        expect(wrapper.findAll(".ve-table-body-td-edit-input").length).toBe(4);

        // second row cell
        const secondRowCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        secondRowCell.trigger("click");

        await later();

        expect(wrapper.findAll(".ve-table-body-td-edit-input").length).toBe(0);
    });

    it("stop editing when cell lose focus", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    stopEditingWhenCellLoseFocus: false,
                    doubleClickEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // td
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );

        firstCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        // second cell
        const secondCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(1);

        secondCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );
    });

    it("startEditingCell instance method", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    stopEditingWhenCellLoseFocus: true,
                    doubleClickEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        mockFn(row, column);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        wrapper.vm.startEditingCell({
            rowKey: 0,
            colKey: "name",
            defaultValue: "AAA",
        });

        await later();

        // td
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        // second cell
        const secondCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(1);

        secondCell.trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Shanghai",
                date: "1900-05-20",
                hobby: "coding and coding repeat",
                name: "AAA",
                rowKey: 0,
            },
            {
                _colspan: 1,
                _keys: "name",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "name",
                key: "name",
                title: "Name",
                width: "15%",
            },
        );
    });

    it("stopEditingCell instance method", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    stopEditingWhenCellLoseFocus: true,
                    doubleClickEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        mockFn(row, column);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        wrapper.vm.startEditingCell({
            rowKey: 0,
            colKey: "name",
            defaultValue: "AAA",
        });

        await later();

        // td
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        wrapper.vm.stopEditingCell({
            rowKey: 0,
            colKey: "name",
        });

        await later();

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Shanghai",
                date: "1900-05-20",
                hobby: "coding and coding repeat",
                name: "AAA",
                rowKey: 0,
            },
            {
                _colspan: 1,
                _keys: "name",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "name",
                key: "name",
                title: "Name",
                width: "15%",
            },
        );
    });

    it("stopAllEditingCell instance method", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    stopEditingWhenCellLoseFocus: false,
                    doubleClickEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        mockFn(row, column);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        wrapper.vm.startEditingCell({
            rowKey: 0,
            colKey: "name",
            defaultValue: "AAA",
        });

        wrapper.vm.startEditingCell({
            rowKey: 1,
            colKey: "date",
            defaultValue: "BBB",
        });

        await later();

        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);
        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        const secondCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);
        expect(secondCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        wrapper.vm.stopAllEditingCell();

        await later();

        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it("cellValueChange callback function", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    stopEditingWhenCellLoseFocus: true,
                    doubleClickEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        mockFn(row, column);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // td
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        firstCell.trigger("click");

        await later();

        const textInput = firstCell.find(".ve-table-body-td-edit-input");

        expect(textInput.exists()).toBe(true);

        textInput.setValue("AAA");

        // second cell
        const secondCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(1);

        secondCell.trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Shanghai",
                date: "1900-05-20",
                hobby: "coding and coding repeat",
                name: "AAA",
                rowKey: 0,
            },
            {
                _colspan: 1,
                _keys: "name",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "name",
                key: "name",
                title: "Name",
                width: "15%",
            },
        );
    });

    it("rowValueChange callback function", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    doubleClickEdit: true,
                    fullRowEdit: true,
                    // cell value change
                    rowValueChange: ({ row }) => {
                        mockFn(row);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // first cell
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        firstCell.trigger("dblclick");

        await later();

        expect(wrapper.findAll(".ve-table-body-td-edit-input").length).toBe(4);

        // set value
        const textInput = firstCell.find(".ve-table-body-td-edit-input");
        textInput.setValue("AAA");

        // second cell
        const secondCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(0);

        secondCell.trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith({
            address: "No.1 Century Avenue, Shanghai",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            name: "AAA",
            rowKey: 0,
        });
    });

    it("keydown event with single click edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    doubleClickEdit: false,
                    fullRowEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        mockFn(row, column);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // 选中单元格
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        firstCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ENTER }),
        );

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );
        expect(mockFn).toHaveBeenCalled();
    });

    it("keydown event with double click edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    doubleClickEdit: true,
                    fullRowEdit: false,
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        mockFn(row, column);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // 选中单元格
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        firstCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ENTER }),
        );

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ENTER }),
        );

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );
        expect(mockFn).toHaveBeenCalled();
    });

    it("keydown event with full row edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    doubleClickEdit: true,
                    fullRowEdit: true,
                    // cell value change
                    rowValueChange: ({ row }) => {
                        mockFn(row);
                    },
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // 选中单元格
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(0);

        firstCell.trigger("click");

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );
        expect(wrapper.findAll(".ve-table-body-td-edit-input").length).toBe(0);

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ENTER }),
        );

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            true,
        );
        expect(wrapper.findAll(".ve-table-body-td-edit-input").length).toBe(4);

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ENTER }),
        );

        await later();

        expect(firstCell.find(".ve-table-body-td-edit-input").exists()).toBe(
            false,
        );
        expect(wrapper.findAll(".ve-table-body-td-edit-input").length).toBe(0);

        expect(mockFn).toHaveBeenCalled();
    });
});
