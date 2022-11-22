import { mount } from "@vue/test-utils";
import veTable from "@/ve-table";
import { later } from "../util";
import { cloneDeep } from "lodash";

describe("veTable contextmenu", () => {
    const TABLE_DATA = [
        {
            name: "John",
            date: "1900-05-20",
            number: "32",
            address: "No.1 Century Avenue, Shanghai",
            rowKey: 0,
        },
        {
            name: "Dickerson",
            date: "1910-06-20",
            number: "676",
            address: "No.1 Century Avenue, Beijing",
            rowKey: 1,
        },
        {
            name: "Larsen",
            date: "2000-07-20",
            number: "76",
            address: "No.1 Century Avenue, Chongqing",
            rowKey: 2,
        },
        {
            name: "Geneva",
            date: "2010-08-20",
            number: "7797",
            address: "No.1 Century Avenue, Xiamen",
            rowKey: 3,
        },
        {
            name: "Jami",
            date: "2020-09-20",
            number: "8978",
            address: "No.1 Century Avenue, Shenzhen",
            rowKey: 4,
        },
    ];

    const COLUMNS = [
        {
            field: "",
            key: "a",
            title: "",
            width: 50,
            align: "center",
            operationColumn: true,
            renderBodyCell: ({ row, column, rowIndex }, h) => {
                return ++rowIndex;
            },
        },
        {
            field: "name",
            key: "name",
            title: "Name",
            align: "left",
            width: "15%",
        },
        {
            field: "date",
            key: "date",
            title: "Date",
            align: "left",
            width: "15%",
        },
        {
            field: "number",
            key: "number",
            title: "Number",
            align: "right",
            width: "30%",
        },
        {
            field: "address",
            key: "address",
            title: "Address",
            align: "left",
            width: "40%",
        },
    ];

    const HEADER_CONTEXTMENUS = [
        {
            type: "CUT",
        },
        {
            type: "COPY",
        },
        {
            type: "SEPARATOR",
        },
        {
            type: "EMPTY_COLUMN",
        },
        {
            type: "SEPARATOR",
        },
        {
            type: "LEFT_FIXED_COLUMN_TO",
        },
        {
            type: "CANCEL_LEFT_FIXED_COLUMN_TO",
        },
        {
            type: "RIGHT_FIXED_COLUMN_TO",
        },
        {
            type: "CANCEL_RIGHT_FIXED_COLUMN_TO",
        },
    ];

    const BODY_CONTEXTMENUS = [
        {
            type: "CUT",
        },
        {
            type: "COPY",
        },
        {
            type: "SEPARATOR",
        },
        {
            type: "INSERT_ROW_ABOVE",
        },
        {
            type: "INSERT_ROW_BELOW",
        },
        {
            type: "SEPARATOR",
        },
        {
            type: "REMOVE_ROW",
        },
        {
            type: "EMPTY_ROW",
        },
        {
            type: "EMPTY_CELL",
        },
    ];

    afterEach(() => {
        return new Promise((resolve) => {
            const contextmenuNodes = document.querySelectorAll(
                ".ve-contextmenu-node",
            );

            [].forEach.call(contextmenuNodes, (nodeEl) => {
                nodeEl.remove();
            });

            resolve();
        });
    });

    it("render", () => {
        const wrapper = mount(veTable, {
            propsData: {
                columns: COLUMNS,
                tableData: TABLE_DATA,
                rowKeyFieldName: "rowKey",
                contextmenuHeaderOption: {
                    beforeShow: ({
                        isWholeRowSelection,
                        selectionRangeKeys,
                        selectionRangeIndexes,
                    }) => {},
                    afterMenuClick: ({
                        type,
                        selectionRangeKeys,
                        selectionRangeIndexes,
                    }) => {},
                    contextmenus: HEADER_CONTEXTMENUS,
                },
                contextmenuBodyOption: {
                    beforeShow: ({
                        isWholeRowSelection,
                        selectionRangeKeys,
                        selectionRangeIndexes,
                    }) => {},
                    afterMenuClick: ({
                        type,
                        selectionRangeKeys,
                        selectionRangeIndexes,
                    }) => {},
                    contextmenus: BODY_CONTEXTMENUS,
                },
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it("header contextmenu beforeShow callback", async () => {
        const mockBeforeShowFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-header-option={
                                    this.contextmenuHeaderOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuHeaderOption: {
                            beforeShow: ({
                                isWholeColSelection,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                mockBeforeShowFn({
                                    isWholeColSelection,
                                    selectionRangeKeys,
                                    selectionRangeIndexes,
                                });
                            },
                            afterMenuClick: ({
                                type,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                //
                            },
                            contextmenus: HEADER_CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrThEl = WRAPPER.findAll(".ve-table-header-tr")
            .at(0)
            .findAll(".ve-table-header-th")
            .at(1);

        firstTrThEl.trigger("mousedown", {
            button: 3,
        });
        await later();
        firstTrThEl.trigger("contextmenu");
        await later();

        const contextmenuNodes = document.querySelectorAll(
            ".ve-contextmenu-node",
        );

        expect(contextmenuNodes.length).toBe(7);

        expect(mockBeforeShowFn).toHaveBeenCalledWith({
            isWholeColSelection: true,
            selectionRangeKeys: {
                endColKey: "name",
                endRowKey: 4,
                startColKey: "name",
                startRowKey: 0,
            },
            selectionRangeIndexes: {
                endColIndex: 1,
                endRowIndex: 4,
                startColIndex: 1,
                startRowIndex: 0,
            },
        });
    });

    it("header contextmenu afterMenuClick callback", async () => {
        const mockAfterMenuClickFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-header-option={
                                    this.contextmenuHeaderOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuHeaderOption: {
                            beforeShow: ({
                                isWholeColSelection,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                //
                            },
                            afterMenuClick: ({
                                type,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                mockAfterMenuClickFn({
                                    type,
                                    selectionRangeKeys,
                                    selectionRangeIndexes,
                                });
                            },
                            contextmenus: HEADER_CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrThEl = WRAPPER.findAll(".ve-table-header-tr")
            .at(0)
            .findAll(".ve-table-header-th")
            .at(1);

        firstTrThEl.trigger("mousedown", {
            button: 3,
        });
        await later();
        firstTrThEl.trigger("contextmenu");
        await later();

        const contextmenuNodes = document.querySelectorAll(
            ".ve-contextmenu-node",
        );

        expect(contextmenuNodes.length).toBe(7);

        const contentmenuItemClickEvent = new MouseEvent("click", {
            view: window, // window
            bubbles: true,
            cancelable: true,
        });

        contextmenuNodes[2].dispatchEvent(contentmenuItemClickEvent);

        await later();

        expect(mockAfterMenuClickFn).toHaveBeenCalledWith({
            type: "EMPTY_COLUMN",
            selectionRangeKeys: {
                endColKey: "name",
                endRowKey: 4,
                startColKey: "name",
                startRowKey: 0,
            },
            selectionRangeIndexes: {
                endColIndex: 1,
                endRowIndex: 4,
                startColIndex: 1,
                startRowIndex: 0,
            },
        });
    });

    it("body contextmenu beforeShow callback", async () => {
        const mockBeforeShowFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-body-option={
                                    this.contextmenuBodyOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuBodyOption: {
                            beforeShow: ({
                                isWholeRowSelection,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                mockBeforeShowFn({
                                    isWholeRowSelection,
                                    selectionRangeKeys,
                                    selectionRangeIndexes,
                                });
                            },
                            afterMenuClick: ({
                                type,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                //
                            },
                            contextmenus: BODY_CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown", {
            button: 3,
        });
        await later();
        firstTrTdEl.trigger("contextmenu");
        await later();

        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        const contextmenuNodes = document.querySelectorAll(
            ".ve-contextmenu-node",
        );

        expect(contextmenuNodes.length).toBe(6);

        expect(mockBeforeShowFn).toHaveBeenCalledWith({
            isWholeRowSelection: false,
            selectionRangeKeys: {
                endColKey: "date",
                endRowKey: 2,
                startColKey: "date",
                startRowKey: 2,
            },
            selectionRangeIndexes: {
                endColIndex: 2,
                endRowIndex: 2,
                startColIndex: 2,
                startRowIndex: 2,
            },
        });
    });

    it("body contextmenu afterMenuClick callback", async () => {
        const mockAfterMenuClickFn = jest.fn();

        let tableData = cloneDeep(TABLE_DATA);

        const WRAPPER = mount(
            {
                render() {
                    return (
                        <div>
                            <ve-table
                                row-key-field-name="rowKey"
                                columns={COLUMNS}
                                table-data={tableData}
                                contextmenu-body-option={
                                    this.contextmenuBodyOption
                                }
                            />
                        </div>
                    );
                },
                data() {
                    return {
                        contextmenuBodyOption: {
                            beforeShow: ({
                                isWholeColSelection,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                //
                            },
                            afterMenuClick: ({
                                type,
                                selectionRangeKeys,
                                selectionRangeIndexes,
                            }) => {
                                mockAfterMenuClickFn({
                                    type,
                                    selectionRangeKeys,
                                    selectionRangeIndexes,
                                });
                            },
                            contextmenus: BODY_CONTEXTMENUS,
                        },
                    };
                },
            },
            // need attach to documnet
            { attachTo: document.body },
        );

        const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
            .at(2)
            .findAll(".ve-table-body-td")
            .at(2);

        firstTrTdEl.trigger("mousedown", {
            button: 3,
        });
        await later();
        firstTrTdEl.trigger("contextmenu");
        await later();

        expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

        const contextmenuNodes = document.querySelectorAll(
            ".ve-contextmenu-node",
        );

        expect(contextmenuNodes.length).toBe(6);

        const contentmenuItemClickEvent = new MouseEvent("click", {
            view: window, // window
            bubbles: true,
            cancelable: true,
        });

        contextmenuNodes[2].dispatchEvent(contentmenuItemClickEvent);

        await later();

        expect(mockAfterMenuClickFn).toHaveBeenCalledWith({
            type: "INSERT_ROW_ABOVE",
            selectionRangeKeys: {
                endColKey: "date",
                endRowKey: 2,
                startColKey: "date",
                startRowKey: 2,
            },
            selectionRangeIndexes: {
                endColIndex: 2,
                endRowIndex: 2,
                startColIndex: 2,
                startRowIndex: 2,
            },
        });
    });

    // it("contextmenu INSERT_ROW_ABOVE", async () => {
    //     const mockFn = jest.fn();

    //     let tableData = cloneDeep(TABLE_DATA);

    //     const WRAPPER = mount(
    //         {
    //             render() {
    //                 return (
    //                     <div>
    //                         <ve-table
    //                             row-key-field-name="rowKey"
    //                             columns={COLUMNS}
    //                             table-data={tableData}
    //                             contextmenu-body-option={
    //                                 this.contextmenuBodyOption
    //                             }
    //                         />
    //                     </div>
    //                 );
    //             },
    //             data() {
    //                 return {
    //                     contextmenuBodyOption: {
    //                         beforeShow: ({
    //                             isWholeRowSelection,
    //                             selectionRangeKeys,
    //                             selectionRangeIndexes,
    //                         }) => {
    //                             console.log("before show");
    //                         },
    //                         afterMenuClick: ({
    //                             type,
    //                             selectionRangeKeys,
    //                             selectionRangeIndexes,
    //                         }) => {
    //                             mockFn({
    //                                 type,
    //                                 selectionRangeKeys,
    //                                 selectionRangeIndexes,
    //                             });
    //                         },
    //                         contextmenus: BODY_CONTEXTMENUS,
    //                     },
    //                 };
    //             },
    //         },
    //         // need attach to documnet
    //         { attachTo: document.body },
    //     );

    //     const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
    //         .at(2)
    //         .findAll(".ve-table-body-td")
    //         .at(2);

    //     firstTrTdEl.trigger("mousedown", {
    //         button: 3,
    //     });
    //     await later();
    //     firstTrTdEl.trigger("contextmenu");
    //     await later();

    //     expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

    //     //const tableVm = WRAPPER.findComponent({ name: "ve-table" }).vm;

    //     const contextmenuNodes = document.querySelectorAll(
    //         ".ve-contextmenu-node",
    //     );

    //     expect(contextmenuNodes.length).toBe(6);

    //     const contentmenuItemClickEvent = new MouseEvent("click", {
    //         view: window, // window
    //         bubbles: true,
    //         cancelable: true,
    //     });

    //     contextmenuNodes[2].dispatchEvent(contentmenuItemClickEvent);

    //     await later();

    //     expect(tableData.length).toBe(6);

    //     expect(mockFn).toHaveBeenCalled();
    //     // expect(mockFn).toHaveBeenCalledWith({
    //     //     selectionRangeKeys,
    //     //     selectionRangeIndexes,
    //     //     //selection: { colKey: "date", rowKey: 2, rowIndex: 2 },
    //     //     type: "INSERT_ROW_ABOVE",
    //     // });
    // });

    // it("contextmenu INSERT_ROW_BELOW", async () => {
    //     const mockFn = jest.fn();

    //     let tableData = cloneDeep(TABLE_DATA);

    //     const WRAPPER = mount(
    //         {
    //             render() {
    //                 return (
    //                     <div>
    //                         <ve-table
    //                             row-key-field-name="rowKey"
    //                             columns={COLUMNS}
    //                             table-data={tableData}
    //                             contextmenu-body-option={
    //                                 this.contextmenuBodyOption
    //                             }
    //                         />
    //                     </div>
    //                 );
    //             },
    //             data() {
    //                 return {
    //                     contextmenuBodyOption: {
    //                         afterMenuClick: ({
    //                             type,
    //                             selectionRangeKeys,
    //                             selectionRangeIndexes,
    //                         }) => {
    //                             mockFn({
    //                                 type,
    //                                 selectionRangeKeys,
    //                                 selectionRangeIndexes,
    //                             });
    //                         },
    //                         contextmenus: BODY_CONTEXTMENUS,
    //                     },
    //                 };
    //             },
    //         },
    //         // need attach to documnet
    //         { attachTo: document.body },
    //     );

    //     const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
    //         .at(2)
    //         .findAll(".ve-table-body-td")
    //         .at(2);

    //     firstTrTdEl.trigger("contextmenu");
    //     firstTrTdEl.trigger("mousedown", {
    //         button: 3,
    //     });
    //     await later();

    //     expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

    //     const bodyEl = WRAPPER.find(".ve-table-body");
    //     bodyEl.trigger("contextmenu");

    //     await later();

    //     const contextmenuPopper = document.querySelector(
    //         ".ve-contextmenu-popper",
    //     );

    //     const contextmenuNodes = contextmenuPopper.querySelectorAll(
    //         ".ve-contextmenu-node",
    //     );

    //     const contentmenuItemClickEvent = new MouseEvent("click", {
    //         view: window, // window
    //         bubbles: true,
    //         cancelable: true,
    //     });

    //     contextmenuNodes[1].dispatchEvent(contentmenuItemClickEvent);

    //     await later();

    //     expect(tableData.length).toBe(6);

    //     expect(mockFn).toHaveBeenCalled();
    //     expect(mockFn).toHaveBeenCalledWith({
    //         selection: { colKey: "date", rowKey: 2, rowIndex: 2 },
    //         type: "INSERT_ROW_BELOW",
    //     });
    // });

    // it("contextmenu REMOVE_ROW", async () => {
    //     const mockFn = jest.fn();

    //     let tableData = cloneDeep(TABLE_DATA);

    //     const WRAPPER = mount(
    //         {
    //             render() {
    //                 return (
    //                     <div>
    //                         <ve-table
    //                             row-key-field-name="rowKey"
    //                             columns={COLUMNS}
    //                             table-data={tableData}
    //                             contextmenu-body-option={
    //                                 this.contextmenuBodyOption
    //                             }
    //                         />
    //                     </div>
    //                 );
    //             },
    //             data() {
    //                 return {
    //                     contextmenuBodyOption: {
    //                         afterMenuClick: ({
    //                             type,
    //                             selectionRangeKeys,
    //                             selectionRangeIndexes,
    //                         }) => {
    //                             mockFn({
    //                                 type,
    //                                 selectionRangeKeys,
    //                                 selectionRangeIndexes,
    //                             });
    //                         },
    //                         contextmenus: BODY_CONTEXTMENUS,
    //                     },
    //                 };
    //             },
    //         },
    //         // need attach to documnet
    //         { attachTo: document.body },
    //     );

    //     const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
    //         .at(2)
    //         .findAll(".ve-table-body-td")
    //         .at(2);

    //     firstTrTdEl.trigger("mousedown");

    //     await later();

    //     expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

    //     const bodyEl = WRAPPER.find(".ve-table-body");
    //     bodyEl.trigger("contextmenu");

    //     await later();

    //     const contextmenuPopper = document.querySelector(
    //         ".ve-contextmenu-popper",
    //     );

    //     const contextmenuNodes = contextmenuPopper.querySelectorAll(
    //         ".ve-contextmenu-node",
    //     );

    //     const contentmenuItemClickEvent = new MouseEvent("click", {
    //         view: window, // window
    //         bubbles: true,
    //         cancelable: true,
    //     });

    //     contextmenuNodes[2].dispatchEvent(contentmenuItemClickEvent);

    //     await later();

    //     expect(tableData.length).toBe(4);

    //     expect(mockFn).toHaveBeenCalled();
    //     expect(mockFn).toHaveBeenCalledWith({
    //         selectionRangeKeys,
    //         selectionRangeIndexes,
    //         //selection: { colKey: "date", rowKey: 2, rowIndex: 2 },
    //         type: "REMOVE_ROW",
    //     });
    // });

    // it("contextmenu HIDE_COLUMN", async () => {
    //     const mockFn = jest.fn();

    //     let tableData = cloneDeep(TABLE_DATA);

    //     const WRAPPER = mount(
    //         {
    //             render() {
    //                 return (
    //                     <div>
    //                         <ve-table
    //                             row-key-field-name="rowKey"
    //                             columns={COLUMNS}
    //                             table-data={tableData}
    //                             contextmenu-body-option={
    //                                 this.contextmenuBodyOption
    //                             }
    //                         />
    //                     </div>
    //                 );
    //             },
    //             data() {
    //                 return {
    //                     contextmenuBodyOption: {
    //                         afterMenuClick: ({
    //                             type,
    //                             selectionRangeKeys,
    //                             selectionRangeIndexes,
    //                         }) => {
    //                             mockFn({
    //                                 type,
    //                                 selectionRangeKeys,
    //                                 selectionRangeIndexes,
    //                             });
    //                         },
    //                         contextmenus: BODY_CONTEXTMENUS,
    //                     },
    //                 };
    //             },
    //         },
    //         // need attach to documnet
    //         { attachTo: document.body },
    //     );

    //     const firstTrTdEl = WRAPPER.findAll(".ve-table-body-tr")
    //         .at(2)
    //         .findAll(".ve-table-body-td")
    //         .at(2);

    //     firstTrTdEl.trigger("mousedown");

    //     await later();

    //     expect(firstTrTdEl.classes()).toContain("ve-table-cell-selection");

    //     const bodyEl = WRAPPER.find(".ve-table-body");
    //     bodyEl.trigger("contextmenu");

    //     await later();

    //     const DateTh = WRAPPER.findAll(
    //         ".ve-table-header-tr .ve-table-header-th",
    //     ).at(2);
    //     expect(DateTh.text()).toBe("Date");

    //     const contextmenuPopper = document.querySelector(
    //         ".ve-contextmenu-popper",
    //     );

    //     const contextmenuNodes = contextmenuPopper.querySelectorAll(
    //         ".ve-contextmenu-node",
    //     );

    //     const contentmenuItemClickEvent = new MouseEvent("click", {
    //         view: window, // window
    //         bubbles: true,
    //         cancelable: true,
    //     });

    //     contextmenuNodes[3].dispatchEvent(contentmenuItemClickEvent);

    //     await later();

    //     const DateTh2 = WRAPPER.findAll(
    //         ".ve-table-header-tr .ve-table-header-th",
    //     ).at(2);
    //     expect(DateTh2.text()).toBe("Number");

    //     expect(mockFn).toHaveBeenCalled();
    //     expect(mockFn).toHaveBeenCalledWith({
    //         selectionRangeKeys,
    //         selectionRangeIndexes,
    //         type: "HIDE_COLUMN",
    //     });
    // });
});
