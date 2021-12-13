import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import veTable from "@/ve-table";
import { later } from "../util";
import { KEY_CODES } from "../constant";
import cellEditor from "@/ve-table/src/editor/edit-input.jsx";

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
            edit: false,
        },
    ];

    it("cell editor render", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                editOption: {
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    // it("only cell editor render", async () => {
    //     const wrapper = mount(cellEditor, {
    //         propsData: {
    //             colgroups: [{}],
    //         },
    //     });

    //     expect(wrapper.html()).toMatchSnapshot();
    // });

    it("cell editing style", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(false);

        // 1910-06-20
        const tdEl = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        // set cell selection
        tdEl.trigger("click");
        tdEl.trigger("dblclick");

        await later();

        expect(wrapper.find(".ve-table-is-cell-editing").exists()).toBe(true);
    });

    it("double click edit", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(false);

        // 1910-06-20
        const tdEl = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        // set cell selection
        tdEl.trigger("click");
        tdEl.trigger("dblclick");

        await later();

        expect(wrapper.vm.isEditingCell).toEqual(true);

        expect(wrapper.vm.editingCell.rowKey).toEqual(1);
        expect(wrapper.vm.editingCell.colKey).toEqual("date");

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(true);

        wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(2)
            .trigger("click");

        await later();

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(false);
    });

    it("letter input directly edit", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(false);

        // 1910-06-20
        const tdEl = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        tdEl.trigger("click");

        await later();

        //  input letter directly
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 65 }));

        await later();

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(true);

        wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(2)
            .trigger("click");

        await later();

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(false);
    });

    it("cellValueChange callback function by dblclick", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

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

    it("cellValueChange callback function by input letter directly", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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

        //  input letter directly
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 65 }));

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

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

    it("startEditingCell instance method", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(true);

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
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(true);

        wrapper.vm.stopEditingCell();

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

    // 键盘上键结合文本直接输入
    it("key code arrowUp event by input directly edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");

        await later();

        //  input letter directly
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 65 }));

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_UP }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(0)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    /*
    键盘上键结合文本双击输入
    双击进入编辑状态不允许移动活动单元格
    */
    it("key code arrowUp event by dblclick edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_UP }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).not.toHaveBeenCalled();

        wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(2)
            .trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // 键盘右键结合文本直接输入
    it("key code arrowRight event by input directly edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");

        await later();

        //  input letter directly
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 65 }));

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_RIGHT }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(2)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    /*
    键盘右键结合文本双击输入
    双击进入编辑状态不允许移动活动单元格
    */
    it("key code arrowRight event by dblclick edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_RIGHT }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).not.toHaveBeenCalled();

        wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(2)
            .trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // 键盘下键结合文本直接输入
    it("key code arrowDown event by input directly edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");

        await later();

        //  input letter directly
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 65 }));

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_DOWN }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(2)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    /*
    键盘下键结合文本双击输入
    双击进入编辑状态不允许移动活动单元格
    */
    it("key code arrowDown event by dblclick edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_DOWN }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).not.toHaveBeenCalled();

        wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(2)
            .trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // 键盘左键结合文本直接输入
    it("key code arrowLeft event by input directly edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");

        await later();

        //  input letter directly
        document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 65 }));

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_LEFT }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(0)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    /*
    键盘左键结合文本双击输入
    双击进入编辑状态不允许移动活动单元格
    */
    it("key code arrowLeft event by dblclick edit", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ARROW_LEFT }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).not.toHaveBeenCalled();

        wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(2)
            .trigger("click");

        await later();

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // `Delete`键清空可编辑活动单元格内容
    it("key code delete event", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.DELETE }),
        );

        await later();

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // `Enter`键停止编辑状态并键向下移动活动单元格
    it("key code enter event", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.ENTER }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(2)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    //  `Ctrl + Enter`键停止编辑状态，并停留在当前单元格
    it("key code ctrl+enter event", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                keyCode: KEY_CODES.ENTER,
                ctrlKey: true,
            }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(1)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // `Tab`键停止编辑状态并向右移动活动单元格
    it("key code tab event", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.TAB }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(2)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // `Shift+Tab`键停止编辑状态并向左移动活动单元格
    it("key code shift+tab event", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                keyCode: KEY_CODES.TAB,
                shiftKey: true,
            }),
        );

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(0)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // `F2`键活动单元格进入编辑状态
    it("key code shift+tab event", async () => {
        const mockFn = jest.fn();

        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
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
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1)
            .trigger("click");

        document.dispatchEvent(
            new KeyboardEvent("keydown", { keyCode: KEY_CODES.F2 }),
        );
        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(2)
            .trigger("click");

        await later();

        expect(
            wrapper
                .findAll(".ve-table-body-tr")
                .at(1)
                .findAll(".ve-table-body-td")
                .at(2)
                .classes(),
        ).toContain("ve-table-cell-selection");

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    // `Alt + Enter`键单元格内文本换行
    // it("key code alt+enter event", async () => {
    //     const mockFn = jest.fn();

    //     const wrapper = mount(veTable, {
    //         propsData: {
    //             columns: COLUMNS,
    //             tableData: cloneDeep(TABLE_DATA),
    //             editOption: {
    //                 // cell value change
    //                 cellValueChange: ({ row, column }) => {
    //                     mockFn(row, column);
    //                 },
    //             },
    //             rowKeyFieldName: "rowKey",
    //         },
    //     });

    //     // td
    //     const firstCell = wrapper
    //         .findAll(".ve-table-body-tr")
    //         .at(1)
    //         .findAll(".ve-table-body-td")
    //         .at(1);

    //     firstCell.trigger("click");
    //     firstCell.trigger("dblclick");

    //     await later();

    //     const textInput = wrapper.find(
    //         ".ve-table-edit-input-container-show .ve-table-edit-input",
    //     );
    //     textInput.setValue("AAA");

    //     await later();

    //     document.dispatchEvent(
    //         new KeyboardEvent("keydown", {
    //             keyCode: KEY_CODES.ENTER,
    //             shiftKey: true,
    //         }),
    //     );

    //     await later();

    //     wrapper
    //         .findAll(".ve-table-body-tr")
    //         .at(1)
    //         .findAll(".ve-table-body-td")
    //         .at(2)
    //         .trigger("click");

    //     expect(mockFn).toHaveBeenCalled();

    //     expect(mockFn).toHaveBeenCalledWith(
    //         {
    //             address: "No.1 Century Avenue, Beijing",
    //             date: "AAA\n",
    //             hobby: "coding and coding repeat",
    //             name: "Dickerson",
    //             rowKey: 1,
    //         },
    //         {
    //             _colspan: 1,
    //             _keys: "date",
    //             _level: 1,
    //             _realTimeWidth: "15%",
    //             _rowspan: 1,
    //             align: "left",
    //             edit: true,
    //             field: "date",
    //             key: "date",
    //             title: "Date",
    //             width: "15%",
    //         },
    //     );
    // });

    // table clickoutside
    it("table clickoutside width cell editing", async () => {
        const mockFn = jest.fn();

        const ParentComp = {
            template: `
                <div>
                    <button id="outsideButton">outside table</button>
                    <veTable
                        :columns="columns"
                        :tableData="tableData"
                        :editOption="editOption"
                        rowKeyFieldName="rowKey"
                    />
                </div>
               
            `,
            data() {
                return {
                    columns: COLUMNS,
                    tableData: cloneDeep(TABLE_DATA),
                    editOption: {
                        // cell value change
                        cellValueChange: ({ row, column }) => {
                            mockFn(row, column);
                        },
                    },
                };
            },
            components: {
                veTable,
            },
        };

        await later();

        const div = document.createElement("div");
        document.body.appendChild(div);

        // need attach to documnet
        const wrapper = mount(ParentComp, { attachTo: div });

        // td
        const firstCell = wrapper
            .findAll(".ve-table-body-tr")
            .at(1)
            .findAll(".ve-table-body-td")
            .at(1);

        // set cell selection
        firstCell.trigger("click");
        firstCell.trigger("dblclick");

        await later();

        const textInput = wrapper.find(
            ".ve-table-edit-input-container-show .ve-table-edit-input",
        );
        textInput.setValue("AAA");

        await later();

        // click outside
        wrapper.find("#outsideButton").trigger("click");

        await later();

        expect(
            wrapper.find(".ve-table-edit-input-container-show").exists(),
        ).toBe(false);

        expect(mockFn).toHaveBeenCalled();

        expect(mockFn).toHaveBeenCalledWith(
            {
                address: "No.1 Century Avenue, Beijing",
                date: "AAA",
                hobby: "coding and coding repeat",
                name: "Dickerson",
                rowKey: 1,
            },
            {
                _colspan: 1,
                _keys: "date",
                _level: 1,
                _realTimeWidth: "15%",
                _rowspan: 1,
                align: "left",
                edit: true,
                field: "date",
                key: "date",
                title: "Date",
                width: "15%",
            },
        );
    });

    it("disable editing columns", async () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: cloneDeep(TABLE_DATA),
                editOption: {
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                rowKeyFieldName: "rowKey",
            },
        });

        // address column
        const tdEl = wrapper
            .findAll(".ve-table-body-tr")
            .at(0)
            .findAll(".ve-table-body-td")
            .at(3);

        // set cell selection
        tdEl.trigger("click");
        tdEl.trigger("dblclick");

        await later();

        expect(wrapper.find(".ve-table-is-cell-editing").exists()).toBe(false);
    });
});
